import React from 'react';
import "./LoginPage.css"
import authService from "./AuthService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
            .login(this.state.username, this.state.password)
            .then((token) => {this.props.onLogin()})
            .catch((error) => this.setState({
                loginError: 'Nieprawidłowe hasło'
            }));
    };


    render() {
        return (
            <div className="log-container">
                <h5>Logowanie</h5>
                {this.state.loginError &&
                    <p className="error">{this.state.loginError}</p>
                }
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Adres e-mail</Form.Label>
                        <Form.Control
                            type="email" placeholder="Podaj e-mail"
                            value={this.state.username}
                            onChange={this.onUsernameChangeHandler}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Podaj hasło"
                            value={this.state.password}
                            onChange={this.onPasswordChangeHandler}/>
                    </Form.Group>
                    <Button
                        variant={"primary"}
                        onClick={this.onSubmitHandler}
                    >Zaloguj</Button>
                </Form>
            </div>
        )
    }
}

export default LoginPage