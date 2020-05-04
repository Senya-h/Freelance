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
        marginBottom: '0px',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },
    linkButton: {
        '&:hover': {
            color: '#fff'
        },
        margin: '0 auto'
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
    divider: {
        marginLeft: '-1.5rem',
        marginRight: '-1.5rem'
    },
    submitBtn: {
        width: '100%',
        height: '100%'
    }
}))

const Jobs = (props) => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [skillNames, setSkillNames] = useState(['Kraunama...']);

    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [jobs, setJobs] = useState([]);
    
    
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
        const title = query.get('title') || '';
        const skill = query.get('skill') || '';
        const city = query.get('city') || '';

        let urlParams = page !== '1'? `page=${page}&`: '';
        urlParams += skill? `skill=${skill}&`: '';
        urlParams += title? `title=${title}&`: '';
        urlParams += city? `city=${city}&`: '';


        axios.get(`search/clients?${urlParams}`)
            .then(res => {
                setLoading(false);
                console.log(res);
                if(!res.data.error && res.status === 200) {
                    let arr = [];
                    for(let i in res.data.data) {
                        arr.push(res.data.data[i]);
                    }
                    console.log(arr);
                    setJobs(arr);
                    setPageCount(res.data.last_page);
                    setCurrentPage(parseInt(res.data.current_page), 10);
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
        }, [props.location.search, props.history]);

    const query = new URLSearchParams(props.location.search);
    const title = query.get('title') || '';
    const skill = query.get('skill') || '';
    const city = query.get('city') || '';

    const formik = useFormik({
        initialValues: {title, skill, city},
        onSubmit: values => {          
            setCurrentPage(1);
            const title = values.title;
            const skill = values.skill;
            const city = values.city;
            props.history.push(`/jobs?title=${title}&skill=${skill}&city=${city}`);

        }
    })
    return (
        <>
        <div className={classes.form} role="tabpanel">
            <form autoComplete='off' onSubmit={formik.handleSubmit} className="search-job">
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <TextField autoComplete="off" value={formik.values.title} style={{width: '100%'}} label="Paslauga" variant='outlined'  {...formik.getFieldProps('title')}/>
                    </Grid>
                    <Grid item xs={12} md={3}>
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
        <Grid container spacing={5} justify="start" className={`${classes.mainGrid} ${jobs.length? null: classes.noResults}`}>
            {jobs.length? jobs.map(job => {
                return (
                    <Grid key={job.offers.id} item xs={12} md={4} lg={3}>
                        <Grid container item direction='column' align="center" className="p-4 bg-white">
                            <Grid item className="img" style={{backgroundImage: job.userInfo.foto? `url('${baseURL}/storage/${job.userInfo.foto}')`: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Roundel_of_None.svg/600px-Roundel_of_None.svg.png')", width: '120px', height: '120px', margin: '0 auto 30px auto'}}></Grid>
                            <Grid item className="text">
                                <h2 className={classes.name}>{job.offers.title}</h2>                                
                                <p>{job.offers.city}</p>
                                <p>{job.offers.salary} €/mėn.</p>
                                <hr className={classes.divider} />
                                <Button className={classes.linkButton} component={Link} to={`/job/${job.offers.id}`} variant='contained' color='primary'>Daugiau</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            })
            : 
            <Grid item>
                Rezultatų nerasta
            </Grid>
            }

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
                            to={`/jobs?${item.page === 1 ? '': `page=${item.page}`}&title=${title}&skill=${skill}&city=${city}`}
                            {...item}
                        />
                    )}
                />
            </Grid>
            }           
        </Grid>)}
        </>
    )
}

export default Jobs;