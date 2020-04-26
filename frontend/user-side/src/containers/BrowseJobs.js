import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

import {useFormik} from 'formik';
import axios, {baseURL} from '../axios';


import Autocomplete from '../Autocomplete';
import cities from '../cities';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    name: {
        color: '#000',
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: 0
    },
    pagination: {
        justifyContent: 'center'
    },
    mainGrid: {
        marginBottom: '0px'
    },
    linkButton: {
        '&:hover': {
            color: '#fff'
        }
    },
    form: {
        marginBottom: '20px',
        backgroundColor: '#fff',
        padding: '10px'
    }
}))

const BrowseJobs = (props) => {
    const classes = useStyles();

    const [freelancers, setFreelancers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [skillNames, setSkillNames] = useState(['Kraunama...']);
    useEffect(() => {
        axios.get('/skills')
            .then(res => {
                console.log(res);
                setSkillNames(res.data.map(skill => skill.skillName));
            })
    },[]);

    console.log("PROPSAI: ", props);

    useEffect(() => {
        setLoading(true);
        const query = new URLSearchParams(props.location.search);
        const page = query.get('page') || '1';
        if(page !== '1') {
            props.history.push('jobs?page=' + page);
        } 
        
        setCurrentPage(page);
        if(props.location.state) {
            if(props.location.state.searchQuery) {
                const {service, skill} = props.location.state.searchQuery;
                axios.get('/search', {service, skill})
                    .then(res => {
                        setLoading(false);

                        if(!res.error && res.status === 200) {
                            let arr = [];
                            for(let i in res.data.data) {
                                arr.push(res.data.data[i]);
                            }
                            setFreelancers([...arr]);
                            setPageCount(res.data.last_page)
                        }
                    })
            }
        } else {
            axios.get('/freelancers?page=' + page)
            .then(res => {
                setLoading(false);

                if(!res.error && res.status === 200) {
                    let arr = [];
                    for(let i in res.data.data) {
                        arr.push(res.data.data[i]);
                    }
                    setFreelancers([...arr]);
                    setPageCount(res.data.last_page)
                }
            })
        }
    }, [props.location.search, props.history, props.location.state]);
    console.log(props.location.state.searchQuery);

    const formik = useFormik({
        initialValues: {
            service: props.location.state? props.location.state.searchQuery.service: '',
            skill: props.location.state? props.location.state.searchQuery.skill: '',
            city: props.location.state? props.location.state.searchQuery.city: '',
        },
        onSubmit: values => {

        }
    })

    return (
        <>
        <div className={classes.form} role="tabpanel">
            <form autoComplete='new-password' onSubmit={formik.handleSubmit} className="search-job">
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <TextField style={{width: '100%'}} label="Paslauga" variant='outlined'  {...formik.getFieldProps('service')}/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Autocomplete
                            width="100%"
                            options={skillNames}
                            name="skill"
                            value={formik.values.skill}
                            label="Gebėjimas"
                            change={(e, value) => {
                                formik.setFieldValue('skill', value !== null? value: '')
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Autocomplete 
                            width="100%"
                            options={cities}
                            name="city"
                            value={formik.values.city}
                            label="Miestas"
                            change={(e, value) => {
                                formik.setFieldValue('city', value !== null? value: '')
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Button className={classes.submitBtn} color='primary' type='submit' variant='contained'>Ieškoti</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
        {isLoading?(          
        <div style={{backgroundColor: '#fff', textAlign: 'center', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Loader 
                type="Bars"
                color="#9200e6"
                height={200}
                width={200}
            />
        </div>):(
        <Grid container spacing={5} className={classes.mainGrid}>
            {freelancers.map(freelancer => {
                const services = freelancer.portfolio.services.map(service => <span key={service.id}>{service.service} , </span>)
                const skills = freelancer.portfolio.skills.map(skill => <span key={skill.id}>{skill.skill}, </span>)
                return (
                    <Grid key={freelancer.info.id} item xs={12}>
                        <Grid container item className="p-4 bg-white">
                            <Grid item className="img" style={{backgroundImage: freelancer.info.foto? `url('${baseURL}/storage/${freelancer.info.foto}')`: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Roundel_of_None.svg/600px-Roundel_of_None.svg.png')", width: '180px', height: '180px', margin: '0 0 30px 0'}}></Grid>
                            <Grid item className="text pl-md-4">
                                <span className="location mb-0">{freelancer.info.location}</span>
                                <h2 className={classes.name}>{freelancer.info.name}</h2>
                                
                                <h4 className="mb-2">{services}</h4>
                                <h5 className="mb-2">{skills}</h5>
                                <p className="seen">Last Activity 4 months ago</p>
                                <Button className={classes.linkButton} component={Link} to={`/profile/${freelancer.info.id}`} variant='contained' color='primary'>Daugiau</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            })}
            <Grid item xs={12} style={{backgroundColor: '#fff'}}>
                <Pagination
                    page={parseInt(currentPage, 10)}
                    count={pageCount}
                    variant="outlined"
                    color="primary"
                    classes={{ul: classes.pagination}}
                    size="large"
                    renderItem={item => (
                        <PaginationItem
                            component={Link}
                            to={`/jobs${item.page === 1 ? '': `?page=${item.page}`}`}
                            {...item}
                        />
                    )}
                />
            </Grid>
        </Grid>)}
        </>
    )
}

export default BrowseJobs