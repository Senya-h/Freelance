import axios from 'axios';


<<<<<<< HEAD
export const baseURL = 'http://freelance.test';
=======
export const baseURL = 'http://localhost';
>>>>>>> 48f860df61a9352989b26dd483967e52f30be1e1

//URL for api
const instance = axios.create({
    baseURL: baseURL + '/api',
});


export default instance;
