import React, {useState} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle'

const AddCommentModal = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        // formik.setFieldValue('rating', 3);
        // formik.setFieldValue('comment', '');
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const childWithProps = React.Children.map(props.children, child => {
        return React.cloneElement(child, {
            handleClose
        })
    })

    let hasVisitorCommented = false;
    if(props.allComments) {
        props.allComments.forEach(comment => {
            if(comment.user_id === props.visitingUserID) {
                hasVisitorCommented = true;
            }
        })
    }


    let iconType = null;

    if(props.type === "edit") {
        iconType = (
            <IconButton onClick={handleOpen}>
                <EditIcon color='primary' />
            </IconButton>
        )
    } else {
        if(!hasVisitorCommented) {
            iconType = (
                    <Button type='button' variant='contained' color='primary' onClick={handleOpen}>                            
                        Pateikti atsiliepimą
                    </Button> 
            )
        }
    }

    return (
        <>
        {iconType}
        <Dialog open={open} onClose={handleClose} fullWidth>                          
            <DialogTitle>Palikti atsiliepimą</DialogTitle>
            {childWithProps}
        </Dialog>
        </>
    )
};

export default AddCommentModal;