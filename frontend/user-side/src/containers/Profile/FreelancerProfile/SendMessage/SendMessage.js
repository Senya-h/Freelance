import React, {useState} from 'react';
import classes from './SendMessage.module.scss';

import MessageIcon from '@material-ui/icons/Message';
import SendIcon from '@material-ui/icons/Send';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SendMessage = (props) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    }

    return (
        <div>
            <Button onClick={handleOpen} variant='contained' color='primary' startIcon={<MessageIcon />}>
                Siųsti žinutę
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Fade in={open}>
                    <div style={{left: '50%', top: '50%', translate: 'transformX(-50%,-50%)'}} className={classes.Modal}>
                        <h3>Adresatas: {props.recipientName}</h3>
                        <IconButton onClick={handleClose} className={classes.CloseButton}>
                            <CloseIcon />
                        </IconButton>
                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <TextField id='standard-secondary' label='Tema' color='primary' />
                            </FormGroup>
                            <FormGroup classes={{root: 'my-3'}}>
                                <TextField variant='outlined' color='primary' label='Turinys' multiline rows={10}/>
                            </FormGroup>
                            <FormGroup classes={{root: 'flex-row justify-content-end'}}>
                                <Button type='submit' variant="contained" color="primary" endIcon={<SendIcon />}>Siųsti</Button>
                            </FormGroup>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
};

export default SendMessage;