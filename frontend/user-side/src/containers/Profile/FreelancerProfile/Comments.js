import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

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

    props.allComments.forEach((comment, index) => {
        if(comment.user_id === props.visitingUserID) {
            commentAuthorIndex = index;
        } else {
            comments.push(
                <div key={comment.id}>
                    {console.log(comment)}
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

    console.log("komentarai: ", comments);
    if(commentAuthorIndex !== -1) {
        const authorComment = props.allComments[commentAuthorIndex];
        comments.unshift(
            <div key={authorComment.id} style={{backgroundColor: 'gray'}}>
                <p className={classes.commentName}>
                    {authorComment.name}
                    <Rating name='read-only' precision={0.25} value={authorComment.rating} readOnly />
                    {authorComment.user_id === props.visitingUserID &&
                    <IconButton>
                        <EditIcon classes={{colorPrimary: classes.red}} color='primary' />
                    </IconButton>
                    }
                </p>
                <p>{authorComment.comment}</p>
            </div>
        )
    }
    console.log("komentarai paskui: ", comments);




    return (
        <div className={classes.scrollableComments}>
            {comments}                  
        </div>
    )
};

export default Comments;