import React, {useState} from 'react';
import PortfolioForm from './PortfolioForm';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle'

import {makeStyles} from '@material-ui/core/styles';




const PortfolioModalButton = (props) => {

    const [open, setOpen] = useState(false);
    // const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <>
            <IconButton component='label' onClick={handleOpen}>                            
                <AddCircleIcon fontSize='large' color="primary"/>
            </IconButton> 
            <Dialog open={open} onClose={handleClose} fullWidth>                          
                <DialogTitle>Tavo portfolio</DialogTitle>
                <PortfolioForm handleClose={handleClose} />
                
            </Dialog>
        </>
    )
};

export default PortfolioModalButton;