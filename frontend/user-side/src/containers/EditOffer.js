import React, {useState, useEffect} from 'react';
import cities from '../cities';
import Autocomplete from '../Autocomplete';

import { useAuth } from '../context/auth';
import {useParams, Redirect} from 'react-router-dom';

import Loader from 'react-loader-spinner';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import OpenDialogButton from './Profile/FreelancerProfile/OpenDialogButton';
import SkillForm from './Profile/ClientProfile/SkillForm';

import {useFormik} from 'formik';
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
    },
    loadingRoot: {
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#fff',
        textAlign: 'center', 
        height: '600px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
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
    const [isLoading, setLoading] = useState(true);

    const [inputCity, setInputCity] = useState('');

    const {id} = useParams();

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            city: '',
            salary: '',
            skills: []
        },
        validationSchema: Yup.object({
            title: Yup.string().max(50, "Darbo pavadinimas negali viršyti 50 simbolių").required('Privalomas laukelis'),
            description: Yup.string().max(2000, 'Darbo pobūdis negali viršyti 2000 simbolių').required("Privalomas laukelis"),
            city: Yup.string().required("Privalomas laukelis"),
            salary: Yup.number().min(0, 'Atlyginimas negali būti mažesnis už 0').required("Privalomas laukelis"),
        }),
        onSubmit: values => {  
            console.log("SUBMIT:",{...values, skills: values.skills.map(skill => skill.id)});
            
            axios.put('/joboffer/update/' + id, {...values, skills: values.skills.map(skill => skill.id)}, {
                headers: {
                    'Authorization': 'Bearer ' + authData.token
                }
            })
                .then(res => {
                    console.log(res);
                    if(!res.data.error && res.status === 200) {
                        props.history.push({
                            pathname: '/my-jobs',
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        })

    useEffect(() => {
        axios.get('/joboffer/' + id)
            .then(res => {
                if(res.data.userInfo.id !== authData.userID) {
                    return <Redirect to="/" />
                }
                console.log(res);
                formik.setFieldValue('title', res.data.title);
                formik.setFieldValue('description', res.data.description);
                formik.setFieldValue('salary', res.data.salary);
                formik.setFieldValue('city', res.data.city);
                setInputCity(res.data.city);
                
                formik.setFieldValue('skills', res.data.skills);
                setLoading(false);
            })
    }, [authData.userID, id])

    useEffect(() => {
        axios.get('/skills')
        .then(res => {
            setAllSkills(res.data);
        })
    }, [])




    return (
        <>
        {isLoading? 
        <div className={classes.loadingRoot}>
            <Loader 
                type="Bars"
                color="#9200e6"
                height={200}
                width={200}
            />
        </div>: (
        <div className={classes.root}>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <h2>Redaguoti skelbimą</h2>
                <div> 
                    <TextField variant='outlined' label='Darbas' color='primary' {...formik.getFieldProps('title')} fullWidth/>
                    {formik.touched.title && formik.errors.title ? (
                    <div className='text-danger'>{formik.errors.title}</div>
                    ) : null}
                </div>
                <div>
                    <TextField variant='outlined' label='Darbo pobūdis' {...formik.getFieldProps('description')} fullWidth multiline rows={4}/>
                    {formik.touched.description && formik.errors.description ? (
                    <div className='text-danger'>{formik.errors.description}</div>
                    ) : null}
                </div>
                <div>
                    {console.log(formik.values)}
                    <Autocomplete
                        width="300px"
                        options={cities}
                        value={formik.values.city}
                        inputValue={inputCity}
                        name="city"
                        label="Miestas"
                        onInputchange={(e, value) => {
                            setInputCity(value !== null? value: '');
                        }}
                        onChange={(e, value) => {
                            formik.setFieldValue('city', value);
                            if(!value) {
                                setInputCity('');
                            }
                        }}
                    />
                    {formik.touched.city && formik.errors.city ? (
                    <div className='text-danger'>{formik.errors.city}</div>
                    ) : null}
                </div>
                <div>
                    <p>Reikalingi gebėjimai
                        <OpenDialogButton type="edit" form="skill" title="Reikalingi gebėjimai" >
                                <SkillForm checkedSkills={formik.values.skills.map(skill => skill.id.toString())} allSkills={allSkills} setFieldValue={formik.setFieldValue} setSkills={setRequiredSkills}/>
                        </OpenDialogButton>
                    </p>
                    <ul style={{listStyle: 'none'}}>
                        {formik.values.skills.map(skill => (
                            <li key={skill.id}><span className={classes.skill}>{skill.skill}</span></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <TextField label='Atlyginimas' placeholder="0" type="number" color='primary' {...formik.getFieldProps('salary')} />
                    {formik.touched.salary && formik.errors.salary ? (
                    <div className='text-danger'>{formik.errors.salary}</div>
                    ) : null}
                </div>

                <Button type='submit' disabled={formik.isSubmitting} variant='contained' color='primary' >
                    Patvirtinti
                </Button>
            </form>
        </div>
        )}
        </>
    )
};

export default NewOffer;

