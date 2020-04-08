import React from 'react';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import CountrySelect from './CountrySelect/CountrySelect';
import { useAuth } from '../../context/auth';

import {Link, Redirect} from 'react-router-dom';

import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {Formik, Form, ErrorMessage} from 'formik';

import axios from '../../axios';
import * as Yup from 'yup';

import { makeStyles, styled } from '@material-ui/core/styles';


const Register = (props) => {

    const { authTokens } = useAuth();
    const referer = props.location.state? props.location.state.referer: '/'; 

    //if is logged in, redirect to previous page
    if( authTokens ) {
        return <Redirect to={referer} />
    }
    
    const initialValues = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        role: '',
        location: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().max(15, "Must be 15 characters or less").required('Privalomas laukelis'),
        email: Yup.string().email("Neteisingas el. pašto adresas").required("Privalomas laukelis"),
        password: Yup.string().min(8, "Slaptažodis privalo būti bent 8 simbolių ilgumo").required("Privalomas laukelis"),
        passwordConfirm: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Slaptažodžiai turi sutapti"
            )
        }).required("Privalomas laukelis"),
        location: Yup.string().required("Privalomas laukelis"),
        role: Yup.string().required("Privalomas laukelis")
    });

    const handleSubmit = values => {   
        axios.post('register', values)
            .then(res => {
                if(res.status === 200) {
                    props.history.push('/login');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const FormGroupStyled = styled(FormGroup)(theme => ({
        marginBottom: '20px',
    }));

    const ErrorMessageStyled = styled(ErrorMessage)(() => ({
        color: 'red'
    }))

    return (
        <Wrapper variant='container' contentOffset='130px'>
            <div style={{backgroundColor: '#eee'}}>
                <Formik 
                    initialValues={initialValues} 
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    >
                {({ handleChange, values, setFieldValue, handleBlur }) => (
                    <Form style={{padding: '20px'}}>
                        <h2>Registracija</h2>
                        <FormGroupStyled>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Tipas</FormLabel>
                                <RadioGroup row aria-label="gender" name="role" value={values.role} onChange={handleChange}>
                                    <FormControlLabel value="1" control={<Radio />} label="Klientas" />
                                    <FormControlLabel value="2" control={<Radio />} label="Freelanceris" />
                                </RadioGroup>
                            </FormControl>
                            <ErrorMessageStyled name='role' render={msg => <div className='text-danger'>{msg}</div>} />
                        </FormGroupStyled>
                        <FormGroupStyled> 
                            <TextField variant='outlined' label='Prisijungimo vardas' name='name' color='primary' onChange={handleChange} onBlur={handleBlur} value={values.name} />
                            <ErrorMessageStyled name='name' render={msg => <div className='text-danger'>{msg}</div>} />
                        </FormGroupStyled>
                        <FormGroupStyled>
                            <TextField variant='outlined' label='El. paštas' name='email' color='primary' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            <ErrorMessageStyled name='email' render={msg => <div className='text-danger'>{msg}</div>} />
                        </FormGroupStyled>
                        <FormGroupStyled>
                            <TextField variant='outlined' label='Slaptažodis' name='password' color='primary' type='password' onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                            <ErrorMessageStyled name='password' render={msg => <div className='text-danger'>{msg}</div>} />
                        </FormGroupStyled>
                        <FormGroupStyled>
                            <TextField variant='outlined' label='Slaptažodžio patvirtinimas' name='passwordConfirm' color='primary' type='password' onChange={handleChange} onBlur={handleBlur} value={values.passwordConfirm} />
                            <ErrorMessageStyled name='passwordConfirm' render={msg => <div className='text-danger'>{msg}</div>} />
                        </FormGroupStyled>
                        <FormGroupStyled>
                            <CountrySelect change={(e, value) => {
                                setFieldValue(
                                "location",
                                value !== null ? value.label : initialValues.location
                                );
                            }}/>
                            <ErrorMessageStyled name='location' render={msg => <div className='text-danger'>{msg}</div>} />
                        </FormGroupStyled>
                        <Button type='submit' variant='contained' color='primary' >
                            Registruotis
                        </Button>
                    </Form>
                )}
                </Formik>
                <Link to='/login'>Jau turi paskyrą? Prisijunk</Link>
            </div>
        </Wrapper>
    )
};

export default Register;

