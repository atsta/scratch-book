import React, { useContext } from 'react';
import { createUser, loginUser } from '../api';
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
export class AuthProvider extends React.Component {

    state = {
        token: localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_NAME),
    };

    isLoggedIn = () => {

        return this.state.token !== null;
    };

    register = formData => {

        return createUser(formData);
    };

    resetPassword = formData => {

        console.log('TODO: reset password');

        return Promise.resolve(formData);
    };

    login = formData => {

        return loginUser(formData)
            .then(({ token }) => {
                localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_NAME, token);
                this.setState({ token: jwt.decode(token) });
            });
    };

    logout = () => {

        console.log('TODO: inform server about logout?');

        localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_NAME);
        this.setState({ token: null });

        return Promise.resolve();
    };

    render() {

        return (
            <AuthContext.Provider value={{
                isLoggedIn: this.isLoggedIn,
                register: this.register,
                resetPassword: this.resetPassword,
                login: this.login,
                logout: this.logout,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
