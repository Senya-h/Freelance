import React, {useState, useEffect} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import axios from '../../../axios';

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

const Comments = () => {
    const classes = useStyles();
    const [comments, setComments] = useState([1,2,3,4,5,6,7,8,9,9,9,9,9,9]);

    useEffect(() => {
        //Reikia komentatorio vardo, foto, reitinga, komentaro
        axios.get('/comments', {userID: 0})
            .then(res => {

                // setComments(res.data);
            })
            .catch(err => {

            })
    }, [])
    return (
        <div className={classes.scrollableComments}>
            {comments.map(comment => (
                <div>
                    <p className={classes.commentName}>Saulius Rekašius <Rating name='read-only' precision={0.25} value={4.5} readOnly /> </p>
                    <p>JIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKSJIS YRA TOKS</p>
                </div>
            ))}                        
        </div>
    )
};

export default Comments;