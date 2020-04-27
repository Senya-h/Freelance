import axios from 'axios';


export const baseURL = 'http://localhost:8000';

//URL for api
const instance = axios.create({
    baseURL: baseURL + '/api',
});


export default instance;
