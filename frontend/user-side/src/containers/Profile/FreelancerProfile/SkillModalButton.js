import React, {useState, useEffect} from 'react';
import SkillForm from './SkillForm';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'


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
                <SkillForm handleClose={handleClose} />
            </Dialog>
        </>
    )
};

export default SkillModalButton;