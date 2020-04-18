import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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

    const formik = useFormik({
        onSubmit: values => {
            console.log("Siunciami skillai: ", values);
            //Submitting user's skills to the server
            axios.post('/abaweta', values).then(res => {
                console.log(res);
            })
        }
    })

    

    return (
        <>
            <IconButton component='label' onClick={handleOpen}>                            
                <AddCircleIcon fontSize='large' color="primary"/>
            </IconButton> 
            <Dialog open={open} onClose={handleClose}>                          
                <DialogTitle>Tavo gebėjimai</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <FormGroup>
                            {props.skills ? props.skills.map(skill => (               
                                <FormControlLabel
                                key={skill.id} 
                                control={<Checkbox color="primary" name="skill_id"/>}
                                label={skill.skillName}
                                />
                            )): null}

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