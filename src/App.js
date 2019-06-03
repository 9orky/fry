import React from 'react';
import Scanner from "./Scanner/Scanner.jsx"
import DeliveryRoute from "./DeliveryRoute/DeliveryRoute"
import Navigation from "./Navigation/Navigation"
import NotFound from "./NotFound/NotFound";
import history from "./Service/history"
import {Router, Route, Switch} from 'react-router-dom';
import LoginPage from "./Auth/LoginPage";
import Authorized from "./Auth/Authorized";
import userService from './UserService'
import Logout from "./Logout/Logout";
import Header from "./Header/Header";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            store: null,
            loadingUser: true,
        }
    }

    componentWillMount() {
        this.onLogin();
    }

    onLogin() {
        this.setState({
            loadingUser: true
        });

        userService
            .getUser()
            .then((user) => {
                this.setState({
                    user: user,
                    loadingUser: false,
                });
                console.log(user);

                userService.getStore()
                    .then((store) => {
                        this.setState({store: store});
                        history.push('/trasa');
                    })
            })
            .catch(() => {
                this.setState({
                    loadingUser: false,
                });
            })
    }

    onLogout() {
        this.setState({user: null});
        history.push('/login')
    }

    render() {
        // console.log(this.state);
        return (
            <Router history={history}>
                <Switch>
                    {!this.state.loadingUser && !this.state.user &&
                        <Route
                            path='/login'
                            component={() => <LoginPage onLogin={this.onLogin.bind(this)}/>}
                        />
                    }
                    <Authorized loggedIn={!!this.state.user}>
                        <Header/>
                        <Logout onLogout={this.onLogout.bind(this)}/>
                        <Route exact path='/' component={DeliveryRoute} />
                        <Route path='/trasa' component={() => <DeliveryRoute store={this.state.store}/>} />
                        <Route path='/skaner' component={Scanner} />
                        <Navigation/>
                    </Authorized>
                    <Route path='*' component={NotFound} />
                </Switch>
            </Router>
        );
    }
}

export default App;
