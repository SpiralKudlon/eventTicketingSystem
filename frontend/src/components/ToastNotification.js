import React, { useEffect } from 'react';
import { Toast as BootstrapToast, ToastContainer } from 'react-bootstrap';
import useUIStore from '../stores/uiStore';

/**
 * Toast Component - Global notification system
 * Displays toast notifications from the UI store
 */
function ToastNotification() {
    const { toasts, removeToast } = useUIStore();

    const getVariant = (type) => {
        switch (type) {
            case 'success':
                return 'success';
            case 'error':
                return 'danger';
            case 'warning':
                return 'warning';
            case 'info':
            default:
                return 'info';
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return 'bi-check-circle-fill';
            case 'error':
                return 'bi-x-circle-fill';
            case 'warning':
                return 'bi-exclamation-triangle-fill';
            case 'info':
            default:
                return 'bi-info-circle-fill';
        }
    };

    return (
        <ToastContainer
            position="top-end"
            className="p-3"
            style={{ zIndex: 9999 }}
        >
            {toasts.map((toast) => (
                <BootstrapToast
                    key={toast.id}
                    onClose={() => removeToast(toast.id)}
                    show={true}
                    delay={toast.duration}
                    autohide={toast.duration > 0}
                    bg={getVariant(toast.type)}
                >
                    <BootstrapToast.Header>
                        <i className={`bi ${getIcon(toast.type)} me-2`}></i>
                        <strong className="me-auto">
                            {toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}
                        </strong>
                        <small>just now</small>
                    </BootstrapToast.Header>
                    <BootstrapToast.Body className={toast.type === 'error' || toast.type === 'warning' ? 'text-white' : ''}>
                        {toast.message}
                    </BootstrapToast.Body>
                </BootstrapToast>
            ))}
        </ToastContainer>
    );
}

export default ToastNotification;
