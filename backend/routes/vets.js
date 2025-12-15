import express from 'express';
import Vet from '../models/Vet.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all vets (public)
router.get('/', async (req, res) => {
    try {
        const { city, specialization } = req.query;
        const filter = {};

        if (city) filter.city = new RegExp(city, 'i');
        if (specialization) filter.specialization = new RegExp(specialization, 'i');

        const vets = await Vet.find(filter).sort({ verified: -1, name: 1 });
        res.json(vets);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single vet (public)
router.get('/:id', async (req, res) => {
    try {
        const vet = await Vet.findById(req.params.id);
        if (!vet) {
            return res.status(404).json({ message: 'Vet not found' });
        }
        res.json(vet);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create vet (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
    try {
        const vet = new Vet(req.body);
        await vet.save();
        res.status(201).json(vet);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update vet (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const vet = await Vet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!vet) {
            return res.status(404).json({ message: 'Vet not found' });
        }
        res.json(vet);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete vet (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const vet = await Vet.findByIdAndDelete(req.params.id);
        if (!vet) {
            return res.status(404).json({ message: 'Vet not found' });
        }
        res.json({ message: 'Vet deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
