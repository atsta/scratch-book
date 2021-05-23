import React, { useState } from 'react';
import { Card, Form, Alert, Button } from 'react-bootstrap';

/**
 *
 */
export default function Login(props) {

    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(arguments);
    }

    return (
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
            </Card.Body>
        </Card>
    );
};
