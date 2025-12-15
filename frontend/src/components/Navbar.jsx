import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    HomeIcon,
    HeartIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import Button from './ui/Button';

const Navbar = () => {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const { soundEnabled, toggleSound } = useSound();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navLinks = [
        { to: '/', label: 'Home', icon: HomeIcon, public: true },
        { to: '/pets', label: 'Browse Pets', icon: HeartIcon, public: true },
        { to: '/favorites', label: 'Favorites', icon: HeartIcon, public: true },
    ];

    const userLinks = isAuthenticated
        ? isAdmin
            ? [{ to: '/admin/dashboard', label: 'Dashboard', icon: UserCircleIcon }]
            : [{ to: '/profile', label: 'My Profile', icon: UserCircleIcon }]
        : [];

    return (
        <nav className="glass-strong sticky top-0 z-30 border-b border-white/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <motion.div
                            className="text-3xl"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            🐾
                        </motion.div>
                        <span className="text-2xl font-bold gradient-text">PetMatch</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center gap-2 transition-colors font-medium ${isActive(link.to)
                                    ? 'text-accent-600'
                                    : 'text-gray-700 hover:text-accent-600'
                                    }`}
                            >
                                <link.icon className="w-5 h-5" />
                                {link.label}
                            </Link>
                        ))}

                        {userLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center gap-2 transition-colors font-medium ${isActive(link.to)
                                    ? 'text-accent-600'
                                    : 'text-gray-700 hover:text-accent-600'
                                    }`}
                            >
                                <link.icon className="w-5 h-5" />
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Sound Toggle */}
                        <button
                            onClick={toggleSound}
                            className="p-2 text-gray-600 hover:text-accent-600 transition-colors"
                            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
                        >
                            {soundEnabled ? (
                                <SpeakerWaveIcon className="w-6 h-6" />
                            ) : (
                                <SpeakerXMarkIcon className="w-6 h-6" />
                            )}
                        </button>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600">
                                    Hi, <span className="font-semibold text-gray-900">{user?.name}</span>
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    icon={ArrowRightOnRectangleIcon}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => navigate('/register')}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden py-4 border-t border-white/30"
                    >
                        <div className="flex flex-col gap-3">
                            {[...navLinks, ...userLinks].map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-2 text-gray-700 hover:text-accent-600 transition-colors font-medium px-2 py-2"
                                >
                                    <link.icon className="w-5 h-5" />
                                    {link.label}
                                </Link>
                            ))}

                            <div className="pt-3 border-t border-gray-200 space-y-3">
                                <button
                                    onClick={toggleSound}
                                    className="flex items-center gap-2 text-gray-700 w-full px-2 py-2"
                                >
                                    {soundEnabled ? (
                                        <SpeakerWaveIcon className="w-5 h-5" />
                                    ) : (
                                        <SpeakerXMarkIcon className="w-5 h-5" />
                                    )}
                                    <span>{soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}</span>
                                </button>

                                {isAuthenticated ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        icon={ArrowRightOnRectangleIcon}
                                        onClick={handleLogout}
                                        className="w-full"
                                    >
                                        Logout
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => {
                                                navigate('/login');
                                                setMobileMenuOpen(false);
                                            }}
                                            className="w-full"
                                        >
                                            Login
                                        </Button>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => {
                                                navigate('/register');
                                                setMobileMenuOpen(false);
                                            }}
                                            className="w-full"
                                        >
                                            Sign Up
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
