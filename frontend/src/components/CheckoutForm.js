import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaUser, FaPhone, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

function CheckoutForm({ event, onSubmit, loading }) {
    const [formData, setFormData] = useState({
        userName: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateName = (name) => {
        if (!name.trim()) {
            return 'Name is required';
        }
        if (name.trim().length < 2) {
            return 'Name must be at least 2 characters';
        }
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            return 'Name can only contain letters and spaces';
        }
        return '';
    };

    const validatePhone = (phone) => {
        if (!phone.trim()) {
            return 'Phone number is required';
        }
        const phoneRegex = /^(\+254|0)[17]\d{8}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            return 'Enter valid Kenyan number (e.g., +254712345678 or 0712345678)';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = name === 'userName' ? validateName(value) : validatePhone(value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = name === 'userName' ? validateName(value) : validatePhone(value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nameError = validateName(formData.userName);
        const phoneError = validatePhone(formData.phoneNumber);

        if (nameError || phoneError) {
            setErrors({
                userName: nameError,
                phoneNumber: phoneError
            });
            setTouched({
                userName: true,
                phoneNumber: true
            });
            return;
        }

        onSubmit(formData);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <Alert variant="info" className="mb-4">
                <h5 className="alert-heading">M-Pesa Payment</h5>
                <p className="mb-0">
                    You will receive an M-Pesa prompt on your phone to complete the payment of {formatPrice(event.priceKES)}.
                </p>
            </Alert>

            <Form.Group className="mb-4">
                <Form.Label htmlFor="userName" className="fw-semibold">
                    <FaUser className="me-2" aria-hidden="true" />
                    Full Name
                    <span className="text-danger" aria-label="required">*</span>
                </Form.Label>
                <Form.Control
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.userName && errors.userName}
                    isValid={touched.userName && !errors.userName && formData.userName}
                    disabled={loading}
                    aria-required="true"
                    aria-invalid={touched.userName && errors.userName ? 'true' : 'false'}
                    aria-describedby={errors.userName ? 'userName-error' : undefined}
                />
                {touched.userName && errors.userName && (
                    <Form.Control.Feedback type="invalid" id="userName-error" role="alert">
                        <FaExclamationCircle className="me-1" aria-hidden="true" />
                        {errors.userName}
                    </Form.Control.Feedback>
                )}
                {touched.userName && !errors.userName && formData.userName && (
                    <Form.Control.Feedback type="valid">
                        <FaCheckCircle className="me-1" aria-hidden="true" />
                        Looks good!
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label htmlFor="phoneNumber" className="fw-semibold">
                    <FaPhone className="me-2" aria-hidden="true" />
                    M-Pesa Phone Number
                    <span className="text-danger" aria-label="required">*</span>
                </Form.Label>
                <Form.Control
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+254712345678 or 0712345678"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.phoneNumber && errors.phoneNumber}
                    isValid={touched.phoneNumber && !errors.phoneNumber && formData.phoneNumber}
                    disabled={loading}
                    aria-required="true"
                    aria-invalid={touched.phoneNumber && errors.phoneNumber ? 'true' : 'false'}
                    aria-describedby={errors.phoneNumber ? 'phoneNumber-error phoneNumber-help' : 'phoneNumber-help'}
                />
                <Form.Text id="phoneNumber-help" className="text-muted">
                    Enter your Safaricom or Airtel number for M-Pesa payment
                </Form.Text>
                {touched.phoneNumber && errors.phoneNumber && (
                    <Form.Control.Feedback type="invalid" id="phoneNumber-error" role="alert">
                        <FaExclamationCircle className="me-1" aria-hidden="true" />
                        {errors.phoneNumber}
                    </Form.Control.Feedback>
                )}
                {touched.phoneNumber && !errors.phoneNumber && formData.phoneNumber && (
                    <Form.Control.Feedback type="valid">
                        <FaCheckCircle className="me-1" aria-hidden="true" />
                        Valid M-Pesa number
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <div className="d-grid">
                <Button
                    variant="success"
                    type="submit"
                    size="lg"
                    disabled={loading}
                    aria-label={loading ? 'Processing payment' : `Pay ${formatPrice(event.priceKES)} via M-Pesa`}
                >
                    {loading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Processing...
                        </>
                    ) : (
                        <>Pay {formatPrice(event.priceKES)} via M-Pesa</>
                    )}
                </Button>
            </div>

            <p className="text-center text-muted small mt-3 mb-0">
                Secure payment powered by M-Pesa
            </p>
        </Form>
    );
}

export default CheckoutForm;
