import axios from 'axios';

export const http = axios.create({
    baseURL: 'https://zitra.online',
    headers: {
        'Content-Type': 'application/json'
    }
});

export function getAuthorized() {
    const jwtString = localStorage.getItem('token');
    http.defaults.headers = {...http.defaults.headers, "Authorization": `Bearer ${jwtString}`};
    return http;
}
