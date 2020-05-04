import React from 'react';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import {useFormik} from 'formik';
import axios, {baseURL} from '../../../axios';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

import {object as yupObject, string as yupString} from 'yup';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginBottom: theme.spacing(3)
        }
    }
}))

const PortfolioForm = (props) => {
    const classes = useStyles();
    const toEdit = props.portfolioToEdit? true: false;

    const formik = useFormik({
        initialValues: {
            title: toEdit? props.portfolioToEdit.title: '',
            description: toEdit? props.portfolioToEdit.description: '',
            localFile: toEdit? props.portfolioToEdit.filePath: '',
            formFile: toEdit? props.portfolioToEdit.filePath: '',
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

            let prevImage = null;
            if(toEdit) {
                prevImage = props.portfolioToEdit.filePath;
            }

            if(values.formFile !== prevImage) {
                console.log("Pridedam nauja")
                formData.append('filePath', values.formFile);

            }

            if(toEdit) {
                axios.post('/update/work&id=' + props.portfolioToEdit.id, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + props.token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then(res => {
                    console.log(res);
                    if(!res.data.error) {
                        const updatedPortfolio = props.works.map(work => {
                            if(work.id === props.portfolioToEdit.id) {
                                work.title = res.data.title;
                                work.description = res.data.description;
                                work.filePath = res.data.filePath;
                            }
                            return work;
                        })

                        props.setWorks(updatedPortfolio);
                        props.handleClose();
                    }
                })
            } else {
                axios.post('/work', formData, {
                    headers: {
                        'Authorization': 'Bearer ' + props.token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then(res => {
                    if(!res.data.error) {
                        console.log("Darbas pridetas", res)
                        props.setWorks([...props.works, res.data]);
                        props.handleClose();
                    }
                })
            }
        }
    })

    let shownImagePath = null;
    if(toEdit) {
        if(props.portfolioToEdit.filePath) {
            shownImagePath = props.portfolioToEdit.filePath;
        }
    }

    return (
        <form onSubmit={formik.handleSubmit} autoComplete='off' encType='multipart/form-data'>
            <DialogContent className={classes.root} >
                <div>
                    <TextField autoFocus fullWidth label="Pavadinimas" variant='outlined' {...formik.getFieldProps('title')} />
                    {formik.touched.title && formik.errors.title ? (
                    <div className='text-danger'>{formik.errors.title}</div>
                    ) : null}
                </div>
                <div>
                    <TextField fullWidth label="Aprašymas" multiline rows={3} variant='outlined' {...formik.getFieldProps('description')} />
                    {formik.touched.description && formik.errors.description ? (
                    <div className='text-danger'>{formik.errors.description}</div>
                    ) : null}
                </div>
                <Box display="flex" alignItems="end" flexDirection="column">
                    {formik.values.localFile?
                        <img style={{width: '300px', marginBottom:'15px'}} src={formik.values.localFile === shownImagePath? `${baseURL}/storage/${shownImagePath}`: formik.values.localFile} alt="portfolio" />
                        :null}
                    
                    {formik.touched.formFile && formik.errors.formFile ? (
                        <div className='text-danger'>{formik.errors.formFile}</div>
                        ) : null}
                        
                    <Button variant='contained' component='label' color='primary'>
                        {formik.values.localFile? "Keisti nuotrauką": "Pridėti nuotrauką"}
                        <input type='file' style={{display: 'none'}} name="file" onChange={(e) => {
                            if(e.target.files[0]) {
                                formik.setFieldValue('localFile', URL.createObjectURL(e.target.files[0]));
                                formik.setFieldValue('formFile', e.currentTarget.files[0]);
                            }
                        }}/>
                    </Button>
                </Box>
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

export default PortfolioForm;