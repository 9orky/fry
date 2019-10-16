import React from 'react';
import Nav from 'react-bootstrap/Nav'
import styles from "./Header.module.css"
import Logout from "../Logout/Logout";

const Header = (props) => {
    return (
        <Nav className={styles.container}>
            <div className={styles.emptyDiv}></div>
            <div className={styles.logo}>FRY</div>
            <Logout onLogout={() => props.onLogout()}/>
        </Nav>
    );
};

export default Header;