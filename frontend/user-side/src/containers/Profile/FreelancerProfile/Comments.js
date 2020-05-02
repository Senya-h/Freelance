import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddCommentModal from './AddCommentModal';
import CommentForm from './CommentForm';

const useStyles = makeStyles(theme => ({
    scrollableComments: {
        overflowY: 'scroll',
        height: '600px',
    },
    commentName: {
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        '& > span': {
            marginLeft: '5px'
        }
    }
}));



const Comments = (props) => {
    const classes = useStyles();

    let commentAuthorIndex = -1;
    let comments = [];
    console.log("KOMENTARUOSE ESU", props.allComments);

    props.allComments.forEach((comment, index) => {
        if(comment.user_id === props.visitingUserID) {
            commentAuthorIndex = index;
        } else {
            comments.push(
                <div key={comment.id}>
                        <p className={classes.commentName}>
                        {comment.name}
                        <Rating name='read-only' precision={0.25} value={comment.rating} readOnly />
                        {comment.user_id === props.visitingUserID &&
                        <IconButton>
                            <EditIcon classes={{colorPrimary: classes.red}} color='primary' />
                        </IconButton>
                        }
                    </p>
                    <p>{comment.comment}</p>
                </div>
            )
        }
    })

    if(commentAuthorIndex !== -1) {
        const authorComment = props.allComments[commentAuthorIndex];
        comments.unshift(
            <div key={authorComment.id} style={{backgroundColor: 'gray'}}>
                <p className={classes.commentName}>
                    {authorComment.name}
                    <Rating name='read-only' precision={0.25} value={authorComment.rating} readOnly />
                    {authorComment.user_id === props.visitingUserID &&
                    <AddCommentModal type="edit">
                        <CommentForm setComments={props.setComments} allComments={props.allComments} token={props.token} commentToEdit={authorComment} />
                    </AddCommentModal>
                    }
                </p>
                <p>{authorComment.comment}</p>
            </div>
        )
    }
    console.log("Patys komentarai: ", comments);
    return (
        <div className={classes.scrollableComments}>
            {comments}                  
        </div>
    )
};

export default Comments;