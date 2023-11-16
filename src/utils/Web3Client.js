import Web3 from "web3"
import vaultInfoAbi from './VaultInfoAbi.json'
import pLimit from "p-limit"

const VAULT_INFO_ADDRESS = '0x68C61AF097b834c68eA6EA5e46aF6c04E8945B2d'
let web3, account, vaultInfoContract

export function Web3Connect() {
    const provider = window.ethereum

    if (typeof provider !== undefined) {
        web3 = new Web3(provider)
        provider
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                account = accounts[0]
                console.log(account)
            })
            .catch((err) => console.log(err))
    }
    else {
        alert('Metamask required!')
    }
}

export function initializeContract() {
    vaultInfoContract = new web3.eth.Contract(
        vaultInfoAbi,
        VAULT_INFO_ADDRESS
    )

    console.log('Contract initialized!')
}

export function getCdp(roughCdpid) {
    vaultInfoContract.methods.getCdpInfo(roughCdpid).call({ from: account })
        .then(arg => console.log(arg))
        .catch(err => console.log(err))
}

/*
    Given the collateral type and a CdpId, returns an array of 20 CDP positions closest
    to the given id without running more then 5 concurrent asynchronous processes, using the 
    p-limt library.
*/
export async function getCdps(collateral, roughCdpid, setItemsLoaded) {
    let i = 0
    let id = Number(roughCdpid)
    if (id <= 0) {
        console.log('Invalid id')
        return
    }

    const matchingCdps = []
    let helperVariable = 1
    let positiveSign = true

    const limit = pLimit(5)

    async function performRpcRequest(currentId) {
        try {
            if (i < 20) {
                const cdp = await limit(() =>
                    vaultInfoContract.methods.getCdpInfo(currentId).call({ from: account })
                )

                if (
                    web3.utils.hexToUtf8(cdp.ilk).replace(/\0/g, '') == collateral /*&&
                    Number(cdp.collateral) !== 0*/
                ) {
                    console.log(web3.utils.hexToUtf8(cdp.ilk).replace(/\0/g, ''))
                    console.log('MATCH!')
                    cdp.id = currentId
                    matchingCdps.push(cdp)
                    i++
                    setItemsLoaded(prev => prev + 1)
                    console.log(currentId)
                }

                const newId = currentId + helperVariable
                helperVariable = positiveSign ? -helperVariable - 1 : -helperVariable + 1
                positiveSign = !positiveSign

                await performRpcRequest(newId)
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            console.log('RPC Requests Completed!')
        }
    }

    await performRpcRequest(id)
    return matchingCdps
}
