import React, {useState} from 'react';
import styles from "./LoginPage.module.css"
import authService from "./AuthService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginPage = (props) => {

    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setError("");
        authService
            .login(enteredUsername, enteredPassword)
            .then((token) => {props.onLogin(token)})
            .catch((error) => setError(error));
    };

    return (
        <div className={styles.container}>
            <h5>Logowanie</h5>
            {error &&
                <p className={styles.error}>{error}</p>
            }
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Adres e-mail</Form.Label>
                    <Form.Control
                        type="email" placeholder="Podaj e-mail"
                        value={enteredUsername}
                        onChange={event => {
                            setEnteredUsername(event.target.value)
                        }}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Podaj hasło"
                        value={enteredPassword}
                        onChange={event => {
                            setEnteredPassword(event.target.value)
                        }}/>
                </Form.Group>
                <Button
                    variant={"primary"}
                    onClick={onSubmitHandler}
                >Zaloguj</Button>
            </Form>
        </div>
    )
};

export default LoginPage