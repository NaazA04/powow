import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../context/SoundContext';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon: Icon,
    className = '',
    type = 'button',
}) => {
    const { playClickSound } = useSound();

    const handleClick = (e) => {
        if (!disabled && !loading) {
            playClickSound();
            onClick?.(e);
        }
    };

    const baseClasses = 'rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 btn-press';

    const variantClasses = {
        primary: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-lg hover:shadow-xl',
        secondary: 'bg-white text-accent-600 border-2 border-accent-500 hover:bg-accent-50',
        outline: 'bg-transparent text-accent-600 border-2 border-accent-500 hover:bg-accent-50',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    };

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const disabledClasses = 'opacity-50 cursor-not-allowed';

    return (
        <motion.button
            type={type}
            onClick={handleClick}
            disabled={disabled || loading}
            className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled || loading ? disabledClasses : ''}
        ${className}
      `}
            whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
            whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
        >
            {loading ? (
                <>
                    <div className="spinner w-5 h-5 border-2"></div>
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    {Icon && <Icon className="w-5 h-5" />}
                    {children}
                </>
            )}
        </motion.button>
    );
};

export default Button;
