import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

export default function Results(props) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'owner', headerName: 'Owner Address', width: 130 },
        { field: 'urn', headerName: 'Urn Address', width: 130 },
        { field: 'collateral', headerName: 'Collateral', type: 'number', width: 90 },
        { field: 'debt', headerName: 'Debt', type: 'number', width: 90 }
    ];

    const rows = props.cdps.map((cdp) => ({
        id: cdp.id,
        owner: cdp.userAddr,
        urn: cdp.urn,
        collateral: Number(cdp.collateral),
        debt: Number(cdp.debt)
    }))

    if (props.cdps.length !== 0) {
        return (
            <div>
                <h1>Results:</h1>
                <div style={{ height: 400, width: '150%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
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