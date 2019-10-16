import React, {useState, useEffect} from 'react';
import Scanner from "./Scanner/Scanner.jsx"
import DeliveryRoute from "./DeliveryRoute/DeliveryRoute"
import Navigation from "./Navigation/Navigation"
import NotFound from "./NotFound/NotFound";
import history from "./Service/history"
import {Router, Route, Switch} from 'react-router-dom';
import LoginPage from "./Auth/LoginPage";
import Authorized from "./Auth/Authorized";
import userService from './UserService'
import Header from "./Header/Header";

const App = () => {
    const [user, setUser] = useState(null);
    const [store, setStore] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);


    useEffect(() => {
        onLogin();
    }, []);


    const onLogin = () => {
        setUser(true);

        userService
            .getUser()
            .then((user) => {
                setUser(user);
                setLoadingUser(false);

                userService.getStore()
                    .then((store) => {
                        setStore(store);
                        history.push('/fry/trasa');
                    })
            })
            .catch(() => {
                setLoadingUser(false);
            })
    };

    const onLogout = () => {
        setUser(null);
        history.push('/fry/login');
    };

    return (
        <Router history={history}>
            <Switch>
                {!loadingUser && !user &&
                    <Route
                        path='/fry/login'
                        component={() => <LoginPage onLogin={onLogin}/>}
                    />
                }
                <Authorized loggedIn={!!user}>
                    <Header onLogout={() => onLogout()}/>
                    <Route exact path='/' component={DeliveryRoute} />
                    <Route path='/fry/trasa' component={() => <DeliveryRoute store={store}/>} />
                    <Route path='/fry/skaner' component={Scanner} />
                    <Navigation/>
                </Authorized>
                <Route path='*' component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             user: null,
//             store: null,
//             loadingUser: true,
//         }
//     }
//
//     componentWillMount() {
//         this.onLogin();
//     }
//
//     onLogin() {
//         this.setState({
//             loadingUser: true
//         });
//
//         userService
//             .getUser()
//             .then((user) => {
//                 this.setState({
//                     user: user,
//                     loadingUser: false,
//                 });
//
//                 userService.getStore()
//                     .then((store) => {
//                         this.setState({store: store});
//                         history.push('/fry/trasa');
//                     })
//             })
//             .catch(() => {
//                 this.setState({
//                     loadingUser: false,
//                 });
//             })
//     }
//
//     onLogout() {
//         this.setState({user: null});
//         history.push('/fry/login');
//     }
//
//     render() {
//         return (
//             <Router history={history}>
//                 <Switch>
//                     {!this.state.loadingUser && !this.state.user &&
//                     <Route
//                         path='/fry/login'
//                         component={() => <LoginPage onLogin={this.onLogin.bind(this)}/>}
//                     />
//                     }
//                     <Authorized loggedIn={!!this.state.user}>
//                         <Header onLogout={() => this.onLogout()}/>
//                         <Route exact path='/' component={DeliveryRoute} />
//                         <Route path='/fry/trasa' component={() => <DeliveryRoute store={this.state.store}/>} />
//                         <Route path='/fry/skaner' component={Scanner} />
//                         <Navigation/>
//                     </Authorized>
//                     <Route path='*' component={NotFound} />
//                 </Switch>
//             </Router>
//         );
//     }
// }
//
// export default App;
