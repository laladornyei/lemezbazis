import Axios from 'axios';

const instance = Axios.create({
    baseURL : 'http://localhost:3000/api',
    headers:{
        'Content-type': 'application/json',
        'teszt':'teszt'
    }
});

export default instance;


