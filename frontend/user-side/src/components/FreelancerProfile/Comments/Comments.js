import React, {useState, useEffect} from 'react';
import AddCommentModal from './AddCommentModal';
import CommentForm from './CommentForm';
import UserComments from './UserComments';

import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import { useAuth } from '../../../context/auth';

const useStyles = makeStyles(theme => ({

}));

const Comments = ({visitingUserID, profileUserID, userComments}) => {
    const classes = useStyles();
    const [comments, setComments] = useState([]);
    const {authData} = useAuth();

    useEffect(() => {
        setComments(userComments);
    }, [userComments])

    return (
        <Grid item>
            <h3>
                <span>Atsiliepimai</span> 
                {/* If is logged in and the visiting user is not the profile owner */}
                {visitingUserID !== profileUserID && authData && authData.userRole === 2?
                <AddCommentModal type="add" allComments={comments} visitingUserID={visitingUserID}>
                    <CommentForm allComments={comments} setComments={setComments} token={authData.token} profileUserID={profileUserID} />
                </AddCommentModal>: null}
            </h3>
            {/* <UserComments profileUserID={profileUserID} token={authData.token} allComments={comments} setComments={setComments} visitingUserID={visitingUserID} /> */}
        </Grid>
    )
};

export default Comments;