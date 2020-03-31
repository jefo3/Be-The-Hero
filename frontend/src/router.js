import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Dashboard} />
                
                <Route path="/login" component={ Logon } />
                <Route path="/register" component={ Register } />

                <Route path="/profile" component={ Profile }/>
                <Route path="/incident/new" component={ NewIncident } />

                <Route path="/details" component={Details} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;