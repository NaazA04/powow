import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import petRoutes from './routes/pets.js';
import adoptionRoutes from './routes/adoptions.js';
import quizRoutes from './routes/quiz.js';
import vetRoutes from './routes/vets.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/vets', vetRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'PetMatch API is running',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            pets: '/api/pets',
            adoptions: '/api/adoptions',
        },
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
    });
