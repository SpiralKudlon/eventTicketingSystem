import React from 'react';
import './Skeleton.css';

/**
 * Reusable Skeleton Component
 * Displays animated placeholder while content is loading
 * 
 * @param {Object} props
 * @param {string} props.variant - Shape variant: 'text', 'circular', 'rectangular'
 * @param {number|string} props.width - Width in pixels or percentage
 * @param {number|string} props.height - Height in pixels or percentage
 * @param {string} props.animation - Animation type: 'pulse', 'wave', 'none'
 * @param {string} props.className - Additional CSS classes
 */
const Skeleton = ({
    variant = 'text',
    width,
    height,
    animation = 'wave',
    className = '',
    style = {},
}) => {
    const getSkeletonStyle = () => {
        const baseStyle = {
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            ...style,
        };

        // Default heights for variants
        if (!height) {
            if (variant === 'text') {
                baseStyle.height = '1em';
            } else if (variant === 'circular') {
                baseStyle.height = baseStyle.width || '40px';
            }
        }

        // Default widths for variants
        if (!width) {
            if (variant === 'text') {
                baseStyle.width = '100%';
            } else if (variant === 'circular') {
                baseStyle.width = '40px';
            }
        }

        return baseStyle;
    };

    const classes = [
        'skeleton',
        `skeleton--${variant}`,
        animation !== 'none' ? `skeleton--${animation}` : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return <div className={classes} style={getSkeletonStyle()} />;
};

/**
 * Skeleton Text Component
 * Convenience component for text skeletons
 */
export const SkeletonText = ({ lines = 1, width = '100%', spacing = 8, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${spacing}px` }}>
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton
                    key={index}
                    variant="text"
                    width={index === lines - 1 && lines > 1 ? '80%' : width}
                    {...props}
                />
            ))}
        </div>
    );
};

/**
 * Skeleton Avatar Component
 * Convenience component for circular avatars
 */
export const SkeletonAvatar = ({ size = 40, ...props }) => {
    return <Skeleton variant="circular" width={size} height={size} {...props} />;
};

/**
 * Skeleton Button Component
 * Convenience component for button skeletons
 */
export const SkeletonButton = ({ width = 100, height = 36, ...props }) => {
    return <Skeleton variant="rectangular" width={width} height={height} {...props} />;
};

export default Skeleton;
