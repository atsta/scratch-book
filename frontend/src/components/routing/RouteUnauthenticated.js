import React from 'react';
import { AuthState } from '../../contexts/auth';
import { Redirect, Route } from 'react-router-dom';

/**
 *
 */
export default function RouteUnauthenticated(props) {

    const { component: Component, ...restProps } = props;

    return (
        <AuthState.Consumer>{auth =>
            <Route {...restProps} render={() => auth
                ? <Redirect to={`/`} />
                : <Component />
            } />
        }</AuthState.Consumer>
    );
};
