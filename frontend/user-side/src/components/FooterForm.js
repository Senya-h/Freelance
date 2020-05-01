import React from 'react';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

import {useFormik} from 'formik';
import axios from '../axios';
import {string as yupString, object as yupObject} from 'yup';

const useStyles = makeStyles(theme => ({
    whiteBg: {
        backgroundColor: theme.palette.common.white
    },
}))

const FooterForm = (props) => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
            message: ''
        },
        validationSchema: yupObject({
            email: yupString().email("Neteisingas el. pašto adresas").required("Privalomas laukelis")
        }),
        onSubmit: values => {
            axios.get(`/send-mail?from=${values.email}&body=${values.message}`)
                .then(res => {
                    console.log(res, values);
                    if(!res.data.error && res.status === 200) {
                        props.setAlert("success", "Žinutė išsiųsta!");
                        formik.resetForm();
                    } else {
                        props.setAlert("error", "Žinutės išsiųsti nepavyko!");
                    }
                })
                .catch(err => {
                    props.setAlert("error", "Žinutės išsiųsti nepavyko!");
                })
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Box display="flex" flexDirection="column">
                <Box mb={1}>
                    <Box mb={1}>
                        <TextField
                            variant="outlined"
                            placeholder="El. paštas"
                            inputProps={{ "aria-label": "Susisiekite su mumis" }}
                            InputProps={{
                                className: classes.whiteBg
                            }}
                            fullWidth
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? (
                            <div className='text-danger'>{formik.errors.email}</div>
                            ) : null
                        }
                    </Box>

                    <TextField
                        variant="outlined"
                        multiline
                        placeholder="Susisiekite su mumis"
                        inputProps={{ "aria-label": "Susisiekite su mumis" }}
                        InputProps={{
                            className: classes.whiteBg
                        }}
                        rows={4}
                        fullWidth
                        {...formik.getFieldProps('message')}
                    />
                </Box>
                <Button type='submit' color='secondary' variant='outlined' >
                    Siųsti žinutę
                </Button>
            </Box>
        </form>
    )
};

export default FooterForm;