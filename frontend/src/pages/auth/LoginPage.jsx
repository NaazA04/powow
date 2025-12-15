import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useSound } from '../../context/SoundContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { playSuccessSound, playErrorSound } = useSound();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        setLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            playSuccessSound();
            toast.success('Welcome back!');
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
                className="max-w-md w-full"
            >
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🐾</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome Back to <span className="gradient-text">PetMatch</span>
                    </h2>
                    <p className="text-gray-600">Sign in to continue your adoption journey</p>
                </div>

                <div className="glass-strong rounded-2xl p-8 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
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

                        <Button type="submit" size="lg" loading={loading} className="w-full">
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="text-accent-600 hover:text-accent-700 font-semibold"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Demo Credentials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200"
                >
                    <p className="text-sm text-blue-800 font-semibold mb-2">
                        Demo Credentials:
                    </p>
                    <p className="text-sm text-blue-700">
                        <strong>User:</strong> user@demo.com / password
                    </p>
                    <p className="text-sm text-blue-700">
                        <strong>Admin:</strong> admin@demo.com / password
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
