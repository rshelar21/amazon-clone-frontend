import axios from 'axios';

const instance = axios.create({
    baseURL : "https://amazon-backend-8s1m.onrender.com"
})

export default instance;