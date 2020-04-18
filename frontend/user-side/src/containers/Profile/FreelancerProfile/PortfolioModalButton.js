import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormGroup from '@material-ui/core/FormGroup';
import DialogTitle from '@material-ui/core/DialogTitle'

import {useFormik} from 'formik';
import axios from '../../../axios';
import TextField from '@material-ui/core/TextField';

const PortfolioModalButton = (props) => {

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState('');

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            file: ''
        },
        onSubmit: values => {
            console.log("Siunciamas portfolio: ", values);
            let formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('file', values.file);
            console.log(values.file);
            //Submitting user's skills to the server
            axios.post('/work', formData, {
                headers: {
                    'Authorization': 'Bearer ' + props.token,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                if(!res.error) {
                    props.setWorks([...props.works, res.data]);
                    handleClose();
                }
                
            })
        }
    })

    

    return (
        <>
            <IconButton component='label' onClick={handleOpen}>                            
                <AddCircleIcon fontSize='large' color="primary"/>
            </IconButton> 
            <Dialog open={open} onClose={handleClose} fullWidth>                          
                <DialogTitle>Tavo portfolio</DialogTitle>
                <form onSubmit={formik.handleSubmit} autoComplete='off' encType='multipart/form-data'>
                    <DialogContent>
                        <FormGroup>
                            <TextField label="Pavadinimas" variant='outlined' name='title' {...formik.getFieldProps('title')} />
                        </FormGroup>
                        <FormGroup>
                            <TextField label="Aprašymas" multiline rows={3} variant='outlined' {...formik.getFieldProps('description')} />
                        </FormGroup>
                        <img style={{width: '300px'}} src={image} alt="portfolio" />
                        <Button variant='contained' component='label' color='primary'>
                            Pridėti nuotrauką
                            <input type='file' style={{display: 'none'}} name="file" onChange={(e) => formik.setFieldValue('file', e.currentTarget.files[0])} />
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handleClose}>
                            Atšaukti
                        </Button>
                        <Button color="primary" type='submit'>
                            Patvirtinti
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
};

export default PortfolioModalButton;