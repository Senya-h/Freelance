import React, {useState} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

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
    props.allComments.forEach(comment => {
        if(comment.user_id === props.visitingUserID) {
            hasVisitorCommented = true;
        }
    })

    return (
        <>
        <Button type='button' variant='contained' color='primary' onClick={handleOpen}>                            
            Pateikti atsiliepimą
        </Button> 
        <Dialog open={open} onClose={handleClose} fullWidth>                          
            <DialogTitle>Palikti atsiliepimą</DialogTitle>
            {childWithProps}
        </Dialog>
        </>
    )
};

export default AddCommentModal;