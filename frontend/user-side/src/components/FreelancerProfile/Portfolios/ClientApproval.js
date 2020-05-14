import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import axios from '../../../axios';
import {useAuth} from '../../../context/auth';

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


const ClientApproval = ({portfolio, portfolios, setPortfolios, clicked}) => {
    const classes = useStyles();
    const {authData} = useAuth();

    // const approvePortfolio = (id) => {
    //     // if client and id not equal to profile id
    //     if(!authData || authData.userRole !== 2) {
    //         return;
    //     }
    //     axios.post('/project', {work_id: id}, {
    //         headers: {
    //             'Authorization': 'Bearer ' + authData.token
    //         }
    //     })
    //     .then(res => {
    //         if(!res.data.error) {
    //             setPortfolios(portfolios.map(portf => {
    //                 if(portf.id === portfolio.id) {
    //                     portf.clientApprove.approve = 1;
    //                 }
    //                 return portf;
    //             }))
    //         }
    //     })
    // };

    return (
        <IconButton 
            disabled={portfolio.clientApprove.approve === 1 || !authData || authData.userRole !== 2} 
            style={{position: 'absolute', left: '0', top: '0'}} 
            onClick={clicked}
        >
            <CheckCircleIcon 
                fontSize="large" 
                classes={{root: classes.iconBg, colorPrimary: portfolio.clientApprove.approve? classes.iconClientApproved: classes.iconClientNotApproved}} 
                color='primary' 
            />
        </IconButton>
    )
};

export default ClientApproval;