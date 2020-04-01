import React from 'react';
import Counters from './Counters/Counters';
import SearchBox from './SearchBox/SearchBox';
import classes from './Header.module.scss';
import cx from 'classnames';

const Header = () => {

    return (
        <>
            <div className={cx("row d-md-flex no-gutters align-items-center justify-content-center", classes["slider-text"])} >
                <div className="col-md-10 d-flex align-items-center"> {/*ftco-animate*/}
                    <div className={cx(classes.text, "text-center pt-5 mt-md-5")}>
                        <p className="mb-4">Find Job, Employment, and Career Opportunities</p>
                        <h1 className="mb-5">The Easiest Way to Get Your New Job</h1>
                        <Counters />
                        <SearchBox />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Header;