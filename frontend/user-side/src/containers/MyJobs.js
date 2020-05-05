import React, {useState, useEffect} from 'react';
import ConfirmDeleteModal from './Profile/FreelancerProfile/ConfirmDeleteModal';

import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

import {useFormik} from 'formik';
import axios, {baseURL} from '../axios';


import Autocomplete from '../Autocomplete';
import cities from '../cities';
import {useAuth} from '../context/auth';

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
    },
    noResults: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        fontSize: '30px',
        minHeight: '250px',
        backgroundColor: '#fff'
    },
    submitBtn: {
        width: '100%',
        height: '100%'
    }
}))

const MyJobs = (props) => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [skillNames, setSkillNames] = useState(['Kraunama...']);

    const [deleteModalInfo, setDeleteModalInfo] = useState({
        open: false,
        deleteLink: '/joboffer/delete/',
        id: 0,
        stateRef: {}
    });

    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [jobs, setJobs] = useState([]);

    const {authData} = useAuth();
    
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


        axios.get(`/myoffers`, {
            headers: {
                'Authorization': 'Bearer ' + authData.token
            }
        })
            .then(res => {
                setLoading(false);
                console.log(res);
                if(!res.error && res.status === 200) {
                    let arr = [];
                    for(let i in res.data.data) {
                        arr.push(res.data.data[i]);
                    }
                    setJobs(arr);
                    setPageCount(res.data.last_page);
                    setCurrentPage(parseInt(res.data.current_page), 10);
                }
            })
            .catch(err => {
                setLoading(false);

            })
        }, [props.location.search, props.history, authData.token]);

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
            props.history.push(`/my-jobs?service=${service}&skill=${skill}&city=${city}`);

        }
    })

    const handleDelete = (id) => {
        let stateRef = {
            state: jobs,
            setState: setJobs
        };

        setDeleteModalInfo({...deleteModalInfo, id, open: true, stateRef})
    };

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
        <Grid container spacing={5} className={`${classes.mainGrid} ${jobs.length? null: classes.noResults}`}>
            {jobs.length? jobs.map(job => {
                return (
                    <Grid key={job.id} item xs={12}>
                        <Grid container item className="p-4 bg-white">
                            {/* <Grid item className="img" style={{backgroundImage: job.info.foto? `url('${baseURL}/storage/${job.info.foto}')`: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Roundel_of_None.svg/600px-Roundel_of_None.svg.png')", width: '180px', height: '180px', margin: '0 0 30px 0'}}></Grid> */}
                            <Grid item className="text pl-md-4">
                                <span className="location mb-0">{job.location}</span>
                                <h2 className={classes.name}>{job.title}</h2>                                
                                <Button className={classes.linkButton} component={Link} to={`/job/${job.id}`} variant='contained' color='primary'>Daugiau</Button>
                                <Button className={classes.linkButton} component={Link} to={`/edit/job/${job.id}`} variant='contained' color='primary'>Redaguoti</Button>
                                <Button className={classes.linkButton} onClick={() => handleDelete(job.id)} variant='contained' color='primary'>Šalinti</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }): <Grid item>Rezultatų nerasta</Grid>}
            {pageCount > 1 && 
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
                            to={`/my-jobs?${item.page === 1 ? '': `page=${item.page}`}&service=${service}&skill=${skill}&city=${city}`}
                            {...item}
                        />
                    )}
                />
            </Grid>
            }
        </Grid>
        )}
        <ConfirmDeleteModal token={authData.token} modalInfo={deleteModalInfo} setModalInfo={setDeleteModalInfo} />
        </>
    )
}

export default MyJobs;