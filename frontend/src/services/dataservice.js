import Axios from 'axios';
let token = sessionStorage.getItem("token")

const instance = Axios.create({
    baseURL : 'http://localhost:3000/api',
    headers:{
        'Content-type': 'application/json',
        'Authorization': 'Bearer '+token
    }
});

export default instance;


