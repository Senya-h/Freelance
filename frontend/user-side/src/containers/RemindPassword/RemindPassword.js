import React, {useState} from 'react';

import {Formik, Form, ErrorMessage} from 'formik';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Alert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

import {string as yupString, object as yupObject} from 'yup';
import axios from '../../axios';

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

const RemindPassword = () => {
    const classes = useStyles();

    const [emailSent, setEmailSent] = useState(false);
    const [requestError, setRequestError] = useState(false);
    const initialValues = {
        email: ''
    };

    const validationSchema = yupObject({
        email: yupString().email("Neteisingas el. pašto adresas").required("Privalomas laukelis")
    });

    const handleSubmit = (values, {setSubmitting}) => {
        axios.post("/password/email", values)
            .then(res => {
                console.log(res);
                if(res.status === 200) {
                    setEmailSent(true);
                    setRequestError(false);
                } else {
                    setRequestError(true);
                    setSubmitting(false);
                }
            })
            .catch(err => {
                setRequestError(true);
                setSubmitting(false);
            })
    }

    return (
        <div className={classes.root}>
            <h2>Slaptažodžio priminimas</h2>
            <p>Įveskite savo paskyros el. paštą, į kurį bus išsiųsta instrukcija slaptažodžio pakeitimui</p>
            {emailSent? <Alert severity="success">Instrukcija sėkmingai išsiųsta!</Alert>: null}
            {requestError? <Alert severity="error">Įvyko klaida! Patikrinkite, ar teisingai suvedėte savo el. pašto adresą</Alert>: null}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
            { ( {handleChange, values, handleBlur, isSubmitting}) => (
                <Form >
                    <FormGroup>
                        <TextField name='email' label='El. paštas' color='primary' variant='outlined' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                        <ErrorMessage name='email' render={msg => <div className="text-danger">{msg}</div>} />
                    </FormGroup>
                    <Button type='submit' variant='contained' disabled={isSubmitting} color='primary'>
                        Patvirtinti
                    </Button>
                </Form>
            )}    
            </Formik>
        </div>
    )
};

export default RemindPassword;