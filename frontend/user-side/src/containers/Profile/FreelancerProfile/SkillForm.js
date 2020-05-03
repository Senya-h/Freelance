import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import {useFormik} from 'formik';
import axios from '../../../axios';

const SkillForm = (props) => {
    const formik = useFormik({
        initialValues: {
            skills_id: props.checkedSkills || []
        },
        onSubmit: values => {
            //Submitting user's skills to the server
            console.log("Submitting skills: ", values)
            if(props.noAxios) {
                if(props.setFieldValue) {
                    const newSkills = [];
                    props.allSkills.forEach(skill => {
                        values.skills_id.forEach(newSkillId => {
                            if(skill.id.toString() === newSkillId) {
                                newSkills.push({id: skill.id, skill: skill.skillName});
                            }
                        })
                    })
                    props.setSkills([...newSkills]);
                    props.setFieldValue('skills', newSkills);
                    props.handleClose();
                }
            } else {
                axios.post('/skill', values.skills_id, {
                    headers: {
                        'Authorization': 'Bearer ' + props.token
                    }
                }).then(res => {
                    if(!res.error && res.status === 200) {
                        props.handleClose();
                        const newSkills = [];
                        props.allSkills.forEach(skill => {
                            values.skills_id.forEach(newSkillId => {
                                if(skill.id.toString() === newSkillId) {
                                    newSkills.push({id: skill.id, skill: skill.skillName, approved: 0, comment: ""});
                                }
                            })
                        })
    
                        props.setSkills([...newSkills]);
                    }
                    console.log(res);
                })
            }

        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <FormGroup>
                    {props.allSkills.map(skill => { 
                        return (              
                        <FormControlLabel
                            key={skill.id} 
                            control={<Checkbox checked={formik.values.skills_id.includes(skill.id.toString()) || false} color="primary" name="[skills_id]" onChange={formik.handleChange} value={skill.id}/>}
                            label={skill.skillName}
                        />
                        )
                    })}

                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={props.handleClose}>
                    Atšaukti
                </Button>
                <Button color="primary" type='submit'>
                    Patvirtinti
                </Button>
            </DialogActions>
        </form>
    )
};

export default SkillForm;