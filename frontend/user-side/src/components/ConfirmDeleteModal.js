import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';
import axios from '../axios';

const ConfirmDeleteModal = (props) => {

    const handleClose = () => {
        props.setModalInfo({open: false})
    }

    const handleDelete = () => {
        axios.delete(props.modalInfo.deleteLink + props.modalInfo.id, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }).then(res => {
            console.log(res);
            if(!res.data.error && res.status === 200) {
                handleClose();
                props.modalInfo.stateRef.setState([...props.modalInfo.stateRef.state.filter(state => state.id !== props.modalInfo.id)])
            }
        })
    }

    return (
        <Dialog open={props.modalInfo.open} onClose={handleClose} fullWidth>                          
            <DialogTitle>Ar tikrai norite ištrinti?</DialogTitle>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>
                    Ne
                </Button>
                <Button color="primary" type='submit' onClick={handleDelete}>
                    Taip
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ConfirmDeleteModal;