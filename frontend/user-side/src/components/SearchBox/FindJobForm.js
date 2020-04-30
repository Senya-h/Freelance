import React from 'react';
import Autocomplete from '../../Autocomplete';
import cities from '../../cities';
import {withRouter} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {useFormik} from 'formik';

import axios from '../../axios';

const useStyles = makeStyles(theme => ({
    submitBtn: {
        width: '100%',
        height: '100%',
        textTransform: 'capitalize',
        fontSize: '16px'
    }
}))

const FindJobForm = (props) => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            jobTitle: '',
            skill: '',
            city: ''
        },
        onSubmit: values => {
            console.log("SUBMIT", values);
            axios.get('/search', {service: values.service, skill: values.skill})
                .then(res => {
                    console.log(res);
                    props.history.push({
                        pathname: '/jobs',
                        search: `?job_title=${values.jobTitle}&skill=${values.skill}&city=${values.city}`
                    });
                })
        }
    });



    return (
        <div role="tabpanel">
            <form autoComplete='new-password' onSubmit={formik.handleSubmit} className="search-job">
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <TextField autoComplete="off" style={{width: '100%'}} label="Darbo pavadinimas" variant='outlined'  {...formik.getFieldProps('jobTitle')}/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Autocomplete
                            width="100%"
                            options={props.skillNames}
                            name="skill"
                            label="Gebėjimas"
                            change={(e, value) => {
                                formik.setFieldValue('skill', value !== null? value: '')
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Autocomplete 
                            width="100%"
                            options={cities}
                            name="city"
                            label="Miestas"
                            change={(e, value) => {
                                formik.setFieldValue('city', value !== null? value: '')
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Button className={classes.submitBtn} color='primary' type='submit' variant='contained'>Ieškoti</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
};

export default withRouter(FindJobForm);