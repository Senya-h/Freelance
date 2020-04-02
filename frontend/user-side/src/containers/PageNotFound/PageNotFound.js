import React from 'react';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from './PageNotFound.module.scss';

const PageNotFound = () => {
    return (
        <Wrapper>
            <div className="container-fluid h-100 position-relative d-flex align-items-center justify-content-center">
                <div className={classes['page-not-found']}>
                    <h1>404 - Page Not Found!</h1>
                </div>
            </div>
        </Wrapper>
    )
}

export default PageNotFound;