import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import useAuthStore from '../stores/authStore';
import useUIStore from '../stores/uiStore';

/**
 * Register Page - Enhanced with auth store and toast notifications
 * Assignment 14: Includes county selection and Kenyan phone validation
 */
function RegisterPage() {
    const navigate = useNavigate();
    const { register, loading, error, clearError } = useAuthStore();
    const { showSuccess, showError } = useUIStore();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        county: ''
    });
    const [validationError, setValidationError] = useState('');

    // Kenyan counties for dropdown
    const kenyanCounties = [
        'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika',
        'Machakos', 'Kiambu', 'Nyeri', 'Meru', 'Kakamega', 'Kisii',
        'Bungoma', 'Kitale', 'Garissa', 'Malindi', 'Lamu', 'Kilifi'
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear errors when user starts typing
        if (validationError) {
            setValidationError('');
        }
        if (error) {
            clearError();
        }
    };

    const validateKenyanPhone = (phone) => {
        const pattern = /^(\+254|0)[17]\d{8}$/;
        return pattern.test(phone.replace(/[\s-]/g, ''));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setValidationError('Passwords do not match');
            showError('Passwords do not match');
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setValidationError('Password must be at least 6 characters long');
            showError('Password must be at least 6 characters long');
            return;
        }

        // Validate Kenyan phone number
        if (!validateKenyanPhone(formData.phoneNumber)) {
            setValidationError('Invalid Kenyan phone number. Must start with +254 or 07/01');
            showError('Invalid Kenyan phone number format');
            return;
        }

        const result = await register(
            formData.name,
            formData.email,
            formData.password,
            formData.phoneNumber,
            formData.county
        );

        if (result.success) {
            showSuccess('Registration successful! Please login to continue.');
            navigate('/login');
        } else {
            showError(result.error || 'Registration failed. Please try again.');
        }
    };

    const displayError = validationError || error;

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '60px', background: '#f8fafc', minHeight: '100vh' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow-sm border-0" style={{ borderRadius: '16px' }}>
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <div className="mb-3">
                                        <i className="bi bi-person-plus-fill text-primary" style={{ fontSize: '3rem' }}></i>
                                    </div>
                                    <h2 className="mb-2">Create Account</h2>
                                    <p className="text-muted">Join Tiketi Afrika</p>
                                </div>

                                {displayError && (
                                    <Alert
                                        variant="danger"
                                        dismissible
                                        onClose={() => {
                                            setValidationError('');
                                            clearError();
                                        }}
                                    >
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        {displayError}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <i className="bi bi-person me-2"></i>
                                            Full Name *
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Kamau"
                                            required
                                            disabled={loading}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <i className="bi bi-envelope me-2"></i>
                                            Email Address *
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

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    <i className="bi bi-lock me-2"></i>
                                                    Password *
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    placeholder="Min. 6 characters"
                                                    required
                                                    disabled={loading}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    <i className="bi bi-lock-fill me-2"></i>
                                                    Confirm Password *
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    placeholder="Re-enter password"
                                                    required
                                                    disabled={loading}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <i className="bi bi-phone me-2"></i>
                                            Phone Number * (Kenyan)
                                        </Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="+254712345678 or 0712345678"
                                            required
                                            disabled={loading}
                                        />
                                        <Form.Text className="text-muted">
                                            Format: +254712345678 or 0712345678
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>
                                            <i className="bi bi-geo-alt me-2"></i>
                                            County *
                                        </Form.Label>
                                        <Form.Select
                                            name="county"
                                            value={formData.county}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                        >
                                            <option value="">Select your county</option>
                                            {kenyanCounties.map(county => (
                                                <option key={county} value={county}>{county}</option>
                                            ))}
                                        </Form.Select>
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
                                                Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-person-plus me-2"></i>
                                                Register
                                            </>
                                        )}
                                    </Button>

                                    <div className="text-center">
                                        <p className="text-muted mb-0">
                                            Already have an account? <Link to="/login">Login here</Link>
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

export default RegisterPage;
