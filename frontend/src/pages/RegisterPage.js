import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

/**
 * Register Page - User registration with Kenyan context
 * Assignment 14: Includes county selection and Kenyan phone validation
 */
function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        county: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
    };

    const validateKenyanPhone = (phone) => {
        const pattern = /^(\+254|0)[17]\d{8}$/;
        return pattern.test(phone.replace(/[\s-]/g, ''));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        // Validate Kenyan phone number
        if (!validateKenyanPhone(formData.phoneNumber)) {
            setError('Invalid Kenyan phone number. Must start with +254 or 07/01');
            return;
        }

        setLoading(true);

        const result = await register(
            formData.name,
            formData.email,
            formData.password,
            formData.phoneNumber,
            formData.county
        );

        if (result.success) {
            navigate('/login', { state: { message: 'Registration successful! Please login.' } });
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '60px', background: '#f8fafc', minHeight: '100vh' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow-sm border-0" style={{ borderRadius: '16px' }}>
                            <Card.Body className="p-5">
                                <h2 className="text-center mb-4">Create Account</h2>
                                <p className="text-center text-muted mb-4">Join Tiketi Afrika</p>

                                {error && <Alert variant="danger">{error}</Alert>}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Kamau"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email Address *</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your.email@example.com"
                                            required
                                        />
                                    </Form.Group>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Password *</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    placeholder="Min. 6 characters"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Confirm Password *</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    placeholder="Re-enter password"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number * (Kenyan)</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="+254712345678 or 0712345678"
                                            required
                                        />
                                        <Form.Text className="text-muted">
                                            Format: +254712345678 or 0712345678
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>County *</Form.Label>
                                        <Form.Select
                                            name="county"
                                            value={formData.county}
                                            onChange={handleChange}
                                            required
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
                                        {loading ? 'Creating Account...' : 'Register'}
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
