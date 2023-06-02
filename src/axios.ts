import axios from 'axios';

const instance = axios.create({
    baseURL : "https://amazon-backend-i9mn.onrender.com"
})

export default instance;