import React, {useState} from 'react';

import {baseURL} from '../../../axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import {makeStyles} from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import mime from 'mime-types';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginBottom: theme.spacing(3)
        }
    },
    portfolio: {
        marginBottom: '25px',
        position: 'relative'
    },
    portfolioImage: {
        width: '100%',
        height: '225px',
        objectFit: 'cover'
    },
    portfolioTitle: {
        backgroundColor: '#343a40',
        color: '#ffffcf',
        textAlign: 'center',
        minHeight: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > p': {
            margin: 0,
            padding: '5px'
        }
    },
    notApproved: {
        opacity: '0.7'
    },
    waitingForApproval: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(255, 255, 255, 1)',
        textAlign: 'center',
        fontSize: '20px',
        width: '300px',
        maxWidth: '95%'
    },
    video: {
        '& > video': {
            objectFit: 'cover'
        }
    },
    dialogTitle: {
        '& > h2 > p': {
            fontSize: '15px',
            marginBottom: 0
        }
    }
}))


const Portfolio = (props) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    let displayMode = null;
    let displayDialogMode = null;
    
    switch(mime.lookup(props.imageUrl).split('/')[0]) {
        case 'image':
            displayMode = (
                <>
                    <img className={classes.portfolioImage} src={`${baseURL}/storage/${props.imageUrl}`} alt={props.title}/>
                    <div className={classes.portfolioTitle}>
                        <p>{props.title}</p>
                    </div>
                </>
            )
            displayDialogMode = (
                <>
                    <img style={{width: '100%'}} src={`${baseURL}/storage/${props.imageUrl}`} alt={props.title}/>
                    <p>{props.description}</p>
                </>
            )
            break;
        case 'video':
            displayMode = (
                <>
                    <ReactPlayer width="100%" height="225px" className={classes.video} url={`${baseURL}/storage/${props.imageUrl}`} />
                    <div className={classes.portfolioTitle}>
                        <p>{props.title}</p>
                    </div>
                </>
            )
            displayDialogMode = (
                <>
                    <ReactPlayer width="100%" height="100%" url={`${baseURL}/storage/${props.imageUrl}`} controls />
                    <p>{props.description}</p>
                </>
            )
            break;
        case 'application':
            console.log(props.imageUrl);
            displayMode = (
                <> 
                    <img className={classes.portfolioImage} style={{objectFit: 'scale-down'}} src={`${baseURL}/storage/portfolioWorks/textFile.png`} alt={props.title}/>
                    <div className={classes.portfolioTitle}>
                        <p>{props.title}</p>
                    </div>
                </>
            )
            displayDialogMode = (
                <>
                    <a target="_blank" rel="noopener noreferrer" href={`${baseURL}/storage/${props.imageUrl}`}>Darbas</a>
                    <p>{props.description}</p>
                </>
            )
            break;
        default:
            break;
    }
    return (
        <>
        <div className={classes.portfolio} >
            <div className={!props.approved? classes.notApproved: ''}>
                <button onClick={handleOpen} type='button' style={{border: 'none', background: 'transparent', padding: 0, width: '100%', height: '275px'}}>
                    {displayMode}
                </button>
            </div>
            {!props.approved &&
                <div className={classes.waitingForApproval}>
                    Laukiama patvirtinimo...
                </div>
            }
        </div>
        <Dialog open={open} onClose={handleClose} fullWidth>                          
            <DialogTitle className={classes.dialogTitle}>
                {props.title}
                {props.clientApproveName? 
                    <p>Darbo nuosavybę patvirtino: {props.clientApproveName}</p>
                    :
                    <p>Darbo nuosavybė nepatvirtinta</p>
                }
            </DialogTitle>
            <DialogContent className={classes.root} >
                {displayDialogMode}
            </DialogContent>
            <DialogActions>
                <Button color="primary" type='button' onClick={handleClose}>
                    Uždaryti
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default Portfolio;