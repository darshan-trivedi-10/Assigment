import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const hoveredStyle = {
    cursor: 'pointer'
}


export default function AllEmploy() {
    const navigate = useNavigate();
    const [allEmploy, setAllEmploy] = useState([]);
    const [currEmploy, setCurrEmploy] = useState([]);
    const [currText, setCurrText] = useState('');

    useEffect(() => {
        axios.get(`https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees`)
            .then(function (res) {
                let data = res.data;
                setAllEmploy(data);
                setCurrEmploy(data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    function EmployPage(employ) {
        console.log(employ.manager_id);
        navigate('/employDetails', { state: employ });
    }

    function searchFilter(currText) {

        let filterArr = [];

        if (currText === '') {
            filterArr = currEmploy;
            setAllEmploy(currEmploy);
        } else {
            filterArr = currEmploy.filter((employ) => {
                let name = employ.first_name;
                name = name.toLowerCase();
                return name.includes(currText.toLowerCase())
            })
        }

        setAllEmploy(filterArr);

    }


    function handleChange(e) {

        setCurrText(e.target.value);
        searchFilter(currText);
    }

    return (
        <>

            <Box sx={{ flexGrow: 1, my: -1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Search Here
                        </Typography>
                        <Search value={currText} onChange={handleChange}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Employee ID</StyledTableCell>
                            <StyledTableCell align="right">First Name</StyledTableCell>
                            <StyledTableCell align="right">Last Name</StyledTableCell>
                            <StyledTableCell align="right">Date of Birth</StyledTableCell>
                            <StyledTableCell align="right">Address</StyledTableCell>
                            <StyledTableCell align="right">Date of Joining</StyledTableCell>
                            <StyledTableCell align="right">Salary</StyledTableCell>
                            <StyledTableCell align="right">Designation</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            allEmploy.map((empoly) => (
                                <StyledTableRow key={empoly.id} >
                                    <StyledTableCell component="th" scope="row" style={hoveredStyle} onClick={() => EmployPage(empoly)}>
                                        <Link to='/employDetails' >
                                            {empoly.id}
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{empoly.first_name}</StyledTableCell>
                                    <StyledTableCell align="right">{empoly.last_name}</StyledTableCell>
                                    <StyledTableCell align="right">{empoly.date_of_birth}</StyledTableCell>
                                    <StyledTableCell align="right">{empoly.address}</StyledTableCell>
                                    <StyledTableCell align="right">{empoly.date_of_joining}</StyledTableCell>
                                    <StyledTableCell align="right">{empoly.salary}</StyledTableCell>
                                    <StyledTableCell align="right">{empoly.designation}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
