import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';

import Loader from 'react-loader-spinner';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {makeStyles} from '@material-ui/core/styles';

import axios from '../axios';

const useStyles = makeStyles(theme => ({
    tableContainer: {
        backgroundColor: '#fff'
    }
}))

const Messages = () => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [messages, setMessages] = useState([1,2,3,4,5]);

    useEffect(() => {
        setLoading(false);

    }, []);
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
            <TableContainer className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tema</TableCell>
                            <TableCell>Gavėjas</TableCell>
                            <TableCell>Data</TableCell>
                        </TableRow>
                    </TableHead>     
                    <TableBody>
                        {messages.map((message, index) => (
                            <TableRow key={index}>
                                <TableCell><Link>Pavadinimas</Link></TableCell>
                                <TableCell><Link to={`/profile`}>Katukas</Link></TableCell>
                                <TableCell>2020</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )}
        </>
    )
};

export default Messages;

//REIKALINGI API:
//Rodo visas zinutes, zinuciu turinys: {id, tema, gavejas, gavejo id, paskutine_zinute_parasyta}
//Vienos zinutes turinys: {}