import React, { useState } from 'react';

/**
 * Newsletter Component - Email subscription section
 */
function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubscribed(true);
        setIsLoading(false);
        setEmail('');
    };

    return (
        <section className="newsletter-section" style={{
            padding: '80px 0',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated background shapes */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                opacity: '0.1',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>

            {/* Floating shapes */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '5%',
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                animation: 'float 6s ease-in-out infinite'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '60px',
                height: '60px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                transform: 'rotate(45deg)',
                animation: 'float 4s ease-in-out infinite'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        {/* Icon */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px'
                        }}>
                            <i className="bi bi-envelope-heart" style={{
                                fontSize: '2rem',
                                color: 'white'
                            }}></i>
                        </div>

                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '800',
                            color: 'white',
                            marginBottom: '16px'
                        }}>
                            Never Miss an Event
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'rgba(255,255,255,0.85)',
                            marginBottom: '40px',
                            maxWidth: '500px',
                            margin: '0 auto 40px'
                        }}>
                            Subscribe to our newsletter and be the first to know about exclusive events, 
                            early bird tickets, and special discounts!
                        </p>

                        {/* Subscription Form */}
                        {!isSubscribed ? (
                            <form onSubmit={handleSubmit} style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '12px',
                                maxWidth: '500px',
                                margin: '0 auto',
                                flexWrap: 'wrap',
                                justifyContent: 'center'
                            }}>
                                <div style={{ flex: '1', minWidth: '250px' }}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '16px 24px',
                                            fontSize: '1rem',
                                            border: 'none',
                                            borderRadius: '50px',
                                            background: 'rgba(255,255,255,0.95)',
                                            color: '#1e293b',
                                            outline: 'none',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    style={{
                                        padding: '16px 32px',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        border: 'none',
                                        borderRadius: '50px',
                                        background: '#0f172a',
                                        color: 'white',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,0,0,0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
                                    }}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Subscribing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-send"></i>
                                            Subscribe
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div style={{
                                background: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '16px',
                                padding: '24px 40px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'rgba(16, 185, 129, 0.3)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <i className="bi bi-check-lg" style={{
                                        fontSize: '1.5rem',
                                        color: 'white'
                                    }}></i>
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h5 style={{
                                        color: 'white',
                                        fontWeight: '700',
                                        margin: '0 0 4px 0'
                                    }}>You're subscribed!</h5>
                                    <p style={{
                                        color: 'rgba(255,255,255,0.8)',
                                        margin: 0,
                                        fontSize: '0.9rem'
                                    }}>Check your email for a welcome message</p>
                                </div>
                            </div>
                        )}

                        {/* Trust badges */}
                        <div style={{
                            marginTop: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '30px',
                            flexWrap: 'wrap'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: 'rgba(255,255,255,0.8)'
                            }}>
                                <i className="bi bi-shield-check" style={{ fontSize: '1.25rem' }}></i>
                                <span style={{ fontSize: '0.9rem' }}>No Spam</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: 'rgba(255,255,255,0.8)'
                            }}>
                                <i className="bi bi-clock" style={{ fontSize: '1.25rem' }}></i>
                                <span style={{ fontSize: '0.9rem' }}>Weekly Updates</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: 'rgba(255,255,255,0.8)'
                            }}>
                                <i className="bi bi-x-circle" style={{ fontSize: '1.25rem' }}></i>
                                <span style={{ fontSize: '0.9rem' }}>Unsubscribe Anytime</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add floating animation */}
            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                    }
                `}
            </style>
        </section>
    );
}

export default Newsletter;
