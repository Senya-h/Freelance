import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import Loader from 'react-loader-spinner';

import axios, {baseURL} from '../axios';
import SendMessage from './Profile/FreelancerProfile/SendMessage/SendMessage';

import {makeStyles} from '@material-ui/core';


import Grid from '@material-ui/core/Grid';
import { useAuth } from '../context/auth';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '30px',
        backgroundColor: '#eee',     
    },
}));

const Job = (props) => {
    //Get logged in user information
    const { authData } = useAuth();
    const classes = useStyles();
    const {id} = useParams();

    //if the visiting user is authenticated
    const visitingUserID = authData? authData.userID: 0;

    //The id can either be the visiting user ID, or the id from the url params
    let profileUserID = id? id: visitingUserID;
    
    const [isLoading, setLoading] = useState(false);

    

    useEffect(() => {
        setLoading(false);
        // axios.get('/user/' + profileUserID)
        //     .then(res => {
        //         console.log("Userio duomenys: ", res);
        //         const info = res.data.info;
        //         const portfolio = res.data.portfolio;
        //         setUserInfo({
        //             name: info.name, 
        //             location: info.location, 
        //             photo: info.foto
        //         });
        //         setLoading(false);
        //     })
    }, [profileUserID])

    return (
        <>
            {isLoading?
            <div style={{backgroundColor: '#fff', textAlign: 'center', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Loader 
                    type="Bars"
                    color="#9200e6"
                    height={200}
                    width={200}
                />
            </div>:(<div className={classes.root}>
            
            </div>)}
        </>
    )
}

export default Job;