import React, {useState} from 'react';

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import EditIcon from '@material-ui/icons/Edit';

import DialogTitle from '@material-ui/core/DialogTitle'


const OpenDialogButton = (props) => {

    const [open, setOpen] = useState(false);
    // const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const childWithProps = React.Children.map(props.children, child => {
        return React.cloneElement(child, {
            handleClose
        })
    })

    let iconType = null;

    if(props.type === 'edit') {
        if(props.form === 'skill') {
            iconType = (
                <IconButton onClick={handleOpen}>
                    <EditIcon color='primary' />
                </IconButton>
            );
        } else {
            iconType = (
                <IconButton style={{position: 'absolute', right: '40px', top: '0'}} onClick={handleOpen}>
                    <EditIcon color='primary' />
                </IconButton>
            );
        }
    } else if(props.type === 'add') {
        iconType = (
            <IconButton component='label' onClick={handleOpen}>                            
                <AddCircleIcon fontSize='large' color="primary"/>
            </IconButton>
        ) 
    }

    return (
        <>
        {iconType}
        <Dialog open={open} onClose={handleClose} fullWidth>                          
            <DialogTitle>{props.title}</DialogTitle>
            {childWithProps}
        </Dialog>
        </>
    )
};

export default OpenDialogButton;