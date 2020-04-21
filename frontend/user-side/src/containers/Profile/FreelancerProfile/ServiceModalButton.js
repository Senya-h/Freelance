import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormGroup from '@material-ui/core/FormGroup';
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField';
import { useFormik} from 'formik';
import {object as yupObject, string as yupString, number as yupNumber} from 'yup';
import axios from '../../../axios';

const ServceModalButton = (props) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const formik = useFormik({
        initialValues: {
            service: '',
            description: '',
            price_per_hour: 0.00
        },
        validationSchema: yupObject({
            service: yupString().required("Privalomas laukelis"),
            description: yupString().required("Privalomas laukelis"),
            price_per_hour: yupNumber().min(0, "Kaina privalo būti teigiamas skaičius")
        }),
        onSubmit: values => {
            values.price_per_hour = Math.round((values.price_per_hour + Number.EPSILON) * 100) / 100;
            axios.post('/service', values, {
                headers: {
                    'Authorization': 'Bearer ' + props.token,
                }
            }).then(res => {
                if(!res.error && res.status === 201) {
                    handleClose();
                    props.setServices([...props.services, {
                        service: values.service, 
                        description: values.description, 
                        price_per_hour: values.price_per_hour
                    }])
                }
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }
    })

    return (
        <>
        <IconButton component='label' onClick={handleOpen}>                            
            <AddCircleIcon fontSize='large' color="primary"/>
        </IconButton> 
        <Dialog open={open} onClose={handleClose} fullWidth>                          
            <DialogTitle>Pridėti paslaugą</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
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
                            margin="normal"
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
                        {...formik.getFieldProps('price_per_hour')}
                    />
                    {formik.touched.price_per_hour && formik.errors.price_per_hour ? (
                        <div className='text-danger'>{formik.errors.price_per_hour}</div>
                        ) : null}
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>
                        Atšaukti
                    </Button>
                    <Button color="primary" type='submit'>
                        Pridėti
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
        </>
    )
};

export default ServceModalButton;