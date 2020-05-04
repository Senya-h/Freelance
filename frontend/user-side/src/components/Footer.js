import React, {useState} from 'react';
import FooterForm from './FooterForm';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert';


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
    emailIcon: {
        backgroundColor: "#33383b !important",
        color: `${theme.palette.common.white} !important`
    },
    alert: {
        marginTop: theme.spacing(1)
    }
}))



const Footer = () => {
    const classes = useStyles();
    const [alertMessage, setAlertMessage] = useState(null);

    const setAlert = (severity, message) => {
        setAlertMessage(<Alert className={classes.alert} severity={severity}>{message}</Alert>);
    }
    
    return (
        <footer className={classes.footer}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                    <FooterForm setAlert={setAlert} />
                    {alertMessage}
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