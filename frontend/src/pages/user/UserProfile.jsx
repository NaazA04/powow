import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
    ClipboardDocumentListIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

const UserProfile = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5001/api/adoptions/user');
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
            // Mock data for demo
            setApplications(getMockApplications());
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
                return <CheckCircleIcon className="w-6 h-6 text-green-600" />;
            case 'rejected':
                return <XCircleIcon className="w-6 h-6 text-red-600" />;
            default:
                return <ClockIcon className="w-6 h-6 text-yellow-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        My <span className="gradient-text">Profile</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        Welcome back, {user?.name}!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Information */}
                    <div className="lg:col-span-1">
                        <Card glass>
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                                <p className="text-gray-600">{user?.email}</p>
                            </div>

                            <div className="space-y-3 border-t border-gray-200 pt-6">
                                <div>
                                    <p className="text-sm text-gray-600">Role</p>
                                    <p className="font-semibold text-gray-900 capitalize">{user?.role}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Member Since</p>
                                    <p className="font-semibold text-gray-900">
                                        {new Date().toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Applications</p>
                                    <p className="font-semibold text-gray-900">{applications.length}</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Applications */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <ClipboardDocumentListIcon className="w-8 h-8 text-accent-600" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    My Applications
                                </h2>
                                <p className="text-gray-600">Track your adoption requests</p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="spinner"></div>
                            </div>
                        ) : applications.length === 0 ? (
                            <Card>
                                <div className="text-center py-12">
                                    <div className="text-8xl mb-4">📋</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        No Applications Yet
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Start browsing pets to find your perfect match!
                                    </p>
                                    <Button onClick={() => (window.location.href = '/pets')}>
                                        Browse Pets
                                    </Button>
                                </div>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {applications.map((application, index) => (
                                    <motion.div
                                        key={application._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Card hover={false}>
                                            <div className="flex items-start justify-between">
                                                <div className="flex gap-4 flex-1">
                                                    <div className="text-5xl">
                                                        {application.pet?.species === 'dog' ? '🐕' : '🐱'}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                            {application.pet?.name}
                                                        </h3>
                                                        <p className="text-gray-600 mb-3">
                                                            {application.pet?.breed} • {application.pet?.age} years old
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-sm font-semibold border-2 inline-flex items-center gap-2 ${getStatusColor(
                                                                    application.status
                                                                )}`}
                                                            >
                                                                {getStatusIcon(application.status)}
                                                                {application.status?.charAt(0).toUpperCase() +
                                                                    application.status?.slice(1)}
                                                            </span>
                                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                                Applied{' '}
                                                                {new Date(application.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {application.adminNotes && (
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <p className="text-sm font-semibold text-gray-700 mb-1">
                                                        Admin Notes:
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {application.adminNotes}
                                                    </p>
                                                </div>
                                            )}
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const getMockApplications = () => [
    {
        _id: '1',
        pet: { name: 'Max', species: 'dog', breed: 'Golden Retriever', age: 3 },
        status: 'pending',
        createdAt: new Date(),
    },
    {
        _id: '2',
        pet: { name: 'Luna', species: 'cat', breed: 'Persian', age: 2 },
        status: 'approved',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        adminNotes: 'Great match! Welcome to your new family member.',
    },
];

export default UserProfile;
