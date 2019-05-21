import React from 'react';
import "./Navigation.css"
import {
    Link
} from 'react-router-dom';

class Navigation extends React.Component{
    render() {
        return (
            <nav className="navbar navbar-expand navbar-light justify-content-center">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/trasa" className="nav-link">Trasa</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/skaner" className="nav-link">Skaner</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navigation;