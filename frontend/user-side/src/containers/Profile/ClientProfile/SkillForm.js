import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import {useFormik} from 'formik';

const SkillForm = ({checkedSkills, allSkills, setFieldValue, setSkills, handleClose}) => {
    const formik = useFormik({
        initialValues: {
            skills_id: checkedSkills || []
        },
        onSubmit: values => {
            const newSkills = [];
            allSkills.forEach(skill => {
                values.skills_id.forEach(newSkillId => {
                    if(skill.id.toString() === newSkillId) {
                        newSkills.push({id: skill.id, skill: skill.skillName});
                    }
                })
            })
            setFieldValue('skills', newSkills);
            handleClose();
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <FormGroup>
                    {allSkills.map(skill => { 
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
                <Button color="primary" onClick={handleClose}>
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