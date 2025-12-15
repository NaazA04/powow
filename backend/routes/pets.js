import express from 'express';
import Pet from '../models/Pet.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all pets (public)
router.get('/', async (req, res) => {
    try {
        const { species, gender, age } = req.query;
        const filter = {};

        if (species) filter.species = species;
        if (gender) filter.gender = gender;
        if (age) {
            const [min, max] = age.split('-');
            if (max) {
                filter.age = { $gte: Number(min), $lt: Number(max) };
            } else {
                filter.age = { $gte: Number(min) };
            }
        }

        const pets = await Pet.find(filter).sort({ createdAt: -1 });
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single pet (public)
router.get('/:id', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(pet);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create pet (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
    try {
        const pet = new Pet({
            ...req.body,
            addedBy: req.user._id,
        });
        await pet.save();
        res.status(201).json(pet);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update pet (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(pet);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete pet (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json({ message: 'Pet deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
