import React from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Redirect, Route, useLocation } from 'react-router-dom';

/**
 *
 */
export default function RouteAuthenticated(props) {

    const { component: Component, ...restProps } = props,
        { pathname, search, hash } = useLocation(),
        url = pathname + search + hash;

    return (
        <AuthContext.Consumer>{auth =>
            <Route {...restProps} render={props => auth.isLoggedIn()
                ? <Component {...props} />
                : <Redirect to={`/login?return=${url}`} />
            } />
        }</AuthContext.Consumer>
    );
};
