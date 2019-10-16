import React from 'react';
import styles from "./Navigation.module.css";
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <Nav className={styles.navBottom} justify variant="tabs">
            <Nav.Item>
                <Link className={styles.navLink} to="/fry/trasa">Trasa</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className={styles.navLink} to="/fry/skaner">Skaner</Link>
            </Nav.Item>
        </Nav>
    );
};

export default Navigation;