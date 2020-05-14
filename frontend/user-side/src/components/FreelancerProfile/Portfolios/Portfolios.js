import React, {useEffect, useState} from 'react';
import PortfolioForm from './PortfolioForm';
import OpenDialogButton from '../../OpenDialogButton';
import Portfolio from './Portfolio';
import ClientApproval from './ClientApproval';
import EditPortfolioForm from './EditPortfolioForm';
import { useAuth } from '../../../context/auth';


import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    portfolio: {
        position: 'relative'
    },
    iconBg: {
        backgroundColor: "#fff",
        borderRadius: '50%'
    },
    red: {
        color: 'red'
    }
}))

const Portfolios = ({visitingUserID, profileUserID, userPortfolios, startDeleteModal, startConfirmModal}) => {
    const classes = useStyles();
    const { authData } = useAuth();

    const [portfolios, setPortfolios] = useState([]);

    useEffect(() => {
        setPortfolios(userPortfolios);
    }, [userPortfolios])

    return (
        <>
            <Grid item xs={12}>
            <h2>
                Portfolio
                {visitingUserID === profileUserID?
                    <OpenDialogButton type="add" title="Pridėti portfolio">
                        <PortfolioForm token={authData.token} works={portfolios} setWorks={setPortfolios} />
                    </OpenDialogButton>
                    : null}
            </h2>
            </Grid>
            
            {portfolios.filter(portfolio => portfolio.approved === 1 || visitingUserID === profileUserID).map(portfolio => (
            <Grid item className={classes.portfolio} key={portfolio.id} xs={12} md={5}>
                <Portfolio 
                    title={portfolio.title} 
                    imageUrl={portfolio.filePath} 
                    description={portfolio.description} 
                    approved={portfolio.approved}
                    clientApproveName={portfolio.clientApprove.clientName} 
                />
                {visitingUserID === profileUserID && (
                <>
                <IconButton 
                    style={{position: 'absolute', right: '0', top: '0'}} 
                    onClick={() => startDeleteModal('/delete/work&id=', portfolio.id, {
                                state: portfolios,
                                setState: setPortfolios
                    })}
                >
                    <RemoveCircleIcon fontSize="default" classes={{root: classes.iconBg, colorPrimary: classes.red}} color='primary' />
                </IconButton>

                <OpenDialogButton type="edit" title="Redaguoti portfolio">
                    <EditPortfolioForm portfolioToEdit={portfolio} token={authData.token} works={portfolios} setWorks={setPortfolios} />
                </OpenDialogButton>
                </>
                )}
                <ClientApproval
                    clicked={() => startConfirmModal('/project', {work_id: portfolio.id}, {
                        state: portfolios,
                        setState: setPortfolios
                    })}
                    portfolio={portfolio} 
                    portfolios={portfolios} 
                    setPortfolios={setPortfolios} 
                />
            </Grid>
            )
        )}
    </>
    )
};

export default Portfolios;
