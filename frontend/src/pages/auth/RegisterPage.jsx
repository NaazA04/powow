import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    EnvelopeIcon,
    LockClosedIcon,
    UserIcon,
    PhoneIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useSound } from '../../context/SoundContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const { playSuccessSound, playErrorSound } = useSound();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: 'adopter',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (formData.password !== formData.confirmPassword) {
            playErrorSound();
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            playErrorSound();
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        const { confirmPassword, ...userData } = formData;
        const result = await register(userData);

        if (result.success) {
            playSuccessSound();
            toast.success('Account created successfully!');
            navigate('/pets');
        } else {
            playErrorSound();
            toast.error(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full"
            >
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🏡</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Join <span className="gradient-text">PetMatch</span>
                    </h2>
                    <p className="text-gray-600">
                        Create an account to start your adoption journey
                    </p>
                </div>

                <div className="glass-strong rounded-2xl p-8 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                label="Full Name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                icon={UserIcon}
                                required
                            />

                            <Input
                                label="Phone Number"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 234 567 8900"
                                icon={PhoneIcon}
                                required
                            />
                        </div>

                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            icon={EnvelopeIcon}
                            required
                        />

                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                icon={LockClosedIcon}
                                required
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                icon={LockClosedIcon}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Account Type:
                                <span className="text-red-500 ml-1">*</span>
                            </label>

                            <div className="flex items-center justify-center gap-4 bg-gray-100 p-2 rounded-xl">
                                <span className={`font-semibold transition-colors ${formData.role === 'adopter' ? 'text-accent-600' : 'text-gray-500'}`}>
                                    ❤️ Adopter
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: formData.role === 'adopter' ? 'admin' : 'adopter' })}
                                    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 ${formData.role === 'admin' ? 'bg-accent-600' : 'bg-gray-300'
                                        }`}
                                >
                                    <motion.span
                                        className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg"
                                        animate={{
                                            x: formData.role === 'admin' ? 32 : 4
                                        }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                </button>

                                <span className={`font-semibold transition-colors ${formData.role === 'admin' ? 'text-accent-600' : 'text-gray-500'}`}>
                                    🏢 Admin
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mt-3 text-center">
                                {formData.role === 'adopter' ? 'Find and adopt your perfect pet companion 🐾' : 'Manage pets and adoption applications 📋'}
                            </p>
                        </div>

                        <Button type="submit" size="lg" loading={loading} className="w-full">
                            Create Account
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-accent-600 hover:text-accent-700 font-semibold"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
