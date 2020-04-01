import axios from 'axios';


// const instance = axios.create({
//     baseURL: 'http://laravel.test/api'
// });


//Temporary API
const instance = axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com'
});

export default instance;