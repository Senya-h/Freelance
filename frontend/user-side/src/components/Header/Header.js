import React from 'react';
import SearchBox from './SearchBox/SearchBox';
import classes from './Header.module.scss';
import cx from 'classnames';

import Typography from '@material-ui/core/Typography';

const Header = () => {

    return (
        <div className={cx("row d-md-flex no-gutters justify-content-center", classes["slider-text"])} >
            <div className="col-md-10"> {/*ftco-animate*/}
                <div className={cx(classes.text, "text-center pt-5 mt-md-5")}>
                    <p className="mb-4">Čia rasi darbo, įdarbinimo ir karjeros galimybių</p>
                    <Typography variant='h1' className="mb-5">Lengviausias būdas rasti naują darbą</Typography>
                    <SearchBox />
                </div>
            </div>
        </div>
    )
};

export default Header;