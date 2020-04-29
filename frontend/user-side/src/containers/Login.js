import React, {useState} from 'react';

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
import axios from '../axios';
import * as Yup from 'yup';

import { useAuth } from '../context/auth';

const useStyles = makeStyles( theme => ({
    root: {
        '& > *, & > form > *': {
            marginBottom: theme.spacing(3)
        },
        padding: '20px',
        backgroundColor: '#eee',
        width: '100%',
        margin: '0 auto',
        [theme.breakpoints.up('md')]: {
            width: '700px'
        }
    }
}))

const Login = (props) => {
    const { setAuthData, authData } = useAuth();

    let referer = '/';
    let alertMessage = null;

    if(props.location.state) {
        if(props.location.state.referer) {
            referer = props.location.state.referer
        }
        if(props.location.state.registrationSuccesful) {
            alertMessage = <Alert severity="success">Paskyra sėkmingai sukurta!</Alert>;
        }
    }
    
    const [showPassword, setShowPassword] = useState(false);

    const classes = useStyles();

    //if is logged in, redirect to previous page
    if( authData ) {
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
                console.log(res);
                
                if(res.status === 200 && !res.data.error) {
                    setAuthData(res.data);     
                    props.history.push({referer});
                } else if(res.data.error) {
                    if(res.data.error.banned) {
                        alertMessage = <Alert severity="error">Ši paskyra užblokuota!</Alert>;
                    } else if(res.data.error.invalidCredentials) {
                        alertMessage = <Alert severity="error">Neteisingi prisijungimo duomenys!</Alert>;
                    }
                } else {
                    alertMessage = <Alert severity="error">Nežinoma klaida! Bandykite vėliau dar kartą arba susisiekite su administratoriumi</Alert>;
                } 
                setSubmitting(false);

            })
            .catch(err => {
                setSubmitting(false);
                alertMessage = <Alert severity="error">Nežinoma klaida! Bandykite vėliau dar kartą arba susisiekite su administratoriumi</Alert>;
            })
    };

    return (
        <div className={classes.root}>
            <h2>Prisijungimas</h2>
            <Formik
                initialValues={initialValues} 
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
            {({ handleChange, values, handleBlur, isSubmitting }) => (
                <Form>
                    {alertMessage}
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
                        <Link to='/password-reminder'>Pamiršai slaptažodį?</Link>
                    </FormGroup>
                    <Button type='submit' variant='contained' disabled={isSubmitting} color='primary' >
                        Prisijungti
                    </Button>
                </Form>
            )}
            </Formik>
            <Link to='/register'>Neturi paskyros? Registruokis</Link>
            
        </div>
    )
};

export default Login;