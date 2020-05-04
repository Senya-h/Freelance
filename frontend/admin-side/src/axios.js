import axios from 'axios';


export const baseURL = 'http://freelance.test';

//URL for api
const instance = axios.create({
    baseURL: baseURL + '/api',
});


export default instance;
