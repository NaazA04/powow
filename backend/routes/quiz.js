import express from 'express';
import Pet from '../models/Pet.js';
import QuizResult from '../models/QuizResult.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get quiz statistics (admin only)
router.get('/admin/stats', authenticate, isAdmin, async (req, res) => {
    try {
        const results = await QuizResult.find();

        const stats = {
            totalQuizzes: results.length,
            homeTypes: {},
            experienceLevels: {},
            activityLevels: {},
            preferredSizes: {}
        };

        results.forEach(result => {
            const { homeType, experience, activityLevel, preferredSize } = result.answers;

            stats.homeTypes[homeType] = (stats.homeTypes[homeType] || 0) + 1;
            stats.experienceLevels[experience] = (stats.experienceLevels[experience] || 0) + 1;
            stats.activityLevels[activityLevel] = (stats.activityLevels[activityLevel] || 0) + 1;
            stats.preferredSizes[preferredSize] = (stats.preferredSizes[preferredSize] || 0) + 1;
        });

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get recent quiz results (admin only)
router.get('/admin/results', authenticate, isAdmin, async (req, res) => {
    try {
        const results = await QuizResult.find()
            .populate('user', 'name email')
            .populate('recommendedPets', 'name species breed')
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Quiz matching algorithm
const calculateMatch = (answers, pet) => {
    let score = 0;
    let maxScore = 6;

    // Home type matching (high weight)
    if (pet.homeType === 'any' || pet.homeType === answers.homeType) {
        score += 2;
    } else if (answers.homeType === 'house' && pet.homeType === 'apartment') {
        score += 1; // Houses can accommodate apartment pets
    }

    // Energy/Activity level matching
    if (pet.energyLevel === answers.activityLevel) {
        score += 2;
    } else if (Math.abs(['low', 'medium', 'high'].indexOf(pet.energyLevel) -
        ['low', 'medium', 'high'].indexOf(answers.activityLevel)) === 1) {
        score += 1;
    }

    // Kids compatibility
    if (answers.hasKids && pet.goodWithKids) {
        score += 1;
    } else if (!answers.hasKids) {
        score += 0.5; // Neutral if no kids
    }

    // Experience level
    if (pet.experienceLevel === answers.experience) {
        score += 1;
    }

    // Size preference
    if (answers.preferredSize === 'any' || pet.size === answers.preferredSize) {
        score += 0.5;
    }

    return (score / maxScore) * 100; // Return percentage
};

// Submit quiz and get recommendations
router.post('/', async (req, res) => {
    try {
        const answers = req.body;

        // Get all available pets
        const pets = await Pet.find({ status: 'available' });

        // Calculate match score for each pet
        const scoredPets = pets.map(pet => ({
            pet,
            score: calculateMatch(answers, pet),
        }));

        // Sort by score and get top 5
        scoredPets.sort((a, b) => b.score - a.score);
        const topMatches = scoredPets.slice(0, 5);

        // Save quiz result if user is authenticated
        const userId = req.headers.authorization ? req.user?._id : null;

        if (userId) {
            const quizResult = new QuizResult({
                user: userId,
                answers,
                recommendedPets: topMatches.map(m => m.pet._id),
                score: topMatches[0]?.score || 0,
            });
            await quizResult.save();
        }

        // Return recommendations with scores
        res.json({
            matches: topMatches.map(m => ({
                pet: m.pet,
                matchScore: Math.round(m.score),
            })),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user's quiz history
router.get('/history', authenticate, async (req, res) => {
    try {
        const results = await QuizResult.find({ user: req.user._id })
            .populate('recommendedPets')
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
