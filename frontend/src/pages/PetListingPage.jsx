import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import PetCard from '../components/pets/PetCard';
import PetFilter from '../components/pets/PetFilter';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const PetListingPage = () => {
    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        species: '',
        gender: '',
        age: '',
        breed: '',
    });
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        fetchPets();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [pets, filters, searchQuery]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const fetchPets = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5001/api/pets');
            setPets(response.data);
        } catch (error) {
            console.error('Error fetching pets:', error);
            toast.error('Failed to load pets');
            // For demo purposes, use mock data if API fails
            setPets(getMockPets());
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...pets];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(
                (pet) =>
                    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Species filter
        if (filters.species) {
            filtered = filtered.filter((pet) => pet.species === filters.species);
        }

        // Breed filter
        if (filters.breed) {
            filtered = filtered.filter((pet) => pet.breed === filters.breed);
        }

        // Gender filter
        if (filters.gender) {
            filtered = filtered.filter((pet) => pet.gender === filters.gender);
        }

        // Age filter
        if (filters.age) {
            const [min, max] = filters.age.split('-').map(Number);
            if (max) {
                filtered = filtered.filter((pet) => pet.age >= min && pet.age < max);
            } else {
                filtered = filtered.filter((pet) => pet.age >= min);
            }
        }

        setFilteredPets(filtered);
    };

    const handleFavorite = (petId) => {
        setFavorites((prev) =>
            prev.includes(petId)
                ? prev.filter((id) => id !== petId)
                : [...prev, petId]
        );
    };

    const handleResetFilters = () => {
        setFilters({ species: '', gender: '', age: '' });
        setSearchQuery('');
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Find Your <span className="gradient-text">Perfect Pet</span>
                    </h1>
                    <p className="text-xl text-gray-600">
                        Browse our collection of adorable pets looking for their forever home
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="relative max-w-2xl mx-auto mb-8">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or breed..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200 transition-all glass-strong"
                        />
                    </div>

                    {/* Breed Circles */}
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilters({ ...filters, breed: '' })}
                            className={`flex flex-col items-center min-w-[100px] gap-2 transition-colors px-2 ${!filters.breed ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-md transition-all shrink-0 ${!filters.breed ? 'bg-accent-500 text-white ring-4 ring-accent-200' : 'bg-white text-gray-600 hover:bg-accent-50'
                                }`}>
                                🐾
                            </div>
                            <span className={`text-sm font-medium text-center leading-tight ${!filters.breed ? 'text-accent-600' : 'text-gray-600'}`}>
                                All
                            </span>
                        </motion.button>

                        {[...new Set(pets.map(p => p.breed))].sort().map((breed, index) => {
                            const pet = pets.find(p => p.breed === breed);
                            const isSelected = filters.breed === breed;

                            return (
                                <motion.button
                                    key={breed}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setFilters({
                                        ...filters,
                                        breed: isSelected ? '' : breed
                                    })}
                                    className={`flex flex-col items-center min-w-[100px] gap-2 transition-colors px-2 ${isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-md transition-all shrink-0 ${isSelected ? 'bg-accent-500 text-white ring-4 ring-accent-200' : 'bg-white text-gray-600 hover:bg-accent-50'
                                        }`}>
                                        {pet?.species === 'dog' ? '🐕' :
                                            pet?.species === 'cat' ? '🐱' :
                                                pet?.species === 'bird' ? '🦜' :
                                                    pet?.species === 'rabbit' ? '🐰' : '🐾'}
                                    </div>
                                    <span className={`text-sm font-medium text-center leading-tight ${isSelected ? 'text-accent-600' : 'text-gray-600'}`}>
                                        {breed}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <PetFilter
                            filters={filters}
                            setFilters={setFilters}
                            onReset={handleResetFilters}
                        />
                    </div>

                    {/* Pet Grid */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="spinner"></div>
                            </div>
                        ) : filteredPets.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <div className="text-8xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    No Pets Found
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Try adjusting your filters or search query
                                </p>
                                <button
                                    onClick={handleResetFilters}
                                    className="text-accent-600 hover:text-accent-700 font-semibold"
                                >
                                    Clear All Filters
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-gray-600">
                                        <span className="font-semibold text-gray-900">
                                            {filteredPets.length}
                                        </span>{' '}
                                        {filteredPets.length === 1 ? 'pet' : 'pets'} found
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredPets.map((pet, index) => (
                                        <motion.div
                                            key={pet._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <PetCard
                                                pet={pet}
                                                onFavorite={handleFavorite}
                                                isFavorite={favorites.includes(pet._id)}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Mock data for demo purposes
const getMockPets = () => [
    {
        _id: '1',
        name: 'Max',
        species: 'dog',
        breed: 'Golden Retriever',
        age: 3,
        gender: 'male',
        status: 'available',
        description: 'Friendly and energetic golden retriever looking for an active family.',
        images: [],
    },
    {
        _id: '2',
        name: 'Luna',
        species: 'cat',
        breed: 'Persian',
        age: 2,
        gender: 'female',
        status: 'available',
        description: 'Gentle and affectionate Persian cat who loves to cuddle.',
        images: [],
    },
    {
        _id: '3',
        name: 'Charlie',
        species: 'dog',
        breed: 'Labrador',
        age: 4,
        gender: 'male',
        status: 'available',
        description: 'Loyal and playful lab who is great with kids.',
        images: [],
    },
    {
        _id: '4',
        name: 'Bella',
        species: 'cat',
        breed: 'Siamese',
        age: 1,
        gender: 'female',
        status: 'available',
        description: 'Young and playful Siamese kitten with beautiful blue eyes.',
        images: [],
    },
    {
        _id: '5',
        name: 'Rocky',
        species: 'dog',
        breed: 'German Shepherd',
        age: 5,
        gender: 'male',
        status: 'pending',
        description: 'Well-trained and protective German Shepherd.',
        images: [],
    },
    {
        _id: '6',
        name: 'Mittens',
        species: 'cat',
        breed: 'Tabby',
        age: 3,
        gender: 'female',
        status: 'available',
        description: 'Sweet tabby cat who loves sunny spots and treats.',
        images: [],
    },
];

export default PetListingPage;
