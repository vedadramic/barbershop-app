import React from 'react';
import './ServiceCard.css';

function ServiceCard({ service }) {
    return (
        <div className="service-card">
            {service.image_url && (
                <img src={service.image_url} alt={service.name} />
            )}
            <div className="service-content">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-details">
                    <span className="price">{service.price} KM</span>
                    <span className="duration">{service.duration} min</span>
                </div>
            </div>
        </div>
    );
}

export default ServiceCard;