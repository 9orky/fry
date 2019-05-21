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

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                    <Switch>
                        <Route path='/login' component={LoginPage} />
                        <Authorized loggedIn={false}>
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
