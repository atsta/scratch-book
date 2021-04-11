import React, { useContext } from 'react';
import { createUser } from '../api';

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
        user: null,
    };

    isLoggedIn = () => {

        return this.state.user !== null;
    };

    register = formData => {

        return createUser(formData);
    };

    resetPassword = formData => {

        console.log('TODO: reset password');

        return Promise.resolve(formData);
    };

    login = formData => {

        console.log('TODO: login');

        const wereCredentialsCorrect = Math.random() < .5;

        return wereCredentialsCorrect
            ? Promise.resolve().then(() => {
                this.setState({ user: 'amazing_fake_user' });
            })
            : Promise.reject('Wrong credentials');
    };

    logout = () => {

        console.log('TODO: logout');

        this.setState({ user: null });

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
