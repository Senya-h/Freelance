import React from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.primary.darkGrey,
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
            paddingTop: theme.spacing(10),
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10),
            paddingBottom: theme.spacing(10)
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
    return (
        <footer className={classes.footer}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                    <Box display="flex" flexDirection="column">
                        <Box mb={1}>
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
                                required
                            />
                        </Box>
                        <Button type='submit' color='secondary' variant='outlined' >
                            Siųsti žinutę
                        </Button>
                    </Box>
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
                        Komandos nariai: Simonas Raugevičius, Saulius Rekašius, Deividas Kozlovas, Ramūnas Petrokas, Karolis Vasiliauskas.
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    )
};

export default Footer;