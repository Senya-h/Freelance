import React, {useState} from 'react';
import Wrapper from '../../../../hoc/Wrapper/Wrapper';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {makeStyles} from '@material-ui/core/styles';

import {Formik, Form} from 'formik';

import {object as yupObject, string as yupString} from 'yup';

const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Roundel_of_None.svg/600px-Roundel_of_None.svg.png';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *, & > form > *': {
            marginBottom: theme.spacing(3)
        },
        padding: '20px',
        backgroundColor: '#eee'
    },
    profileImage: {
        width: '225px',
        height: '225px',
        objectFit: 'cover',
        borderRadius: '50%',
    }
}))

const UpdateProfile = () => {
    const classes = useStyles();

    const [skills, setSkills] = useState([]);

    const initialValues = {
        profileImage: DEFAULT_IMAGE,
        services: [],
        skills: [],
        about: ''
    };

    const validationSchema = yupObject({
        // profileImage: yupString().required('Privalomas laukelis')
    })

    const handleSubmit = (values, {hasSubmitted}) => {
        console.log("Update Profile: ", values);
    };


    const keyPress = (event) => {
        //if enter key was pressed
        if(event.keyCode === 13) {
            setSkills([...skills, event.target.value]);
            event.target.value = '';
        }
    }

    const handleSkillRemove = (index) => {
        const newSkills = [...skills];
        newSkills.splice(index, 1);
        setSkills(skills.filter((skill, i) => index !== i));
    }

    return (
        <Wrapper variant='container' contentOffset='130px'>
            <div className={classes.root}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({handleChange, handleBlur, values, setFieldValue, isSubmitting}) => (
                    <Form>
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item xs={3}>
                                <Button variant='contained' component='label'>
                                    Įkelti profilio nuotrauką
                                    <input 
                                        type='file' 
                                        style={{display: 'none'}} 
                                        onChange={e => {
                                            setFieldValue('profileImage', URL.createObjectURL(e.target.files[0]))
                                        }} 
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <img className={classes.profileImage} src={values.profileImage} alt='Profilio nuotrauka' />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <h4>Siūlomos paslaugos</h4>
                                <TextField variant='outlined' label='Paslauga' name='skill' color='primary'/>
                            </Grid>
                            <Grid item xs={12}>
                                <h4>Gebėjimai</h4>
                                <TextField variant='outlined' label='Gebėjimas' name='skill' color='primary' onKeyDown={keyPress}/>
                                <ul style={{listStyle: 'none'}}>
                                    {skills.map((skill, index) => (
                                        <li key={index}>{skill} <span onClick={() => handleSkillRemove(index)}>X</span></li>
                                    ))}
                                </ul>
                            </Grid>
                        </Grid>
                        <TextField multiline label='Apie mane' variant='outlined' rows={5} fullWidth/>
                        <Button type='submit' variant='outlined' color='primary'>Patvirtinti</Button>
                    </Form>
                    )}
                </Formik>
            </div>
        </Wrapper>
    )
};

export default UpdateProfile;