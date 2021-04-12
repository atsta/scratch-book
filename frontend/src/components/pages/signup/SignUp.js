import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'

/**
 *
 */
export default function SignUp() {

    const { register } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {

        e.preventDefault();

        const formData = new FormData(e.target);

        if(formData.get('password') !== formData.get('password-confirm')) {
            return setError('Passwords do not match');
        }
        formData.delete('password-confirm');

        try {
            setError('');
            setLoading(true);
            await register(formData);
            history.push('/');
        }
        catch {
            setError('Failed to create an account');
            setLoading(false);
        }
    }

    return (
        <div className="w-100 h-100 d-flex flex-column align-items-center pt-4">
            <Card className="w-100" style={{ maxWidth: 400 }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control name="password-confirm" type="password" required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 text-white-50">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
    )
};
