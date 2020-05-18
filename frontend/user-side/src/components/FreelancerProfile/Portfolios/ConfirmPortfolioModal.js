import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';
import axios from '../../../axios';

const ConfirmDeleteModal = ({authData, modalInfo, setModalInfo}) => {

    const handleClose = () => {
        setModalInfo({open: false})
    }

    const handleConfirm = () => {
        if(!authData || authData.userRole !== 2) {
            return;
        }
        axios.post(modalInfo.link, modalInfo.data, {
            headers: {
                'Authorization': 'Bearer ' + authData.token
            }
        })
        .then(res => {
            handleClose();
            if(!res.data.error) {
                modalInfo.stateRef.setState(modalInfo.stateRef.state.map(portf => {
                    if(portf.id === modalInfo.data.work_id) {
                        portf.clientApprove.approve = 1;
                        portf.clientApprove.clientName = authData.userName;
                    }
                    return portf;
                }))
            }
        })
    }


    return (
        <Dialog open={modalInfo.open} onClose={handleClose} fullWidth>                          
            <DialogTitle>Ar tikrai patvirtinti šį projektą?</DialogTitle>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>
                    Ne
                </Button>
                <Button color="primary" type='submit' onClick={handleConfirm}>
                    Taip
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ConfirmDeleteModal;