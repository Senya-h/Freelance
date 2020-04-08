import React from 'react';
import bgImg from '../../assets/images/bg_1.jpg';
import classes from './Wrapper.module.scss';
import cx from 'classnames';

const Wrapper = (props) => {
    const heroStyle = {
        backgroundImage: `url(${bgImg})`,
    };

    return (
        <>
            <div className={cx(classes["hero-wrap"], "img")} style={heroStyle}>
                <div className={classes.overlay}></div>
                <div className={cx('position-relative','h-100', props.variant)}>
                    <div style={{paddingTop: props.contentOffset, height: '100%'}}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
};

Wrapper.defaultProps = {
    contentOffset: 0,
    variant: 'container'
}

export default Wrapper;