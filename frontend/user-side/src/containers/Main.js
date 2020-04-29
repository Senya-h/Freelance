import React from 'react';
import SearchBox from '../components/SearchBox/SearchBox';
import {makeStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    sliderText: {
        height: '800px',
        zIndex: 0,
        overflow: 'hidden',
        textAlign: 'center',
        '& text': {
            position: 'relative',
            zIndex: 1
        },
        '& h1': {
            fontSize: '40px',
            color: '#fff',
            lineHeight: '1.2',
            fontWeight: '400',
            '& > span': {
                fontWeight: '700'
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: '40px'
            },
            [theme.breakpoints.up('md')]: {
                fontSize: '54px'
            }
        },
        '& p': {
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: '400'
        }
    }
    
}))

const Main = () => {
    const classes = useStyles();

    return (
        <div className="container">
            <div className={`row d-md-flex no-gutters justify-content-center ${classes.sliderText}`} >
                <div className="col-md-10"> {/*ftco-animate*/}
                    <div className={`text text-center pt-5 mt-md-5`}>
                        <p className="mb-4">Čia rasi darbo, įdarbinimo ir karjeros galimybių</p>
                        <Typography variant='h1' className="mb-5">Lengviausias būdas rasti naują darbą</Typography>
                        <SearchBox />
                    </div>
                </div>
            </div>        
        </div>
    )
};

export default Main;