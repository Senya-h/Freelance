import React from 'react';
import {Redirect} from 'react-router-dom';

import FreelancerProfile from './FreelancerProfile/FreelancerProfile';
import ClientProfile from './ClientProfile/ClientProfile';

import { useAuth } from '../../context/auth';

const Profile = () => {
    let { authData } = useAuth();

    // if unauthenticated, return to the index page
    if(!authData) {
        return <Redirect to='/' />
    }

    authData.role = 2;
    const profile = authData.role === 2 ? FreelancerProfile: ClientProfile;

    return profile();
};

export default Profile;