import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import useAuthStore from '../stores/authStore';
import useUIStore from '../stores/uiStore';

/**
 * Login Page - Enhanced with auth store and toast notifications
 * Assignment 14: JWT-based login with improved UX
 */
function LoginPage() {
    const navigate = useNavigate();
    const { login, loading, error, clearError } = useAuthStore();
    const { showSuccess, showError } = useUIStore();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) {
            clearError();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(formData.email, formData.password);

        if (result.success) {
            showSuccess('Login successful! Welcome back.');
            navigate('/');
        } else {
            showError(result.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '60px', background: '#f8fafc', minHeight: '100vh' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <Card className="shadow-sm border-0" style={{ borderRadius: '16px' }}>
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <div className="mb-3">
                                        <i className="bi bi-ticket-perforated-fill text-primary" style={{ fontSize: '3rem' }}></i>
                                    </div>
                                    <h2 className="mb-2">Welcome Back</h2>
                                    <p className="text-muted">Login to Tiketi Afrika</p>
                                </div>

                                {error && (
                                    <Alert variant="danger" dismissible onClose={clearError}>
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        {error}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <i className="bi bi-envelope me-2"></i>
                                            Email Address
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your.email@example.com"
                                            required
                                            disabled={loading}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>
                                            <i className="bi bi-lock me-2"></i>
                                            Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            required
                                            disabled={loading}
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100 mb-3"
                                        disabled={loading}
                                        size="lg"
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    className="me-2"
                                                />
                                                Logging in...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                                Login
                                            </>
                                        )}
                                    </Button>

                                    <div className="text-center">
                                        <p className="text-muted mb-0">
                                            Don't have an account? <Link to="/register">Register here</Link>
                                        </p>
                                        <p className="text-muted mt-3 mb-0">
                                            <small className="text-info">
                                                <i className="bi bi-info-circle me-1"></i>
                                                Test account: test@tiketi.co.ke / password123
                                            </small>
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
