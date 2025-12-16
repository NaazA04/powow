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
        <div className="min-h-screen pt-20 pb-12 flex flex-col justify-center sm:px-6 lg:px-8 bg-[#FFFBF5]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white py-8 px-4 shadow-xl rounded-3xl sm:px-10 border border-[#8D6E63]/10"
                >
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">🏡</div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Join <span className="text-[#8D6E63]">Powow</span>
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Create an account to start your adoption journey
                        </p>

                        {/* Role Toggle */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-gray-100 p-1 rounded-xl flex items-center relative">
                                <motion.div
                                    className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm"
                                    animate={{
                                        x: formData.role === 'admin' ? '100%' : '0%'
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'adopter' })}
                                    className={`relative z-10 px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${formData.role === 'adopter' ? 'text-[#8D6E63]' : 'text-gray-500'
                                        }`}
                                >
                                    Adopter
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'admin' })}
                                    className={`relative z-10 px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${formData.role === 'admin' ? 'text-[#8D6E63]' : 'text-gray-500'
                                        }`}
                                >
                                    Admin
                                </button>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Full Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                        />

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
                            label="Phone Number"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+1 (555) 000-0000"
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            minLength="6"
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-[#8D6E63] focus:ring-[#8D6E63] border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                I agree to the{' '}
                                <a href="#" className="text-[#8D6E63] hover:text-[#7a5e54]">
                                    Terms
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-[#8D6E63] hover:text-[#7a5e54]">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full !bg-[#8D6E63] hover:!bg-[#7a5e54] !text-white !rounded-xl !py-3 !text-lg !shadow-lg"
                            isLoading={loading}
                        >
                            Create Account
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-[#8D6E63] hover:text-[#7a5e54]"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RegisterPage;
