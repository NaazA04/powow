import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import ImageCarousel from '../components/ui/ImageCarousel';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import {
    CalendarIcon,
    HeartIcon,
    MapPinIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

const PetDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const { playSuccessSound, playErrorSound } = useSound();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [applicationData, setApplicationData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        experience: '',
        reason: '',
    });

    useEffect(() => {
        fetchPetDetails();
    }, [id]);

    const fetchPetDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5001/api/pets/${id}`);
            setPet(response.data);
        } catch (error) {
            console.error('Error fetching pet:', error);
            // Mock data for demo
            setPet(getMockPet(id));
        } finally {
            setLoading(false);
        }
    };

    const handleApplicationSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toast.error('Please login to apply');
            navigate('/login');
            return;
        }

        try {
            await axios.post('http://localhost:5001/api/adoptions', {
                petId: pet._id,
                ...applicationData,
            });

            playSuccessSound();
            toast.success('Application submitted successfully!');
            setShowApplicationModal(false);

            // Reset form
            setApplicationData({
                fullName: user?.name || '',
                email: user?.email || '',
                phone: '',
                address: '',
                experience: '',
                reason: '',
            });
        } catch (error) {
            playErrorSound();
            toast.error(error.response?.data?.message || 'Failed to submit application');
        }
    };

    const handleInputChange = (e) => {
        setApplicationData({
            ...applicationData,
            [e.target.name]: e.target.value,
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!pet) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-8xl mb-4">😢</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Pet Not Found</h2>
                    <Button onClick={() => navigate('/pets')}>Browse Pets</Button>
                </div>
            </div>
        );
    }

    const getAgeText = (age) => {
        if (age < 1) return `${Math.round(age * 12)} months`;
        return `${age} ${age === 1 ? 'year' : 'years'}`;
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Header */}
                    <button
                        onClick={() => navigate('/pets')}
                        className="text-accent-600 hover:text-accent-700 font-semibold mb-6 flex items-center gap-2"
                    >
                        ← Back to Browse
                    </button>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Image Carousel */}
                        <div>
                            <ImageCarousel
                                images={pet.images?.length > 0 ? pet.images : []}
                                alt={pet.name}
                            />
                        </div>

                        {/* Pet Details */}
                        <div>
                            <div className="glass-strong rounded-2xl p-8">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                            {pet.name}
                                        </h1>
                                        <p className="text-xl text-gray-600">{pet.breed}</p>
                                    </div>
                                    <span className="text-5xl">
                                        {pet.species === 'dog' ? '🐕' : pet.species === 'cat' ? '🐱' : '🐾'}
                                    </span>
                                </div>

                                {/* Status Badge */}
                                <div className="mb-6">
                                    <span
                                        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${pet.status === 'available'
                                                ? 'bg-green-100 text-green-800'
                                                : pet.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {pet.status?.charAt(0).toUpperCase() + pet.status?.slice(1)}
                                    </span>
                                </div>

                                {/* Quick Info */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white/50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <CalendarIcon className="w-5 h-5" />
                                            <span className="text-sm font-semibold">Age</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">
                                            {getAgeText(pet.age)}
                                        </p>
                                    </div>

                                    <div className="bg-white/50 rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <span className="text-sm font-semibold">Gender</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">
                                            {pet.gender === 'male' ? '♂️' : '♀️'} {pet.gender}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        About {pet.name}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {pet.description ||
                                            `${pet.name} is a wonderful ${pet.species} looking for a loving home!`}
                                    </p>
                                </div>

                                {/* Characteristics */}
                                {pet.characteristics && pet.characteristics.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            Characteristics
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {pet.characteristics.map((char, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium"
                                                >
                                                    {char}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action Button */}
                                {pet.status === 'available' && (
                                    <Button
                                        size="lg"
                                        icon={HeartIcon}
                                        onClick={() => setShowApplicationModal(true)}
                                        className="w-full"
                                    >
                                        Apply for Adoption
                                    </Button>
                                )}

                                {pet.status === 'pending' && (
                                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
                                        <p className="text-yellow-800 font-semibold">
                                            Application Pending Review
                                        </p>
                                    </div>
                                )}

                                {pet.status === 'adopted' && (
                                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-center">
                                        <CheckCircleIcon className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                                        <p className="text-gray-800 font-semibold">
                                            {pet.name} has been adopted!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Application Modal */}
                <Modal
                    isOpen={showApplicationModal}
                    onClose={() => setShowApplicationModal(false)}
                    title={`Adoption Application for ${pet.name}`}
                    size="lg"
                >
                    <form onSubmit={handleApplicationSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                label="Full Name"
                                name="fullName"
                                value={applicationData.fullName}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                value={applicationData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                label="Phone Number"
                                type="tel"
                                name="phone"
                                value={applicationData.phone}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                label="Address"
                                name="address"
                                value={applicationData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Pet Ownership Experience
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <textarea
                                name="experience"
                                value={applicationData.experience}
                                onChange={handleInputChange}
                                required
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200 transition-all"
                                placeholder="Tell us about your experience with pets..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Why do you want to adopt {pet.name}?
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <textarea
                                name="reason"
                                value={applicationData.reason}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200 transition-all"
                                placeholder="Tell us why you want to adopt this pet..."
                            />
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" size="lg" className="flex-1">
                                Submit Application
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                size="lg"
                                onClick={() => setShowApplicationModal(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

const getMockPet = (id) => ({
    _id: id,
    name: 'Max',
    species: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'male',
    status: 'available',
    description:
        'Max is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks. He is great with children and other dogs. Max is house-trained and knows basic commands. He would thrive in an active family with a backyard.',
    characteristics: ['Friendly', 'Energetic', 'Good with kids', 'House-trained'],
    images: [],
});

export default PetDetailPage;
