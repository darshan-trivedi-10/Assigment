import React, { Component } from 'react'
import { Typography, AppBar, CssBaseline, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';


const hoveredStyle = {
    cursor: 'pointer',
    color: 'white', textDecoration: "none"
}         

export default class Navbar extends Component {
    render() {
        return (
            <>
                <CssBaseline />
                <AppBar position="relative" sx={{ mb: "0.5rem" }}>
                    <Toolbar >
                        <Typography variant='h6'  >
                            <Link to='/' style={hoveredStyle}>
                                Emplyee List
                            </Link>
                        </Typography>
                        <Typography variant='h6' sx={{ mx: "2rem" }}>
                            <Link to='/employHierarchical' style={hoveredStyle}>Hierarchical Display</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </>
        )
    }
}
