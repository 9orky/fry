import React from 'react';
import Scanner from "./Scanner/Scanner.jsx"
import DeliveryRoute from "./DeliveryRoute/DeliveryRoute"
import Navigation from "./Navigation/Navigation"
import NotFound from "./NotFound/NotFound";
import history from "./history"
import {
    Router,
    Route,
    Switch,
} from 'react-router-dom';
import LoginPage from "./LoginPage/LoginPage";
import Authorized from "./Authorized";
import userService from './UserService'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    onLogin() {
        userService
            .getUser()
            .then((user) => {
                this.setState({user: user});
                history.push('/');
            })
    }

    render() {
        console.log(!!this.state.user);
        return (
            <Router history={history}>
                    <Switch>
                        <Route path='/login' component={() => <LoginPage onLogin={this.onLogin.bind(this)}/>} />
                        <Authorized loggedIn={!!this.state.user}>
                            <Navigation/>
                            <Route exact path='/' component={DeliveryRoute} />
                            <Route path='/trasa' component={DeliveryRoute} />
                            <Route path='/skaner' component={Scanner} />
                        </Authorized>
                        <Route path='*' component={NotFound} />
                    </Switch>
            </Router>
        );
    }
}

export default App;
