import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import axios from '../../../axios';

const useStyles = makeStyles(theme => ({
    iconBg: {
        backgroundColor: "#fff",
        borderRadius: '50%'
    },
    iconClientApproved: {
        color: '#3cff00'
    },
    iconClientNotApproved: {
        color: '#9dff80'
    }
}))


const ClientApproval = (props) => {
    const classes = useStyles();

    const approvePortfolio = (id) => {
        console.log("ID: ", id);
        axios.post('/project', {work_id: id}, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(res => {
            console.log(res);
            props.work.clientApprove.approve = 1;
        })
    };

    return (
        <IconButton style={{position: 'absolute', left: '0', top: '0'}} onClick={() => approvePortfolio(props.work.id)}>
            <CheckCircleIcon fontSize="large" classes={{root: classes.iconBg, colorPrimary: props.work.clientApprove.approve? classes.iconClientApproved: classes.iconClientNotApproved}} color='primary' />
        </IconButton>
    )
};

export default ClientApproval;