import axios from 'axios';


<<<<<<< HEAD
export const baseURL = 'http://freelance.test';
=======
export const baseURL = 'http://localhost:8000';
>>>>>>> 1ae49f361f47a78b6cbf7f7fdbf26b078025d891

//URL for api
const instance = axios.create({
    baseURL: baseURL + '/api',
});


export default instance;
