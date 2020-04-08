import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://freelance.test/api'
});

export default instance;