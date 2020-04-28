import axios from 'axios';


<<<<<<< HEAD
export const baseURL = 'http://freelance.test';
=======
export const baseURL = 'http://localhost:8000';
>>>>>>> 56c3cf535434e16ecb6b8ce6a893e132ff9a41e0

//URL for api
const instance = axios.create({
    baseURL: baseURL + '/api',
});


export default instance;
