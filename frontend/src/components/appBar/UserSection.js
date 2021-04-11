import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 *
 */
export default function UserSection() {

    const { isLoggedIn } = useAuth();

    return (
        <div className="d-flex align-items-center">
            {isLoggedIn() ? (
                <Link to="/account">User Account</Link>
            ) : (
                <div>
                    <Link to="/login">Login</Link>
                    {' '}or{' '}
                    <Link to="/signup">Sign Up</Link>
                </div>
            )}
        </div>
    );
};
