import React from 'react';
import classes from './Portfolio.module.css';

const Portfolio = (props) => {
    return (
        <div className={classes.Portfolio}>
            <a href="github.com">
                <img style={{width: '100%'}} src={"http://localhost/storage/" + props.imageUrl} alt={props.title}/>
                <div className={classes.PortfolioTitle}>
                    <p>{props.title}</p>
                </div>
            </a>
        </div>
    )
}

export default Portfolio;