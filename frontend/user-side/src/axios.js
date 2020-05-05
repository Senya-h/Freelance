import axios from 'axios';


export const baseURL = 'http://localhost';

//URL for api
const instance = axios.create({
    baseURL: baseURL + '/api',
});


export default instance;