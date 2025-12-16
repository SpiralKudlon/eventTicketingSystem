import React from 'react';

/**
 * Testimonials Component - Customer reviews section
 */
function Testimonials() {
    const testimonials = [
        {
            name: 'Sarah Wanjiku',
            role: 'Event Enthusiast, Nairobi',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            text: "EventKE made booking tickets for Sauti Sol's concert so easy! The QR code worked perfectly at the venue. Best experience ever!",
            rating: 5
        },
        {
            name: 'James Ochieng',
            role: 'Tech Professional, Kisumu',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            text: 'I use EventKE for all tech conferences in Kenya. The platform is fast, reliable, and the email confirmations are always instant.',
            rating: 5
        },
        {
            name: 'Amina Hassan',
            role: 'Festival Lover, Mombasa',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
            text: 'From Mombasa Beach Festival to cultural events, EventKE has never disappointed. The prices in KES and mobile-friendly design are perfect!',
            rating: 5
        },
    ];

    return (
        <section className="section testimonials-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">
                        <i className="bi bi-chat-quote"></i>
                        Testimonials
                    </span>
                    <h2 className="section-title">What Our Customers Say</h2>
                    <p className="section-description">
                        Join thousands of happy customers who trust EventKE for their event ticketing needs
                    </p>
                </div>

                <div className="row g-4">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="col-md-6 col-lg-4">
                            <div className="testimonial-card">
                                <div className="testimonial-rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <i key={i} className="bi bi-star-fill"></i>
                                    ))}
                                </div>
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                <div className="testimonial-author">
                                    <img 
                                        src={testimonial.avatar} 
                                        alt={testimonial.name}
                                        className="testimonial-avatar"
                                    />
                                    <div className="testimonial-info">
                                        <h5>{testimonial.name}</h5>
                                        <p>{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
