import React, {useState, useEffect} from 'react';
import Autocomplete from '../../../Autocomplete';
import cities from '../../../cities';
import {withRouter} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {useFormik} from 'formik';

import axios from '../../../axios';

const Form = (props) => {
    const [skillNames, setSkillNames] = useState([]);

    const formik = useFormik({
        initialValues: {
            service: '',
            skill: '',
            city: ''
        },
        onSubmit: values => {
            console.log("SUBMIT", values);
            axios.get('/search', {service: values.service, skill: values.skill})
                .then(res => {
                    console.log(res);
                    props.history.push('/jobs');
                })
            console.log(props);
        }
    });

    useEffect(() => {
        axios.get('/skills')
            .then(res => {
                console.log(res);
                setSkillNames(res.data.map(skill => skill.skillName));
            })
    },[]);

    return (
        <div className={"tab-pane fade show active"} role="tabpanel" aria-labelledby="v-pills-nextgen-tab">
            <form autoComplete='new-password' onSubmit={formik.handleSubmit} className="search-job">
                <div className="row no-gutters">
                    <div className="col-md mr-md-2">
                        <TextField label="Paslauga" variant='outlined'  {...formik.getFieldProps('service')}/>
                    </div>
                    <div className="col-md mr-md-2">
                        <Autocomplete
                            width="250px"
                            options={skillNames}
                            name="skill"
                            label="Gebėjimas"
                            change={(e, value) => {
                                formik.setFieldValue('skill', value !== null? value: '')
                            }}
                        />
                    </div>
                    <div className="col-md mr-md-2">
                        <Autocomplete 
                            width="250px"
                            options={cities}
                            name="city"
                            label="Miestas"
                            change={(e, value) => {
                                formik.setFieldValue('city', value !== null? value: '')
                            }}
                        />
                    </div>
                    <div className="col-md">
                        <div className="form-group">
                            <div className="form-field">
                                <button type="submit"
                                        className="form-control btn btn-primary">Ieškoti
                                </button>
                                <Button type='submit' variant='contained'>Ieškoti</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default withRouter(Form);