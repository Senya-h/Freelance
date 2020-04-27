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
    const [isLoading, setLoading] = useState(true);
    const [skillNames, setSkillNames] = useState(['Kraunama...']);

    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [freelancers, setFreelancers] = useState([]);
    
    
    useEffect(() => {
        axios.get('/skills')
            .then(res => {
                setSkillNames(res.data.map(skill => skill.skillName));
            })
    },[]);

    useEffect(() => {
        setLoading(true);
        const query = new URLSearchParams(props.location.search);
        const page = query.get('page') || '1';
        const service = query.get('service') || '';
        const skill = query.get('skill') || '';
        const city = query.get('city') || '';

        let urlParams = page !== '1'? `page=${page}&`: '';
        urlParams += skill? `skill=${skill}&`: '';
        urlParams += service? `service=${service}&`: '';
        urlParams += city? `city=${city}&`: '';


        axios.get(`/search?${urlParams}`)
            .then(res => {
                setLoading(false);

                if(!res.error && res.status === 200) {
                    let arr = [];
                    for(let i in res.data.data) {
                        arr.push(res.data.data[i]);
                    }
                    setFreelancers(arr);
                    setPageCount(res.data.last_page);
                    setCurrentPage(parseInt(res.data.current_page), 10);
                }
            })
            .catch(err => {
                setLoading(false);

            })
        }, [props.location.search, props.history]);

    const query = new URLSearchParams(props.location.search);
    const service = query.get('service') || '';
    const skill = query.get('skill') || '';
    const city = query.get('city') || '';

    const formik = useFormik({
        initialValues: {service, skill, city},
        onSubmit: values => {          
            setCurrentPage(1);
            const service = values.service;
            const skill = values.skill;
            const city = values.city;
            props.history.push(`/jobs?service=${service}&skill=${skill}&city=${city}`);

        }
    })

    return (
        <>
        <div className={classes.form} role="tabpanel">
            <form autoComplete='chrome-off' onSubmit={formik.handleSubmit} className="search-job">
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <TextField autoComplete="off" value={formik.values.service} style={{width: '100%'}} label="Paslauga" variant='outlined'  {...formik.getFieldProps('service')}/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        {console.log(skillNames)}
                        <Autocomplete
                            width="100%"
                            options={skillNames}
                            value={formik.values.skill}
                            name="skill"
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
                            value={formik.values.city}
                            name="city"
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
            {freelancers.length? freelancers.map(freelancer => {
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
                                <Button className={classes.linkButton} component={Link} to={`/freelancer/${freelancer.info.id}`} variant='contained' color='primary'>Daugiau</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }): <Grid item>Rezultatų nerasta</Grid>}
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