import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../../context/SoundContext';

const PetCard = ({ pet, onFavoriteChange }) => {
    const navigate = useNavigate();
    const { playClickSound } = useSound();
    const [isFavorite, setIsFavorite] = useState(false);

    // Check if pet is favorited on mount and when pet changes
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(pet._id));
    }, [pet._id]);

    const handleCardClick = () => {
        playClickSound();
        navigate(`/pets/${pet._id}`);
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        playClickSound();

        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        let newFavorites;

        if (favorites.includes(pet._id)) {
            // Remove from favorites
            newFavorites = favorites.filter(id => id !== pet._id);
            setIsFavorite(false);
        } else {
            // Add to favorites
            newFavorites = [...favorites, pet._id];
            setIsFavorite(true);
        }

        localStorage.setItem('favorites', JSON.stringify(newFavorites));

        // Notify parent component about the change
        onFavoriteChange?.();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'adopted':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    const getAgeText = (age) => {
        if (age < 1) return `${Math.round(age * 12)} months`;
        return `${age} ${age === 1 ? 'year' : 'years'}`;
    };

    return (
        <motion.div
            className="bg-white rounded-2xl overflow-hidden shadow-card card-hover cursor-pointer group relative"
            onClick={handleCardClick}
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                {pet.images && pet.images.length > 0 ? (
                    <motion.img
                        src={pet.images[0]}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                        {pet.species === 'dog' ? '🐕' : pet.species === 'cat' ? '🐱' : '🐾'}
                    </div>
                )}

                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all z-10"
                >
                    {isFavorite ? (
                        <HeartSolidIcon className="w-6 h-6 text-red-500" />
                    ) : (
                        <HeartIcon className="w-6 h-6 text-gray-600" />
                    )}
                </button>

                {/* Status Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(pet.status)}`}>
                    {pet.status?.charAt(0).toUpperCase() + pet.status?.slice(1)}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pet.name}</h3>

                <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <span className="text-lg">{pet.species === 'dog' ? '🐕' : pet.species === 'cat' ? '🐱' : '🐾'}</span>
                    <span className="font-medium">{pet.breed}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">Age:</span>
                        <span>{getAgeText(pet.age)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">Gender:</span>
                        <span>{pet.gender === 'male' ? '♂️' : '♀️'} {pet.gender}</span>
                    </div>
                </div>

                {pet.description && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {pet.description}
                    </p>
                )}

                <motion.div
                    className="text-accent-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                    <span>Learn More</span>
                    <span className="text-xl">→</span>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PetCard;
