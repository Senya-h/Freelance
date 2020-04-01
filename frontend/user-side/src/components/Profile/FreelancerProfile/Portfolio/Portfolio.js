import React from 'react';
import classes from './Portfolio.module.css';

const Portfolio = (props) => {
    return (
        <div className={classes.Portfolio + " col-lg-4 col-md-6 col-12"}>
            <a href="#">
                <div className={classes.PortfolioImage}></div>
                {/* <img className={classes.PortfolioImage} src="https://giantbomb1.cbsistatic.com/uploads/scale_small/7/74829/1389239-180754_untitled_1.png" alt="Katuko mylimiausias" /> */}
                <div className={classes.PortfolioTitle}>
                    <p>{props.title}</p>
                </div>
            </a>
        </div>
    )
}

export default Portfolio;