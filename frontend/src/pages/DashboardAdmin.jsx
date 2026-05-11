    import { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import API from '../services/api';

    export default function DashboardAdmin() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [commandes, setCommandes] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [onglet, setOnglet] = useState('commandes');

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [cmdRes, usersRes] = await Promise.all([
            API.get('/commandes/toutes'),
            API.get('/auth/users'),
            ]);
            setCommandes(cmdRes.data);
            setUsers(usersRes.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const statutColors = {
        EN_ATTENTE: 'bg-yellow-100 text-yellow-700',
        ACCEPTEE: 'bg-blue-100 text-blue-700',
        EN_COURS: 'bg-orange-100 text-orange-700',
        LIVREE: 'bg-green-100 text-green-700',
        ANNULEE: 'bg-red-100 text-red-700',
    };

    const statutLabels = {
        EN_ATTENTE: '⏳ En attente',
        ACCEPTEE: '✅ Acceptée',
        EN_COURS: '🚀 En cours',
        LIVREE: '📦 Livrée',
        ANNULEE: '❌ Annulée',
    };

    const clients = users.filter(u => u.role === 'CLIENT');
    const livreurs = users.filter(u => u.role === 'LIVREUR');
    const enCours = commandes.filter(c => ['ACCEPTEE', 'EN_COURS'].includes(c.statut)).length;
    const livrees = commandes.filter(c => c.statut === 'LIVREE').length;

    return (
        <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-orange-500">⚡ SpeedDelivery</h1>
            <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">👑 Admin : {user?.name}</span>
            <button onClick={handleLogout} className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition">Déconnexion</button>
            </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Panel Administrateur</h2>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-orange-500">{commandes.length}</p>
                <p className="text-gray-500 text-sm mt-1">Commandes totales</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-blue-500">{clients.length}</p>
                <p className="text-gray-500 text-sm mt-1">Clients</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-green-500">{livreurs.length}</p>
                <p className="text-gray-500 text-sm mt-1">Livreurs</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-purple-500">{enCours}</p>
                <p className="text-gray-500 text-sm mt-1">En cours</p>
            </div>
            </div>

            {/* Onglets */}
            <div className="flex gap-2 mb-6">
            <button
                onClick={() => setOnglet('commandes')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${onglet === 'commandes' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
                Commandes ({commandes.length})
            </button>
            <button
                onClick={() => setOnglet('users')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${onglet === 'users' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
                Utilisateurs ({users.length})
            </button>
            </div>

            {loading ? (
            <div className="text-center text-gray-400 py-10">Chargement...</div>
            ) : onglet === 'commandes' ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Client</th>
                    <th className="px-4 py-3 text-left">Départ</th>
                    <th className="px-4 py-3 text-left">Arrivée</th>
                    <th className="px-4 py-3 text-left">Livreur</th>
                    <th className="px-4 py-3 text-left">Prix</th>
                    <th className="px-4 py-3 text-left">Statut</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {commandes.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">#{c.id}</td>
                        <td className="px-4 py-3">{c.client?.name}</td>
                        <td className="px-4 py-3 max-w-32 truncate">{c.adresseDepart}</td>
                        <td className="px-4 py-3 max-w-32 truncate">{c.adresseArrivee}</td>
                        <td className="px-4 py-3">{c.livreur?.name || <span className="text-gray-300">—</span>}</td>
                        <td className="px-4 py-3 font-medium text-orange-500">{c.prix} F</td>
                        <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statutColors[c.statut]}`}>
                            {statutLabels[c.statut]}
                        </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">{new Date(c.createdAt).toLocaleDateString('fr-FR')}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Nom</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Téléphone</th>
                    <th className="px-4 py-3 text-left">Rôle</th>
                    <th className="px-4 py-3 text-left">Inscrit le</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">#{u.id}</td>
                        <td className="px-4 py-3 font-medium">{u.name}</td>
                        <td className="px-4 py-3 text-gray-500">{u.email}</td>
                        <td className="px-4 py-3 text-gray-500">{u.phone || '—'}</td>
                        <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                            u.role === 'LIVREUR' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'}`}>
                            {u.role}
                        </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </div>
    );
    }