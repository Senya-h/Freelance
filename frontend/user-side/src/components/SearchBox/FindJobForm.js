import React, {useState} from 'react';
import Autocomplete from '../../Autocomplete';
import cities from '../../cities';
import {withRouter} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {useFormik} from 'formik';

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
    const [inputSkill, setInputSkill] = useState('');
    const [inputCity, setInputCity] = useState('');
    const formik = useFormik({
        initialValues: {
            title: '',
            skill: '',
            city: ''
        },
        onSubmit: values => {
            props.history.push({
                pathname: '/jobs',
                search: `?title=${values.title}&skill=${values.skill}&city=${values.city}`
            });
        }
    });



    return (
        <div role="tabpanel">
            <form autoComplete='new-password' onSubmit={formik.handleSubmit} className="search-job">
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <TextField autoComplete="off" style={{width: '100%'}} label="Darbo pavadinimas" variant='outlined'  {...formik.getFieldProps('title')}/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Autocomplete
                            width="100%"
                            options={props.skillNames}
                            value={formik.values.skill}
                            inputValue={inputSkill}
                            name="skill"
                            label="Gebėjimas"
                            onInputchange={(e, value) => {
                                setInputSkill(value !== null? value: '');
                            }}
                            onChange={(e, value) => {
                                formik.setFieldValue('skill', value);
                                if(!value) {
                                    setInputSkill('');
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Autocomplete 
                            width="100%"
                            options={cities}
                            value={formik.values.city}
                            inputValue={inputCity}
                            name="city"
                            label="Miestas"
                            onInputchange={(e, value) => {
                                setInputCity(value !== null? value: '');
                            }}
                            onChange={(e, value) => {
                                formik.setFieldValue('city', value);
                                if(!value) {
                                    setInputCity('');
                                }
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