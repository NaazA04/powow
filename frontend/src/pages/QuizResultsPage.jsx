import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/solid';
import Button from '../components/ui/Button';
import PetCard from '../components/pets/PetCard';

const QuizResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { matches } = location.state || { matches: [] };

    if (matches.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-8xl mb-4">🤔</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No matches found</h2>
                    <Button onClick={() => navigate('/quiz')}>Try Again</Button>
                </div>
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
                    <div className="text-6xl mb-4">✨🐾✨</div>
                    <h1 className="text-5xl font-bold gradient-text mb-4">
                        Your Perfect Matches!
                    </h1>
                    <p className="text-xl text-gray-600">
                        We found {matches.length} pets that match your lifestyle perfectly
                    </p>
                </motion.div>

                {/* Match Results */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {matches.map((match, index) => (
                        <motion.div
                            key={match.pet._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Match Score Badge */}
                            <div className="absolute -top-3 -right-3 z-10">
                                <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                    <SparklesIcon className="w-5 h-5" />
                                    <span className="font-bold">{match.matchScore}% Match</span>
                                </div>
                            </div>

                            <PetCard pet={match.pet} />
                        </motion.div>
                    ))}
                </div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center space-y-4"
                >
                    <Button size="lg" onClick={() => navigate('/quiz')}>
                        Take Quiz Again
                    </Button>
                    <div>
                        <Button variant="secondary" onClick={() => navigate('/pets')}>
                            Browse All Pets
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default QuizResultsPage;
