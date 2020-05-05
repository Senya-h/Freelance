import React, {useState, useEffect} from 'react';
import PrivateMessage from '../containers/privateMessage';
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

import axios, {baseURL} from '../axios';

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
        fontSize:'20px'
    }
    
}))

const Message = (props) => {

    ////Get logged in user information
    let { authData } = useAuth();
    console.log(authData)

    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [messagesList, setMessagesList] = useState(['Kraunama...']);
    const [messages, setMessages] = useState(['Kraunama...']);

    useEffect(() => {
        axios.get('message/'+props.user+'/'+authData.userID)
            .then(res => {
                setLoading(false);
                setMessagesList(res.data);
                
            })
    },[]);

    useEffect(() => {
        axios.get('message/'+authData.userID+'/'+props.user)
            .then(res => {
                setLoading(false);
                setMessages(res.data);
                
            })
    },[]);
    
    const mesage = [setMessages];
    

    //console.log(messagesList);
    console.log(mesage);
    //message/{senders_id}/{receivers_id}
        //const adress = adres.map(adres => <Route path={`/rent/${adres}`} exact><SingleRent address = {adres}/></Route>)

    return (
        //React loader
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
            //Material ui table
            <div className="container">
            <TableContainer className={classes.tableContainer}>
                <Table>
                {messagesList.map(message => (
                    <TableBody key={message.id}>      
                            <TableRow>
                                <TableCell>
                                    <img className={classes.profileImg} src={`${baseURL}/storage/${props.userFoto}`} alt={`foto ${message.id}`}/>
                                    {message.message}
                                    <p>{message.id}</p>
                                   <p>{message.created_at}</p>
                                </TableCell>
                            </TableRow>
                    </TableBody>
                    ))}
                    {messages.map(message => (
                    <TableBody key={message.id}>      
                            <TableRow>
                                <TableCell>
                                    <img className={classes.profileImg} src={`${baseURL}/storage/${props.userFoto}`} alt={`foto ${message.id}`}/>
                                    {message.message}
                                    <p>{message.id}</p>
                                   <p>{message.created_at}</p>
                                </TableCell>
                            </TableRow>
                    </TableBody>
                    ))}
                </Table>
            </TableContainer>        
            </div>
        )}
        </>
    )
    }


export default Message;