import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

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
        width: '100%',
        margin: '0 auto',
        padding: '30px',
        [theme.breakpoints.up("md")]: {
            width: '80%'
        }
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
        fontSize:'17px',
        overflowWrap: 'anywhere'
    },
    scroll:{
        display: 'flex',
        flexDirection:'column-reverse',
        overflow: 'scroll',
        height: '80vh'
    },
    createdAt: {
        marginBottom: '0'
    },
    button: {
        marginTop: '10px'
    }
}))

const initialValues = {
    message: '',
};

const validationSchema = Yup.object({
    message: Yup.string().max(2000, 'Tekstas negali viršyti 2000 simbolių').required("Privalomas laukelis"),
});

const Message = (props) => {
    let {id} = useParams();

    ////Get logged in user information
    let { authData } = useAuth();

    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [messagesList, setMessagesList] = useState([]);


    useEffect(() => {
        axios.get('message/'+id,{
            headers: {
                'Authorization': 'Bearer ' + authData.token
            }
        }).then(res => {
                setLoading(false);
                setMessagesList(res.data);
            });
    },[authData.token, id]);

    const handleSubmit = (values, {resetForm}) => {    
        axios.post('/message', {...values, senders_id: authData.userID, receivers_id: id}, {
            headers: {
                'Authorization': 'Bearer ' + authData.token
            }
        })
            .then(res => {
                resetForm();
                if(!res.data.error && res.status === 201) {
                    const newMessage = {
                        ...res.data,
                        status: 'received'
                    }
                    setMessagesList([...messagesList, newMessage]);
                    tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
                }
            })
            .catch(err => {
                resetForm();
                console.log(err);
            })
    }

    const tableContainerRef = React.useRef(null);

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
            <div>
            <TableContainer ref={tableContainerRef} className={`${classes.tableContainer} ${classes.scroll}`}>
                <Table>
                    <TableBody> 
                    {messagesList.map(message => (
                        <TableRow key={message.id}>
                            <TableCell className={`${message.status} both`}>
                                <img className={`${classes.profileImg} ${message.status}_disable`} src={`${baseURL}/storage/${message.sender_image}`} alt={`foto ${message.id}`}/>
                                <p className={classes.text}>{message.message}</p>
                                <p className={classes.createdAt}>{message.created_at.split('.')[0].split('T').join(' ')}</p>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Formik 
                initialValues={initialValues} 
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                >
            {({ handleChange, isSubmitting, values }) => (
                <Form className={classes.tableContainer}>
                    <div>
                        <TextField variant='outlined' label='Jūsų žinutė' name='message' onChange={handleChange} value={values.message} fullWidth multiline rows={2}/>
                        <ErrorMessage name='message' render={msg => <div className='text-danger'>{msg}</div>} />
                    </div>
                    <Button className={classes.button} type='submit' disabled={isSubmitting} variant='contained' color='primary' >
                        Siųsti
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