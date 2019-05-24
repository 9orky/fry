import axios from 'axios';

const http = axios.create({
    baseURL: 'https://private-595cf-zitrafry.apiary-mock.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default http;