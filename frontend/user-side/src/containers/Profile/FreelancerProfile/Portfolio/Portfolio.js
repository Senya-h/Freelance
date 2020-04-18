import React from 'react';
import classes from './Portfolio.module.css';

const Portfolio = (props) => {
    return (
        <div className={classes.Portfolio + " col-lg-4 col-md-6 col-12"}>
            <a href="github.com">
                <img style={{width: '350px'}} src={"http://localhost/storage/" + props.imageUrl} alt={props.title}/>
                <div className={classes.PortfolioTitle}>
                    <p>{props.title}</p>
                </div>
            </a>
        </div>
    )
}

export default Portfolio;