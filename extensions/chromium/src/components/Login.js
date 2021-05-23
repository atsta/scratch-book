import React, { useEffect, useState } from 'react';
import { Card, Form, Alert, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

/**
 *
 */
export default function Login(props) {

    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const { login } = useAuth();
    let promise = null;

    useEffect(() => {
        return () => { promise && promise.cancel(); };
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        // formData.set('email', 'petros@scratchbook.com');
        // formData.set('password', '123123123_');
        setLoading(true);
        promise = login(formData)
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }

    const frontendHost = process.env.REACT_APP_FRONTEND_ORIGIN.replace(/^https?:\/\//, '');

    return (
        <div className="p-3 bg-dark" style={{ minWidth: 400, minHeight: 400 }}>
            <header className="text-white text-center mb-3">
                <div className="Logo text-white pr-3 d-flex justify-content-center align-items-center mb-2">
                    <span className="fa fa-book-open fa-2x font-italic" />
                    <span className="ml-3" style={{ fontSize: '1.5em' }}>ScratchBook extension</span>
                </div>
            </header>
            <section className="mt-2 mb-2">
                <p className="alert alert-info small mb-0 text-center">
                    <span className="fa fa-info-circle" />
                    {' '}In order to create or manage your account,<br/> please visit
                    {' '}<a href={process.env.REACT_APP_FRONTEND_ORIGIN} target="_blank">{frontendHost}</a>.
                </p>
            </section>
            <Card className="w-100" style={{ maxWidth: 400 }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" required /* TODO: remove default value */
                                defaultValue={'petros@scratchbook.com'} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" required /* TODO: remove default value */
                                defaultValue={'123123123'} />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Log In
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};
