import React from 'react';
import bgImg from '../assets/images/bg_1.jpg';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    heroImage: {
        backgroundImage: `url(${bgImg})`,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: props => props.height,
        width: '100%',
        position: 'absolute'
    },
    overlay: {
        height: props => props.height,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        content: '',
        opacity: .8,
        background: 'linear-gradient(to right, #207dff 0%, #a16ae8 100%)',
        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#207dff', endColorstr='#a16ae8', GradientType=1 )",
    },
    children: {
        position: 'relative',
        marginTop: '0px',
        height: '100vh',
        minHeight: '800px',
        [theme.breakpoints.up('md')]: {
            marginTop: '85px'
        }
    }
}))

const HeroWrap = (props) => {
    const classes = useStyles(props);
    return (
        <div className={`${classes.heroImage} img`}>
            <div className={classes.overlay}></div>
            <div className={classes.children}>
                {props.children}
            </div>
        </div>
    )
};


export default HeroWrap;