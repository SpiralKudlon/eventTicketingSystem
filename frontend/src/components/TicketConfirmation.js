import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { QRCodeSVG } from 'qrcode.react';

/**
 * TicketConfirmation Component - Displays ticket confirmation with QR code
 * Demonstrates props and state management with React Router
 */
function TicketConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const ticketData = location.state?.ticketData;

    if (!ticketData) {
        return (
            <Container className="mt-4">
                <Alert variant="warning">
                    <Alert.Heading>No Ticket Data Found</Alert.Heading>
                    <p>Please purchase a ticket first.</p>
                    <Button variant="primary" onClick={() => navigate('/')}>
                        Browse Events
                    </Button>
                </Alert>
            </Container>
        );
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES'
        }).format(price);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-KE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '60px', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', minHeight: '100vh' }}>
            <Container className="mb-5">
                <div className="text-center mb-4">
                    <div style={{ 
                        width: '100px', 
                        height: '100px', 
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
                    }}>
                        <i className="bi bi-check-lg" style={{ fontSize: '3rem', color: 'white' }}></i>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Ticket Purchased Successfully!</h1>
                    <p className="lead" style={{ color: '#64748b' }}>Your ticket has been confirmed and sent to your email</p>
                </div>

                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="border-0" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
                            <Card.Header className="text-white text-center py-4" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                                <h3 className="mb-0" style={{ fontWeight: 700 }}>
                                    <i className="bi bi-ticket-perforated me-2"></i>
                                    E-Ticket
                                </h3>
                            </Card.Header>
                        <Card.Body className="p-4">
                            <div className="text-center mb-4 p-4 bg-light rounded">
                                <QRCodeSVG
                                    value={ticketData.ticketCode}
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                />
                                <p className="mt-3 mb-0">
                                    <strong>Ticket Code:</strong>
                                    <br />
                                    <code className="fs-5">{ticketData.ticketCode}</code>
                                </p>
                            </div>

                            <div className="mb-3">
                                <h4 className="border-bottom pb-2 mb-3">Event Details</h4>

                                <div className="mb-3">
                                    <strong>Event Name:</strong>
                                    <p className="mb-1">{ticketData.eventName}</p>
                                </div>

                                <div className="mb-3">
                                    <strong>
                                        <i className="bi bi-geo-alt-fill me-1 text-primary"></i>
                                        Location:
                                    </strong>
                                    <p className="mb-1">{ticketData.eventLocation}</p>
                                </div>

                                <div className="mb-3">
                                    <strong>
                                        <i className="bi bi-calendar-event me-1 text-primary"></i>
                                        Date & Time:
                                    </strong>
                                    <p className="mb-1">{formatDate(ticketData.eventDate)}</p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <h4 className="border-bottom pb-2 mb-3">Ticket Details</h4>

                                <div className="mb-2">
                                    <strong>Quantity:</strong>
                                    <span className="float-end">{ticketData.quantity} ticket(s)</span>
                                </div>

                                <div className="mb-2">
                                    <strong>Total Paid:</strong>
                                    <span className="float-end text-success fw-bold">
                                        {formatPrice(ticketData.totalPrice)}
                                    </span>
                                </div>

                                <div className="mb-2">
                                    <strong>Purchase Date:</strong>
                                    <span className="float-end">
                                        {new Date(ticketData.purchaseDate).toLocaleDateString('en-KE')}
                                    </span>
                                </div>
                            </div>

                            <Alert variant="info" className="mt-4">
                                <Alert.Heading className="h6">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Important Instructions
                                </Alert.Heading>
                                <ul className="mb-0 small">
                                    <li>Present this QR code at the event entrance</li>
                                    <li>A confirmation email has been sent to your registered email</li>
                                    <li>Please arrive 30 minutes before the event starts</li>
                                    <li>This ticket is non-refundable and non-transferable</li>
                                </ul>
                            </Alert>

                            <div className="d-grid gap-2 mt-4">
                                <Button
                                    size="lg"
                                    onClick={() => window.print()}
                                    style={{ 
                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        padding: '14px',
                                        fontWeight: 600
                                    }}
                                >
                                    <i className="bi bi-printer me-2"></i>
                                    Print Ticket
                                </Button>
                                <Button
                                    variant="outline-primary"
                                    onClick={() => navigate('/events')}
                                    style={{ borderRadius: '12px', padding: '14px', fontWeight: 600 }}
                                >
                                    <i className="bi bi-calendar-event me-2"></i>
                                    Browse More Events
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div className="text-center mt-4">
                <p style={{ color: '#64748b' }}>
                    Thank you for your purchase! We look forward to seeing you at the event.
                </p>
            </div>
        </Container>
        </div>
    );
}

export default TicketConfirmation;
