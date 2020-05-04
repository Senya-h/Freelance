import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';
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

import Alert from '@material-ui/lab/Alert';

import axios from '../axios';

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
    }
    
}))

const Messages = () => {

    //Get logged in user information
    let { authData } = useAuth();

    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [messagesList, setMessagesList] = useState(['Kraunama...']);
    const [vienas, setVienas] = useState([]);

    useEffect(() => {
        axios.get('received/messages/' +authData.userID)
            .then(res => {
                setLoading(false);
                setMessagesList(res.data);
            })
    },[]);

    for (const as of messagesList) {
    
        //console.log(messagesList[1])
        
    }
    
    //Arange addresess
    //var first = messagesList[0].name
    //console.log(first)
    var names = [];
    messagesList.forEach(all => {
        names.push(all.name)
    });
    
    var name = [...new Set(names)];

    const messageList = [];
    messageList[0] = {
        name: [],
        notification: [],
        time: []
    }
    for (let i = 0; i < name.length; i++) {
        messagesList.forEach(all => {
            console.log(name);
            if(name[i] == all.name){
                messageList[i].name.push(all.name)
                messageList[i].notification.push(all.notification_read)
                messageList[i].time.push(all.created_at)
                i++
            }
        });
    }
    console.log(messageList)
  
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
            <TableContainer className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.TableCell}></TableCell>
                            <TableCell className={classes.TableCell}>Žinute nuo</TableCell>
                            <TableCell className={classes.TableCell}>Data</TableCell>
                        </TableRow>
                    </TableHead>     
                    <TableBody>
<<<<<<< HEAD
                        {messagesList.map(message => (
                            <TableRow key={message.id}>
                                {vienas}
                                <TableCell>{message.notification_read}</TableCell>
                                <TableCell>{message.name}</TableCell>
                                <TableCell>{message.created_at}</TableCell>
=======
                        {messages.map((message, index) => (
                            <TableRow key={index}>
                                <TableCell><Link>Pavadinimas</Link></TableCell>
                                <TableCell><Link to={`/profile`}>Katukas</Link></TableCell>
                                <TableCell>2020</TableCell>
>>>>>>> 1ae49f361f47a78b6cbf7f7fdbf26b078025d891
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