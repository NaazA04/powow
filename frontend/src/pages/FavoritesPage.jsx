import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HeartIcon } from '@heroicons/react/24/solid';
import PetCard from '../components/pets/PetCard';
import Button from '../components/ui/Button';

const FavoritesPage = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            // Get favorite IDs from localStorage
            const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');

            if (favoriteIds.length === 0) {
                setLoading(false);
                return;
            }

            // Fetch all pets and filter favorites
            const response = await axios.get('http://localhost:5001/api/pets');
            const favoritePets = response.data.filter(pet => favoriteIds.includes(pet._id));
            setFavorites(favoritePets);
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFavoriteRemoved = () => {
        // Reload favorites when a pet is unfavorited
        loadFavorites();
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
                    <div className="text-6xl mb-4">❤️🐾</div>
                    <h1 className="text-5xl font-bold gradient-text mb-4">
                        My Favorite Pets
                    </h1>
                    <p className="text-xl text-gray-600">
                        {favorites.length > 0
                            ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'pet' : 'pets'}`
                            : 'You haven\'t favorited any pets yet'
                        }
                    </p>
                </motion.div>

                {/* Favorites Grid */}
                {favorites.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favorites.map((pet, index) => (
                            <motion.div
                                key={pet._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <PetCard pet={pet} onFavoriteChange={handleFavoriteRemoved} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16"
                    >
                        <div className="glass-strong rounded-3xl p-12 max-w-2xl mx-auto">
                            <div className="text-8xl mb-6">💔</div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                No Favorites Yet
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Start exploring and click the heart icon on pets you love to save them here!
                            </p>
                            <Button
                                size="lg"
                                onClick={() => navigate('/pets')}
                            >
                                Browse Pets 🐾
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Quick Tip */}
                {favorites.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <div className="glass rounded-xl p-6 max-w-2xl mx-auto">
                            <div className="flex items-center justify-center gap-3 text-accent-600">
                                <HeartIcon className="w-6 h-6" />
                                <p className="font-semibold">
                                    Tip: Click the heart icon again to remove a pet from your favorites
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
