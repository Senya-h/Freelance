import React, {useState} from 'react';
import classes from './SendMessage.module.scss';

import MessageIcon from '@material-ui/icons/Message';
import SendIcon from '@material-ui/icons/Send';
import Dialog from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useFormik} from 'formik';
import {object as yupObject, string as yupString} from 'yup';

import axios from '../../../../axios';

const SendMessage = React.memo(props => {
    let alertMessage = null;
    console.log("AS CIA");
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    const formik = useFormik({
        initialValues: {
            title: '',
            content: ''
        },
        validationSchema: yupObject({
            title: yupString().required("Privalomas laukelis"),
            content: yupString().required("Privalomas laukelis")
        }),
        onSubmit: values => {
            console.log(values);
            axios.post('/message', {
                receivers_id: props.recipientID,
                message: values.content
            }, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            })
            .then(res => {
                console.log(res);
                alertMessage = <Alert severity="error">Nežinoma klaida! Bandykite vėliau dar kartą arba susisiekite su administratoriumi</Alert>;
                if(!res.data.error && res.status === 201) {
                    // handleClose();
                } else {
                    alertMessage = <Alert severity="error">Nežinoma klaida! Bandykite vėliau dar kartą arba susisiekite su administratoriumi</Alert>;
                }
                console.log("Alert message: ", alertMessage);
            })
            .catch(err => {
                alertMessage = <Alert severity="error">Nežinoma klaida! Bandykite vėliau dar kartą arba susisiekite su administratoriumi</Alert>;
            })
        }
    })

    return (
        <div>
            <Button onClick={handleOpen} variant='contained' color='primary' startIcon={<MessageIcon />}>
                Siųsti žinutę
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <div style={{left: '50%', top: '50%', translate: 'transformX(-50%,-50%)'}} className={classes.Modal}>
                    <DialogTitle>Adresatas: {props.recipientName}</DialogTitle>
                    <IconButton onClick={handleClose} className={classes.CloseButton}>
                        <CloseIcon />
                    </IconButton>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogContent>
                            <FormGroup>
                                <TextField id='standard-secondary' label='Tema' color='primary' {...formik.getFieldProps('title')}/>
                            </FormGroup>
                            <FormGroup classes={{root: 'my-3'}}>
                                <TextField variant='outlined' color='primary' label='Turinys' {...formik.getFieldProps('content')} multiline rows={10}/>
                            </FormGroup>
                        </DialogContent>
                        <DialogActions>
                            <FormGroup classes={{root: 'flex-row justify-content-end'}}>
                                <Button type='submit' variant="contained" color="primary" endIcon={<SendIcon />}>Siųsti</Button>
                            </FormGroup>
                        </DialogActions>
                         {console.log("ALERT:", alertMessage)}
                        {alertMessage}
                    </form>
                </div>
            </Dialog>
        </div>
    )
}, (prevProps, nextProps) => {
    console.log("Previous: ", prevProps);
    console.log("Next: ", nextProps);
    return false;
});

export default SendMessage;