/**
 * Pet Model
 * Defines pet schema with adoption and quiz matching attributes
 * Includes characteristics for matching users with compatible pets
 */

import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    species: {
        type: String,
        required: true,
        enum: ['dog', 'cat', 'bird', 'rabbit', 'other'],
    },
    breed: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    description: {
        type: String,
    },
    images: [{
        type: String,
    }],
    status: {
        type: String,
        enum: ['available', 'pending', 'adopted'],
        default: 'available',
    },
    characteristics: [{
        type: String,
    }],
    // Quiz matching attributes for compatibility scoring
    energyLevel: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    goodWithKids: {
        type: Boolean,
        default: true,
    },
    homeType: {
        type: String,
        enum: ['apartment', 'house', 'any'],
        default: 'any',
    },
    experienceLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

export default mongoose.model('Pet', petSchema);
