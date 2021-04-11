import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom'

/**
 *
 */
export default function ForgotPassword() {

    const { resetPassword } = useAuth();
    const [ error, setError ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ loading, setLoading ] = useState(false);

    async function handleSubmit(e) {
        
        e.preventDefault();

        const formData = new FormData(e.target);

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(formData);
            setMessage('Check your inbox for further instructions');
        }
        catch {
            setError('Failed to reset password');
        }
        setLoading(false);
    }

    return (
        <div className="w-100 h-100 d-flex flex-column align-items-center pt-4">
            <Card className="w-100" style={{ maxWidth: 400 }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 text-white-50">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}
