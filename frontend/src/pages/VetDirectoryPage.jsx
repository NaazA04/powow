import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    CheckBadgeIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const VetDirectoryPage = () => {
    const [vets, setVets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ city: '', specialization: '' });

    useEffect(() => {
        fetchVets();
    }, []);

    const fetchVets = async () => {
        try {
            const params = {};
            if (filters.city) params.city = filters.city;
            if (filters.specialization) params.specialization = filters.specialization;

            const response = await axios.get('http://localhost:5001/api/vets', { params });
            setVets(response.data);
        } catch (error) {
            console.error('Error fetching vets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = () => {
        setLoading(true);
        fetchVets();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner w-12 h-12"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="text-6xl mb-4">🏥🐾</div>
                    <h1 className="text-5xl font-bold gradient-text mb-4">
                        Trusted Veterinary Care
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find expert veterinarians to ensure your adopted pet stays healthy and happy
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-strong rounded-2xl p-6 mb-8"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <FunnelIcon className="w-5 h-5 text-accent-600" />
                        <h3 className="font-semibold text-gray-900">Filter Veterinarians</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Input
                            label="City"
                            value={filters.city}
                            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                            placeholder="e.g., New York"
                        />
                        <Input
                            label="Specialization"
                            value={filters.specialization}
                            onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
                            placeholder="e.g., Surgery"
                        />
                        <button
                            onClick={handleFilter}
                            className="bg-accent-600 text-white px-6 py-3 rounded-lg hover:bg-accent-700 transition-colors self-end"
                        >
                            Apply Filters
                        </button>
                    </div>
                </motion.div>

                {/* Vet Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {vets.map((vet, index) => (
                        <motion.div
                            key={vet._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card hover glassmorphism className="h-full">
                                <div className="p-6">
                                    {/* Verified Badge */}
                                    {vet.verified && (
                                        <div className="flex items-center gap-2 text-sm font-semibold text-green-600 mb-4">
                                            <CheckBadgeIcon className="w-5 h-5" />
                                            Verified Professional
                                        </div>
                                    )}

                                    {/* Vet Info */}
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{vet.name}</h3>
                                    <div className="text-accent-600 font-semibold mb-1">{vet.specialization}</div>
                                    <div className="text-gray-600 text-sm mb-4">
                                        {vet.experience} years of experience
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-start gap-3 text-gray-700">
                                            <MapPinIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold">{vet.city}</div>
                                                {vet.address && (
                                                    <div className="text-sm text-gray-600">{vet.address}</div>
                                                )}
                                            </div>
                                        </div>

                                        {vet.availability && (
                                            <div className="text-sm text-gray-600">
                                                🕐 {vet.availability}
                                            </div>
                                        )}
                                    </div>

                                    {/* Contact Buttons */}
                                    <div className="space-y-2">
                                        {vet.contact?.phone && (
                                            <a
                                                href={`tel:${vet.contact.phone}`}
                                                className="flex items-center justify-center gap-2 w-full bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors"
                                            >
                                                <PhoneIcon className="w-5 h-5" />
                                                Call Now
                                            </a>
                                        )}
                                        {vet.contact?.email && (
                                            <a
                                                href={`mailto:${vet.contact.email}`}
                                                className="flex items-center justify-center gap-2 w-full border-2 border-accent-600 text-accent-600 px-4 py-2 rounded-lg hover:bg-accent-50 transition-colors"
                                            >
                                                <EnvelopeIcon className="w-5 h-5" />
                                                Send Email
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {vets.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No vets found</h3>
                        <p className="text-gray-600">Try adjusting your filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VetDirectoryPage;
