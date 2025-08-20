import axios from 'axios';

const API = axios.create({
    baseURL: 'https://biznest-vgbw.onrender.com',
    withCredentials: true
})

export default API
