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
import axios, {baseURL} from '../../../axios';
import {object as yupObject, string as yupString} from 'yup';

const PhotoModalButton = (props) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const formik = useFormik({
        initialValues: {
            localFile: '',
            formFile: ''
        },
        validationSchema: yupObject({
            formFile: yupString().required("Įkelkite nuotrauką")
        }),
        onSubmit: values => {
            let formData = new FormData();
            formData.append('file', values.formFile);
            console.log("Form data:", values.formFile);
            //Submitting user's skills to the server
            axios.post('/photo-upload', formData, {
                headers: {
                    'Authorization': 'Bearer ' + props.token,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res);
                if(!res.error) {
                    props.setProfileImage(res.data.file)
                    handleClose();
                }
                
            })
            .catch(err => {
                console.log(err);
            })
        }
    })


    return (
        <>
        <IconButton className={props.className} component='label' onClick={handleOpen}>                            
            <AddCircleIcon fontSize='large' color="primary"/>
        </IconButton> 
        <Dialog open={open} onClose={handleClose} fullWidth>                          
            <DialogTitle>Profilio nuotrauka</DialogTitle>
            <form onSubmit={formik.handleSubmit} autoComplete='off' encType='multipart/form-data'>
                <DialogContent>
                    <FormGroup>
                        <img style={{width: '300px'}} src={formik.values.localFile? formik.values.localFile: `${baseURL}/storage/${props.profileImage}`} alt="portfolio" />
                        {formik.errors.formFile ? (
                        <div className='text-danger'>{formik.errors.formFile}</div>
                        ) : null}
                    </FormGroup>
                    <Button variant='contained' component='label' color='primary'>
                        Keisti nuotrauką
                        <input type='file' accept='image/*' style={{display: 'none'}} name="file" onChange={(e) => {
                            if(e.target.files[0]) {
                                formik.setFieldValue('localFile', URL.createObjectURL(e.target.files[0]));
                                formik.setFieldValue('formFile', e.currentTarget.files[0])} 
                            }
                            
                        }/>
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

export default PhotoModalButton;