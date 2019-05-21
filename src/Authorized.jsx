import React from 'react';
import history from './history';

class Authorized extends React.Component {
    componentDidMount() {
        if (!this.props.loggedIn) {
            history.push('/login');
        }
    }

    render() {
        if (this.props.loggedIn) {
            return this.props.children;
        }
        return null;
    }
}

export default Authorized;