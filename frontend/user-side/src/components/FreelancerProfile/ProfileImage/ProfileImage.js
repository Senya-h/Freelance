import React, { useState, useEffect } from 'react';
import PhotoModalButton from './PhotoModalButton';
import {baseURL} from '../../../axios';

import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    profileImage: {
        position: 'relative',
        width: '225px',
        height: '225px',
        margin: '0 auto',
        '& > img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
        },
    },
    imageAddIcon: {
        position: 'absolute',
        top: '170px',
        left: '170px',
    },
}));

const ProfileImage = ({visitingUserID, profileUserID, userPhoto, token}) => {
    const classes = useStyles();
    const [profileImage, setProfileImage] = useState("");

    useEffect(() => {
        setProfileImage(userPhoto);
    }, [userPhoto]);

    return (
        <Grid item>
            <div className={classes.profileImage}>
                <img src={`${baseURL}/storage/${profileImage}`} alt="Profilio nuotrauka" />
                {visitingUserID === profileUserID?
                <PhotoModalButton 
                    className={classes.imageAddIcon}
                    profileImage={profileImage} 
                    setProfileImage={setProfileImage}
                    token={token} 
                />
                : null}
            </div>
        </Grid>
    )
};

export default ProfileImage;
