import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaTicketAlt, FaMapMarkerAlt, FaCalendarAlt, FaQrcode } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';

function TicketConfirmation({ show, onHide, ticketData }) {
    if (!ticketData) return null;

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

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            aria-labelledby="ticket-confirmation-title"
            aria-describedby="ticket-confirmation-description"
        >
            <Modal.Header closeButton>
                <Modal.Title id="ticket-confirmation-title">
                    <FaCheckCircle className="text-success me-2" aria-hidden="true" />
                    Ticket Confirmed
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Alert variant="success" className="mb-4">
                    <Alert.Heading className="h5">
                        Payment Successful!
                    </Alert.Heading>
                    <p id="ticket-confirmation-description" className="mb-0">
                        Your ticket has been confirmed. A confirmation email has been sent to your inbox.
                    </p>
                </Alert>

                <div className="text-center mb-4 p-4 bg-light rounded">
                    <div className="mb-3">
                        <FaQrcode className="text-muted mb-2" size={24} aria-hidden="true" />
                        <p className="small text-muted mb-2">Scan this QR code at the venue</p>
                    </div>
                    <div
                        className="d-inline-block p-3 bg-white rounded shadow-sm"
                        role="img"
                        aria-label={`QR code for ticket ${ticketData.ticketCode}`}
                    >
                        <QRCodeSVG
                            value={ticketData.ticketCode}
                            size={200}
                            level="H"
                            includeMargin={false}
                        />
                    </div>
                    <div className="mt-3">
                        <strong className="d-block">Ticket Code</strong>
                        <code
                            className="fs-5 text-primary"
                            aria-label={`Ticket code: ${ticketData.ticketCode}`}
                        >
                            {ticketData.ticketCode}
                        </code>
                    </div>
                </div>

                <div className="border rounded p-3 mb-3">
                    <h6 className="fw-bold mb-3">Event Details</h6>
                    <dl className="row mb-0">
                        <dt className="col-sm-4 text-muted">
                            <FaTicketAlt className="me-2" aria-hidden="true" />
                            Event
                        </dt>
                        <dd className="col-sm-8">{ticketData.eventName}</dd>

                        <dt className="col-sm-4 text-muted">
                            <FaMapMarkerAlt className="me-2" aria-hidden="true" />
                            Location
                        </dt>
                        <dd className="col-sm-8">{ticketData.eventLocation}</dd>

                        <dt className="col-sm-4 text-muted">
                            <FaCalendarAlt className="me-2" aria-hidden="true" />
                            Date & Time
                        </dt>
                        <dd className="col-sm-8">
                            <time dateTime={ticketData.eventDate}>
                                {formatDate(ticketData.eventDate)}
                            </time>
                        </dd>
                    </dl>
                </div>

                <div className="border rounded p-3 mb-3">
                    <h6 className="fw-bold mb-3">Payment Details</h6>
                    <dl className="row mb-0">
                        <dt className="col-sm-4 text-muted">Quantity</dt>
                        <dd className="col-sm-8">{ticketData.quantity} ticket(s)</dd>

                        <dt className="col-sm-4 text-muted">Total Paid</dt>
                        <dd className="col-sm-8 fw-bold text-success">
                            {formatPrice(ticketData.totalPrice)}
                        </dd>

                        <dt className="col-sm-4 text-muted">Payment Method</dt>
                        <dd className="col-sm-8">M-Pesa</dd>
                    </dl>
                </div>

                <Alert variant="info" className="mb-0">
                    <h6 className="alert-heading">Important Information</h6>
                    <ul className="mb-0 ps-3">
                        <li>Present this QR code or ticket code at the venue entrance</li>
                        <li>Arrive at least 30 minutes before the event starts</li>
                        <li>This ticket is non-refundable and non-transferable</li>
                        <li>Keep this confirmation for your records</li>
                    </ul>
                </Alert>
            </Modal.Body>

            <Modal.Footer className="justify-content-between">
                <Button
                    variant="outline-primary"
                    onClick={() => window.print()}
                    aria-label="Print ticket"
                >
                    Print Ticket
                </Button>
                <Button
                    variant="primary"
                    onClick={onHide}
                    aria-label="Close confirmation and return to events"
                >
                    Back to Events
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TicketConfirmation;
