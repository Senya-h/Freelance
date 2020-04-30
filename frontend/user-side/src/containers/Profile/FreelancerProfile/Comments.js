import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';


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

    return (
        <div className={classes.scrollableComments}>
            {props.allComments.map(comment => (
                <div key={comment.id}>
                    <p className={classes.commentName}>{comment.user_id}<Rating name='read-only' precision={0.25} value={comment.rating} readOnly /> </p>
                    <p>{comment.comment}</p>
                </div>
            ))}                        
        </div>
    )
};

export default Comments;