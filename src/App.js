import React from 'react';
import Scanner from "./Scanner/Scanner.jsx"
import DeliveryRoute from "./DeliveryRoute/DeliveryRoute"
import Navigation from "./Navigation/Navigation"
import NotFound from "./NotFound/NotFound";
import {
    HashRouter,
    BrowserRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
        <div>
            <Navigation/>
            <Switch>
                <Route exact path='/trasa' component={DeliveryRoute} />
                <Route path='/skaner' component={Scanner} />
                <Route path='*' component={NotFound} />
            </Switch>
        </div>

        {/*<Scanner/>*/}
        {/*<Route/>*/}
    </BrowserRouter>
  );
}

export default App;
