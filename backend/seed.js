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
                images: [
                    'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=2574&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2524&auto=format&fit=crop'
                ]
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
                images: [
                    'https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?q=80&w=2574&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1617137599095-d0cb5dc64ca1?q=80&w=2574&auto=format&fit=crop'
                ]
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
                images: [
                    'https://imgs.search.brave.com/vFlObh4FqTtMu-DY6dbG-QciNXgxr9FI08FPJyllOjs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE4/MTA4MTE2My9waG90/by9sYWJyYWRvci1y/ZXRyaWV2ZXIuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTNn/bE5tMXMzdnNFWTh6/OFpMbm9JRzBtUzFy/UE1jV2VmRWdINnlf/M2VBNGM9'
                ]
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
                images: [
                    'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=2535&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1568152950566-c1bf43b4ab51?q=80&w=2574&auto=format&fit=crop'
                ]
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
                images: [
                    'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=2576&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1505628346881-b72e2780457f?q=80&w=2574&auto=format&fit=crop'
                ]
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
                images: [
                    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2566&auto=format&fit=crop'
                ]
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
                images: [
                    'https://imgs.search.brave.com/5y2DP-jzCuSF-2LXB3Mxp-ta0ARhPZHHW81MACqEwBQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/Lzg5L1NlcmludXNf/Y2FuYXJpYV8tUGFy/cXVlX1J1cmFsX2Rl/bF9OdWJsbyxfR3Jh/bl9DYW5hcmlhLF9T/cGFpbl8tbWFsZS04/YS5qcGc'
                ]
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
                images: [
                    'https://primary.jwwb.nl/public/s/a/i/temp-gskcuxnnasyisyefemju/8deeeed2-7fd5-440a-a254-95a6deeed556-high.jpg'
                ]
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
                images: [
                    'https://imgs.search.brave.com/ZYQcZuMqqCqgig0LmW9G0DOWuv08uZ7g2F8dR2lXtoo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTAz/MjA5NjY1L3Bob3Rv/L2EtcmFiYml0LWhv/bGxhbmQtbG9wLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1o/cENISmF6Z2JBMHFW/YmZYaU9zd1g4YkxS/ZjREWEF6dFNoTmN3/dWVIQkNVPQ'
                ]
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
                images: [
                    'https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=2574&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1591382386627-349b692688ff?q=80&w=2574&auto=format&fit=crop'
                ]
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
                images: [
                    'https://imgs.search.brave.com/ioTYRV4uvQT9RXVzNm9iG-fvFpkFWbOC9eTXum-yXx4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZG9nc3Rlci5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQv/MDMvYmVhZ2xlLWlu/LWRvd253YXJkLXBv/c2l0aW9uX2p1a2dy/YXBvbmdfU2h1dHRl/cnN0b2NrLmpwZw'
                ]
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
                images: [
                    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2515&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=2670&auto=format&fit=crop'
                ]
            },
        ];

        await Pet.insertMany(pets);
        console.log('🐾 Created demo pets');

        // Clear and create vets
        await Vet.deleteMany({});
        const vets = [
            {
                name: 'Dr. Rajesh Kumar',
                specialization: ['General Veterinary Medicine'],
                clinicName: 'Pet Care Clinic',
                city: 'Mumbai',
                experience: 12,
                contact: {
                    phone: '+91-98765-43210',
                    email: 'rajesh.k@vetclinic.in',
                },
                availability: 'Mon-Fri: 9AM-6PM',
                verified: true,
                address: '123 Pet Care Lane, Bandra West, Mumbai, MH 400050',
            },
            {
                name: 'Dr. Priya Sharma',
                specialization: ['Emergency & Critical Care'],
                clinicName: 'Delhi Emergency Vet',
                city: 'Delhi',
                experience: 8,
                contact: {
                    phone: '+91-98765-12345',
                    email: 'priya.s@emergency-vet.in',
                },
                availability: '24/7 Emergency',
                verified: true,
                address: '456 Care Road, Vasant Vihar, New Delhi, DL 110057',
            },
            {
                name: 'Dr. Amit Patel',
                specialization: ['Surgery'],
                clinicName: 'Bangalore Surgical Center',
                city: 'Bangalore',
                experience: 15,
                contact: {
                    phone: '+91-98765-67890',
                    email: 'amit.p@surgical-vet.in',
                },
                availability: 'Tue-Sat: 8AM-4PM',
                verified: true,
                address: '789 Surgery Blvd, Indiranagar, Bangalore, KA 560038',
            },
            {
                name: 'Dr. Sneha Reddy',
                specialization: ['Exotic Pets'],
                clinicName: 'Chennai Exotics',
                city: 'Chennai',
                experience: 10,
                contact: {
                    phone: '+91-98765-09876',
                    email: 'sneha.r@exotic-vet.in',
                },
                availability: 'Mon-Thu: 10AM-5PM',
                verified: false,
                address: '321 Exotic Way, Adyar, Chennai, TN 600020',
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
