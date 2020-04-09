import React, {useState} from 'react';

import Wrapper from '../../hoc/Wrapper/Wrapper';

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
        backgroundColor: '#eee'
    }
}))

const RemindPassword = () => {
    const classes = useStyles();

    const [emailSent, setEmailSent] = useState(false);
    const initialValues = {
        email: ''
    };

    const validationSchema = yupObject({
        email: yupString().email("Neteisingas el. pašto adresas").required("Privalomas laukelis")
    });

    const handleSubmit = (values, {setSubmitting}) => {
        setEmailSent(true)
        axios.post("/password/")
            .then(res => {
                if(res === 200) {
                    setEmailSent(true)
                } else {
                    setSubmitting(false)
                }
            })
            .catch(err => {
                setSubmitting(false)
            })
    }

    return (
        <Wrapper variant='container' contentOffset='130px'>
            <div className={classes.root}>
                <h2>Slaptažodžio priminimas</h2>
                <p>Įveskite savo paskyros el. paštą, į kurį bus išsiųstas jūsų slaptažodis</p>
                {emailSent? <Alert severity="success">Slaptažodis sėkmingai išsiųstas!</Alert>: null}
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
        </Wrapper>
    )
};

export default RemindPassword;