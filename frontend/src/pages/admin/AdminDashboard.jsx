import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSound } from '../../context/SoundContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    ClipboardDocumentListIcon,
    CheckIcon,
    XMarkIcon,
    ChartPieIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
    const { playSuccessSound, playErrorSound } = useSound();
    const [activeTab, setActiveTab] = useState('overview');
    const [pets, setPets] = useState([]);
    const [vets, setVets] = useState([]);
    const [applications, setApplications] = useState([]);
    const [quizStats, setQuizStats] = useState(null);
    const [quizResults, setQuizResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPetModal, setShowPetModal] = useState(false);
    const [showVetModal, setShowVetModal] = useState(false);
    const [editingPet, setEditingPet] = useState(null);
    const [editingVet, setEditingVet] = useState(null);
    const [petFormData, setPetFormData] = useState({
        name: '',
        species: 'dog',
        breed: '',
        age: '',
        gender: 'male',
        description: '',
        status: 'available',
        images: [],
    });

    const [vetFormData, setVetFormData] = useState({
        name: '',
        specialization: '',
        clinicName: '',
        city: '',
        experience: '',
        phone: '',
        email: '',
        availability: '',
        verified: false,
        photo: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [petsRes, appsRes, vetsRes, statsRes, resultsRes] = await Promise.all([
                axios.get('http://localhost:5001/api/pets'),
                axios.get('http://localhost:5001/api/adoptions/admin'),
                axios.get('http://localhost:5001/api/vets'),
                axios.get('http://localhost:5001/api/quiz/admin/stats', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
                axios.get('http://localhost:5001/api/quiz/admin/results', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
            ]);
            setPets(petsRes.data);
            setApplications(appsRes.data);
            setVets(vetsRes.data);
            setQuizStats(statsRes.data);
            setQuizResults(resultsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setPets(getMockPets());
            setApplications(getMockApplications());
        } finally {
            setLoading(false);
        }
    };

    const handleAddPet = () => {
        setEditingPet(null);
        setPetFormData({
            name: '',
            species: 'dog',
            breed: '',
            age: '',
            gender: 'male',
            description: '',
            status: 'available',
            images: [],
        });
        setShowPetModal(true);
    };

    const handleEditPet = (pet) => {
        setEditingPet(pet);
        setPetFormData({
            name: pet.name,
            species: pet.species,
            breed: pet.breed,
            age: pet.age.toString(),
            gender: pet.gender,
            description: pet.description || '',
            status: pet.status,
            images: pet.images || [],
        });
        setShowPetModal(true);
    };

    const handleDeletePet = async (petId) => {
        if (!window.confirm('Are you sure you want to delete this pet?')) return;

        try {
            await axios.delete(`http://localhost:5001/api/pets/${petId}`);
            playSuccessSound();
            toast.success('Pet deleted successfully');
            fetchData();
        } catch (error) {
            playErrorSound();
            toast.error('Failed to delete pet');
        }
    };

    const handlePetSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = { ...petFormData, age: parseFloat(petFormData.age) };

            if (editingPet) {
                await axios.put(`http://localhost:5001/api/pets/${editingPet._id}`, data);
                toast.success('Pet updated successfully');
            } else {
                await axios.post('http://localhost:5001/api/pets', data);
                toast.success('Pet added successfully');
            }

            playSuccessSound();
            setShowPetModal(false);
            fetchData();
        } catch (error) {
            playErrorSound();
            toast.error('Failed to save pet');
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPetFormData(prev => ({
                    ...prev,
                    images: [...prev.images, reader.result]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setPetFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleApplicationAction = async (applicationId, action) => {
        try {
            await axios.put(`http://localhost:5001/api/adoptions/${applicationId}`, {
                status: action,
            });
            playSuccessSound();
            toast.success(`Application ${action}!`);
            fetchData();
        } catch (error) {
            playErrorSound();
            toast.error('Failed to update application');
        }
    };

    const stats = [
        { label: 'Total Pets', value: pets.length, icon: '🐾' },
        { label: 'Total Vets', value: vets.length, icon: '🏥' },
        { label: 'Pending Apps', value: applications.filter((a) => a.status === 'pending').length, icon: '⏳' },
    ];

    // Vet Management Functions
    const handleAddVet = () => {
        setEditingVet(null);
        setVetFormData({
            name: '',
            specialization: '',
            clinicName: '',
            city: '',
            experience: '',
            phone: '',
            email: '',
            availability: '',
            verified: false,
            photo: '',
        });
        setShowVetModal(true);
    };

    const handleEditVet = (vet) => {
        setEditingVet(vet);
        setVetFormData({
            name: vet.name,
            specialization: Array.isArray(vet.specialization) ? vet.specialization.join(', ') : vet.specialization,
            clinicName: vet.clinicName,
            city: vet.city,
            experience: vet.experience,
            phone: vet.contact?.phone || '',
            email: vet.contact?.email || '',
            availability: vet.availability || '',
            verified: vet.verified,
            photo: vet.photo || '',
        });
        setShowVetModal(true);
    };

    const handleDeleteVet = async (vetId) => {
        if (!window.confirm('Are you sure you want to delete this vet?')) return;

        try {
            await axios.delete(`http://localhost:5001/api/vets/${vetId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            playSuccessSound();
            toast.success('Vet deleted successfully');
            fetchData();
        } catch (error) {
            playErrorSound();
            toast.error('Failed to delete vet');
        }
    };

    const handleVetSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...vetFormData,
                specialization: Array.isArray(vetFormData.specialization)
                    ? vetFormData.specialization
                    : vetFormData.specialization.split(',').map(s => s.trim()),
                contact: {
                    phone: vetFormData.phone,
                    email: vetFormData.email
                }
            };

            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };

            if (editingVet) {
                await axios.put(`http://localhost:5001/api/vets/${editingVet._id}`, data, config);
                toast.success('Vet updated successfully');
            } else {
                await axios.post('http://localhost:5001/api/vets', data, config);
                toast.success('Vet added successfully');
            }

            playSuccessSound();
            setShowVetModal(false);
            fetchData();
        } catch (error) {
            playErrorSound();
            toast.error('Failed to save vet');
        }
    };

    const handleVetPhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVetFormData(prev => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Admin <span className="gradient-text">Dashboard</span>
                    </h1>
                    <p className="text-xl text-gray-600">Manage pets and adoption applications</p>
                </motion.div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card glass>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                    <div className="text-5xl">{stat.icon}</div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-200 pb-1 overflow-x-auto">
                    {['overview', 'pets', 'applications', 'vets', 'match-quiz'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-semibold capitalize transition-colors relative ${activeTab === tab ? 'text-accent-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-[-5px] left-0 right-0 h-1 bg-accent-600 rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <ChartPieIcon className="w-8 h-8 text-accent-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 mb-8">
                            {/* Pet Species Distribution */}
                            <Card glassmorphism>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Pet Species Distribution</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Dogs', value: pets.filter(p => p.species === 'dog').length },
                                                { name: 'Cats', value: pets.filter(p => p.species === 'cat').length },
                                                { name: 'Birds', value: pets.filter(p => p.species === 'bird').length },
                                                { name: 'Rabbits', value: pets.filter(p => p.species === 'rabbit').length },
                                                { name: 'Other', value: pets.filter(p => p.species === 'other').length },
                                            ].filter(d => d.value > 0)}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {[
                                                { name: 'Dogs', value: pets.filter(p => p.species === 'dog').length },
                                                { name: 'Cats', value: pets.filter(p => p.species === 'cat').length },
                                                { name: 'Birds', value: pets.filter(p => p.species === 'bird').length },
                                                { name: 'Rabbits', value: pets.filter(p => p.species === 'rabbit').length },
                                                { name: 'Other', value: pets.filter(p => p.species === 'other').length },
                                            ].filter(d => d.value > 0).map((entry, index) => {
                                                const COLORS = ['#8d6e63', '#a1887f', '#bcaaa4', '#d7ccc8', '#efebe9'];
                                                return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
                                            })}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Card>

                            {/* Application Status */}
                            <Card glassmorphism>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Application Status</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={[
                                            { status: 'Pending', count: applications.filter(a => a.status === 'pending').length },
                                            { status: 'Approved', count: applications.filter(a => a.status === 'approved').length },
                                            { status: 'Rejected', count: applications.filter(a => a.status === 'rejected').length },
                                        ]}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="status" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#8d6e63" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </div>

                        {/* Pet Status Breakdown */}
                        <Card glassmorphism>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Pet Availability Status</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Available', value: pets.filter(p => p.status === 'available').length },
                                            { name: 'Pending', value: pets.filter(p => p.status === 'pending').length },
                                            { name: 'Adopted', value: pets.filter(p => p.status === 'adopted').length },
                                        ].filter(d => d.value > 0)}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        <Cell fill="#10b981" />
                                        <Cell fill="#8d6e63" />
                                        <Cell fill="#6b7280" />
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>
                    </section>
                )}

                {/* Pets Management */}
                {activeTab === 'pets' && (
                    <section className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Manage Pets</h2>
                                <p className="text-gray-600 mt-1">View, edit, and manage all pets in the system</p>
                            </div>
                            <Button icon={PlusIcon} onClick={handleAddPet} size="lg">
                                Add New Pet
                            </Button>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            <Card glassmorphism className="overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                    Pet
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                    Species & Breed
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                    Details
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {pets.map((pet, index) => (
                                                <motion.tr
                                                    key={pet._id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.03 }}
                                                    className="hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div className="text-4xl">
                                                                {pet.species === 'dog' ? '🐕' :
                                                                    pet.species === 'cat' ? '🐱' :
                                                                        pet.species === 'bird' ? '🦜' :
                                                                            pet.species === 'rabbit' ? '🐰' : '🐾'}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-gray-900">{pet.name}</div>
                                                                <div className="text-sm text-gray-500">ID: {pet._id?.slice(-6)}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm">
                                                            <div className="font-semibold text-gray-900 capitalize">{pet.species}</div>
                                                            <div className="text-gray-600">{pet.breed}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-600">
                                                            <div>{pet.age} {pet.age === 1 ? 'year' : 'years'} old</div>
                                                            <div className="capitalize">{pet.gender} • {pet.size || 'N/A'}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${pet.status === 'available'
                                                                ? 'bg-green-100 text-green-800'
                                                                : pet.status === 'pending'
                                                                    ? 'bg-accent-100 text-accent-800'
                                                                    : 'bg-gray-100 text-gray-800'
                                                                }`}
                                                        >
                                                            {pet.status?.charAt(0).toUpperCase() + pet.status?.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => handleEditPet(pet)}
                                                                className="p-2 text-accent-600 hover:bg-accent-50 rounded-lg transition-colors"
                                                                title="Edit Pet"
                                                            >
                                                                <PencilIcon className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeletePet(pet._id)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Delete Pet"
                                                            >
                                                                <TrashIcon className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {pets.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">🐾</div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">No pets yet</h3>
                                        <p className="text-gray-600 mb-6">Get started by adding your first pet!</p>
                                        <Button onClick={handleAddPet} icon={PlusIcon}>
                                            Add Your First Pet
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        )}
                    </section>
                )}

                {/* Applications */}
                {activeTab === 'applications' && (
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <ClipboardDocumentListIcon className="w-8 h-8 text-accent-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Adoption Applications</h2>
                        </div>

                        <div className="space-y-4">
                            {applications.map((app, index) => (
                                <motion.div
                                    key={app._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card hover={false}>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex gap-4">
                                                <div className="text-4xl">
                                                    {app.pet?.species === 'dog' ? '🐕' : '🐱'}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">
                                                        {app.user?.name || 'John Doe'}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        Applied for <strong>{app.pet?.name}</strong>
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {app.user?.email || 'john@example.com'} • {app.phone}
                                                    </p>
                                                    <span
                                                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${app.status === 'approved'
                                                            ? 'bg-green-100 text-green-800'
                                                            : app.status === 'rejected'
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                            }`}
                                                    >
                                                        {app.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {app.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        icon={CheckIcon}
                                                        onClick={() => handleApplicationAction(app._id, 'approved')}
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        icon={XMarkIcon}
                                                        onClick={() => handleApplicationAction(app._id, 'rejected')}
                                                    >
                                                        Reject
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Vets Management */}
                {activeTab === 'vets' && (
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Manage Vets</h2>
                                <p className="text-gray-600 mt-1">Add and manage veterinary professionals</p>
                            </div>
                            <Button icon={PlusIcon} onClick={handleAddVet} size="lg">
                                Add New Vet
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {vets.map((vet, index) => (
                                <motion.div
                                    key={vet._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card className="h-full flex flex-col">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                                {vet.photo ? (
                                                    <img src={vet.photo} alt={vet.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-2xl">👨‍⚕️</div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-gray-900">{vet.name}</h3>
                                                    {vet.verified && <CheckBadgeIcon className="w-4 h-4 text-green-500" />}
                                                </div>
                                                <p className="text-sm text-gray-600">{vet.clinicName}</p>
                                                <p className="text-xs text-gray-500 mt-1">{vet.city}</p>
                                            </div>
                                        </div>

                                        <div className="mt-auto flex justify-end gap-2 pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() => handleEditVet(vet)}
                                                className="p-2 text-accent-600 hover:bg-accent-50 rounded-lg transition-colors"
                                            >
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteVet(vet._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Match Quiz Management */}
                {activeTab === 'match-quiz' && (
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <ChartPieIcon className="w-8 h-8 text-accent-600" />
                            <h2 className="text-2xl font-bold text-gray-900">Match Quiz Insights</h2>
                        </div>

                        {/* Popular Preferences Charts */}
                        <div className="grid lg:grid-cols-2 gap-8 mb-8">
                            <Card glassmorphism>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Preferred Home Type</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={Object.entries(quizStats?.homeTypes || {}).map(([name, value]) => ({ name, value }))}
                                            cx="50%"
                                            cy="50%"
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {Object.entries(quizStats?.homeTypes || {}).map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={['#8d6e63', '#a1887f'][index % 2]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Card>

                            <Card glassmorphism>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Preferred Pet Size</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={Object.entries(quizStats?.preferredSizes || {}).map(([size, count]) => ({ size, count }))}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="size" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#8d6e63" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </div>

                        {/* Recent Quiz Results Table */}
                        <Card glassmorphism>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Quiz Results</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Preferences</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Top Match</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {quizResults.map((result) => (
                                            <tr key={result._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-gray-900">
                                                        {result.user?.name || 'Guest'}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {result.user?.email || 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    <div>Home: {result.answers.homeType}</div>
                                                    <div>Kids: {result.answers.hasKids ? 'Yes' : 'No'}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {result.recommendedPets?.[0] ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            {result.recommendedPets[0].name} ({result.recommendedPets[0].species})
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 text-sm">No match</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(result.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </section>
                )}

                {/* Pet Modal */}
                <Modal
                    isOpen={showPetModal}
                    onClose={() => setShowPetModal(false)}
                    title={editingPet ? 'Edit Pet' : 'Add New Pet'}
                    size="lg"
                >
                    <form onSubmit={handlePetSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                label="Name"
                                name="name"
                                value={petFormData.name}
                                onChange={(e) =>
                                    setPetFormData({ ...petFormData, name: e.target.value })
                                }
                                required
                            />

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Species <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="species"
                                    value={petFormData.species}
                                    onChange={(e) =>
                                        setPetFormData({ ...petFormData, species: e.target.value })
                                    }
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-accent-500 focus:outline-none"
                                    required
                                >
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="bird">Bird</option>
                                    <option value="rabbit">Rabbit</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <Input
                                label="Breed"
                                name="breed"
                                value={petFormData.breed}
                                onChange={(e) =>
                                    setPetFormData({ ...petFormData, breed: e.target.value })
                                }
                                required
                            />

                            <Input
                                label="Age (years)"
                                type="number"
                                step="0.1"
                                name="age"
                                value={petFormData.age}
                                onChange={(e) =>
                                    setPetFormData({ ...petFormData, age: e.target.value })
                                }
                                required
                            />

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="gender"
                                    value={petFormData.gender}
                                    onChange={(e) =>
                                        setPetFormData({ ...petFormData, gender: e.target.value })
                                    }
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-accent-500 focus:outline-none"
                                    required
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={petFormData.description}
                                onChange={(e) =>
                                    setPetFormData({ ...petFormData, description: e.target.value })
                                }
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-accent-500 focus:outline-none"
                                placeholder="Tell us about this pet..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Pet Images
                            </label>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {petFormData.images.map((img, index) => (
                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                                        <img src={img} alt={`Pet ${index + 1}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <XMarkIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-accent-500 transition-colors aspect-square">
                                    <PlusIcon className="w-8 h-8 text-gray-400" />
                                    <span className="text-sm text-gray-500 mt-1">Add Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" size="lg" className="flex-1">
                                {editingPet ? 'Update Pet' : 'Add Pet'}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                size="lg"
                                onClick={() => setShowPetModal(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* Vet Modal */}
                <Modal
                    isOpen={showVetModal}
                    onClose={() => setShowVetModal(false)}
                    title={editingVet ? 'Edit Vet' : 'Add New Vet'}
                    size="lg"
                >
                    <form onSubmit={handleVetSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                label="Name"
                                value={vetFormData.name}
                                onChange={(e) => setVetFormData({ ...vetFormData, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Clinic Name"
                                value={vetFormData.clinicName}
                                onChange={(e) => setVetFormData({ ...vetFormData, clinicName: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                label="Specialization (comma separated)"
                                value={vetFormData.specialization}
                                onChange={(e) => setVetFormData({ ...vetFormData, specialization: e.target.value })}
                                placeholder="e.g. Dogs, Cats, Surgery"
                                required
                            />
                            <Input
                                label="City"
                                value={vetFormData.city}
                                onChange={(e) => setVetFormData({ ...vetFormData, city: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <Input
                                label="Experience (years)"
                                type="number"
                                value={vetFormData.experience}
                                onChange={(e) => setVetFormData({ ...vetFormData, experience: e.target.value })}
                                required
                            />
                            <Input
                                label="Phone"
                                value={vetFormData.phone}
                                onChange={(e) => setVetFormData({ ...vetFormData, phone: e.target.value })}
                            />
                            <Input
                                label="Email"
                                type="email"
                                value={vetFormData.email}
                                onChange={(e) => setVetFormData({ ...vetFormData, email: e.target.value })}
                            />
                        </div>

                        <Input
                            label="Availability"
                            value={vetFormData.availability}
                            onChange={(e) => setVetFormData({ ...vetFormData, availability: e.target.value })}
                            placeholder="e.g. Mon-Fri 9am-5pm"
                        />

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="verified"
                                checked={vetFormData.verified}
                                onChange={(e) => setVetFormData({ ...vetFormData, verified: e.target.checked })}
                                className="w-5 h-5 text-accent-600 rounded focus:ring-accent-500"
                            />
                            <label htmlFor="verified" className="font-medium text-gray-700">
                                Verified Professional
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Vet Photo
                            </label>
                            <div className="flex items-center gap-4">
                                {vetFormData.photo && (
                                    <img src={vetFormData.photo} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleVetPhotoUpload}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-50 file:text-accent-700 hover:file:bg-accent-100"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" size="lg" className="flex-1">
                                {editingVet ? 'Update Vet' : 'Add Vet'}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                size="lg"
                                onClick={() => setShowVetModal(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div >
    );
};

const getMockPets = () => [
    { _id: '1', name: 'Max', species: 'dog', breed: 'Golden Retriever', age: 3, gender: 'male', status: 'available' },
    { _id: '2', name: 'Luna', species: 'cat', breed: 'Persian', age: 2, gender: 'female', status: 'available' },
];

const getMockApplications = () => [
    {
        _id: '1',
        user: { name: 'John Doe', email: 'john@example.com' },
        pet: { name: 'Max', species: 'dog' },
        phone: '+1234567890',
        status: 'pending',
    },
];

export default AdminDashboard;
