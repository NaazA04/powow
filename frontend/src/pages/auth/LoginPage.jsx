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
    const [role, setRole] = useState('adopter');
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
            if (result.user?.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/pets');
            }
        } else {
            playErrorSound();
            toast.error(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen pt-20 pb-12 flex flex-col justify-center sm:px-6 lg:px-8 bg-[#FFFBF5]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white py-8 px-4 shadow-xl rounded-3xl sm:px-10 border border-[#8D6E63]/10"
                >
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">🐾</div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome Back to <span className="text-[#8D6E63]">Powow</span>
                        </h2>
                        <p className="text-gray-600 mb-6">Sign in to continue your adoption journey</p>

                        {/* Role Toggle (Visual only for Login) */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-gray-100 p-1 rounded-xl flex items-center relative">
                                <motion.div
                                    className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm"
                                    animate={{
                                        x: role === 'admin' ? '100%' : '0%'
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setRole('adopter')}
                                    className={`relative z-10 px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${role === 'adopter' ? 'text-[#8D6E63]' : 'text-gray-500'
                                        }`}
                                >
                                    Adopter
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('admin')}
                                    className={`relative z-10 px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${role === 'admin' ? 'text-[#8D6E63]' : 'text-gray-500'
                                        }`}
                                >
                                    Admin
                                </button>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#8D6E63] focus:ring-[#8D6E63] border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-[#8D6E63] hover:text-[#7a5e54]">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full !bg-[#8D6E63] hover:!bg-[#7a5e54] !text-white !rounded-xl !py-3 !text-lg !shadow-lg"
                            isLoading={loading}
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    New to Powow?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                to="/register"
                                className="font-medium text-[#8D6E63] hover:text-[#7a5e54]"
                            >
                                Create an account
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;
