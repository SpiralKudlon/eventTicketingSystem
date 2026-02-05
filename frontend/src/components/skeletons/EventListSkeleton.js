import React from 'react';
import { Row, Col } from 'react-bootstrap';
import EventCardSkeleton from './EventCardSkeleton';

/**
 * Event List Skeleton
 * Displays a grid of EventCardSkeletons
 * 
 * @param {Object} props
 * @param {number} props.count - Number of skeletons to display
 */
const EventListSkeleton = ({ count = 6 }) => {
    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {Array.from({ length: count }).map((_, index) => (
                <Col key={index}>
                    <EventCardSkeleton />
                </Col>
            ))}
        </Row>
    );
};

export default EventListSkeleton;
