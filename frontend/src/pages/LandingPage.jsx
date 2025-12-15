import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    HeartIcon,
    ShieldCheckIcon,
    SparklesIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: HeartIcon,
            title: 'Find Your Perfect Match',
            description: 'Browse hundreds of adorable pets waiting for their forever home',
        },
        {
            icon: ShieldCheckIcon,
            title: 'Verified Shelters',
            description: 'All our shelter partners are verified and trusted organizations',
        },
        {
            icon: SparklesIcon,
            title: 'Simple Process',
            description: 'Easy application process with real-time status tracking',
        },
        {
            icon: UserGroupIcon,
            title: 'Join Community',
            description: 'Connect with thousands of pet lovers and adopters',
        },
    ];

    const stats = [
        { number: '10,000+', label: 'Happy Adoptions' },
        { number: '500+', label: 'Partner Shelters' },
        { number: '50,000+', label: 'Active Users' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block mb-4"
                            >
                                <span className="bg-gradient-to-r from-accent-100 to-warm-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    🎉 Welcome to PetMatch
                                </span>
                            </motion.div>

                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Find Your{' '}
                                <span className="gradient-text">Perfect</span>
                                <br />
                                Furry Friend
                            </h1>

                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Connect with loving pets from verified shelters. Give a rescue pet
                                a second chance at happiness and find your new best friend today.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    onClick={() => navigate('/quiz')}
                                    className="text-lg"
                                >
                                    Find My Match ✨
                                </Button>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    onClick={() => navigate('/pets')}
                                    className="text-lg"
                                >
                                    Browse Pets 🐾
                                </Button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mt-12">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                    >
                                        <div className="text-3xl font-bold gradient-text">
                                            {stat.number}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Content - Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative z-10"
                            >
                                <div className="glass-strong rounded-3xl p-8 shadow-2xl">
                                    <div className="text-9xl text-center mb-4">🐕</div>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            Meet Max
                                        </h3>
                                        <p className="text-gray-600">
                                            Looking for a loving home
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                className="absolute top-10 -left-10 text-6xl"
                            >
                                🐱
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                                className="absolute bottom-10 -right-10 text-6xl"
                            >
                                🐰
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-50 to-transparent opacity-30 -z-10 rounded-l-full"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose PetMatch?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We make pet adoption simple, safe, and rewarding for everyone involved
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="glass-strong rounded-2xl p-8 text-center card-hover h-full">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl mb-6">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-strong rounded-3xl p-12 text-center relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <div className="text-6xl mb-6">🐾❤️🏡</div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Ready to Find Your New Best Friend?
                            </h2>
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                Thousands of adorable pets are waiting for you. Start your adoption
                                journey today and change a life forever.
                            </p>
                            <Button
                                size="lg"
                                onClick={() => navigate('/pets')}
                                className="text-lg"
                            >
                                Start Browsing Now
                            </Button>
                        </div>

                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-200 rounded-full blur-3xl opacity-30 -z-0"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-warm-200 rounded-full blur-3xl opacity-30 -z-0"></div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
