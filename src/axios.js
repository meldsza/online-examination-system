import axios from 'axios'
export default axios.create({
    baseURL: process.env.VUE_AUTH_BASE_URL || 'http://localhost:4000/auth',
    timeout: 1000,
});