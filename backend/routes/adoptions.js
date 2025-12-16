/**
 * Adoption Request Routes
 * Handles adoption application submission, retrieval, and status updates
 * Users can submit and view their applications, admins can manage all applications
 */

import express from 'express';
import AdoptionRequest from '../models/AdoptionRequest.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Submit new adoption application
router.post('/', authenticate, async (req, res) => {
    try {
        const application = new AdoptionRequest({
            ...req.body,
            user: req.user._id,
            pet: req.body.petId,
        });
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user's applications
router.get('/user', authenticate, async (req, res) => {
    try {
        const applications = await AdoptionRequest.find({ user: req.user._id })
            .populate('pet')
            .sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all applications (admin only)
router.get('/admin', authenticate, isAdmin, async (req, res) => {
    try {
        const applications = await AdoptionRequest.find()
            .populate('user', 'name email')
            .populate('pet')
            .sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update application status (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const application = await AdoptionRequest.findByIdAndUpdate(
            req.params.id,
            { status, adminNotes },
            { new: true }
        ).populate('pet user');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
