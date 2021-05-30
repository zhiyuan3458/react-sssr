import axios from 'axios';
const config = require('../../build/config');

const env = process.env.NODE_ENV;

const request = axios.create({
    baseURL: `http://localhost:${ config[env].port }`,
    timeout: 3000
});

export default request;
