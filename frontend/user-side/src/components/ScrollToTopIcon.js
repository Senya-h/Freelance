import React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import {animateScroll as scroll} from 'react-scroll';

const useStyles = makeStyles(theme => ({
    iconButton: {
        position: 'fixed',
        right: '40px',
        bottom: '40px',
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: '#220080',
        }
    }
}))
const ScrollToTopIcon = () => {
    const classes = useStyles();

    const scrollToTop = () => {
        scroll.scrollToTop({
            smooth: true,
        });
    }

    return (
        <IconButton onClick={scrollToTop} variant='contained' className={classes.iconButton}>
            <ExpandLessIcon />
        </IconButton>
    )
};

export default ScrollToTopIcon;