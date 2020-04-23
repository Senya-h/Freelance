import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from '../axios';

const useStyles = makeStyles(theme => ({
    name: {
        color: '#000',
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: 0
    }
}))

const BrowseJobs = () => {
    const classes = useStyles();

    const [freelancers, setFreelancers] = useState([1,2,3,4,5]);

    

    return (
        <Grid container spacing={5}>
            {freelancers.map((freelancer, index) => {
                return (
                    <Grid key={index} item md={12}>
                        <div className="d-md-flex p-4 bg-white">
                            <div className="img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')", width: '180px', height: '180px', margin: '0 0 30px 0'}}></div>
                            <div className="text pl-md-4">
                                <span className="location mb-0">MIESTAS</span>
                                <h2 className={classes.name}>VARDAS</h2>
                                <h3 className="mb-2">PASLAUGA PASLAUGA PASLAUGA</h3>
                                <h3 className="mb-2">SKILLAS SKILLAS SKILLAs</h3>
                                <span className="seen">Last Activity 4 months ago</span>
                                <Button><Link to={`/profile/${index}`} className="btn btn-primary">PROFILIS</Link></Button>
                            </div>
                        </div>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default BrowseJobs