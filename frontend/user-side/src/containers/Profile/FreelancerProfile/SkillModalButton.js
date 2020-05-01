import React, {useState, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormGroup from '@material-ui/core/FormGroup';
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {useFormik} from 'formik';
import axios from '../../../axios';

const SkillModalButton = (props) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const [checkedSkills, setCheckedSkills] = useState(props.skills.map(skill => {
        return skill.id.toString();
    }));
    
    const formik = useFormik({
        initialValues: {
            skills_id: [...checkedSkills]
        },
        onSubmit: values => {
            //Submitting user's skills to the server
            axios.post('/skill', values.skills_id, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then(res => {
                if(!res.error && res.status === 200) {
                    handleClose();
                    const newSkills = [];
                    props.allSkills.forEach(skill => {
                        values.skills_id.forEach(newSkillId => {
                            if(skill.id.toString() === newSkillId) {
                                newSkills.push({id: skill.id, skill: skill.skillName, approved: 0, comment: ""});
                            }
                        })
                    })
                    console.log("Nauji skillsai: ", newSkills);
                    props.setSkills([...newSkills]);
                    if(props.setFieldValue) {
                        props.setFieldValue('skills', newSkills.map(skill => skill.id));
                    }
                }
                console.log(res);
            })
        }
    })

    useEffect(() => {
        setCheckedSkills(props.skills.map(skill => {
            return skill.id.toString();
        }));
    }, [props.skills])

    return (
        <>
            <IconButton component='label' onClick={handleOpen}>                            
                <EditIcon color='primary' />
            </IconButton> 

            <Dialog open={open} onClose={handleClose} fullWidth>                          
                <DialogTitle>Gebėjimai</DialogTitle>
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
                        <Button color="primary" onClick={handleClose}>
                            Atšaukti
                        </Button>
                        <Button color="primary" type='submit'>
                            Patvirtinti
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
};

export default SkillModalButton;