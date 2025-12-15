import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Pet from './models/Pet.js';
import Vet from './models/Vet.js';

dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Pet.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create demo users
        const demoUser = await User.create({
            name: 'Demo User',
            email: 'user@demo.com',
            password: 'password',
            phone: '+1234567890',
            role: 'adopter',
        });

        const demoAdmin = await User.create({
            name: 'Admin User',
            email: 'admin@demo.com',
            password: 'password',
            phone: '+1234567891',
            role: 'admin',
        });

        console.log('👤 Created demo users');

        // Create demo pets with lifestyle attributes
        const pets = [
            {
                name: 'Max',
                species: 'dog',
                breed: 'Golden Retriever',
                age: 3,
                gender: 'male',
                description: 'Friendly and energetic golden retriever looking for an active family. Max loves to play fetch and go on long walks. He is great with children and other dogs.',
                characteristics: ['Friendly', 'Energetic', 'Good with kids', 'House-trained'],
                status: 'available',
                energyLevel: 'high',
                goodWithKids: true,
                homeType: 'house',
                experienceLevel: 'beginner',
                size: 'large',
                addedBy: demoAdmin._id,
            },
            {
                name: 'Luna',
                species: 'cat',
                breed: 'Persian',
                age: 2,
                gender: 'female',
                description: 'Gentle and affectionate Persian cat who loves to cuddle. Luna is calm and well-suited for apartment living.',
                characteristics: ['Calm', 'Affectionate', 'Indoor cat', 'Groomed'],
                status: 'available',
                energyLevel: 'low',
                goodWithKids: true,
                homeType: 'apartment',
                experienceLevel: 'beginner',
                size: 'small',
                addedBy: demoAdmin._id,
            },
            {
                name: 'Charlie',
                species: 'dog',
                breed: 'Labrador',
                age: 4,
                gender: 'male',
                description: 'Loyal and playful lab who is great with kids. Charlie is well-trained and loves water activities.',
                characteristics: ['Loyal', 'Playful', 'Good with kids', 'Trained'],
                status: 'available',
                energyLevel: 'high',
                goodWithKids: true,
                homeType: 'house',
                experienceLevel: 'beginner',
                size: 'large',
                addedBy: demoAdmin._id,
            },
            {
                name: 'Bella',
                species: 'cat',
                breed: 'Siamese',
                age: 1,
                gender: 'female',
                description: 'Young and playful Siamese kitten with beautiful blue eyes. Very social and loves attention.',
                characteristics: ['Playful', 'Social', 'Vocal', 'Energetic'],
                status: 'available',
                energyLevel: 'medium',
                goodWithKids: false,
                homeType: 'apartment',
                experienceLevel: 'intermediate',
                size: 'small',
                addedBy: demoAdmin._id,
            },
            {
                name: 'Rocky',
                species: 'dog',
                breed: 'German Shepherd',
                age: 5,
                gender: 'male',
                description: 'Well-trained and protective German Shepherd. Great guard dog and family companion.',
                characteristics: ['Protective', 'Trained', 'Loyal', 'Intelligent'],
                status: 'pending',
                energyLevel: 'medium',
                goodWithKids: true,
                homeType: 'house',
                experienceLevel: 'advanced',
                size: 'large',
                addedBy: demoAdmin._id,
            },
            {
                name: 'Mittens',
                species: 'cat',
                breed: 'Tabby',
                age: 3,
                gender: 'female',
                description: 'Sweet tabby cat who loves sunny spots and treats. Independent but affectionate.',
                characteristics: ['Independent', 'Affectionate', 'Quiet', 'Low-maintenance'],
                status: 'available',
                energyLevel: 'low',
                goodWithKids: true,
                homeType: 'any',
                experienceLevel: 'beginner',
                size: 'medium',
                addedBy: demoAdmin._id,
            },
            {
                name: 'Tweety',
                species: 'bird',
                breed: 'Canary',
                age: 1,
                gender: 'male',
                description: 'Beautiful yellow canary with a lovely singing voice. Perfect for apartment living.',
                characteristics: ['Musical', 'Gentle', 'Easy-care', 'Cheerful'],
                status: 'available',
                energyLevel: 'low',
                goodWithKids: true,
                homeType: 'apartment',
                experienceLevel: 'beginner',
                size: 'small',
                addedBy: demoAdmin._id,
            },
            {
                name: 'Polly',
                species: 'bird',
                breed: 'African Grey Parrot',
                age: 3,
                gender: 'female',
                description: 'Intelligent and talkative parrot. Knows over 50 words! Needs an experienced owner.',
                characteristics: ['Intelligent', 'Talkative', 'Social', 'Long-lived'],
                status: 'available',
                energyLevel: 'medium',
                goodWithKids: false,
                homeType: 'any',
                experienceLevel: 'advanced',
                size: 'small',
                addedBy: demoAdmin._id,
            },
            {
                name: 'Thumper',
                species: 'rabbit',
                breed: 'Holland Lop',
                age: 2,
                gender: 'male',
                description: 'Adorable lop-eared rabbit who loves to hop around and munch on carrots. Very friendly!',
                characteristics: ['Gentle', 'Playful', 'Quiet', 'Cute'],
                status: 'available',
                energyLevel: 'medium',
                goodWithKids: true,
                homeType: 'apartment',
                experienceLevel: 'beginner',
                size: 'small',
                addedBy: demoAdmin._id,
            },
            {
                name: 'Snowball',
                species: 'rabbit',
                breed: 'Flemish Giant',
                age: 1,
                gender: 'female',
                description: 'Large and gentle giant rabbit. Despite her size, she\'s incredibly sweet and calm.',
                characteristics: ['Gentle Giant', 'Calm', 'Affectionate', 'Unique'],
                status: 'available',
                energyLevel: 'low',
                goodWithKids: true,
                homeType: 'house',
                experienceLevel: 'intermediate',
                size: 'large',
                addedBy: demoAdmin._id,
            },
            {
                name: 'Buddy',
                species: 'dog',
                breed: 'Beagle',
                age: 2,
                gender: 'male',
                description: 'Playful beagle who loves to sniff around and explore. Great family dog!',
                characteristics: ['Curious', 'Friendly', 'Energetic', 'Good with kids'],
                status: 'available',
                energyLevel: 'high',
                goodWithKids: true,
                homeType: 'house',
                experienceLevel: 'beginner',
                size: 'medium',
                addedBy: demoAdmin._id,
            },
            {
                name: 'Shadow',
                species: 'cat',
                breed: 'Black Domestic Shorthair',
                age: 4,
                gender: 'male',
                description: 'Sleek black cat with golden eyes. Very independent but loves cuddles in the evening.',
                characteristics: ['Independent', 'Mysterious', 'Cuddly', 'Low-maintenance'],
                status: 'adopted',
                energyLevel: 'low',
                goodWithKids: true,
                homeType: 'apartment',
                experienceLevel: 'beginner',
                size: 'medium',
                addedBy: demoAdmin._id,
            },
        ];

        await Pet.insertMany(pets);
        console.log('🐾 Created demo pets');

        // Clear and create vets
        await Vet.deleteMany({});
        const vets = [
            {
                name: 'Dr. Sarah Johnson',
                specialization: 'General Veterinary Medicine',
                city: 'New York',
                experience: 12,
                contact: {
                    phone: '+1-555-0101',
                    email: 'sarah.j@vetclinic.com',
                },
                availability: 'Mon-Fri: 9AM-6PM',
                verified: true,
                address: '123 Pet Care St, New York, NY 10001',
            },
            {
                name: 'Dr. Michael Chen',
                specialization: 'Emergency & Critical Care',
                city: 'Los Angeles',
                experience: 8,
                contact: {
                    phone: '+1-555-0202',
                    email: 'michael.c@emergency-vet.com',
                },
                availability: '24/7 Emergency',
                verified: true,
                address: '456 Care Lane, Los Angeles, CA 90001',
            },
            {
                name: 'Dr. Emily Rodriguez',
                specialization: 'Surgery',
                city: 'Chicago',
                experience: 15,
                contact: {
                    phone: '+1-555-0303',
                    email: 'emily.r@surgical-vet.com',
                },
                availability: 'Tue-Sat: 8AM-4PM',
                verified: true,
                address: '789 Surgery Blvd, Chicago, IL 60007',
            },
            {
                name: 'Dr. James Wilson',
                specialization: 'Exotic Pets',
                city: 'Miami',
                experience: 10,
                contact: {
                    phone: '+1-555-0404',
                    email: 'james.w@exotic-vet.com',
                },
                availability: 'Mon-Thu: 10AM-5PM',
                verified: false,
                address: '321 Exotic Way, Miami, FL 33101',
            },
        ];

        await Vet.insertMany(vets);
        console.log('🏥 Created demo vets');

        console.log('\n✨ Seed data created successfully!');
        console.log('\n📋 Demo Accounts:');
        console.log('User: user@demo.com / password');
        console.log('Admin: admin@demo.com / password');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
