import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormGroup from '@material-ui/core/FormGroup';
import DialogTitle from '@material-ui/core/DialogTitle'
import {makeStyles} from '@material-ui/core/styles';
import {useFormik} from 'formik';
import axios from '../../../axios';
import TextField from '@material-ui/core/TextField';

import {object as yupObject, string as yupString, number as yupNumber} from 'yup';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginBottom: theme.spacing(3)
        }
    }
}))

const PortfolioModalButton = (props) => {

    const [open, setOpen] = useState(false);
    const classes = useStyles();

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
            localFile: '',
            formFile: '',
        },
        validationSchema: yupObject({
            title: yupString().required("Privalomas laukelis"),
            description: yupString().required("Privalomas laukelis"),
            formFile: yupString().required("Įkelkite nuotrauką")
        }),
        onSubmit: values => {
            let formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('file', values.formFile);
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
                    <DialogContent className={classes.root} >
                        <FormGroup>
                            <TextField autoFocus label="Pavadinimas" variant='outlined' {...formik.getFieldProps('title')} />
                        </FormGroup>
                        <FormGroup>
                            <TextField label="Aprašymas" multiline rows={3} variant='outlined' {...formik.getFieldProps('description')} />
                        </FormGroup>
                        {formik.values.localFile?<img style={{width: '300px'}} src={formik.values.localFile} alt="portfolio" />:null}
                        <Button variant='contained' component='label' color='primary'>
                            Pridėti nuotrauką
                            <input type='file' style={{display: 'none'}} name="file" onChange={(e) => {
                                if(e.target.files[0]) {
                                    formik.setFieldValue('localFile', URL.createObjectURL(e.target.files[0]));
                                    formik.setFieldValue('formFile', e.currentTarget.files[0]);
                                }
                            }}/>
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