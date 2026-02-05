import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Skeleton, { SkeletonText, SkeletonAvatar, SkeletonButton } from './Skeleton';

/**
 * Profile Skeleton
 * Placeholder for user profile page
 */
const ProfileSkeleton = () => {
    return (
        <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
                <div className="d-flex flex-column align-items-center mb-4">
                    {/* Avatar placeholder */}
                    <div className="mb-3">
                        <SkeletonAvatar size={100} />
                    </div>
                    {/* Name placeholder */}
                    <SkeletonText width={200} height={28} className="mb-2" />
                    {/* Role badge placeholder */}
                    <Skeleton variant="rectangular" width={80} height={24} style={{ borderRadius: '12px' }} />
                </div>

                <hr className="my-4" />

                <Row className="g-3">
                    {/* Email field */}
                    <Col md={6}>
                        <SkeletonText width="30%" height={16} className="mb-2" />
                        <Skeleton variant="rectangular" width="100%" height={38} className="rounded" />
                    </Col>
                    {/* Phone field */}
                    <Col md={6}>
                        <SkeletonText width="30%" height={16} className="mb-2" />
                        <Skeleton variant="rectangular" width="100%" height={38} className="rounded" />
                    </Col>
                    {/* Location field */}
                    <Col md={12}>
                        <SkeletonText width="20%" height={16} className="mb-2" />
                        <Skeleton variant="rectangular" width="100%" height={38} className="rounded" />
                    </Col>
                </Row>

                <div className="mt-4 d-flex justify-content-end">
                    <SkeletonButton width={120} />
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProfileSkeleton;
