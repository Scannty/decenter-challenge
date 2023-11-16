import classes from './Form.module.css'
import React from 'react'
import { getCdps } from '../utils/Web3Client'

export default function Form(props) {
    const roughCdpid = React.useRef()
    const collateral = React.useRef()

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const cdps = await getCdps(collateral.current.value, roughCdpid.current.value)
            console.log(cdps)
            props.setCdps(cdps)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <h1>TokenID Selector:</h1>
            <div>
                <label htmlFor="collaterals">Select Collateral: </label>
                <select id="collaterals" ref={collateral}>
                    <option value="ETH-A">ETH-A</option>
                    <option value="WBTC-A">WBTC-A</option>
                    <option value="USDC-A">USDC-A</option>
                </select>
            </div>
            <div>
                <label htmlFor="roughCdpid">Rough Cdpid: </label>
                <input
                    type="number"
                    min={0}
                    max={20000}
                    id='roughCdpid'
                    placeholder='0'
                    ref={roughCdpid}
                />
            </div>
            <button className={classes.button}>Submit Form</button>
        </form>
    )
}