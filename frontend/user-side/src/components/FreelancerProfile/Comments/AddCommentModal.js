import React, {useState} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loader from 'react-loader-spinner';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    iconBg: {
        backgroundColor: '#fff',
        borderRadius: '50%'
    },
    loader: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)'
    }
}))

const AddCommentModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isUploading, setUploading] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const childWithProps = React.Children.map(props.children, child => {
        return React.cloneElement(child, {
            handleClose,
            setUploading
        })
    })

    let hasVisitorCommented = false;
    if(props.allComments) {
        props.allComments.forEach(comment => {
            if(comment.user_id === props.visitingUserID) {
                hasVisitorCommented = true;
            }
        })
    }


    let iconType = null;

    if(props.type === "edit") {
        iconType = (
            <IconButton onClick={handleOpen}>
                <EditIcon color='primary' />
            </IconButton>
        )
    } else {
        if(!hasVisitorCommented) {
            iconType = (
                <Button type='button' variant='contained' color='primary' onClick={handleOpen}>                            
                    Pateikti atsiliepimą
                </Button> 
            )
        }
    }

    return (
        <>
        {iconType}
        <Dialog open={open} onClose={handleClose} fullWidth>                          
            <DialogTitle>Palikti atsiliepimą</DialogTitle>
            {childWithProps}

            {isUploading &&
            <div className={classes.loader}>
                <Loader
                    type="Puff"
                    color="#9200e6"
                    height={100}
                    width={100}
                />
            </div>
            }
        </Dialog>
        </>
    )
};

export default AddCommentModal;