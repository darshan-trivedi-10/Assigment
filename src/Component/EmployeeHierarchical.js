import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function EmployeeHierarchical() {

    const [allEmploy, setAllEmploy] = useState([]);
    const [managerId, setManagerId] = useState([]);
    const [obj, setObj] = useState({});
    const [expanded, setExpanded] = React.useState('panel1');
    const [result, setResult] = useState([]);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        axios.get(`https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees`)
            .then(function (res) {
                let data = res.data;
                let temp = [];
                let tempObj = obj;
                data.map((emp) => {
                    let mId = emp.manager_id;
                    if (temp.includes(mId) === false) {
                        temp.push(mId);
                        tempObj[mId] = [];
                    }
                })
                setObj(tempObj);
                temp.shift();
                setManagerId(temp);
                setAllEmploy(data);

                data.map((emp) => {
                    let eId = emp.id, mId = emp.manager_id;
                    tempObj[mId].push(eId);
                })

                const tempArr = Object.keys(tempObj).map(key => {
                    return { [key]: obj[key] };
                });
                setResult(tempArr);
            })
            .catch(function (error) {
                console.log(error)
            })

    }, [])

    return (
        <>
            <center>
                {
                    managerId.map((key) => (
                        <Accordion expanded={expanded === 'panel' + key} onChange={handleChange('panel' + key)} position="relative" sx={{ width: '75%', mb: "0.5rem" }}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography> {'Manager Id - '}{key}</Typography>
                            </AccordionSummary>
                            {
                                obj[key].map((child) => (
                                    <AccordionDetails>
                                        <Typography>
                                            {child}
                                        </Typography>
                                    </AccordionDetails>
                                ))
                            }
                        </Accordion>
                    ))
                }
            </center>
        </>
    );
}