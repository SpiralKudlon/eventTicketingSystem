import React from 'react';

/**
 * Categories Component - Event category cards with hover effects
 */
function Categories() {
    const categories = [
        {
            name: 'Concerts',
            icon: 'bi-music-note-beamed',
            image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600',
            count: 28,
            color: '#6366f1'
        },
        {
            name: 'Technology',
            icon: 'bi-laptop',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
            count: 15,
            color: '#8b5cf6'
        },
        {
            name: 'Festivals',
            icon: 'bi-balloon',
            image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600',
            count: 12,
            color: '#ec4899'
        },
        {
            name: 'Sports',
            icon: 'bi-trophy',
            image: 'https://images.unsplash.com/photo-1461896836934- voices-8024706?w=600',
            count: 8,
            color: '#10b981'
        },
        {
            name: 'Food & Drinks',
            icon: 'bi-cup-hot',
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
            count: 10,
            color: '#f97316'
        },
        {
            name: 'Art & Culture',
            icon: 'bi-palette',
            image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600',
            count: 6,
            color: '#14b8a6'
        },
    ];

    return (
        <section className="section categories-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">
                        <i className="bi bi-grid"></i>
                        Browse Categories
                    </span>
                    <h2 className="section-title">Explore By Category</h2>
                    <p className="section-description">
                        Find events that match your interests from our diverse collection of categories
                    </p>
                </div>

                <div className="row g-4">
                    {categories.map((category, index) => (
                        <div key={index} className="col-md-6 col-lg-4">
                            <a href={`/events?category=${category.name}`} className="category-card">
                                <img src={category.image} alt={category.name} />
                                <div className="category-content">
                                    <div className="category-icon" style={{ background: category.color }}>
                                        <i className={`bi ${category.icon}`}></i>
                                    </div>
                                    <h3 className="category-title">{category.name}</h3>
                                    <p className="category-count">{category.count} Events Available</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Categories;
