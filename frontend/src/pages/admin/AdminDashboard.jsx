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
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
    const { playSuccessSound, playErrorSound } = useSound();
    const [pets, setPets] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPetModal, setShowPetModal] = useState(false);
    const [editingPet, setEditingPet] = useState(null);
    const [petFormData, setPetFormData] = useState({
        name: '',
        species: 'dog',
        breed: '',
        age: '',
        gender: 'male',
        description: '',
        status: 'available',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [petsRes, appsRes] = await Promise.all([
                axios.get('http://localhost:5001/api/pets'),
                axios.get('http://localhost:5001/api/adoptions/admin'),
            ]);
            setPets(petsRes.data);
            setApplications(appsRes.data);
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
        { label: 'Available', value: pets.filter((p) => p.status === 'available').length, icon: '✓' },
        { label: 'Pending Apps', value: applications.filter((a) => a.status === 'pending').length, icon: '⏳' },
    ];

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

                {/* Analytics Charts */}
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
                                            const COLORS = ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5'];
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
                                    <Bar dataKey="count" fill="#f97316" />
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
                                    <Cell fill="#f59e0b" />
                                    <Cell fill="#6b7280" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </section>

                {/* Pets Management */}
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
                                                                    ? 'bg-yellow-100 text-yellow-800'
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

                {/* Applications */}
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
            </div>
        </div>
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
