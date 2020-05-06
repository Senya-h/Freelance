import React from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

import { useFormik} from 'formik';
import {object as yupObject, string as yupString, number as yupNumber} from 'yup';
import axios from '../../../axios';


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginBottom: theme.spacing(3)
        }
    }
}))

const ServiceForm = (props) => {
    const classes = useStyles();
    const toEdit = props.serviceToEdit? true: false;

    const formik = useFormik({
        initialValues: {
            service: toEdit? props.serviceToEdit.title: '',
            description: toEdit? props.serviceToEdit.description: '',
            price_per_hour: toEdit? props.serviceToEdit.price_per_hour: ''
        },
        validationSchema: yupObject({
            service: yupString().required("Privalomas laukelis"),
            description: yupString().required("Privalomas laukelis"),
            price_per_hour: yupNumber().min(0, "Kaina privalo būti teigiamas skaičius")
        }),
        onSubmit: values => {
            values.price_per_hour = Math.round((values.price_per_hour + Number.EPSILON) * 100) / 100;
            props.setUploading(true);

            if(toEdit) {
                axios.post('/update/service&id=' + props.serviceToEdit.id, values, {
                    headers: {
                        'Authorization': 'Bearer ' + props.token,
                    }
                })
                .then(res => {
                    props.setUploading(false);

                    if(!res.error && res.status === 200) {
                        props.handleClose();
                        const updatedServices = props.services.map(service => {
                            if(service.id === props.serviceToEdit.id) {
                                service.title = values.service;
                                service.description = values.description;
                                service.price_per_hour = values.price_per_hour;
                            }
                            return service;
                        })
                        props.setServices(updatedServices);
                    }
                })
            } else {
                axios.post('/service', values, {
                    headers: {
                        'Authorization': 'Bearer ' + props.token,
                    }
                }).then(res => {
                    props.setUploading(false);

                    if(!res.error && res.status === 201) {
                        props.handleClose();
                        props.setServices([...props.services, {
                            id: res.data.id,
                            title: values.service, 
                            description: values.description, 
                            price_per_hour: values.price_per_hour
                        }]);
                    } 
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
    })
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogContent className={classes.root}>
                <FormGroup>
                    <TextField
                        autoFocus
                        label="Paslauga"
                        variant='outlined'
                        name='service'
                        fullWidth
                        {...formik.getFieldProps('service')}
                    />
                    {formik.touched.service && formik.errors.service ? (
                    <div className='text-danger'>{formik.errors.service}</div>
                    ) : null}
                </FormGroup>
                <FormGroup>
                    <TextField
                        label="Aprašymas"
                        variant='outlined'
                        multiline
                        rows={2}
                        name='description'
                        fullWidth
                        {...formik.getFieldProps('description')}
                    />
                    {formik.touched.description && formik.errors.description ? (
                    <div className='text-danger'>{formik.errors.description}</div>
                    ) : null}
                </FormGroup>

                <TextField
                    label="Valandos kaina"
                    name="price_per_hour"
                    type="number"
                    placeholder="0"
                    {...formik.getFieldProps('price_per_hour')}
                />
                {formik.touched.price_per_hour && formik.errors.price_per_hour ? (
                    <div className='text-danger'>{formik.errors.price_per_hour}</div>
                    ) : null}
            </DialogContent>
            <DialogActions>
                <Button color="primary" type='button' onClick={props.handleClose}>
                    Atšaukti
                </Button>
                <Button color="primary" type='submit'>
                    Patvirtinti
                </Button>
            </DialogActions>
        </form>
    )
};

export default ServiceForm;