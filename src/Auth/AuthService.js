import {http} from '../Service/http';

class AuthService {

    login = (username, password) => {
        return new Promise((resolve, reject) => {
            http
                .post("/deliverers/login", {username, password})
                .then((response) => {
                    const token = response.data;

                    localStorage.setItem('token', token.token);
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

