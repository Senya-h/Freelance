import React, {useState} from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import { useFormik} from 'formik';
import {object as yupObject, string as yupString} from 'yup';
import axios from '../../../axios';
import {useAuth} from '../../../context/auth';

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

const CommentForm = (props) => {
    const classes = useStyles();
    const {authData} = useAuth();
    const [alertMessage, setAlertMessage] = useState([]);

    const toEdit = props.commentToEdit? true: false;

    const formik = useFormik({
        initialValues: {
            rating: toEdit? props.commentToEdit.rating: 3,
            comment: toEdit? props.commentToEdit.comment: ''
        },
        validationSchema: yupObject({
            rating: yupString().min(1).max(5),
        }),
        onSubmit: values => {
            props.setUploading(true);

            if(toEdit) {
                axios.put('client/update-approve', {...values, skill_id: props.skill_id, user_id: props.user_id}, {
                    headers: {
                        'Authorization': 'Bearer ' + authData.token
                    }
                }).then(res => {
                    props.setUploading(false);

                    if(!res.data.error) {
                        setAlertMessage(<Alert severity="success">Komentaras sėkmingai pakeistas!</Alert>);
                        props.refreshComments(props.skill_id);

                    } else {
                        setAlertMessage(<Alert severity="error">Klaida! Bandykite dar kartą.</Alert>);
                    }

                }).catch(err => {
                    props.setUploading(false);
                    setAlertMessage(<Alert severity="error">Klaida! Bandykite dar kartą.</Alert>);
                })
            } else {
                axios.post('client/approve', {...values, skill_id: props.skill_id, user_id: props.user_id}, {
                    headers: {
                        'Authorization': 'Bearer ' + authData.token,
                    }
                }).then(res => {
                    props.setUploading(false);
                    if(!res.data.error && res.status === 201) {
                        setAlertMessage(<Alert severity="success">Komentaras sėkmingai pridėtas!</Alert>);
                        props.refreshComments(props.skill_id);
                    } else {
                        setAlertMessage(<Alert severity="error">Klaida! Bandykite dar kartą.</Alert>);

                    }
                })
                .catch(err => {
                    props.setUploading(false);
                    setAlertMessage(<Alert severity="error">Klaida! Bandykite dar kartą.</Alert>);
                })
            }
        }
    })

    return (
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
                <div>
                    <TextField
                        label="Komentaras"
                        variant='outlined'
                        multiline
                        rows={2}
                        fullWidth
                        {...formik.getFieldProps('comment')}
                    />
                </div>
                {alertMessage}
            </DialogContent>
            <DialogActions>
                <Button color="primary" type='button' onClick={props.handleClose}>
                    Uždaryti
                </Button>
                <Button color="primary" type='submit'>
                    Patvirtinti
                </Button>
            </DialogActions>
        </form>
    )
}

export default CommentForm;