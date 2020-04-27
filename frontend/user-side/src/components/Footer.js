import React from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert';

import {useFormik} from 'formik';
import axios from '../axios';
import {string as yupString, object as yupObject} from 'yup';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.primary.darkGrey,
        marginTop: 'auto',
        paddingTop: theme.spacing(8),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(6),
        [theme.breakpoints.up("sm")]: {
            paddingTop: theme.spacing(10),
            paddingLeft: theme.spacing(16),
            paddingRight: theme.spacing(16),
            paddingBottom: theme.spacing(10)
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(6),
        }
    },
    whiteBg: {
        backgroundColor: theme.palette.common.white
    },
    emailIcon: {
        backgroundColor: "#33383b !important",
        color: `${theme.palette.common.white} !important`
    }
}))



const Footer = () => {
    const classes = useStyles();
    let alertMessage = null;
    const formik = useFormik({
        initialValues: {
            email: '',
            message: ''
        },
        validationSchema: yupObject({
            email: yupString().email("Neteisingas el. pašto adresas").required("Privalomas laukelis")
        }),
        onSubmit: values => {
            axios.post('/', values)
                .then(res => {
                    if(!res.data.error && res.status === 200) {
                        alertMessage = <Alert severity="success">Žinutė išsiųsta!</Alert>;
                    } else {
                        alertMessage = <Alert severity="error">Žinutės išsiųsti nepavyko!</Alert>;
                    }
                })
                .catch(err => {
                    alertMessage = <Alert severity="error">Žinutės išsiųsti nepavyko!</Alert>;
                })
        }
    })
    return (
        <footer className={classes.footer}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
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
                            {console.log(alertMessage)}
                            {alertMessage}
                        </Box>
                    </form>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems='center'
                        height="100%"
                    >
                        <Box mr={2}>
                            <IconButton disabled className={classes.emailIcon}>
                                <MailIcon/>
                            </IconButton>
                        </Box>   
                        <Box 
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Typography variant="h6" className="text-white">
                                info@freelance.lt
                            </Typography>
                            
                        </Box>          
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" paragraph className="text-white">
                        Apie projektą
                    </Typography>
                    <Typography style={{ color: "#8f9296" }} paragraph>
                        Šį projektinį darbą atliko KITM ŽP 19/1 komanda.
                        Komandos nariai: Simonas Raugevičius, Saulius Rekašius, Deividas Kozlovas, Ramūnas Petrokas.
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    )
};

export default Footer;