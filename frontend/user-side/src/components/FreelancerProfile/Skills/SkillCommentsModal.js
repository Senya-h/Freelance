import React, {useState} from 'react';
import Loader from 'react-loader-spinner';

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import EditIcon from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle'
import {makeStyles} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => ({
    iconBg: {
        backgroundColor: '#fff',
        borderRadius: '50%'
    },
    loader: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    commentContainer: {
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '4px',
        paddingBottom: '4px'
    },
    commentName: {
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        '& > span': {
            marginLeft: '5px'
        }
    }
}))

const OpenDialogButton = (props) => {
    const classes = useStyles();
    const [isUploading, setUploading] = useState(false);

    const handleClose = () => {
        props.setOpen({
            open: false,
            skill_id: 0
        });
    }

    const childWithProps = React.Children.map(props.children, child => {
        return React.cloneElement(child, {
            handleClose,
            setUploading,
            refreshComments: props.refreshComments,
            user_id: props.user_id,
            skill_id: props.skill_id,
            commentToEdit: props.comments.find(comment => comment.author_id === props.visitingUserID)
        })
    })

    return (
        <>
        <Dialog scroll="paper" open={props.open} onClose={handleClose} fullWidth>                          
            <DialogTitle>{props.title}</DialogTitle>
            {childWithProps}

            <hr style={{width: '100%'}} />
            <ul style={{listStyle: 'none'}}>
                {props.comments.map(comment => {

                    return (
                        <li className={classes.commentContainer} key={comment.id}>
                            <p className={classes.commentName}>
                                {comment.authorName}
                                <Rating name='read-only' precision={0.25} value={comment.rating} readOnly />
                            </p>
                            <p>{comment.comment}</p>
                        </li>
                    )
                })}
            </ul>

            {isUploading &&
            <div className={classes.loader}>
                <Loader
                    type="Puff"
                    color="#9200e6"
                    height={100}
                    width={100}
                />
            </div>
            }
        </Dialog>

        </>
    )
};

export default OpenDialogButton;