import React, {useState} from 'react';

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
import {makeStyles} from '@material-ui/core/styles';

import axios from '../axios';

const useStyles = makeStyles(theme => ({
    dialog: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#eee',
        borderRadius: '5px',
        width: '900px',
        height: '500px',
        padding: '20px 40px',
    },
    closeBtn: {
        position: 'absolute',
        top: '5px',
        right: '5px'
    }
}))

const SendMessage = props => {
    const classes = useStyles();
    const [alertMessage, setAlertMessage] = useState([]);
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    const formik = useFormik({
        initialValues: {
            content: ''
        },
        validationSchema: yupObject({
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
                if(!res.data.error && res.status === 201) {
                    handleClose();
                } else {
                    setAlertMessage(<Alert severity="error">Nežinoma klaida! Bandykite vėliau dar kartą arba susisiekite su administratoriumi</Alert>);
                }
                console.log("Alert message: ", alertMessage);
            })
            .catch(err => {
                setAlertMessage(<Alert severity="error">Nežinoma klaida! Bandykite vėliau dar kartą arba susisiekite su administratoriumi</Alert>);
            })
        }
    })

    return (
        <>
            <Button className={props.className} onClick={handleOpen} variant='contained' color='primary' startIcon={<MessageIcon />}>
                Siųsti žinutę
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <div style={{left: '50%', top: '50%', translate: 'transformX(-50%,-50%)'}} className={classes.dialog}>
                    <DialogTitle>Adresatas: {props.recipientName}</DialogTitle>
                    <IconButton onClick={handleClose} className={classes.closeBtn}>
                        <CloseIcon />
                    </IconButton>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogContent>
                            <FormGroup classes={{root: 'my-3'}}>
                                <TextField variant='outlined' color='primary' label='Turinys' {...formik.getFieldProps('content')} multiline rows={10}/>
                            </FormGroup>
                        </DialogContent>
                        <DialogActions>
                            <FormGroup classes={{root: 'flex-row justify-content-end'}}>
                                <Button type='submit' variant="contained" color="primary" endIcon={<SendIcon />}>Siųsti</Button>
                            </FormGroup>
                        </DialogActions>
                        {alertMessage}
                    </form>
                </div>
            </Dialog>
        </>
    )
}

export default SendMessage;