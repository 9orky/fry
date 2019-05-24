import http from "./http";

class UserService {
    getUser() {
        return new Promise((resolve)=> {
            http
                .get("/api/users/me")
                .then(user => resolve(user.data))
                .catch();
        });
    }
}

const userService = new UserService();
export default userService;