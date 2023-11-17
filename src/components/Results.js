import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

export default function Results(props) {
    console.log(props.decimals)
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'owner', headerName: 'Owner Address', width: 250 },
        { field: 'urn', headerName: 'Urn Address', width: 250 },
        { field: 'collateral', headerName: 'Collateral', type: 'number', width: 100 },
        { field: 'debt', headerName: 'Debt', type: 'number', width: 100 }
    ];

    const rows = props.cdps.map((cdp) => ({
        id: cdp.id,
        owner: cdp.userAddr,
        urn: cdp.urn,
        collateral: Number(cdp.collateral) / (10 ** props.decimals),
        debt: (Number(cdp.debt) / (10 ** 18) * props.collateralRate)
    }))

    if (props.cdps.length !== 0) {
        return (
            <div>
                <h2>Results:</h2>
                <div style={{ height: 400, width: '105%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 15, 20]}
                        sx={{
                            borderColor: '#14213d',
                            backgroundColor: '#ffffff',
                            padding: '1%'
                        }}
                    />
                </div>
            </div >
        )
    } else {
        return (
            <React.Fragment />
        )
    }
}