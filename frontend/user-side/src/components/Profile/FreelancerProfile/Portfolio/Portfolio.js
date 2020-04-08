import React from 'react';
import classes from './Portfolio.module.css';

const Portfolio = (props) => {
    return (
        <div className={classes.Portfolio + " col-lg-4 col-md-6 col-12"}>
            <a href="github.com">
                <div className={classes.PortfolioImage}></div>
                <div className={classes.PortfolioTitle}>
                    <p>{props.title}</p>
                </div>
            </a>
        </div>
    )
}

export default Portfolio;