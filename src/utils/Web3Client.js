import Web3 from "web3"
import vaultInfoAbi from './VaultInfoAbi.json'
import MCDVatAbi from './MCDVatAbi.json'
import pLimit from "p-limit"

const VAULT_INFO_ADDRESS = '0x68C61AF097b834c68eA6EA5e46aF6c04E8945B2d'
const MCD_VAT_ADDRESS = '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B'
let web3, account, vaultInfoContract, MCDVatContract

/* Connects the user to a wallet and initializes a web3 instance */
export function Web3Connect() {
    const provider = window.ethereum

    if (typeof (provider) !== 'undefined') {
        web3 = new Web3(provider)
        provider
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                account = accounts[0]
            })
            .catch((err) => alert(err))
    }
    else {
        alert('Metamask required!')
    }
}

/* Initializes the Vault Info Contract and MCDVat Contract */
export function initializeContracts() {
    vaultInfoContract = new web3.eth.Contract(
        vaultInfoAbi,
        VAULT_INFO_ADDRESS
    )

    MCDVatContract = new web3.eth.Contract(
        MCDVatAbi,
        MCD_VAT_ADDRESS
    )

    console.log('Contracts initialized!')
}


/* 
    Fetches the rate from the MCD Vat contract for the given collateral and changes
    the value of the rate in state, which is later used to get the adjusted debt in the
    Results component.
*/
export function adjustCollateralRate(collateral, setRate) {
    const bytesCollateral = web3.utils.asciiToHex(collateral)
    const bytes32Collateral = web3.utils.padRight(bytesCollateral, 64)
    MCDVatContract.methods.ilks(bytes32Collateral).call({ from: account })
        .then(arg => {
            const rate = (Number(arg.rate) / (10 ** 27))
            setRate(rate)
            console.log(rate)
        })
        .catch(err => console.log(err))
}

/*
    POPRAVLJENA FUNKCIJA :)
    Given the collateral type and a CdpId, returns an array of 20 CDP positions closest
    to the given id without running more then 5 concurrent asynchronous processes.
    .
*/
export async function getCdps(collateral, roughCdpid, setItemsLoaded) {
    let id = Number(roughCdpid);
    if (id <= 0) {
        console.log('Invalid id');
        return [];
    }

    const matchingCdps = [];
    let i = 0;
    let helperVariable = 1;
    let positiveSign = true;
    let promises = []

    // Helper function that returns a promise that is automaticaly resolved
    async function getCdp(currentId) {
        return new Promise(async (resolve, reject) => {
            if (currentId < 0) { resolve() }
            else {
                const cdp = await vaultInfoContract.methods.getCdpInfo(currentId).call({ from: account })
                console.log(i)
                if (
                    web3.utils.hexToUtf8(cdp.ilk).replace(/\0/g, '') == collateral
                    /* && Number(cdp.collateral) !== 0 */  // Add to display only CDPs with collateral deposited
                ) {
                    cdp.id = currentId;
                    matchingCdps.push(cdp);
                    i++;
                    setItemsLoaded(prev => prev + 1);
                }
                resolve()
            }
        })
    };

    /* 
        Loop-based approach, we fill the array with 5 promises, and then resolve them 
        all at the same time with Promise.all()
    */
    while (i < 20) {
        for (let j = 0; j < Math.min(5, 20 - i); j++) {    // If there wasnt for the second term we would get sometimes more then 20 solutions
            console.log(i)
            promises.push(getCdp(id));
            id += helperVariable
            helperVariable = positiveSign ? -helperVariable - 1 : -helperVariable + 1;
            positiveSign = !positiveSign;
        }
        console.log(promises)
        await Promise.all(promises)
        promises = []
    }

    console.log('All RPC requests completed!');
    console.log(matchingCdps);
    return matchingCdps;
}



