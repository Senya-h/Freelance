import React, {useState} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormGroup from '@material-ui/core/FormGroup';
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import { useFormik} from 'formik';
import {object as yupObject, string as yupString} from 'yup';
import axios from '../../../axios';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginBottom: theme.spacing(3)
        }
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
        '& > span': {
            marginLeft: '10px'
        }
    },
    ratingLabel: {
        marginBottom: 0
    }
}))

const AddCommentModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        formik.setFieldValue('rating', 3);
        formik.setFieldValue('comment', '');
        console.log(props);

        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const formik = useFormik({
        initialValues: {
            rating: 3,
            comment: ''
        },
        validationSchema: yupObject({
            rating: yupString().min(1).max(5),
        }),
        onSubmit: values => {
            console.log(values);
            console.log('props: ', props);
            axios.post('comment', {...values, receiver_id: props.profileUserID}, {
                headers: {
                    'Authorization': 'Bearer ' + props.token,
                }
            }).then(res => {
                if(!res.error && res.status === 200) {
                    handleClose();
                    // props.setComments([...allComments, res.data])
                }
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }
    })

    return (
        <>
        <Button type='button' variant='contained' color='primary' onClick={handleOpen}>                            
            Pateikti atsiliepimą
        </Button> 
        <Dialog open={open} onClose={handleClose} fullWidth>                          
            <DialogTitle>Palikti atsiliepimą</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent className={classes.root}>
                    <h5 className={classes.rating}>
                        Įvertinimas 
                        <Rating 
                            classes={{
                                label: classes.ratingLabel
                            }}
                            value={formik.values.rating}
                            name="rating"
                            onChange={(e,value) => {
                                formik.setFieldValue('rating', value? value: 3)
                            }}
                        />
                    </h5>
                    <FormGroup>
                        <TextField
                            label="Komentaras"
                            variant='outlined'
                            multiline
                            rows={2}
                            fullWidth
                            {...formik.getFieldProps('comment')}
                        />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" type='button' onClick={handleClose}>
                        Atšaukti
                    </Button>
                    <Button color="primary" type='submit'>
                        Pateikti
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
        </>
    )
};

export default AddCommentModal;