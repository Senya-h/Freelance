import React, {useState} from 'react';
import Wrapper from '../../hoc/Wrapper/Wrapper';

import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import {Formik, Form, ErrorMessage} from 'formik';
import {Link, Redirect} from 'react-router-dom';
import axios from '../../axios';
import * as Yup from 'yup';

import { useAuth } from '../../context/auth';

const useStyles = makeStyles( theme => ({
    root: {
        '& > *': {
            marginBottom: theme.spacing(3)
        },
        padding: '20px'
    }
}))

const Login = (props) => {
    const { setAuthTokens, authTokens } = useAuth();
    const referer = props.location.state? props.location.state.referer: '/'; 

    //Shows if user login failed
    const [loginError, setLoginError ] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const classes = useStyles();

    //if is logged in, redirect to previous page
    if( authTokens ) {
        return <Redirect to={referer} />
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const initialValues = {
        email: '',
        password: ''
    };
    const validationSchema = Yup.object({
            email: Yup.string().email("Neteisingas el. pašto adresas").required("Privalomas laukelis"),
            password: Yup.string().required("Privalomas laukelis")
    });

    const handleSubmit = (values, {setSubmitting}) => {            
        axios.post('/login', values)
            .then(res => {
                if(res.status === 200 && !res.data.error) {
                    setAuthTokens(res.data);     
                    props.history.push(referer);
                } else {
                    console.log("Prisijungti nepavyko");
                    setLoginError(true);
                    setSubmitting(false);
                }       
            })
            .catch(err => {
                setSubmitting(false);
                console.log(err);
            })
    };

    return (
        <Wrapper variant='container' contentOffset='130px'>
            <div style={{backgroundColor: '#eee'}}>
                <Formik
                    initialValues={initialValues} 
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                {({ handleChange, values, handleBlur, isSubmitting }) => (
                    <Form className={classes.root}>
                        <h2>Prisijungimas</h2>
                        {loginError? <Alert severity="error">Tokia paskyra neegzistuoja!</Alert>: null}
                        <FormGroup>
                            <TextField label='El. paštas' name='email' color='primary' variant='outlined' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            <ErrorMessage name='email' render={msg => <div className='text-danger'>{msg}</div>}/>
                        </FormGroup>
                        <FormGroup>
                            <TextField label='Slaptažodis' name='password' color='primary' variant='outlined' type={showPassword? 'text': 'password'} onChange={handleChange} onBlur={handleBlur} value={values.password} InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                            >{showPassword ? <Visibility />: <VisibilityOff />}</IconButton>
                                </InputAdornment>}}/>
                            <ErrorMessage name='password' render={msg => <div className='text-danger'>{msg}</div>}/>
                        </FormGroup>
                        <Button type='submit' variant='contained' disabled={isSubmitting} color='primary' >
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