import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import ReactPaginate from 'react-paginate';

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

import axios, {baseURL} from '../axios';

const useStyles = makeStyles(theme => ({
    name: {
        color: '#000',
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: 0
    },
    pagination: {
        justifyContent: 'center'
    }
}))

const BrowseJobs = (props) => {
    const classes = useStyles();

    const [freelancers, setFreelancers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        window.scrollTo(0,0);
        setLoading(true);
        const query = new URLSearchParams(props.location.search);
        const page = query.get('page') || '1';
        if(page !== '1') {
            props.history.push('jobs?page=' + page);
        } 

        setCurrentPage(page);
        axios.get('/freelancers?page=' + page)
            .then(res => {
                setLoading(false);

                if(!res.error && res.status === 200) {
                    console.log(typeof(res.data.data));
                    console.log(res.data);
                    let arr = [];
                    for(let i in res.data.data) {
                        arr.push(res.data.data[i]);
                    }
                    console.log(arr);
                    setFreelancers([...arr]);
                    setPageCount(res.data.last_page)
                }
            })
    }, [props.location.search]);

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
        <Grid container spacing={5}>
            {freelancers.map(freelancer => {
                const services = freelancer.portfolio.services.map(service => <span key={service.id}>{service.service} , </span>)
                const skills = freelancer.portfolio.skills.map(skill => <span key={skill.id}>{skill.skill}, </span>)
                return (
                    <Grid key={freelancer.info.id} item md={12}>
                        <div className="d-md-flex p-4 bg-white">
                            <div className="img" style={{backgroundImage: freelancer.info.foto? `url('${baseURL}/storage/${freelancer.info.foto}')`: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Roundel_of_None.svg/600px-Roundel_of_None.svg.png')", width: '180px', height: '180px', margin: '0 0 30px 0'}}></div>
                            <div className="text pl-md-4">
                                <span className="location mb-0">{freelancer.info.location}</span>
                                <h2 className={classes.name}>{freelancer.info.name}</h2>
                                
                                <h4 className="mb-2">{services}</h4>
                                <h5 className="mb-2">{skills}</h5>
                                <p className="seen">Last Activity 4 months ago</p>
                                <Button variant='contained' color='primary'><Link style={{color: '#FFF'}} to={`/profile/${freelancer.info.id}`}>Daugiau</Link></Button>
                            </div>
                        </div>
                    </Grid>
                )
            })}
            <Grid item xs={12}>
                <Pagination
                    page={parseInt(currentPage, 10)}
                    count={pageCount}
                    variant="outlined"
                    color="primary"
                    classes={{ul: classes.pagination}}
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