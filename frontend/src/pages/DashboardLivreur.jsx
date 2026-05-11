    import { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import API from '../services/api';

    export default function DashboardLivreur() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [disponibles, setDisponibles] = useState([]);
    const [mesCourses, setMesCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [onglet, setOnglet] = useState('disponibles');

    const fetchData = async () => {
        try {
        const [dispRes, toutesRes] = await Promise.all([
            API.get('/commandes/disponibles'),
            API.get('/commandes/mes-courses'),
        ]);
        setDisponibles(dispRes.data);
        setMesCourses(toutesRes.data);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAccepter = async (id) => {
        setActionLoading(id);
        try {
        await API.put(`/commandes/${id}/accepter`);
        await fetchData();
        } catch (error) {
        alert(error.response?.data?.message || 'Erreur');
        } finally {
        setActionLoading(null);
        }
    };

    const handleStatut = async (id, statut) => {
        setActionLoading(id);
        try {
        await API.put(`/commandes/${id}/statut`, { statut });
        await fetchData();
        } catch (error) {
        alert(error.response?.data?.message || 'Erreur');
        } finally {
        setActionLoading(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const enCours = mesCourses.filter(c => ['ACCEPTEE','EN_COURS'].includes(c.statut)).length;
    const completees = mesCourses.filter(c => c.statut === 'LIVREE').length;

    return (
        <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-orange-500">⚡ SpeedDelivery</h1>
            <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">🛵 {user?.name}</span>
            <button onClick={handleLogout} className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition">Déconnexion</button>
            </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord Livreur</h2>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-orange-500">{disponibles.length}</p>
                <p className="text-gray-500 text-sm mt-1">Disponibles</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-blue-500">{enCours}</p>
                <p className="text-gray-500 text-sm mt-1">En cours</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-green-500">{completees}</p>
                <p className="text-gray-500 text-sm mt-1">Complétées</p>
            </div>
            </div>

            {/* Onglets */}
            <div className="flex gap-2 mb-6">
            <button
                onClick={() => setOnglet('disponibles')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${onglet === 'disponibles' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
                Courses disponibles ({disponibles.length})
            </button>
            <button
                onClick={() => setOnglet('mesCourses')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${onglet === 'mesCourses' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
                Mes courses ({mesCourses.length})
            </button>
            </div>

            {loading ? (
            <div className="text-center text-gray-400 py-10">Chargement...</div>
            ) : onglet === 'disponibles' ? (
            disponibles.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center text-gray-400">Aucune course disponible</div>
            ) : (
                <div className="space-y-4">
                {disponibles.map((c) => (
                    <div key={c.id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-semibold text-gray-500">Commande #{c.id}</span>
                        <span className="text-orange-500 font-bold">{c.prix} FCFA</span>
                    </div>
                    <div className="space-y-2 mb-4">
                        <div className="flex gap-2"><span className="text-green-500">📍</span><div><p className="text-xs text-gray-400">Départ</p><p className="text-sm text-gray-700">{c.adresseDepart}</p></div></div>
                        <div className="flex gap-2"><span className="text-red-500">🎯</span><div><p className="text-xs text-gray-400">Arrivée</p><p className="text-sm text-gray-700">{c.adresseArrivee}</p></div></div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-500">👤 {c.client.name}</p>
                        <button onClick={() => handleAccepter(c.id)} disabled={actionLoading === c.id} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg transition disabled:opacity-50">
                        {actionLoading === c.id ? '...' : '✅ Accepter'}
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            )
            ) : (
            mesCourses.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center text-gray-400">Aucune course acceptée</div>
            ) : (
                <div className="space-y-4">
                {mesCourses.map((c) => (
                    <div key={c.id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-semibold text-gray-500">Commande #{c.id}</span>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        c.statut === 'ACCEPTEE' ? 'bg-blue-100 text-blue-700' :
                        c.statut === 'EN_COURS' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'}`}>
                        {c.statut === 'ACCEPTEE' ? '✅ Acceptée' : c.statut === 'EN_COURS' ? '🚀 En cours' : '📦 Livrée'}
                        </span>
                    </div>
                    <div className="space-y-2 mb-4">
                        <div className="flex gap-2"><span className="text-green-500">📍</span><p className="text-sm text-gray-700">{c.adresseDepart}</p></div>
                        <div className="flex gap-2"><span className="text-red-500">🎯</span><p className="text-sm text-gray-700">{c.adresseArrivee}</p></div>
                    </div>
                    {c.statut !== 'LIVREE' && (
                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                        {c.statut === 'ACCEPTEE' && (
                            <button onClick={() => handleStatut(c.id, 'EN_COURS')} disabled={actionLoading === c.id} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50">
                            🚀 Démarrer la course
                            </button>
                        )}
                        {c.statut === 'EN_COURS' && (
                            <button onClick={() => handleStatut(c.id, 'LIVREE')} disabled={actionLoading === c.id} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50">
                            📦 Marquer comme livrée
                            </button>
                        )}
                        </div>
                    )}
                    </div>
                ))}
                </div>
            )
            )}
        </div>
        </div>
    );
    }