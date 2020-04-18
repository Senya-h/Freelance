import React from 'react';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from './PageNotFound.module.scss';

const PageNotFound = () => {
    return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className={classes['page-not-found']}>
                <h1>404 - Page Not Found!</h1>
            </div>
        </div>
    )
}

export default PageNotFound;