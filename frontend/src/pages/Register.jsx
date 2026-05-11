    import { useState } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { register } from '../services/api';

    export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'CLIENT',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
        const res = await register(formData);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        const role = res.data.user.role;
        if (role === 'CLIENT') navigate('/dashboard/client');
        else if (role === 'LIVREUR') navigate('/dashboard/livreur');
        else if (role === 'ADMIN') navigate('/dashboard/admin');
        } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">

            {/* Logo */}
            <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-orange-500">⚡ SpeedDelivery</h1>
            <p className="text-gray-500 mt-2">Créez votre compte</p>
            </div>

            {/* Erreur */}
            {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
            </div>
            )}

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
                </label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Alice Dupont"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
                </label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="alice@example.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
                </label>
                <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="+237 6XX XXX XXX"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
                </label>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="••••••••"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Je suis
                </label>
                <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                <option value="CLIENT">Client</option>
                <option value="LIVREUR">Livreur</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
            >
                {loading ? 'Création...' : 'Créer mon compte'}
            </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-orange-500 font-medium hover:underline">
                Se connecter
            </Link>
            </p>
        </div>
        </div>
    );
    }