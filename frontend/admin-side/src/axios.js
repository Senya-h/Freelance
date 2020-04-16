import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://skelbimai.test/api/'
});

export default instance;