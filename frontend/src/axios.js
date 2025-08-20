import axios from 'axios';

const API = axios.create({
    baseURL: 'https://biz-nest-gamma.vercel.apphttps://biz-nest-gamma.vercel.app',
    withCredentials: true
})

export default API
