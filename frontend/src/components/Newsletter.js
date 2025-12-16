import React, { useState } from 'react';

/**
 * Newsletter Component - Email subscription section
 */
function Newsletter() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <section className="newsletter-section">
            <div className="container">
                <div className="newsletter-content">
                    <h2 className="newsletter-title">
                        Never Miss an Event
                    </h2>
                    <p className="newsletter-description">
                        Subscribe to our newsletter and be the first to know about 
                        upcoming events, exclusive offers, and early bird tickets.
                    </p>
                    
                    {subscribed ? (
                        <div className="newsletter-success">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            Thanks for subscribing! Check your email for confirmation.
                        </div>
                    ) : (
                        <form className="newsletter-form" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                className="newsletter-input"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="newsletter-button">
                                Subscribe
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Newsletter;
