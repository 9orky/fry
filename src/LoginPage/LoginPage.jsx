import React from 'react';
import "./LoginPage.css"
import authService from "../AuthService";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginError: "",

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
        this.setState({
            loginError: ""
        });

        authService
            .login("a", "b")
            .then((token) => {this.props.onLogin()})
            .catch((error) => this.setState({
                loginError: 'Nieprawidłowe hasło'
            }));
    };

    render() {
        return (
            <div className="form-group">
                <h5>Logowanie</h5>
                {this.state.loginError &&
                    <p className="error">{this.state.loginError}</p>
                }
                <form>
                    <div >
                        <label htmlFor="username" ></label>
                        <input type="text" className="form-control"
                               placeholder="Nazwa użytkownika"
                               value={this.state.username}
                               onChange={this.onUsernameChangeHandler}/>
                    </div>
                    <div >
                        <label htmlFor="password" ></label>
                        <input type="password"
                               className="form-control"
                               placeholder="Hasło"
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