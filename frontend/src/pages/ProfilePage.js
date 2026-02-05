import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import useAuthStore from '../stores/authStore';
import useUIStore from '../stores/uiStore';
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton';

/**
 * ProfilePage Component
 * Displays user profile with optimistic updates and loading skeletons
 */
function ProfilePage() {
    const { user, updateProfile, error, loading, clearError } = useAuthStore();
    const { showSuccess, showError } = useUIStore();

    // Local state for form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    // Simulating initial load time to show skeleton
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching delay
        const timer = setTimeout(() => {
            if (user) {
                setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    phoneNumber: user.phoneNumber || ''
                });
            }
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(formData);
            showSuccess('Profile updated successfully!');
            setIsEditing(false);
        } catch (err) {
            showError(err.message || 'Failed to update profile');
        }
    };

    if (isLoading) {
        return (
            <Container className="mt-5 mb-5 pt-5">
                <ProfileSkeleton />
            </Container>
        );
    }

    if (!user) {
        return (
            <Container className="mt-5 mb-5 pt-5 text-center">
                <Alert variant="warning">
                    Please log in to view your profile.
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5 mb-5 pt-5">
            <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                    <div className="d-flex flex-column align-items-center mb-4">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <h2 className="mb-1">{user.name}</h2>
                        <span className="badge bg-secondary mb-3">{user.role || 'USER'}</span>
                    </div>

                    <hr className="my-4" />

                    {error && (
                        <Alert variant="danger" dismissible onClose={clearError}>
                            {error}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={true} // Email usually not editable
                                    />
                                    <Form.Text className="text-muted">
                                        Email cannot be changed
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="+254..."
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="mt-4 d-flex justify-content-end gap-3">
                            {isEditing ? (
                                <>
                                    <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" type="submit" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </>
                            ) : (
                                <Button variant="primary" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProfilePage;
