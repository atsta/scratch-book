import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from 'react-bootstrap';

/**
 *
 */
export default function UserSection() {

    const { isLoggedIn, logout } = useAuth();

    return (
        <div className="d-flex align-items-center">
            {isLoggedIn() ? (
                <>
                    <Link to="/account">User Account</Link>
                    <Button variant="secondary" size="sm" className="ml-2" onClick={logout}>Log Out</Button>
                </>
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
