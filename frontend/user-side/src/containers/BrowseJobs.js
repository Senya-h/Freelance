import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';

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

    const [freelancers, setFreelancers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('/freelancers')
            .then(res => {
                setLoading(false);

                if(!res.error && res.status === 200) {
                    console.log(res);
                    setFreelancers([...res.data]);
                }
            })
            .catch(err => {

            })
    }, [])

    return (
        <>
        {isLoading?(          
        <div style={{backgroundColor: '#fff', textAlign: 'center', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Loader 
                type="Bars"
                color="#00BFFF"
                height={200}
                width={200}
            />
        </div>):(
        <Grid container spacing={5}>
            {freelancers.map(freelancer => {
                const services = freelancer.portfolio.services.map(service => <span>{service.service}, </span>)
                const skills = freelancer.portfolio.skills.map(skill => <span>{skill.skill}, </span>)
                return (
                    <Grid key={freelancer.info.id} item md={12}>
                        <div className="d-md-flex p-4 bg-white">
                            <div className="img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')", width: '180px', height: '180px', margin: '0 0 30px 0'}}></div>
                            <div className="text pl-md-4">
                                <span className="location mb-0">{freelancer.info.location}</span>
                                <h2 className={classes.name}>{freelancer.info.name}</h2>
                                
                                <h4 className="mb-2">{services}</h4>
                                <h5 className="mb-2">{skills}</h5>
                                <span className="seen">Last Activity 4 months ago</span>
                                <Button><Link to={`/profile/${freelancer.info.id}`} className="btn btn-primary">PROFILIS</Link></Button>
                            </div>
                        </div>
                    </Grid>
                )
            })}
        </Grid>)}
        </>
    )
}

export default BrowseJobs