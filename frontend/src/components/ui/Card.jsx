import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    className = '',
    hover = true,
    glass = false,
    onClick,
    padding = 'md',
}) => {
    const baseClasses = 'rounded-xl transition-all duration-300';

    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        none: '',
    };

    const backgroundClasses = glass
        ? 'glass shadow-card'
        : 'bg-white shadow-card';

    const hoverClasses = hover ? 'card-hover cursor-pointer' : '';

    return (
        <motion.div
            className={`
        ${baseClasses}
        ${backgroundClasses}
        ${paddingClasses[padding]}
        ${hoverClasses}
        ${className}
      `}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {children}
        </motion.div>
    );
};

export default Card;
