import React from 'react';
import { motion } from 'framer-motion';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

const PetFilter = ({ filters, setFilters, onReset }) => {
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };



    const genderOptions = [
        { value: '', label: 'All Genders' },
        { value: 'male', label: '♂️ Male' },
        { value: 'female', label: '♀️ Female' },
    ];

    const ageRanges = [
        { value: '', label: 'All Ages' },
        { value: '0-1', label: 'Puppy/Kitten (0-1 year)' },
        { value: '1-3', label: 'Young (1-3 years)' },
        { value: '3-7', label: 'Adult (3-7 years)' },
        { value: '7+', label: 'Senior (7+ years)' },
    ];

    const hasActiveFilters = filters.species || filters.gender || filters.age;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-strong rounded-2xl p-6 sticky top-24"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <FunnelIcon className="w-5 h-5 text-accent-600" />
                    <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={onReset}
                        className="text-sm text-accent-600 hover:text-accent-700 font-medium flex items-center gap-1"
                    >
                        <XMarkIcon className="w-4 h-4" />
                        Clear
                    </button>
                )}
            </div>



            {/* Gender Filter */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Gender
                </label>
                <div className="space-y-2">
                    {genderOptions.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 cursor-pointer transition-colors"
                        >
                            <input
                                type="radio"
                                name="gender"
                                value={option.value}
                                checked={filters.gender === option.value}
                                onChange={(e) => handleFilterChange('gender', e.target.value)}
                                className="w-4 h-4 text-accent-600 focus:ring-accent-500"
                            />
                            <span className="text-gray-700">{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Age Filter */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Age Range
                </label>
                <div className="space-y-2">
                    {ageRanges.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 cursor-pointer transition-colors"
                        >
                            <input
                                type="radio"
                                name="age"
                                value={option.value}
                                checked={filters.age === option.value}
                                onChange={(e) => handleFilterChange('age', e.target.value)}
                                className="w-4 h-4 text-accent-600 focus:ring-accent-500"
                            />
                            <span className="text-gray-700">{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Active Filter Count */}
            {hasActiveFilters && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-3 bg-accent-50 rounded-lg text-center"
                >
                    <p className="text-sm text-accent-700 font-medium">
                        {Object.values(filters).filter(Boolean).length} filter(s) active
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default PetFilter;
