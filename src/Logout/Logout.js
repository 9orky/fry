import React from 'react';
import styles from "./Logout.module.css"
import {http} from "../Service/http";

const Logout = (props) => {

    const onLogoutHandler = (event) => {
        event.preventDefault();
        http
            .delete("/logout")
            .then((response) => {
                console.log(response );
                localStorage.clear();
                props.onLogout()
            })
            .catch();
    };

    return (
        <a
            href={"#"}
            className={styles.logoutBtn}
            onClick={onLogoutHandler}>
            <i className="fas fa-sign-out-alt"></i>
        </a>
    )
};

export default Logout;