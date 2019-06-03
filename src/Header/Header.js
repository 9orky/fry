import React from 'react';
import Nav from 'react-bootstrap/Nav'
import "./Header.css"

class Header extends React.Component{
    render() {
        return (
            <Nav className="nav-header">
                <div className="navbar-brand">FRY</div>
            </Nav>
        );
    }
}

export default Header;