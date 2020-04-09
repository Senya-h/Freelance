import React, {useState} from 'react';

import Wrapper from '../../hoc/Wrapper/Wrapper';

import {Formik, Form, ErrorMessage} from 'formik';

import {Link} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Alert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {string as yupString, object as yupObject, ref as yupRef} from 'yup';
import axios from '../../axios';

const useStyles = makeStyles( theme => ({
    root: {
        '& > *, & > form > *': {
            marginBottom: theme.spacing(3)
        },
        padding: '20px',
        backgroundColor: '#eee'
    }
}))

const RemindPassword = (props) => {
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [requestError, setRequestError] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const initialValues = {
        email: '',
        password: '',
        passwordConfirm: ''
    };

    const validationSchema = yupObject({
        email: yupString().email("Neteisingas el. pašto adresas").required("Privalomas laukelis"),
        password: yupString().min(8, "Slaptažodis privalo būti bent 8 simbolių ilgumo").required("Privalomas laukelis"),
        passwordConfirm: yupString().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: yupString().oneOf(
            [yupRef("password")],
            "Slaptažodžiai turi sutapti"
            )
        }).required("Privalomas laukelis"),
    });

    const handleSubmit = (values, {setSubmitting}) => {
        const token = (new URLSearchParams(props.location.search)).get('token');
        const params = {token, ...values, password_confirmation: values.passwordConfirm};
        console.log("Submitting");
        axios.post("/password/reset", params)
            .then(res => {
                
                if(res.status === 200) {
                    setPasswordChanged(true)
                    setRequestError(false);
                } else {
                    setRequestError(true);
                    setSubmitting(false)
                }
            })
            .catch(err => {
                console.log(err);
                setRequestError(true);
                setSubmitting(false)
            })
    }
    return (
        <Wrapper variant='container' contentOffset='130px'>
            <div className={classes.root}>
                <h2>Slaptažodžio pakeitimas</h2>
                {passwordChanged? <Alert severity="success">Slaptažodis sėkmingai pakeistas! <Link to='/login'>Grįžti į prisijungimo puslapį</Link></Alert>: null}
                {requestError? <Alert severity="error">Įvyko klaida! Patikrinkite, ar teisingai suvedėte savo el. pašto adresą</Alert>: null}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                { ( {handleChange, values, handleBlur, isSubmitting}) => (
                    <Form >
                        <FormGroup>
                            <TextField label='Pakartokite savo el. pašto adresą' name='email' color='primary' variant='outlined' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            <ErrorMessage name='email' render={msg => <div className='text-danger'>{msg}</div>}/>
                        </FormGroup>
                        <FormGroup>
                            <TextField variant='outlined' label='Naujas slaptažodis' name='password' color='primary' type={showPassword? 'text': 'password'} onChange={handleChange} onBlur={handleBlur} value={values.password} InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}                   
                                    edge="end"
                            >{showPassword ? <Visibility />: <VisibilityOff />}</IconButton>
                                </InputAdornment>}}/>
                            <ErrorMessage name='password' render={msg => <div className='text-danger'>{msg}</div>} />
                        </FormGroup>
                        <FormGroup>
                            <TextField variant='outlined' label='Pakartokite slaptažodį' name='passwordConfirm' color='primary' type={showPassword? 'text': 'password'} onChange={handleChange} onBlur={handleBlur} value={values.passwordConfirm} InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}           
                                    edge="end"
                            >{showPassword ? <Visibility />: <VisibilityOff />}</IconButton>
                                </InputAdornment>}}/>
                            <ErrorMessage name='passwordConfirm' render={msg => <div className='text-danger'>{msg}</div>} />
                        </FormGroup>

                        <Button type='submit' variant='contained' disabled={isSubmitting} color='primary'>
                            Patvirtinti
                        </Button>
                    </Form>
                )}    
                </Formik>
            </div>
        </Wrapper>
    )
};

export default RemindPassword;