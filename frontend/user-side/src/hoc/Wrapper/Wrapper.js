import React from 'react';
import bgImg from '../../assets/images/bg_1.jpg';
import classes from './Wrapper.module.scss';
import cx from 'classnames';

const Wrapper = (props) => {
    const heroStyle = {
        backgroundImage: `url(${bgImg})`,
    };

    return (
        <div className={cx(classes["hero-wrap"], "img")} style={heroStyle}>
            <div className={classes.overlay}></div>
            <div className='position-absolute h-100' style={{height: '800px'}}>
                {props.children}
            </div>
        </div>
    )
};

Wrapper.defaultProps = {
    contentOffset: '120px',
    variant: 'container'
}

export default Wrapper;