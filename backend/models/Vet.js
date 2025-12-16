import mongoose from 'mongoose';

const vetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    specialization: [{
        type: String,
        required: true,
    }],
    clinicName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    experience: {
        type: Number, // years of experience
    },
    contact: {
        phone: String,
        email: String,
    },
    availability: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Vet', vetSchema);
