import React from 'react';
import http from './http';

class AuthService {
    login(username, password) {
        return new Promise((resolve, reject)=> {
            http
                .post("/deliverers/api/login", {username, password})
                .then((response) => {
                    const token = response.data;

                    localStorage.setItem('token', JSON.stringify(token));
                    resolve(token);
                })
                .catch((error) => {
                    const apiError = error.response.data;
                    reject(apiError.errorMessage);
                });
        });
    }
}

const authService = new AuthService();
export default authService;