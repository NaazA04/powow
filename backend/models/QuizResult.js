/**
 * Quiz Result Model
 * Stores user responses and recommended pets from matching algorithm
 * Tracks user preferences for analytics and history
 */

import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    answers: {
        homeType: {
            type: String,
            enum: ['apartment', 'house'],
            required: true,
        },
        timeAvailable: {
            type: String,
            enum: ['low', 'medium', 'high'],
            required: true,
        },
        experience: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            required: true,
        },
        preferredSize: {
            type: String,
            enum: ['small', 'medium', 'large', 'any'],
            required: true,
        },
        hasKids: {
            type: Boolean,
            required: true,
        },
        activityLevel: {
            type: String,
            enum: ['low', 'medium', 'high'],
            required: true,
        },
    },
    recommendedPets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
    }],
    score: {
        type: Number,
    },
}, {
    timestamps: true,
});

export default mongoose.model('QuizResult', quizResultSchema);
