import React from 'react';
import Wrapper from '../../hoc/Wrapper/Wrapper';

import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {styled} from '@material-ui/core/styles';

import {Formik, Form, ErrorMessage} from 'formik';
import {Link, Redirect} from 'react-router-dom';
import axios from '../../axios';
import * as Yup from 'yup';

import { useAuth } from '../../context/auth';

const Login = (props) => {
    const { setAuthTokens, authTokens } = useAuth();
    console.log("PROPSAI", props);
    const referer = props.location.state? props.location.state.referer: '/'; 

    //if is logged in, redirect to previous page
    if( authTokens ) {
        return <Redirect to={referer} />
    }
    
    const initialValues = {
        email: '',
        password: ''
    };
    const validationSchema = Yup.object({
            email: Yup.string().email("Neteisingas el. pašto adresas").required("Privalomas laukelis"),
            password: Yup.string().required("Privalomas laukelis")
    });

    const handleSubmit = values => {            
        axios.post('/login', values)
            .then(res => {
                setAuthTokens(res.data);     
                props.history.push(referer);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const FormGroupStyled = styled(FormGroup)(theme => ({
        marginBottom: '20px',
    }));


    return (
        <Wrapper variant='container' contentOffset='130px'>
            <div style={{backgroundColor: '#eee'}}>
                <Formik
                    initialValues={initialValues} 
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                {({ handleChange, values, handleBlur }) => (
                    <Form style={{padding: '20px'}}>
                        <h2>Prisijungimas</h2>
                        <FormGroupStyled>
                            <TextField label='El. paštas' name='email' color='primary' variant='outlined' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            <ErrorMessage name='email' />
                        </FormGroupStyled>
                        <FormGroupStyled>
                            <TextField label='Slaptažodis' name='password' color='primary' variant='outlined' type='password' onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                            <ErrorMessage name='password' />
                        </FormGroupStyled>
                        <Button type='submit' variant='contained' color='primary' >
                            Prisijungti
                        </Button>
                    </Form>
                )}
                </Formik>
                <Link to ='/register'>Neturi paskyros? Registruokis</Link>
            </div>
        </Wrapper>
    )
};

export default Login;