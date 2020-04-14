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
    }
}))

const UpdateProfile = () => {
    const classes = useStyles();
    const [profileImage, setProfileImage] = useState(DEFAULT_IMAGE);
    const [skills, setSkills] = useState([]);

    const initialValues = {
        profileImage: DEFAULT_IMAGE,
        services: [],
        skills: [],
        about: ''
    };

    const validationSchema = yupObject({
        profileImage: yupString().required('Privalomas laukelis')
    })

    const handleSubmit = (values, {hasSubmitted}) => {

    };

    const readURL = (event) => {
        setProfileImage(URL.createObjectURL(event.target.files[0]))
    }

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
                    {({isSubmitting}) => (
                    <Form>
                        <img src={profileImage} alt='Profilio nuotrauka' style={{width: '250px'}}/>
                        <Button variant='contained' component='label'>
                            Įkelti profilio nuotrauką
                            <input type='file' style={{display: 'none'}} onChange={readURL} />
                        </Button>

                        <h4>Siūlomos paslaugos</h4>
                        <Grid container spacing={3}>
                            <Grid item xs='4'>
                                <FormControlLabel
                                    control={<Checkbox name='gilad' />}
                                    label="Testas"
                                />
                            </Grid>
                            <Grid item xs='4'>
                                <FormControlLabel
                                    control={<Checkbox name='gilad' />}
                                    label="Testas"
                                />
                            </Grid>
                            <Grid item xs='4'>
                                <FormControlLabel
                                    control={<Checkbox name='gilad' />}
                                    label="Testas"
                                />
                            </Grid>
                            <Grid item xs='4'>
                                <FormControlLabel
                                    control={<Checkbox name='gilad' />}
                                    label="Testas"
                                />
                            </Grid>
                            <Grid item xs='4'>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Testas"
                                />
                            </Grid>
                        </Grid>
                        <h4>Gebėjimai</h4>
                        <Grid container spacing={2}>
                            <Grid item>
                                <TextField variant='outlined' label='Gebėjimas' name='skill' color='primary' onKeyDown={keyPress}/>
                            </Grid>
                            <ul style={{listStyle: 'none'}}>
                                {skills.map((skill, index) => (
                                    <li key={index}>{skill} <span onClick={() => handleSkillRemove(index)}>X</span></li>
                                ))}
                            </ul>
                        </Grid>
                        <TextField multiline label='Apie mane' variant='outlined' rows={5} fullWidth/>
                        <Button variant='outlined' color='primary'>Patvirtinti</Button>
                    </Form>
                    )}
                </Formik>
            </div>
        </Wrapper>
    )
};

export default UpdateProfile;