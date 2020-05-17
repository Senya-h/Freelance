import React, {useState, useEffect} from 'react';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

import axios from '../axios';
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
        marginBottom: '0px', 
        marginTop: '10px',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
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
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    red: {
        color: 'red',
        '&:hover': {
            color: 'red'
        }
    },
    salad: {
        color: '#66e002',
        '&:hover': {
            color: '#66e002'
        }
    },
    iconBg: {
        backgroundColor: "#fff",
        borderRadius: '50%'
    },
}))

const MyJobs = (props) => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);

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
        setLoading(true);

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
    const title = query.get('title') || '';
    const skill = query.get('skill') || '';
    const city = query.get('city') || '';

    const handleDelete = (id) => {
        let stateRef = {
            state: jobs,
            setState: setJobs
        };

        setDeleteModalInfo({...deleteModalInfo, id, open: true, stateRef})
    };

    return (
        <>
        {isLoading?(          
        <div style={{backgroundColor: '#fff', textAlign: 'center', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Loader 
                type="Bars"
                color="#9200e6"
                height={200}
                width={200}
            />
        </div>):(
        <Grid container justify="flex-start" spacing={5} className={`${classes.mainGrid} ${jobs.length? null: classes.noResults}`}>
            {jobs.length? jobs.map(job => {
                return (
                    <Grid key={job.id} item xs={12} sm={6} md={4} lg={3}>
                        <Grid container item direction='column' align="center" className="p-4 bg-white">
                            <Grid item className="text">
                                <h2 className={classes.name}>{job.title}</h2>                                
                                <p>{job.city}</p>
                                <p>{job.salary} €/mėn.</p>
                                <hr className={classes.divider} />
                                <div className={classes.buttons} >
                                    <IconButton component={Link} to={`/job/${job.id}`}>
                                        <VisibilityIcon color="primary" />
                                    </IconButton>
                                    <IconButton component={Link} to={`/edit/job/${job.id}`}>
                                        <EditIcon color="primary" classes={{root: classes.iconBg, colorPrimary: classes.salad}} />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(job.id)}>
                                        <RemoveCircleIcon color="primary" classes={{root: classes.iconBg, colorPrimary: classes.red}} />
                                    </IconButton>
                                </div>
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
                            to={`/my-jobs?${item.page === 1 ? '': `page=${item.page}`}&title=${title}&skill=${skill}&city=${city}`}
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