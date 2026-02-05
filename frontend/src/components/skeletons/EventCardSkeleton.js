import React from 'react';
import Skeleton, { SkeletonText, SkeletonButton } from './Skeleton';
import { Card } from 'react-bootstrap';

/**
 * Event Card Skeleton
 * Placeholder for EventCard component
 */
const EventCardSkeleton = () => {
    return (
        <Card className="h-100 shadow-sm border-0">
            {/* Image Placeholder */}
            <div style={{ height: '200px', overflow: 'hidden' }}>
                <Skeleton variant="rectangular" width="100%" height="100%" />
            </div>

            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between mb-2">
                    {/* Category badge placeholder */}
                    <Skeleton variant="rectangular" width={80} height={24} style={{ borderRadius: '12px' }} />
                    {/* Price placeholder */}
                    <Skeleton variant="text" width={60} />
                </div>

                {/* Title placeholder */}
                <Card.Title className="mb-3">
                    <SkeletonText lines={1} height={24} width="80%" />
                </Card.Title>

                <div className="mb-3 flex-grow-1">
                    {/* Date placeholder */}
                    <div className="d-flex align-items-center mb-2">
                        <Skeleton variant="circular" width={16} height={16} className="me-2" />
                        <Skeleton variant="text" width="60%" />
                    </div>
                    {/* Location placeholder */}
                    <div className="d-flex align-items-center">
                        <Skeleton variant="circular" width={16} height={16} className="me-2" />
                        <Skeleton variant="text" width="50%" />
                    </div>
                </div>

                {/* Button placeholder */}
                <SkeletonButton width="100%" />
            </Card.Body>
        </Card>
    );
};

export default EventCardSkeleton;
