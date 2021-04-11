import React from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Redirect, Route } from 'react-router-dom';

/**
 *
 */
export default function RouteUnauthenticated(props) {

    const { component: Component, ...restProps } = props;

    return (
        <AuthContext.Consumer>{auth =>
            <Route {...restProps} render={props => auth.isLoggedIn()
                ? <Redirect to={`/`} />
                : <Component {...props} />
            } />
        }</AuthContext.Consumer>
    );
};
