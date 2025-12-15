import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SoundProvider } from './context/SoundContext';

import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import PetListingPage from './pages/PetListingPage';
import PetDetailPage from './pages/PetDetailPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import UserProfile from './pages/user/UserProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import QuizPage from './pages/QuizPage';
import QuizResultsPage from './pages/QuizResultsPage';
import VetDirectoryPage from './pages/VetDirectoryPage';
import FavoritesPage from './pages/FavoritesPage';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/profile" replace />;
    }

    return children;
};

function AppRoutes() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/pets" element={<PetListingPage />} />
                <Route path="/pets/:id" element={<PetDetailPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/quiz/results" element={<QuizResultsPage />} />
                <Route path="/vets" element={<VetDirectoryPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <UserProfile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute adminOnly>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* Toast Notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#fff',
                        color: '#333',
                        borderRadius: '12px',
                        padding: '16px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    },
                    success: {
                        iconTheme: {
                            primary: '#f97316',
                            secondary: '#fff',
                        },
                    },
                }}
            />
        </div>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <SoundProvider>
                    <AppRoutes />
                </SoundProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
