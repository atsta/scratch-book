import React from 'react';
import { Card, Form, Alert, Button } from 'react-bootstrap';
import { withAuth } from '../contexts/AuthContext';

const frontendHost = process.env.REACT_APP_FRONTEND_ORIGIN.replace(/^https?:\/\//, '');

/**
 *
 */
export default withAuth(class Login extends React.Component {

    state = {
        error: null,
        loading: false,
    };
    promise = null;

    handleSubmit = event => {

        event.preventDefault();
        const formData = new FormData(event.target);
        this.setState({ loading: true });

        this.promise = this.props.auth.login(formData)
            .catch(error => {
                this.setState({ error: error.message, loading: false });
            });
    };

    render() {

        const { error, loading } = this.state;

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
                        {' '}In order to create or manage your account,<br/> please visit{' '}
                        <a href={process.env.REACT_APP_FRONTEND_ORIGIN} target="_blank" rel="noreferrer">
                            {frontendHost}
                        </a>.
                    </p>
                </section>
                <Card className="w-100" style={{ maxWidth: 400 }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={this.handleSubmit}>
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
            </div>
        );
    }

    componentWillUnmount() {

        this.promise && this.promise.cancel();
    }
});

