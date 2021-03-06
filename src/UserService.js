import {getAuthorized} from "./Service/http";

class UserService {
    getUser() {
        return new Promise((resolve, reject)=> {
            getAuthorized()
                .get("/api/users/me")
                .then(user => resolve(user.data))
                .catch((error) => reject(error));
        });
    }
    getStore() {
        return new Promise((resolve)=> {
            getAuthorized()
                .get("/api/deliverers/stores")
                .then(store => resolve(store.data))
                .catch();
        });
    }
}

const userService = new UserService();
export default userService;