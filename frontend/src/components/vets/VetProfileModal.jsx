import React from 'react';
import { motion } from 'framer-motion';
import {
    XMarkIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    BuildingOfficeIcon,
    ClockIcon,
    CheckBadgeIcon,
    CalendarDaysIcon
} from '@heroicons/react/24/outline';
import Button from '../ui/Button';
import { useSound } from '../../context/SoundContext';
import toast from 'react-hot-toast';

const VetProfileModal = ({ vet, onClose }) => {
    const { playSuccessSound } = useSound();

    const handleBookConsultation = () => {
        playSuccessSound();
        toast.success('Consultation request sent! The clinic will contact you shortly.');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
                {/* Header Image/Banner */}
                <div className="h-32 bg-gradient-to-r from-accent-500 to-accent-600 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="px-8 pb-8">
                    {/* Profile Header */}
                    <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-end md:items-end gap-6">
                        <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white">
                            {vet.photo ? (
                                <img src={vet.photo} alt={vet.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl bg-accent-100 text-accent-600">
                                    👨‍⚕️
                                </div>
                            )}
                        </div>
                        <div className="flex-1 pb-2">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-3xl font-bold text-gray-900">{vet.name}</h2>
                                {vet.verified && (
                                    <CheckBadgeIcon className="w-6 h-6 text-green-500" title="Verified Professional" />
                                )}
                            </div>
                            <p className="text-accent-600 font-semibold text-lg">
                                {Array.isArray(vet.specialization) ? vet.specialization.join(', ') : vet.specialization}
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column: Details */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                    Clinic Details
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 text-gray-700">
                                        <BuildingOfficeIcon className="w-5 h-5 text-accent-500 flex-shrink-0" />
                                        <span className="font-medium">{vet.clinicName}</span>
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <MapPinIcon className="w-5 h-5 text-accent-500 flex-shrink-0" />
                                        <span>
                                            {vet.address ? vet.address : vet.city}
                                        </span>
                                    </div>
                                    {vet.availability && (
                                        <div className="flex items-start gap-3 text-gray-600">
                                            <ClockIcon className="w-5 h-5 text-accent-500 flex-shrink-0" />
                                            <span>{vet.availability}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                    Experience
                                </h3>
                                <p className="text-gray-700">
                                    <span className="font-bold text-2xl text-accent-600">{vet.experience}</span>
                                    <span className="ml-2 text-gray-500">years of practice</span>
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Contact & Actions */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                                    Contact Information
                                </h3>
                                <div className="space-y-4">
                                    {vet.contact?.phone && (
                                        <a
                                            href={`tel:${vet.contact.phone}`}
                                            className="flex items-center gap-3 text-gray-700 hover:text-accent-600 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-accent-500">
                                                <PhoneIcon className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium">{vet.contact.phone}</span>
                                        </a>
                                    )}
                                    {vet.contact?.email && (
                                        <a
                                            href={`mailto:${vet.contact.email}`}
                                            className="flex items-center gap-3 text-gray-700 hover:text-accent-600 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-accent-500">
                                                <EnvelopeIcon className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium">{vet.contact.email}</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            <Button
                                onClick={handleBookConsultation}
                                className="w-full !py-4 !text-lg shadow-lg shadow-accent-500/20"
                                icon={CalendarDaysIcon}
                            >
                                Book Consultation
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default VetProfileModal;
