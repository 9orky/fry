import React from 'react';

export default class AuthService {

    login(username, password) {
        return new Promise((resolve, reject)=> {
            fetch("https://private-595cf-zitrafry.apiary-mock.com/deliverers/api/login", {
                    method: "POST",
                    body: JSON.stringify({username, password})
            })
            .then((response) => {
                if (!response.ok) {
                    if (response.status >= 400) {
                        reject('Failed');
                    }
                }

                return response.json();
            })
            .then(token => {
                if (token) {
                    localStorage.setItem('token', JSON.stringify(token));
                }

                resolve(token);
            })
        });
    }

    response(response) {
        console.log(response);


        // response.text().then(text => {
        //     const data = text && JSON.parse(text);
        //     if (!response.ok) {
        //         if (response.status === 401) {
        //             logout();
        //             location.reload(true);
        //         }
        //         const error = (data && data.message) || response.statusText;
        //         return Promise.reject(error);
        //     }
        //     return data;
        // });
    }

    logout() {
        localStorage.removeItem('user');
    }
}