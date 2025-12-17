import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

/**
 * Login Page - User authentication
 * Assignment 14: Simple JWT-based login
 */
function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '60px', background: '#f8fafc', minHeight: '100vh' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <Card className="shadow-sm border-0" style={{ borderRadius: '16px' }}>
                            <Card.Body className="p-5">
                                <h2 className="text-center mb-4">Welcome Back</h2>
                                <p className="text-center text-muted mb-4">Login to Tiketi Afrika</p>

                                {error && <Alert variant="danger">{error}</Alert>}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your.email@example.com"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100 mb-3"
                                        disabled={loading}
                                        size="lg"
                                    >
                                        {loading ? 'Logging in...' : 'Login'}
                                    </Button>

                                    <div className="text-center">
                                        <p className="text-muted mb-0">
                                            Don't have an account? <Link to="/register">Register here</Link>
                                        </p>
                                        <p className="text-muted mt-2">
                                            <small>Test account: test@tiketi.co.ke / password123</small>
                                        </p>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LoginPage;
