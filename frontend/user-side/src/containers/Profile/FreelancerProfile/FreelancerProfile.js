import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import Loader from 'react-loader-spinner';

import Rating from '@material-ui/lab/Rating';
import axios, {baseURL} from '../../../axios';
import SendMessage from './SendMessage/SendMessage';

import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core';

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import EditIcon from '@material-ui/icons/Edit'

import Portfolio from './Portfolio';
import OpenDialogButton from './OpenDialogButton';
import SkillModalButton from './SkillModalButton';
import PortfolioModalButton from './PortfolioModalButton';
import PhotoModalButton from './PhotoModalButton';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ServiceForm from './ServiceForm';

import Comments from './Comments';
import AddCommentModal from './AddCommentModal';

import Grid from '@material-ui/core/Grid';
import { useAuth } from '../../../context/auth';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '30px',
        backgroundColor: '#eee',     
    },
    profileImage: {
        position: 'relative',
        width: '225px',
        height: '225px',
        margin: '0 auto',
        '& > img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
        },
    },
    imageAddIcon: {
        position: 'absolute',
        top: '170px',
        left: '170px',
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
    service: {
        marginBottom: '25px',
        border: '1px solid black',
        padding:'15px', 
        boxShadow: '19px 25px 21px -14px rgba(0,0,0,0.63)',
        position: 'relative'
    },
    portfolio: {
        position: 'relative'
    },
    skill: {
        borderBottom: '1px solid black',
        fontSize: '19px'
    },
    red: {
        color: 'red'
    },
    desktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    },
    mobile: {
        display: 'block',
        height: '250px',
        overflowY: 'scroll',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    iconBg: {
        backgroundColor: '#fff',
        borderRadius: '50%'
    }
}));

const DEFAULT_PHOTO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Roundel_of_None.svg/600px-Roundel_of_None.svg.png';
const PORTFOLIO_TYPES = {
    SERVICE: {
        name: "SERVICE",
        deleteLink: '/delete/service&id='
    },
    SKILL: {
        name: "SKILL",
        deleteLink: '/delete/'
    },
    WORK: {
        name: "WORK",
        deleteLink: '/delete/work&id='
    }
}

const FreelancerProfile = (props) => {
    //Get logged in user information
    let { authData } = useAuth();
    const {id} = useParams();

    //if the visiting user is authenticated
    const visitingUserID = authData? authData.userID: 0;

    //The id can either be the visiting user ID, or the id from the url params
    let profileUserID = id? id: visitingUserID;
    
    
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        photo: DEFAULT_PHOTO,
        location: '',
        role: '',
    });

    const [services, setServices] = useState([]);
    const [skills, setSkills] = useState([]);
    const [works, setWorks] = useState([]);
    const [comments, setComments] = useState([]);

    const [allSkills, setAllSkills] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [deleteModalInfo, setDeleteModalInfo] = useState({
        open: false,
        deleteLink: '',
        id: 0
    });

    const classes = useStyles();

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
                    photo: info.foto? info.foto: DEFAULT_PHOTO,
                    email: info.email,
                    ratingAverage: info.ratingAverage
                });
                setComments(info.comments);
                setWorks(portfolio.works);
                setSkills(portfolio.skills);
                setServices(portfolio.services);
                setLoading(false);
            })

        //all possible skills
        axios.get('/skills')
            .then(res => {
                setAllSkills(res.data);
            })
    }, [profileUserID])

    const openModal = (id, type) => {
        let deleteLink = '';
        let portfolioRef = {
            portfolio: undefined,
            setPortfolio: undefined
        }
        switch(type) {
            case PORTFOLIO_TYPES.SERVICE.name:
                deleteLink = PORTFOLIO_TYPES.SERVICE.deleteLink;
                portfolioRef.portfolio = services;
                portfolioRef.setPortfolio = setServices;
                break;
            case PORTFOLIO_TYPES.SKILL.name:
                deleteLink = PORTFOLIO_TYPES.SKILL.deleteLink;
                portfolioRef.portfolio = skills;
                portfolioRef.setPortfolio = setSkills;
                break;
            case PORTFOLIO_TYPES.WORK.name:
                deleteLink = PORTFOLIO_TYPES.WORK.deleteLink;
                portfolioRef.portfolio = works;
                portfolioRef.setPortfolio = setWorks;
                break;
            default:
                break;
        }

        if(deleteLink) {
            setDeleteModalInfo({open: true, deleteLink, id, portfolioRef});
        }
        
    };

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
                <Grid container spacing={4}>
                    {/* Paslaugos, servisai, darbai */}
                    <Grid className={classes.userInfoArea} container item xs={12} md={8}>
                        {/* Paslaugos, servisai */}
                        <Grid item xs={12}>              
                        <h2>{userInfo.name} {userInfo.ratingAverage >= 1 && <Rating name='read-only' precision={0.25} value={userInfo.ratingAverage} readOnly />} </h2>
                        {visitingUserID !== profileUserID && authData? <SendMessage recipientName={userInfo.name} recipientID={profileUserID} token={authData.token}/>: null}
                        <div>
                            <h4>
                                Siūlomos paslaugos
                                {visitingUserID === profileUserID? 
                                <OpenDialogButton type="add" title="Pridėti paslaugą">
                                    <ServiceForm services={services} setServices={setServices} token={authData.token} />
                                </OpenDialogButton>
                                : null}             
                            </h4>
                            <ul style={{listStyle: 'none', paddingLeft: '20px'}}>
                                {services.map(service => (
                                    <li key={service.id} className={classes.service}>
                                        {console.log(service)}
                                        <h5>{service.title}</h5>
                                        <p>{service.description}</p>
                                        <p>Užmokestis: <strong>{service.price_per_hour} €/h</strong></p>
                                        {visitingUserID === profileUserID ? (
                                        <>
                                        <IconButton style={{position: 'absolute', right: '0', top: '0'}} onClick={() => openModal(service.id, PORTFOLIO_TYPES.SERVICE.name)}>
                                            <RemoveCircleIcon classes={{colorPrimary: classes.red}} color='primary' />
                                        </IconButton>
                                        <OpenDialogButton type="edit" title="Redaguoti paslaugą">
                                            <ServiceForm serviceToEdit={service} services={services} setServices={setServices} token={authData.token} />
                                        </OpenDialogButton>
                                        </>
                                        ): null}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4>
                                Gebėjimai
                                {visitingUserID === profileUserID?<SkillModalButton token={authData.token} allSkills={allSkills} skills={skills} setSkills={setSkills} />: null}
                            </h4>
                            <ul style={{listStyle: 'none'}}>
                                {skills.map(skill => (
                                    <li key={skill.id}><span className={classes.skill}>{skill.skill}</span></li>
                                ))}
                            </ul>
                        </div>   
                        </Grid>
                        
                        {/* Portfolio works */}
                        <Grid container item justify="space-between">
                            <Grid item xs={12}>
                                <h2>
                                    Portfolio
                                    {visitingUserID === profileUserID?
                                        <PortfolioModalButton token={authData.token} works={works} setWorks={setWorks} />
                                        : null}
                                </h2>
                            </Grid>
                            {works.map(work => (
                                <Grid item className={classes.portfolio} key={work.id} xs={12} md={5}>
                                    <Portfolio title={work.title} imageUrl={work.filePath} description={work.description}/>
                                    {visitingUserID === profileUserID? (
                                    <>
                                    <IconButton style={{position: 'absolute', right: '0', top: '0'}} onClick={() => openModal(work.id, PORTFOLIO_TYPES.WORK.name)}>
                                        <RemoveCircleIcon fontSize="default" classes={{root: classes.iconBg, colorPrimary: classes.red}} color='primary' />
                                    </IconButton>
                                    <IconButton style={{position: 'absolute', right: '40px', top: '0'}}>
                                        <EditIcon color='primary' />
                                    </IconButton>
                                    </>
                                    ):null}
                                </Grid>
                            ))}
                        </Grid>

                        <Grid item className={classes.mobile}>
                            <h3>
                                Atsiliepimai 
                                {visitingUserID !== profileUserID && authData?<AddCommentModal allComments={comments} setComments={setComments} token={authData.token} profileUserID={profileUserID}/>: null}
                            </h3>
                            <Comments allComments={comments} setComments={setComments}/>
                        </Grid>
                    </Grid>
                        
                    {/* Profilio nuotrauka, atsiliepimai */}
                    <Grid className={classes.photoArea} container item xs={12} md={4} spacing={3} direction='column'>
                        <Grid item>
                            <div className={classes.profileImage}>
                                <img src={userInfo.photo === DEFAULT_PHOTO? userInfo.photo: `${baseURL}/storage/${userInfo.photo}`} alt="#" />
                                {visitingUserID === profileUserID?
                                <PhotoModalButton 
                                    className={classes.imageAddIcon}
                                    userInfo={userInfo} 
                                    setUserInfo={setUserInfo}
                                    token={authData.token} 
                                />
                                : null}
                            </div>
                        </Grid>
                        <Grid item className={classes.desktop}>
                            <h3>Atsiliepimai 
                                {visitingUserID !== profileUserID && authData?<AddCommentModal token={authData.token} allComments={comments} setComments={setComments} profileUserID={profileUserID} />: null}
                            </h3>
                            <Comments allComments={comments} setComments={setComments} />
                        </Grid>
                    </Grid>
                </Grid>

            
            {visitingUserID === profileUserID && <ConfirmDeleteModal token={authData.token} modalInfo={deleteModalInfo} setModalInfo={setDeleteModalInfo} />}
            </div>)}
        </>
    )
}

export default FreelancerProfile;