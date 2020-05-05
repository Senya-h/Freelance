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
import {Button} from 'react-bootstrap'

import{
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
}from "react-router-dom";
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
        fontSize:'20px'
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
        let newMessageList = [];
        let numbers = [];

        messagesList.map(numb =>(
            numbers.push(numb.notification)
        ));

        //console.log(numbers);
        numbers.sort();

        messagesList.map(message =>(
            newMessageList.push(message)
        ));

        for (let i = numbers.length; i > 0; i--) {
       
                console.log(numbers[i])
        }
        const messages = messagesList.map(message => <Route path={`/messages/${message.id}`}><PrivateMessage user = {message.id} userFoto = {message.foto}/></Route>)
       
        //const adress = messagesList.map(message => <Route path={`/sale/${message.id}`} exact><privateMessage address = {message.id}/></Route>)
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
            <Router>
            <Switch>
                <Route path="/messages" exact>
                    
                    <TableContainer className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.TableCell}>Žinute nuo</TableCell>
                        </TableRow>
                    </TableHead>     
                    <TableBody>
                        {messagesList.map(message => (
                            <TableRow key={message.id}>
                                {vienas}
                                <TableCell>
                                    <img className={classes.profileImg} src={`${baseURL}/storage/${message.foto}`} alt={`foto ${message.id}`}/>
                                    <span className={classes.notifi}> {message.notification}</span>
                                    <p className={classes.text}>{message.name}</p>
                                    <Link to={`messages/${message.id}`}><Button className="m-3" variant="outline-dark" size="lg" block>{message.name}</Button></Link>
                                </TableCell>
                               
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>        
            </Route>
            {messages}
            </Switch>
            </Router> 
            </div>
        )}
        </>
    )
};

export default Messages;

//REIKALINGI API:
//Rodo visas zinutes, zinuciu turinys: {id, tema, gavejas, gavejo id, paskutine_zinute_parasyta}
//Vienos zinutes turinys: {}