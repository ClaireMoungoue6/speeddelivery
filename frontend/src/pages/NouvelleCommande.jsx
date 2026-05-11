    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import API from '../services/api';

    export default function NouvelleCommande() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        adresseDepart: '',
        adresseArrivee: '',
        description: '',
    });
    const [prix, setPrix] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
        const res = await API.post('/commandes', formData);
        setPrix(res.data.commande.prix);
        setTimeout(() => {
            navigate('/dashboard/client');
        }, 2000);
        } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors de la commande');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-orange-500">⚡ SpeedDelivery</h1>
            <button
            onClick={() => navigate('/dashboard/client')}
            className="text-sm text-gray-500 hover:text-gray-700"
            >
            ← Retour
            </button>
        </nav>

        <div className="max-w-lg mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Nouvelle commande
            </h2>
            <p className="text-gray-500 mb-8">
            Renseignez les adresses de votre livraison
            </p>

            {/* Succès */}
            {prix && (
            <div className="bg-green-50 text-green-700 px-4 py-4 rounded-xl mb-6 text-center">
                <p className="font-bold text-lg">✅ Commande créée !</p>
                <p className="text-sm mt-1">Prix estimé : <span className="font-bold">{prix} FCFA</span></p>
                <p className="text-xs mt-1 text-green-500">Redirection en cours...</p>
            </div>
            )}

            {/* Erreur */}
            {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
            </div>
            )}

            {/* Formulaire */}
            {!prix && (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    📍 Adresse de départ
                </label>
                <input
                    type="text"
                    name="adresseDepart"
                    value={formData.adresseDepart}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Ex: Rue de la Paix, Douala"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    🎯 Adresse d'arrivée
                </label>
                <input
                    type="text"
                    name="adresseArrivee"
                    value={formData.adresseArrivee}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Ex: Akwa, Douala"
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    📝 Description du colis (optionnel)
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Ex: Petit colis fragile, documents importants..."
                />
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                >
                {loading ? 'Création...' : '🚀 Commander maintenant'}
                </button>
            </form>
            )}
        </div>
        </div>
    );
    }