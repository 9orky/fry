import {getAuthorized} from "./http";

class UserService {
    getUser() {
        return new Promise((resolve)=> {
            getAuthorized()
                .get("/api/users/me")
                .then(user => resolve(user.data))
                .catch();
        });
    }
}

const userService = new UserService();
export default userService;