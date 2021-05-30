import React, { useContext } from 'react';
import Promise from 'bluebird';
import { loginUser } from '../api';
import jwt from 'jsonwebtoken';

const LOCAL_STORAGE_AUTH_TOKEN_NAME = 'auth_token';

const AuthContext = React.createContext({});

/**
 *
 */
export default AuthContext;

/**
 *
 */
export function useAuth() {

    return useContext(AuthContext);
}

/**
 *
 */
export function withAuth(Component) {

    return (props) => (
        <AuthContext.Consumer>{value =>
            <Component {...props} auth={value} />
        }</AuthContext.Consumer>
    );
}

/**
 * Ideally should use "chrome.storage" API instead of "localStorage". But it works fine either way.
 */
export class AuthProvider extends React.Component {

    state = {
        token: localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_NAME),
    };

    isLoggedIn = () => {

        return this.state.token !== null;
    };

    login = formData => {

        return loginUser(formData)
            .then(({ token }) => {
                localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_NAME, token);
                this.setState({ token: jwt.decode(token) });
            });
    };

    logout = () => {

        return Promise.resolve()
            .then(() => {
                localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_NAME);
                this.setState({ token: null });
            });
    };

    render() {

        return (
            <AuthContext.Provider value={{
                isLoggedIn: this.isLoggedIn,
                login:      this.login,
                logout:     this.logout,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
