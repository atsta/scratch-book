import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useLocation, useHistory } from 'react-router-dom'

/**
 *
 */
export default function Login() {

    const { login } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const returnToPage = new URLSearchParams(location.search).get('return') || '/';

    async function handleSubmit(e) {

        e.preventDefault();

        const formData = new FormData(e.target);

        try {
            setError('');
            setLoading(true);
            await login(formData);
            history.push(returnToPage);
        }
        catch {
            setError('Failed to log in');
            setLoading(false);
        }
    }

    return (
        <div className="w-100 h-100 d-flex flex-column align-items-center pt-4">
            <Card className="w-100" style={{ maxWidth: 400 }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 text-white-50">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}
