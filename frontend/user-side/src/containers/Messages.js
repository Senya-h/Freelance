import React, {useState, useEffect} from 'react';
//React loader inport
import Loader from 'react-loader-spinner';
//Material ui inport
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//Material ui style import
import {makeStyles} from '@material-ui/core/styles';
//User authentikacija
import { useAuth } from '../context/auth';

import{Link} from "react-router-dom";
import axios, {baseURL} from '../axios';


//Material ui style
const useStyles = makeStyles(theme => ({
    tableContainer: {
        backgroundColor: '#fff',
        width: '80%',
        margin: '0 auto',
        padding: '30px'
    },
    TableCell: {
        fontSize: '30px'
    },
    profileImg: {
        width: '50px',
        borderRadius: '50%',
        marginRight: '15px',
    },
    notifi:{
        color:'red',
        fontSize: '20px',
        position:'relative',
        bottom: '20px',
        right: '20px'
    },
    text:{
        fontSize:'20px',
        color: 'black'
    },
    scroll:{
        overflow: 'scroll',
        height: '100vh'
    }
}))

const Messages = (props) => {
    console.log("RENDER");  
    //Get logged in user information
    let { authData } = useAuth();

    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [messagesList, setMessagesList] = useState([]);

    useEffect(() => {
        props.setMessagesCount(0);
    }, [props]);

    useEffect(() => {
        axios.get('received/messages/' +authData.userID,{
            headers: {
                'Authorization': 'Bearer ' + authData.token
            }
        }).then(res => {
                setLoading(false);
                setMessagesList(res.data);
            });
    },[authData.userID, authData.token]);

        let numbers = messagesList.map(numb => numb.notification);
        numbers.sort();

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
            <div className="container">                    
                <TableContainer className={`${classes.tableContainer} ${classes.scroll}`}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.TableCell}>Žinutė nuo</TableCell>
                        </TableRow>
                    </TableHead>     
                    <TableBody>
                        {messagesList.map(message => (
                            <TableRow key={message.id}>
                                <TableCell>
                                    <img className={classes.profileImg} src={`${baseURL}/storage/${message.foto}`} alt={`foto ${message.id}`}/>
                                    <span className={classes.notifi}> {message.notification}</span>
                                    <Link to={`messages/${message.id}`} className={classes.text}>{message.name}</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>        
            </div>
        )}
        </>
    )
};

export default Messages;