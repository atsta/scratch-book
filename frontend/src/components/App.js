import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthState } from '../contexts/auth';
import RouteAuthenticated from './routing/RouteAuthenticated';
import RouteUnauthenticated from './routing/RouteUnauthenticated';
import Home from './pages/home/Home';
import Faq from './pages/faq/Faq';
import About from './pages/about/About';
import AppBar from './appBar/AppBar';
import NotFound from './pages/notFound/NotFound';
import AccountInfo from './pages/accountInfo/AccountInfo';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import './App.scss';

/**
 *
 */
export default class App extends React.Component {

    state = {
        auth: false,
    };

    render() {

        return (
            <div className="w-100 h-100 d-flex flex-column bg-secondary">
                <AuthState.Provider value={this.state.auth}>
                    <Router>
                        <AppBar className="flex-shrink-0" />
                        <div className="flex-grow-1 mt-2 p-2 shadow bg-dark">
                            <Switch>
                                <Route path={['/', 'home']} exact={true} component={Home} />
                                <Route path="/about" component={About} />
                                <Route path="/faq" component={Faq} />
                                <RouteUnauthenticated path="/register" component={Register} />
                                <RouteUnauthenticated path="/login" component={Login} />
                                <RouteAuthenticated path="/account" component={AccountInfo} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </Router>
                </AuthState.Provider>
            </div>
        );
    }
};