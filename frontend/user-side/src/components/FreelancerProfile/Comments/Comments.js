import React, {useState, useEffect} from 'react';
import AddCommentModal from './AddCommentModal';
import CommentForm from './CommentForm';
import UserComments from './UserComments';

import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

}));

const Comments = ({visitingUserID, profileUserID, token, userComments}) => {
    const classes = useStyles();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setComments(userComments);
    }, [userComments])

    return (
        <Grid item>
            <h3>
                <span>Atsiliepimai</span> 
                {visitingUserID !== profileUserID && token?
                <AddCommentModal type="add" allComments={comments} token={token} visitingUserID={visitingUserID}>
                    <CommentForm allComments={comments} setComments={setComments} token={token} profileUserID={profileUserID} />
                </AddCommentModal>: null}
            </h3>
            {/* <UserComments profileUserID={profileUserID} token={token} allComments={comments} setComments={setComments} visitingUserID={visitingUserID} /> */}
        </Grid>
    )
};

export default Comments;