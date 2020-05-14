import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import axios, {baseURL} from '../axios';
import SendMessage from '../components/SendMessage';

import {makeStyles} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import LastPage from '@material-ui/icons/LastPage';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Grid from '@material-ui/core/Grid';
import { useAuth } from '../context/auth';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '30px',
        backgroundColor: '#eee',     
    },
    baseData: {
        display: 'flex',
        alignItems: 'center',
        '& > img': {
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            objectFit: 'cover'
        },
        '& > div': {
            marginLeft: '20px'
        }
    },
    description: {
        marginTop: '1rem',
        fontSize: '18px'
    },
    authorLink: {
        textDecoration: 'none',
        color: 'inherit',
        fontStyle: 'italic',
        '&:hover': {
            textDecoration: 'none'
        }
    }
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
    
    const [isLoading, setLoading] = useState(true);
    const [jobData, setJobData] = useState({});
    const [jobSkills, setJobSkills] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        axios.get('/joboffer/' + id)
            .then(res => {
                console.log("Darbo duomenys", res);
                setJobData(res.data);
                setJobSkills(res.data.skills);
                setUserInfo(res.data.userInfo);
                setLoading(false);
            })
    }, [id])

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
            (
            <div className={classes.root}>
                <div className={classes.baseData}>
                    <img src={`${baseURL}/storage/${userInfo.foto}`} alt="Profilio nuotrauka"/>
                    <div>
                        <Link className={classes.authorLink} to={`/client/${userInfo.id}`}><h5>{userInfo.name}</h5></Link>
                        <h2>{jobData.title}</h2>
                        <h3>{jobData.city}</h3>
                        <h4>{jobData.salary} €/mėn</h4>
                    </div>
                </div>
                <div className={classes.description}>
                    <p>{jobData.description}</p>
                </div>
                <div>
                    <h2>Reikalingi gebėjimai</h2>
                    <List>
                        {jobSkills.map(skill => (
                            <ListItem key={skill.id}>
                                <ListItemIcon>
                                    <LastPage />
                                </ListItemIcon>
                                <ListItemText primary={skill.skill}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
                {authData && visitingUserID !== userInfo.id && <SendMessage token={authData.token} recipientID={userInfo.id} recipientName={userInfo.name} />}
            </div>
            )}
        </>
    )
}

export default Job;