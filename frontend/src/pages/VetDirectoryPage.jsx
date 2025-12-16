import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    CheckBadgeIcon,
    FunnelIcon,
    BuildingOfficeIcon,
    ClockIcon,
    StarIcon
} from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import VetProfileModal from '../components/vets/VetProfileModal';

const VetDirectoryPage = () => {
    const [vets, setVets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ city: '', specialization: '' });
    const [selectedVet, setSelectedVet] = useState(null);

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
        <div className="min-h-screen py-12 px-4 bg-[#FFFBF5]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="text-6xl mb-4">🏥</div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Trusted <span className="gradient-text">Veterinary Care</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find expert veterinarians to ensure your adopted pet stays healthy and happy
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-[#8D6E63]/10"
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
                        <div className="flex items-end">
                            <Button
                                onClick={handleFilter}
                                className="w-full !py-3"
                                icon={FunnelIcon}
                            >
                                Apply Filters
                            </Button>
                        </div>
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
                            <Card hover className="h-full flex flex-col">
                                <div className="p-6 flex-1">
                                    {/* Verified Badge */}
                                    {vet.verified && (
                                        <div className="flex items-center gap-2 text-sm font-semibold text-green-600 mb-4 bg-green-50 w-fit px-3 py-1 rounded-full">
                                            <CheckBadgeIcon className="w-5 h-5" />
                                            Verified Professional
                                        </div>
                                    )}

                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                            {vet.photo ? (
                                                <img src={vet.photo} alt={vet.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-3xl bg-accent-100 text-accent-600">
                                                    👨‍⚕️
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{vet.name}</h3>
                                            <div className="text-accent-600 font-medium text-sm">
                                                {Array.isArray(vet.specialization)
                                                    ? vet.specialization.join(', ')
                                                    : vet.specialization}
                                            </div>
                                            <div className="text-gray-500 text-sm mt-1">
                                                {vet.experience} years exp.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-start gap-3 text-gray-600 text-sm">
                                            <BuildingOfficeIcon className="w-5 h-5 flex-shrink-0 text-accent-500" />
                                            <span className="font-medium">{vet.clinicName}</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-gray-600 text-sm">
                                            <MapPinIcon className="w-5 h-5 flex-shrink-0 text-accent-500" />
                                            <span>{vet.city}</span>
                                        </div>
                                        {vet.availability && (
                                            <div className="flex items-start gap-3 text-gray-600 text-sm">
                                                <ClockIcon className="w-5 h-5 flex-shrink-0 text-accent-500" />
                                                <span>{vet.availability}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 pt-0 mt-auto">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setSelectedVet(vet)}
                                    >
                                        View Profile
                                    </Button>
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

                {/* Profile Modal */}
                <AnimatePresence>
                    {selectedVet && (
                        <VetProfileModal
                            vet={selectedVet}
                            onClose={() => setSelectedVet(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default VetDirectoryPage;
