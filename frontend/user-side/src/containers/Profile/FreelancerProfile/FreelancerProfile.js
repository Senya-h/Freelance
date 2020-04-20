import React, {useState, useEffect} from 'react';
import Rating from '@material-ui/lab/Rating';
import axios from '../../../axios';
import cx from 'classnames';
import SendMessage from './SendMessage/SendMessage';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Portfolio from './Portfolio/Portfolio';
import ServiceModalButton from './ServiceModalButton';
import SkillModalButton from './SkillModalButton';
import PortfolioModalButton from './PortfolioModalButton';
import Grid from '@material-ui/core/Grid';
import { useAuth } from '../../../context/auth';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '20px',
        backgroundColor: '#eee',
    },
    profileImage: {
        width: '250px',
        height: '250px',
        '& > img': {
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover'
        },
    },
    imageAddIcon: {
        position: 'relative',
        top: '-80px',
        left: '250px',
    }
}))

const FreelancerProfile = () => {
    let { authTokens } = useAuth();
    
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Roundel_of_None.svg/600px-Roundel_of_None.svg.png',
        location: '',
        role: ''
    });

    const [services, setServices] = useState([]);
    const [skills, setSkills] = useState([]);
    const [works, setWorks] = useState([]);

    const [allSkills, setAllSkills] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        axios.get('/user/' + authTokens.userID)
            .then(res => {
                console.log("Userio duomenys: ", res);
                const info = res.data.info;
                const portfolio = res.data.portfolio;
                setUserInfo({...userInfo, name: info.name, location: info.location,});

                setWorks(portfolio.works);
                setSkills(portfolio.skills);
                setServices(portfolio.services);
                
            })

        axios.get('/skills')
            .then(res => {
                console.log("Skills: ", res);
                setAllSkills(res.data);
            })
    }, [])

    return (
        <div className={classes.root}>
            <div className="row">
                <div className={cx(classes.profileImage, 'col-3')}>
                    <img src={userInfo.photo} alt="#" />
                    <IconButton className={classes.imageAddIcon} component='label'>                            
                        <AddCircleIcon fontSize='large' color="primary"/>
                        <input 
                            type='file' 
                            style={{display: 'none'}} 
                            onChange={e => {
                                // setFieldValue('profileImage', URL.createObjectURL(e.target.files[0]))
                            }} 
                        />
                    </IconButton>
                </div>
                <div className="col-9">
                    <h2>{userInfo.name} <Rating name='read-only' precision={0.25} value={4.5} readOnly /> </h2>
                    <div>
                        <h4>
                            Siūlomos paslaugos:
                            <ServiceModalButton token={authTokens.token}/>             
                        </h4>
                        <ul style={{listStyle: 'none'}}>
                            {services.map((service, index) => (
                                <li key={index}>{service.service} {service.price_per_hour}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4
                            >Gebėjimai:
                            <SkillModalButton skills={allSkills}/>
                        </h4>
                        <ul style={{listStyle: 'none'}}>
                            {skills.map(skill => (
                                <li key={skill.id}>SERVISAS</li>
                            ))}
                        </ul>
                    </div>
                    <SendMessage recipient={userInfo.name} id={0}/>
                </div>
            </div>
            <Grid container >
                <Grid item xs={12}>
                    <h2>
                        Portfolio
                        <PortfolioModalButton token={authTokens.token} works={works} setWorks={setWorks} />
                    </h2>
                </Grid>
                {works.map(work => (
                    <Grid key={work.id} item xs={12} md={6} lg={4}>
                        <Portfolio title={work.title} imageUrl={work.filePath} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default FreelancerProfile;