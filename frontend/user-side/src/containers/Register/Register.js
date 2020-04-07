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


const Register = (props) => {

    // // const { authTokens } = useAuth();
    // // const referer = props.location.state === null? '/': props.location.state.referer;

    // //if is logged in
    // if( authTokens ) {
    //     return <Redirect to={referer} />
    // }
    
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
        })
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

    return (
        <Wrapper>
            <div className='container position-relative' style={{paddingTop: '130px'}}>
                <Formik 
                    initialValues={initialValues} 
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    >
                {({ handleChange, values, setFieldValue, handleBlur }) => (
                    <Form style={{backgroundColor: '#eee'}}>
                        <h2>Registracija</h2>
                        <FormGroup> 
                            <TextField label='Prisijungimo vardas' name='name' color='primary' onChange={handleChange} onBlur={handleBlur} value={values.name} />
                            <ErrorMessage name='name' />
                        </FormGroup>
                        <FormGroup>
                            <TextField label='El. paštas' name='email' color='primary' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            <ErrorMessage name='email' />
                        </FormGroup>
                        <FormGroup>
                            <TextField label='Slaptažodis' name='password' color='primary' type='password' onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                            <ErrorMessage name='password' />
                        </FormGroup>
                        <FormGroup>
                            <TextField label='Slaptažodžio patvirtinimas' name='passwordConfirm' color='primary' type='password' onChange={handleChange} onBlur={handleBlur} value={values.passwordConfirm} />
                            <ErrorMessage name='passwordConfirm' />
                        </FormGroup>
                        <FormGroup>
                            <CountrySelect change={(e, value) => {
                                console.log(value);
                                setFieldValue(
                                "location",
                                value !== null ? value.label : initialValues.location
                                );
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Tipas</FormLabel>
                                <RadioGroup aria-label="gender" name="role" value={values.role} onChange={handleChange}>
                                    <FormControlLabel value="1" control={<Radio />} label="Klientas" />
                                    <FormControlLabel value="2" control={<Radio />} label="Freelanceris" />
                                </RadioGroup>
                            </FormControl>
                        </FormGroup>
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

