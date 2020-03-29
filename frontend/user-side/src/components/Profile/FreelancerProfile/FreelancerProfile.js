import React from 'react';
import classes from './FreelanceProfile.module.css';
import Portfolio from './Portfolio/Portfolio';

const Profile = () => {

    console.log(classes);

    return (
        <div className="container">
            <div className="row">
                <img className={classes.ProfileImage + " col-3"} src="https://vignette.wikia.nocookie.net/fairytail/images/c/c3/Erza%27s_picture.png/revision/latest?cb=20190929085837" alt="#" />
                <div className="">
                    <p>Name</p>
                    <p>Surname</p>
                    <p>Country</p>
                </div>
            </div>
            <div>
                <p>Description</p>
                <div className="row">
                    <Portfolio />
                    <Portfolio />
                    <Portfolio />
                    <Portfolio />
                    <Portfolio />
                </div>
            </div>
        </div>
    )
}

export default Profile;