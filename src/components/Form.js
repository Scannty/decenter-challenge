import classes from './Form.module.css'
import React from 'react'
import { getCdps } from '../utils/Web3Client'
import { Button, FormControl, MenuItem, Select, InputLabel, TextField } from '@mui/material'

export default function Form(props) {
    const [roughCdpid, setRoughCdpid] = React.useState(0)
    const [collateral, setCollateral] = React.useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        props.setIsLoading(prev => !prev)
        try {
            const cdps = await getCdps(collateral, roughCdpid, props.setItemsLoaded)
            props.setCdps(cdps)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            props.setIsLoading(prev => !prev)
            props.setItemsLoaded(0)
        }
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <h1>TokenID Selector:</h1>
            <div>
                <FormControl fullWidth>
                    <InputLabel id="collateral-type">Collateral Type</InputLabel>
                    <Select
                        labelId="collateral-type"
                        id="collaterals"
                        label="Collateral Type"
                        value={collateral}
                        onChange={(event) => setCollateral(event.target.value)}
                    >
                        <MenuItem value={'ETH-A'}>ETH-A</MenuItem>
                        <MenuItem value={'WBTC-A'}>WBTC-A</MenuItem>
                        <MenuItem value={'USDC-A'}>USDC-A</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <TextField
                    label="Rough CDP ID"
                    type="number"
                    value={roughCdpid}
                    onChange={(event) => setRoughCdpid(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputProps: { min: 0, max: 32000 }
                    }}
                />
            </div>
            <Button type='submit' variant="contained" className={classes.button}>Find Matching CDPs</Button>
        </form>
    )
}