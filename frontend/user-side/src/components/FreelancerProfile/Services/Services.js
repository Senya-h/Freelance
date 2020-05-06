import React, {useState, useEffect} from 'react';
import ServiceForm from './ServiceForm';
import OpenDialogButton from '../../OpenDialogButton';
import {makeStyles} from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    service: {
        marginBottom: '25px',
        border: '1px solid black',
        padding:'15px', 
        boxShadow: '19px 25px 21px -14px rgba(0,0,0,0.63)',
        position: 'relative'
    },
    iconBg: {
        backgroundColor: "#fff",
        borderRadius: '50%'
    },
    red: {
        color: 'red'
    }
}));

const Services = ({visitingUserID, profileUserID, userServices, token, startDeleteModal}) => {
    const classes = useStyles();

    const [services, setServices] = useState([]);

    useEffect(() => {
        setServices(userServices);
    }, [userServices])

    return (
        <div>
            <h4>
                Siūlomos paslaugos
                {visitingUserID === profileUserID? 
                <OpenDialogButton type="add" title="Pridėti paslaugą">
                    <ServiceForm services={services} setServices={setServices} token={token} />
                </OpenDialogButton>
                : null}             
            </h4>
            <ul style={{listStyle: 'none', paddingLeft: '20px'}}>
                {services.map(service => (
                    <li key={service.id} className={classes.service}>
                        <h5>{service.title}</h5>
                        <p>{service.description}</p>
                        <p>Pageidaujamas atlyginimas: <strong>{service.price_per_hour} €/h</strong></p>
                        {visitingUserID === profileUserID ? (
                        <>
                        <IconButton 
                            style={{position: 'absolute', right: '0', top: '0'}} 
                            onClick={() => startDeleteModal('/delete/service&id=', service.id, {
                                    state: services,
                                    setState: setServices
                            })}
                        >
                            <RemoveCircleIcon classes={{root: classes.iconBg, colorPrimary: classes.red}} color='primary'/>
                        </IconButton>
                        <OpenDialogButton type="edit" title="Redaguoti paslaugą">
                            <ServiceForm serviceToEdit={service} services={services} setServices={setServices} token={token} />
                        </OpenDialogButton>
                        </>
                        ): null}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Services;
//onClick={() => openModal(service.id, PORTFOLIO_TYPES.SERVICE.name)}