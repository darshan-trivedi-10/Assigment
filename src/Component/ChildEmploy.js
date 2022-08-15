import React, { useState, useEffect } from 'react'
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


const ChildEmploy = ({ allEmploy, employ, child }) => {

    // const [expanded, setExpanded] = React.useState('panel1');
    const [expanded, setExpanded] = useState('panel1');
    const [data, setData] = useState(allEmploy)


    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const getEmploy = (mId) => {
        if (data === undefined) {
            return [];
        }
        return data.filter((employ) => employ.manager_id === mId);
    }


    return (
        <Accordion expanded={expanded === 'panel' + employ.id} onChange={handleChange('panel' + employ.id)} position="relative" sx={{ width: '75%', mb: "0.5rem" }}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography> {(child.length === 0 ? 'Employ Id - ' : 'Manager Id - ')} {employ.id}</Typography>
            </AccordionSummary>
            {
                child.length > 0 && (
                    child.map((emp) => (
                        <AccordionDetails>
                            {

                                <ChildEmploy key={emp.id} allEmploy={allEmploy} employ={emp} child={getEmploy(emp.id)} />
                            }

                        </AccordionDetails>
                    ))
                )
            }

        </Accordion>
    )
}

export default ChildEmploy;