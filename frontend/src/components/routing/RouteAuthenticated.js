import React from 'react';
import { AuthState } from '../../contexts/auth';
import { Redirect, Route, useLocation } from 'react-router-dom';

/**
 *
 */
export default function RouteAuthenticated(props) {

    const { component: Component, ...restProps } = props,
        { pathname, search, hash } = useLocation(),
        url = pathname + search + hash;

    return (
        <AuthState.Consumer>{auth =>
            <Route {...restProps} render={() => auth
                ? <Component />
                : <Redirect to={`/login?return=${url}`} />
            } />
        }</AuthState.Consumer>
    );
};
