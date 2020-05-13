import React, {useState, useEffect} from 'react';
import { useAuth } from '../context/auth';
import cities from '../cities';
import Autocomplete from '../Autocomplete';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import OpenDialogButton from '../components/OpenDialogButton';
import SkillForm from './Profile/ClientProfile/SkillForm';

import {Formik, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import axios from '../axios';


import { makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles( theme => ({
    root: {
        '& > *, & > form > *': {
            marginBottom: theme.spacing(3)
        },
        padding: '20px',
        backgroundColor: '#eee',
        width: '100%',
        margin: '0 auto',
        [theme.breakpoints.up('md')]: {
            width: '750px'
        }
    }
}))


const NewOffer = (props) => {
    const { authData } = useAuth(); 
    const classes = useStyles();

    const [allSkills, setAllSkills] = useState([]);
    const [requiredSkills, setRequiredSkills] = useState([]);
    const [inputCity, setInputCity] = useState('');

    useEffect(() => {
        axios.get('/skills')
        .then(res => {
            setAllSkills(res.data);
        })
    }, [])

    
    const initialValues = {
        title: '',
        description: '',
        salary: '',
        city: '',
        skills: []
    };

    const validationSchema = Yup.object({
        title: Yup.string().max(50, "Darbo pavadinimas negali viršyti 50 simbolių").required('Privalomas laukelis'),
        description: Yup.string().max(2000, 'Darbo pobūdis negali viršyti 2000 simbolių').required("Privalomas laukelis"),
        city: Yup.string().nullable().required("Privalomas laukelis"),
        salary: Yup.number().min(0, 'Atlyginimas negali būti mažesnis už 0').required("Privalomas laukelis"),
    });

    const handleSubmit = (values, {setSubmitting}) => {  
        console.log(values);
        
        axios.post('/joboffer', {...values, skills: values.skills.map(skill => skill.id)}, {
            headers: {
                'Authorization': 'Bearer ' + authData.token
            }
        })
            .then(res => {
                setSubmitting(false);
                console.log(res);
                if(!res.data.error && res.status === 201) {
                    props.history.push({
                        pathname: '/my-jobs',
                    });
                }
            })
            .catch(err => {
                setSubmitting(false);
                console.log(err);
            })
    }

    return (
        <div className={classes.root}>
            <Formik 
                initialValues={initialValues} 
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                >
            {({ handleChange, values, setFieldValue, handleBlur, isSubmitting }) => (
                <Form autoComplete='off' >
                    <h2>Naujas skelbimas</h2>
                    <div> 
                        <TextField variant='outlined' label='Darbas' name='title' color='primary' onChange={handleChange} onBlur={handleBlur} value={values.title} fullWidth/>
                        <ErrorMessage name='title' render={msg => <div className='text-danger'>{msg}</div>} />
                    </div>
                    <div>
                        <TextField variant='outlined' label='Darbo pobūdis' name='description' onChange={handleChange} onBlur={handleBlur} value={values.description} fullWidth multiline rows={4}/>
                        <ErrorMessage name='description' render={msg => <div className='text-danger'>{msg}</div>} />
                    </div>
                    <div>
                        <Autocomplete
                            width="300px"
                            options={cities}
                            value={values.city}
                            inputValue={inputCity}
                            name="city"
                            label="Miestas"
                            onInputchange={(e, value) => {
                                setInputCity(value !== null? value: '');
                            }}
                            onChange={(e, value) => {
                                setFieldValue('city', value);
                                if(!value) {
                                    setInputCity('');
                                }
                            }}
                        />
                        <ErrorMessage name='city' render={msg => <div className='text-danger'>{msg}</div>} />
                    </div>
                    <div>
                        <p>Reikalingi gebėjimai
                            <OpenDialogButton type="edit" form="skill" title="Reikalingi gebėjimai" >
                                    <SkillForm checkedSkills={requiredSkills.map(skill => skill.id.toString())} allSkills={allSkills} setFieldValue={setFieldValue} setSkills={setRequiredSkills}/>
                            </OpenDialogButton>
                        </p>
                        <ul style={{listStyle: 'none'}}>
                            {requiredSkills.map(skill => (
                                <li key={skill.id}><span className={classes.skill}>{skill.skill}</span></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <TextField label='Mėnesinis atlyginimas' name='salary' placeholder="0" type="number" color='primary' onChange={handleChange} onBlur={handleBlur} value={values.salary} />
                        <ErrorMessage name='salary' render={msg => <div className='text-danger'>{msg}</div>} />
                    </div>

                    <Button type='submit' disabled={isSubmitting} variant='contained' color='primary' >
                        Patvirtinti
                    </Button>
                </Form>
            )}
            </Formik>
        </div>
    )
};

export default NewOffer;

