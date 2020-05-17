import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    name: {
        color: '#000',
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: 0
    },
    linkButton: {
        '&:hover': {
            color: "#fff"
        }
    },
    job: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

const ProfileJobs = ({jobs}) => {
    const classes = useStyles();
    return (
        <>
            <Grid item xs={12}>
            <h3>
                Naujausi darbo pasiūlymai
            </h3>
            </Grid>
            {jobs.map(job => (
                <Grid key={job.id} item xs={12} md={6} lg={5} className={classes.job}>
                    <Grid container item direction='column' align="center" className="p-4 bg-white">
                        <Grid item className="text">
                            <h2 className={classes.name}>{job.title}</h2>                                
                            <p>{job.city}</p>
                            <p>{job.salary} €/mėn.</p>
                            <hr className={classes.divider} />
                            <Button className={classes.linkButton} component={Link} to={`/job/${job.id}`} variant='contained' color='primary'>Daugiau</Button>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </>
    )
};

export default ProfileJobs;