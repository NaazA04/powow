import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSound } from '../../context/SoundContext';
import Button from '../ui/Button';
import {
    HomeIcon,
    ClockIcon,
    AcademicCapIcon,
    HeartIcon,
    UserGroupIcon,
    BoltIcon,
} from '@heroicons/react/24/outline';

const MatchQuiz = ({ onClose }) => {
    const navigate = useNavigate();
    const { playSuccessSound, playClickSound } = useSound();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({
        homeType: '',
        timeAvailable: '',
        experience: '',
        preferredSize: '',
        hasKids: null,
        activityLevel: '',
    });
    const [loading, setLoading] = useState(false);

    const questions = [
        {
            id: 'homeType',
            question: 'What type of home do you have?',
            icon: HomeIcon,
            options: [
                { value: 'apartment', label: 'Apartment', emoji: '🏢' },
                { value: 'house', label: 'House with Yard', emoji: '🏡' },
            ],
        },
        {
            id: 'timeAvailable',
            question: 'How much time can you devote to your pet daily?',
            icon: ClockIcon,
            options: [
                { value: 'low', label: '1-2 hours', emoji: '⏱️' },
                { value: 'medium', label: '2-4 hours', emoji: '⏰' },
                { value: 'high', label: '4+ hours', emoji: '⏳' },
            ],
        },
        {
            id: 'experience',
            question: 'Your pet ownership experience level?',
            icon: AcademicCapIcon,
            options: [
                { value: 'beginner', label: 'First-time owner', emoji: '🌱' },
                { value: 'intermediate', label: 'Some experience', emoji: '📚' },
                { value: 'advanced', label: 'Very experienced', emoji: '🎓' },
            ],
        },
        {
            id: 'preferredSize',
            question: 'Preferred pet size?',
            icon: HeartIcon,
            options: [
                { value: 'small', label: 'Small (< 20 lbs)', emoji: '🐁' },
                { value: 'medium', label: 'Medium (20-50 lbs)', emoji: '🐕' },
                { value: 'large', label: 'Large (> 50 lbs)', emoji: '🦮' },
                { value: 'any', label: 'Any size', emoji: '🐾' },
            ],
        },
        {
            id: 'hasKids',
            question: 'Do you have kids at home?',
            icon: UserGroupIcon,
            options: [
                { value: true, label: 'Yes', emoji: '👨‍👩‍👧‍👦' },
                { value: false, label: 'No', emoji: '🚫' },
            ],
        },
        {
            id: 'activityLevel',
            question: 'Your preferred activity level?',
            icon: BoltIcon,
            options: [
                { value: 'low', label: 'Relaxed & Calm', emoji: '😌' },
                { value: 'medium', label: 'Moderate Activity', emoji: '🚶' },
                { value: 'high', label: 'Very Active', emoji: '🏃' },
            ],
        },
    ];

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    const handleAnswer = (value) => {
        playClickSound();
        setAnswers({ ...answers, [currentQuestion.id]: value });

        setTimeout(() => {
            if (currentStep < questions.length - 1) {
                setCurrentStep(currentStep + 1);
            }
        }, 300);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5001/api/quiz', answers);
            playSuccessSound();
            navigate('/quiz/results', { state: { matches: response.data.matches } });
            onClose?.();
        } catch (error) {
            toast.error('Failed to get recommendations');
        } finally {
            setLoading(false);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const isQuizComplete = Object.keys(answers).every(key => answers[key] !== '' && answers[key] !== null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-warm-50 via-accent-50 to-primary-50 p-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 pt-8"
                >
                    <h1 className="text-4xl font-bold gradient-text mb-2">
                        Find Your PawWow Match! 🐾
                    </h1>
                    <p className="text-gray-600">
                        Answer a few questions to discover pets perfect for your lifestyle
                    </p>
                </motion.div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-600">
                            Question {currentStep + 1} of {questions.length}
                        </span>
                        <span className="text-sm font-semibold text-accent-600">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
                        <motion.div
                            className="h-full bg-gradient-to-r from-accent-500 to-accent-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="glass-strong rounded-3xl p-8 shadow-2xl"
                    >
                        <div className="text-center mb-8">
                            <currentQuestion.icon className="w-16 h-16 mx-auto mb-4 text-accent-600" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                {currentQuestion.question}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQuestion.options.map((option) => {
                                const isSelected = answers[currentQuestion.id] === option.value;
                                return (
                                    <motion.button
                                        key={option.value}
                                        onClick={() => handleAnswer(option.value)}
                                        className={`
                      p-6 rounded-xl border-2 transition-all text-left
                      ${isSelected
                                                ? 'border-accent-500 bg-accent-50 shadow-lg scale-105'
                                                : 'border-gray-300 hover:border-accent-300 hover:bg-white'
                                            }
                    `}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="text-4xl mb-2">{option.emoji}</div>
                                        <div className="font-semibold text-gray-900">{option.label}</div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                    <Button
                        variant="secondary"
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                    >
                        ← Previous
                    </Button>

                    {isQuizComplete ? (
                        <Button
                            onClick={handleSubmit}
                            loading={loading}
                            size="lg"
                        >
                            Get My Matches! ✨
                        </Button>
                    ) : (
                        <div className="text-sm text-gray-500">
                            Answer all questions to continue
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatchQuiz;
