import React from 'react';
import {Redirect} from 'react-router-dom';

import FreelancerProfile from './FreelancerProfile';
import ClientProfile from './ClientProfile/ClientProfile';

import { useAuth } from '../../context/auth';

const Profile = () => {
    let { authData } = useAuth();
    
    // if unauthenticated, return to the index page
    if(!authData) {
        return <Redirect to='/' />
    }

    const profile = authData.userRole === 2 ? ClientProfile: FreelancerProfile;

    return profile();
};

export default Profile;