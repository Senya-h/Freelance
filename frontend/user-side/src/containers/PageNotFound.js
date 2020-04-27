import React from 'react';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        height: '600px',
        marginTop: '150px',

    },
    pageNotFound: {
        backgroundColor: '#fff',
        width: '90%',
        textAlign: 'center',
        borderRadius: '5px',
        [theme.breakpoints.up('md')]: {
            width: '750px',
        }
    }
}))

const PageNotFound = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.pageNotFound}>
                <h1>404 - Puslapis nerastas!</h1>
            </div>
        </div>
    )
}

export default PageNotFound;