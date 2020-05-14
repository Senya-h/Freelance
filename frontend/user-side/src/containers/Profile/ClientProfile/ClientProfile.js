import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import Loader from 'react-loader-spinner';

import Rating from '@material-ui/lab/Rating';
import axios from '../../../axios';
import SendMessage from '../../../components/SendMessage';

import {makeStyles} from '@material-ui/core';

import Comments from '../../../components/FreelancerProfile/Comments/Comments';
import ProfileImage from '../../../components/FreelancerProfile/ProfileImage/ProfileImage';

import Grid from '@material-ui/core/Grid';
import { useAuth } from '../../../context/auth';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '30px',
        backgroundColor: '#eee',     
    },
    userInfoArea: {
        order: 2,
        [theme.breakpoints.up('md')]: {
            order: 1
        }
    },
    photoArea: {
        order: 1,
        [theme.breakpoints.up('md')]: {
            order: 2
        }
    },
    desktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        },
        '& h3 span': {
            marginRight: theme.spacing(1)
        }
    },
    mobile: {
        display: 'block',
        height: '250px',
        overflowY: 'scroll',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
        '& h3 span': {
            marginRight: theme.spacing(1)
        }
    },
    iconBg: {
        backgroundColor: '#fff',
        borderRadius: '50%'
    },
    sendMsgBtn: {
        marginBottom: theme.spacing(1)
    },
}));

const FreelancerProfile = (props) => {
    const classes = useStyles();
    //Get logged in user information
    const { authData } = useAuth();
    const {id} = useParams();

    //if the visiting user is authenticated
    const visitingUserID = authData? authData.userID: 0;

    //The id can either be the visiting user ID, or the id from the url params
    let profileUserID = id? id: visitingUserID;
    
    
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setLoading] = useState(true);

    const [deleteInfo, setDeleteInfo] = useState({
        open: false,
        deleteLink: '',
        stateRef: {
            state: null,
            setState: null
        }
    });
    const [confirmInfo, setConfirmInfo] = useState({
        open: false,
        link: '0',
        data: null,
        stateRef: {
            state: null,
            setState: null
        }
    })
    

    useEffect(() => {
        setLoading(true);
        axios.get('/user/' + profileUserID)
            .then(res => {
                console.log("Userio duomenys: ", res);
                const info = res.data.info;
                const portfolio = res.data.portfolio;
                setUserInfo({
                    name: info.name, 
                    location: info.location, 
                    photo: info.foto,
                    email: info.email,
                    ratingAverage: info.ratingAverage,
                    services: portfolio.services,
                    skills: portfolio.skills,
                    portfolios: portfolio.works,
                    comments: info.comments,
                });
                setLoading(false);
            })

    }, [profileUserID])
    
    let comments = (
        <Comments 
            visitingUserID={visitingUserID}
            profileUserID={profileUserID}
            userComments={userInfo.comments}
        />
    )

    const startDeleteModal = (deleteLink, id, stateRef) => {
        setDeleteInfo({
            open: true,
            deleteLink,
            id,
            stateRef
        })
    }

    const startConfirmModal = (link, data, stateRef) => {
        setConfirmInfo({
            open: true,
            link,
            data,
            stateRef
        })
    }

    

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
            </div>
            :
            (<div className={classes.root}>
                <Grid container spacing={4}>
                    {/* Paslaugos, servisai, darbai */}
                    <Grid className={classes.userInfoArea} container item xs={12} md={8}>
                        {/* Paslaugos, servisai */}
                        <Grid item xs={12}>              
                            <h2>{userInfo.name} {userInfo.ratingAverage >= 1 && <Rating name='read-only' precision={0.25} value={userInfo.ratingAverage} readOnly />} </h2>
                            <h5>Miestas: {userInfo.location}</h5>
                            <h5>El. paštas: {userInfo.email}</h5>

                            {visitingUserID !== profileUserID && authData? <SendMessage className={classes.sendMsgBtn} recipientName={userInfo.name} recipientID={profileUserID} token={authData.token}/>: null}

                        </Grid>
                        
                        {/* Portfolio works */}
                        <Grid container item justify="space-between">
                            
                            <div className={classes.mobile}>
                                {comments}
                            </div>
                        </Grid>

                    </Grid>
                    {/* Profilio nuotrauka, atsiliepimai */}
                    <Grid className={classes.photoArea} container item xs={12} md={4} spacing={3} direction='column'>
                        <ProfileImage 
                            visitingUserID={visitingUserID}
                            profileUserID={profileUserID}
                            userPhoto={userInfo.photo}
                        />
                        <div className={classes.desktop}>
                            {comments}
                        </div>
                    </Grid>
                </Grid>

            </div>)}
        </>
    )
}

export default FreelancerProfile;