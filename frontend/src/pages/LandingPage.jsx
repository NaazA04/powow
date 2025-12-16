import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    HeartIcon,
    MagnifyingGlassIcon,
    CheckBadgeIcon,
    ShieldCheckIcon,
    SparklesIcon,
    UserGroupIcon,
    HomeIcon,
    ArrowRightIcon
} from '@heroicons/react/24/solid';
import { PlayIcon } from '@heroicons/react/24/outline';

const LandingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
            // Clear the state to prevent scrolling on subsequent renders
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* 1. Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFFBF5] via-[#fff0e3] to-[#e6f0ff] -z-10" />
                <div className="absolute top-20 right-0 w-96 h-96 bg-[#A8D0E6] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute top-40 left-0 w-96 h-96 bg-[#A3C9A8] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center lg:text-left z-10"
                    >
                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6"
                        >
                            A <span className="text-[#8D6E63]">Wow</span> Home for <br />
                            Every <span className="text-[#8D6E63]">Paw</span> 🐾
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium"
                        >
                            Discover loving pets waiting for their forever families. <br />
                            Adopt, match, and bring joy home.
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <button
                                onClick={() => navigate('/register')}
                                className="px-8 py-4 bg-[#8D6E63] text-white rounded-full font-bold text-lg shadow-lg hover:bg-[#7a5e54] transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                            >
                                🐶 Find My PawWow
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="px-8 py-4 bg-white text-[#8D6E63] border-2 border-[#8D6E63] rounded-full font-bold text-lg hover:bg-[#FFFBF5] transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                            >
                                🐾 Browse Pets
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 flex justify-center"
                    >
                        {/* Animated Pet Illustration Placeholder */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-80 h-80 lg:w-[500px] lg:h-[500px]"
                        >
                            <div className="absolute inset-0 bg-[#FFFBF5] rounded-full border-8 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                                <span className="text-9xl">🐕</span>
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-2"
                            >
                                <HeartIcon className="w-6 h-6 text-red-500" />
                                <span className="font-bold text-gray-800">Best Friend!</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                                className="absolute bottom-10 -left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-2"
                            >
                                <HomeIcon className="w-6 h-6 text-[#A3C9A8]" />
                                <span className="font-bold text-gray-800">Needs a Home</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Trust & Impact Strip */}
            <section className="bg-white py-12 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { count: '500+', label: 'Pets Adopted', icon: '🐕' },
                            { count: '200+', label: 'Happy Homes', icon: '🏠' },
                            { count: '50+', label: 'Verified Vets', icon: '🏥' },
                            { count: '100%', label: 'Secure Process', icon: '🛡️' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl mb-2">{stat.icon}</div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.count}</h3>
                                <p className="text-gray-500 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. How PawWow Works */}
            <section id="how-it-works" className="py-20 bg-[#FFFBF5]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How PawWow Works</h2>
                        <p className="text-xl text-gray-600">Find your perfect companion in 3 simple steps</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#8D6E63]/20 to-[#8D6E63]/20 -z-10 transform -translate-y-1/2" />

                        {[
                            {
                                title: 'Browse or Quiz',
                                desc: 'Find pets that match your lifestyle.',
                                icon: MagnifyingGlassIcon,
                                color: 'bg-blue-100 text-blue-600'
                            },
                            {
                                title: 'Apply for Adoption',
                                desc: 'Simple, secure application process.',
                                icon: CheckBadgeIcon,
                                color: 'bg-green-100 text-green-600'
                            },
                            {
                                title: 'Get Approved & Adopt',
                                desc: 'Admin approval → Forever home 🎉',
                                icon: HomeIcon,
                                color: 'bg-[#8D6E63]/10 text-[#8D6E63]'
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className="bg-white p-8 rounded-3xl shadow-lg relative z-10"
                            >
                                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 mx-auto text-2xl`}>
                                    <step.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                                <p className="text-gray-500 text-center">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Featured Pets Section */}
            <section id="featured-pets" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-2">Meet Our Stars 🌟</h2>
                            <p className="text-xl text-gray-600">These cuties are waiting for you</p>
                        </div>
                        <button onClick={() => navigate('/register')} className="hidden md:flex items-center gap-2 text-[#8D6E63] font-bold hover:underline">
                            View All Pets <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: 'Bella', age: '2 yrs', breed: 'Golden Retriever', loc: 'New York', img: '🐕' },
                            { name: 'Luna', age: '1 yr', breed: 'Siamese Cat', loc: 'Brooklyn', img: '🐈' },
                            { name: 'Max', age: '3 yrs', breed: 'Beagle', loc: 'Queens', img: '🐶' },
                            { name: 'Charlie', age: '4 mos', breed: 'Mixed', loc: 'Jersey City', img: '🐕‍🦺' },
                        ].map((pet, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 group"
                            >
                                <div className="h-64 bg-gray-100 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                                    {pet.img}
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{pet.name}</h3>
                                            <p className="text-sm text-gray-500">{pet.breed}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-[#FFFBF5] text-[#8D6E63] text-xs font-bold rounded-full">
                                            {pet.age}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-400 text-sm mb-6">
                                        <span>📍</span> {pet.loc}
                                    </div>
                                    <button className="w-full py-3 bg-[#8D6E63] text-white rounded-xl font-bold hover:bg-[#7a5e54] transition-colors">
                                        Meet {pet.name}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Match Quiz Highlight */}
            <section id="quiz" className="py-20 bg-[#A8D0E6]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[3rem] p-12 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#A8D0E6] rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                    Not Sure Which Pet is <br />
                                    Right for You? 🤔
                                </h2>
                                <p className="text-xl text-gray-600 mb-8">
                                    Take our smart match quiz and meet pets that fit your lifestyle perfectly.
                                    It takes less than 2 minutes!
                                </p>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="px-8 py-4 bg-[#8D6E63] text-white rounded-full font-bold text-lg shadow-lg hover:bg-[#7a5e54] transform hover:scale-105 transition-all flex items-center gap-2"
                                >
                                    💖 Find My PawWow
                                </button>
                            </div>
                            <div className="relative">
                                {/* Quiz Card Animation */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-[#8D6E63]/10 rounded-full flex items-center justify-center text-2xl">👤</div>
                                        <div>
                                            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-3 w-20 bg-gray-100 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-12 bg-gray-50 rounded-xl border border-gray-100 flex items-center px-4 text-gray-400">Active & Playful</div>
                                        <div className="h-12 bg-[#FFFBF5] rounded-xl border border-[#8D6E63] flex items-center px-4 text-[#8D6E63] font-bold">Calm & Cuddly ✅</div>
                                        <div className="h-12 bg-gray-50 rounded-xl border border-gray-100 flex items-center px-4 text-gray-400">Independent</div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Vet Care & Trust */}
            <section id="vets" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 grid grid-cols-2 gap-6">
                            <div className="space-y-6 mt-12">
                                <div className="bg-[#A3C9A8]/20 p-6 rounded-2xl">
                                    <div className="text-4xl mb-4">🩺</div>
                                    <h4 className="font-bold text-lg mb-2">Health Checks</h4>
                                    <p className="text-sm text-gray-600">Every pet is fully checked.</p>
                                </div>
                                <div className="bg-[#A8D0E6]/20 p-6 rounded-2xl">
                                    <div className="text-4xl mb-4">🚑</div>
                                    <h4 className="font-bold text-lg mb-2">Emergency Care</h4>
                                    <p className="text-sm text-gray-600">24/7 support available.</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-[#FFFBF5] p-6 rounded-2xl border border-[#8D6E63]/20">
                                    <div className="text-4xl mb-4">💉</div>
                                    <h4 className="font-bold text-lg mb-2">Vaccinated</h4>
                                    <p className="text-sm text-gray-600">Up to date shots.</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-2xl">
                                    <div className="text-4xl mb-4">📋</div>
                                    <h4 className="font-bold text-lg mb-2">History</h4>
                                    <p className="text-sm text-gray-600">Full medical records.</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <span className="text-[#A3C9A8] font-bold tracking-wider uppercase mb-2 block">Vet Care & Trust</span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Verified Vet Partners 🏥</h2>
                            <p className="text-xl text-gray-600 mb-8">
                                We partner with top veterinarians to ensure every pet is healthy, happy, and ready for their new home.
                                You get full medical history and post-adoption support.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Comprehensive Health Checkups',
                                    'Post-adoption Care Guidance',
                                    'Emergency Support Network',
                                    'Verified Vaccination Records'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                        <CheckBadgeIcon className="w-6 h-6 text-[#A3C9A8]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Why Adopt With PawWow? */}
            <section className="py-20 bg-[#FFFBF5]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Adopt With PawWow?</h2>
                        <p className="text-xl text-gray-600">We make adoption safe, simple, and joyful.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Ethical Adoption', desc: 'We work only with verified shelters and ethical rescues.', icon: ShieldCheckIcon },
                            { title: 'Smart Matching', desc: 'Our algorithm finds pets that fit your lifestyle perfectly.', icon: SparklesIcon },
                            { title: 'Community Support', desc: 'Join a community of pet lovers for advice and playdates.', icon: UserGroupIcon },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.03 }}
                                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100"
                            >
                                <div className="w-14 h-14 bg-[#8D6E63]/10 text-[#8D6E63] rounded-2xl flex items-center justify-center mb-6">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-500">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Emotional Story / Testimonial */}
            <section id="testimonials" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay" />

                        <div className="relative z-10 max-w-3xl mx-auto text-center">
                            <div className="text-6xl mb-8">❝</div>
                            <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-8">
                                "We found Bruno through PawWow and our lives changed forever. He's not just a pet, he's family."
                            </h2>
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden">
                                    {/* Placeholder for user image */}
                                    <div className="w-full h-full flex items-center justify-center text-2xl">👩</div>
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-lg">Sarah & Mike</div>
                                    <div className="text-gray-400">Adopted Bruno in 2023</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. Final CTA */}
            <section className="py-24 bg-[#FFFBF5] text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-5xl font-bold text-gray-900 mb-8">Ready to Find Your PawWow? 🐾</h2>
                    <p className="text-xl text-gray-600 mb-12">
                        Your new best friend is waiting for you. Start your journey today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={() => navigate('/register')}
                            className="px-10 py-5 bg-[#8D6E63] text-white rounded-full font-bold text-xl shadow-xl hover:bg-[#7a5e54] transform hover:scale-105 transition-all"
                        >
                            Browse Pets
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="px-10 py-5 bg-white text-[#8D6E63] border-2 border-[#8D6E63] rounded-full font-bold text-xl hover:bg-gray-50 transform hover:scale-105 transition-all"
                        >
                            💖 Take the Quiz
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
