import React, {useState, useEffect} from 'react';
import '../assets/css/messages.css';
//React loader inport
import Loader from 'react-loader-spinner';
//Material ui inport
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
//Material ui style import
import {makeStyles} from '@material-ui/core/styles';
//User authentikacija
import { useAuth } from '../context/auth';
import axios, {baseURL} from '../axios';
import {Formik, Form, ErrorMessage} from 'formik';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';


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
    },
    scroll:{
        display: 'flex',
        flexDirection:'column-reverse',
        overflow: 'scroll',
        height: '80vh'
    }
}))

const initialValues = {
    message: '',
};

const validationSchema = Yup.object({
    message: Yup.string().max(2000, 'Darbo pobūdis negali viršyti 2000 simbolių').required("Privalomas laukelis"),
});

const Message = (props) => {

    ////Get logged in user information
    let { authData } = useAuth();

    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [messagesList, setMessagesList] = useState(['Kraunama...']);


    useEffect(() => {
        axios.get('message/'+props.user,{
            headers: {
                'Authorization': 'Bearer ' + authData.token
            }
        }).then(res => {
                setLoading(false);
                setMessagesList(res.data);
                
            });
    },[authData.token, props.user]);

    const handleSubmit = values => {  
        console.log(values);
        
        axios.post('/message', {...values, senders_id: authData.id, receivers_id: props.user}, {
            headers: {
                'Authorization': 'Bearer ' + authData.token
            }
        })
            .then(res => {
                console.log(res);
                if(!res.data.error && res.status === 201) {
                    props.history.push({
                        pathname: '/my-jobs',
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

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
            <TableContainer className={`${classes.tableContainer} ${classes.scroll}`}>
                <Table>
                {messagesList.map(message => (
                    <TableBody key={message.id}>      
                            <TableRow>
                                <TableCell  className={`${message.status} both`}>
                                    <img className={`${classes.profileImg} ${message.status}_disable`} src={`${baseURL}/storage/${message.sender_image}`} alt={`foto ${message.id}`}/>
                                    <p className={classes.text}>{message.message}</p>
                                   <p>{message.created_at}</p>
                                </TableCell>
                            </TableRow>
                    </TableBody>
                    ))}
                
                </Table>
            </TableContainer>
            <Formik 
                initialValues={initialValues} 
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                >
            {({ handleChange, values, setFieldValue, handleBlur, isSubmitting }) => (
                <Form className={classes.tableContainer}>
                    <div>
                        <TextField variant='outlined' label='Jusu žinute' name='message' onChange={handleChange} onBlur={handleBlur} fullWidth multiline rows={1}/>
                        <ErrorMessage name='message' render={msg => <div className='text-danger'>{msg}</div>} />
                    </div>
                    <Button type='submit' disabled={isSubmitting} variant='contained' color='primary' >
                        Siusti
                    </Button>
                </Form>
            )}
            </Formik>
            </div>
        )}
        </>
    )
    }


export default Message;