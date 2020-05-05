import React, {useState, useEffect} from 'react';

import Loader from 'react-loader-spinner';

import axios, {baseURL} from '../../../axios';

import {makeStyles} from '@material-ui/core';


import { useAuth } from '../../../context/auth';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '30px',
        backgroundColor: '#eee',     
    },
    profileImage: {
        width: '300px',
        margin: '0 auto',
        '& > img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
    },
    imageAddIcon: {
        position: 'relative',
        top: '-80px',
        left: '250px',
    },
    userInfoArea: {
        // order: 2,
        // [theme.breakpoints.up('md')]: {
        //     order: 1
        // }
    },
    photoArea: {
        // order: 1,
        // [theme.breakpoints.up('md')]: {
        //     order: 2
        // }
    },
}));



const ClientProfile = (props) => {
    //Get logged in user information
    let { authData } = useAuth();
    
    //if the visiting user is authenticated
    const visitingUserID = authData? authData.userID: 0;

    let profileUserID = 0;

    if(authData) {
        profileUserID = visitingUserID;
    } else if(props.match.params.id) {
        profileUserID = parseInt(props.match.params.id);
    }
    
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        photo: '',
        location: '',
        role: '',
    });


    const [isLoading, setLoading] = useState(true);


    const classes = useStyles();

    useEffect(() => {
        setLoading(true);
        axios.get('/user/' + profileUserID)
            .then(res => {
                console.log("Userio duomenys: ", res);
                const info = res.data.info;
                setUserInfo({
                    name: info.name, 
                    location: info.location, 
                    photo: info.foto
                });

                setLoading(false);
            })

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
            </div>:(
            <div className={classes.root}>
                
            </div>
            )}
        </>
    )
}

export default ClientProfile;