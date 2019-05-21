import React from 'react';
import "./LoginPage.css"
import AuthService from "../AuthService";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };
    }

    onUsernameChangeHandler = (event) => {
        this.setState({username: event.target.value})
    };

    onPasswordChangeHandler = (event) => {
        this.setState({password: event.target.value})
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        const authService = new AuthService();
        authService
            .login("a", "b")
            .then((token) => {console.log(token)})
            .catch((error) => console.log(error));
    };

    render() {
        return (
            <div className="form-group">
                <h5>Logowanie</h5>
                <form>
                    <div >
                        <label htmlFor="username" ></label>
                        <input type="text" className="form-control"
                               placeholder="Podaj email"
                               value={this.state.username}
                               onChange={this.onUsernameChangeHandler}/>
                    </div>
                    <div >
                        <label htmlFor="password" ></label>
                        <input type="password"
                               className="form-control"
                               placeholder="Podaj hasło"
                               value={this.state.password}
                               onChange={this.onPasswordChangeHandler}/>
                    </div>
                    <div>
                        <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={this.onSubmitHandler}
                        >Zaloguj</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginPage