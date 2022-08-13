import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function Empoly() {
    const { state } = useLocation();
    const [frows, setFrows] = useState(['id', 'first_name', 'last_name', 'date_of_birth', 'address', 'date_of_joining', 'designation', 'manager_id', 'salary']);
    const [srows, setSrows] = useState([]);
    useEffect(() => {
        let temp = [];
        frows.map((ele) => (
            temp.push(state[ele])
        ))

        setSrows(temp);
    }, [])
    return (
        <>
            <center>
                <TableContainer component={Paper}>
                    <Table sx={{ width: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Field</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                frows.map((row) => (
                                    <TableRow key={row.name + state[row]} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {state[row]}
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </center>
        </>
    )
}