    import { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import API from '../services/api';
    import CommandeCard from '../components/CommandeCard';

    export default function DashboardClient() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommandes = async () => {
        try {
            const res = await API.get('/commandes/mes-commandes');
            setCommandes(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };
        fetchCommandes();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const total = commandes.length;
    const enCours = commandes.filter(c => ['ACCEPTEE', 'EN_COURS'].includes(c.statut)).length;
    const livrees = commandes.filter(c => c.statut === 'LIVREE').length;

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-orange-500">⚡ SpeedDelivery</h1>
            <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Bonjour, {user?.name}</span>
            <button
                onClick={handleLogout}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
            >
                Déconnexion
            </button>
            </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Tableau de bord Client
            </h2>
            <p className="text-gray-500 mb-8">
            Bienvenue sur SpeedDelivery !
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-orange-500">{total}</p>
                <p className="text-gray-500 text-sm mt-1">Commandes totales</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-blue-500">{enCours}</p>
                <p className="text-gray-500 text-sm mt-1">En cours</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-green-500">{livrees}</p>
                <p className="text-gray-500 text-sm mt-1">Livrées</p>
            </div>
            </div>

            {/* Bouton nouvelle commande */}
            <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-700">
                Mes commandes
            </h3>
            <button
                onClick={() => navigate('/commandes/new')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg transition"
            >
                + Nouvelle commande
            </button>
            </div>

            {/* Liste commandes */}
            {loading ? (
            <div className="text-center text-gray-400 py-10">Chargement...</div>
            ) : commandes.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <p className="text-gray-400 mb-4">
                Vous n'avez pas encore de commande
                </p>
                <button
                onClick={() => navigate('/commandes/new')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                + Passer ma première commande
                </button>
            </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commandes.map((commande) => (
                <CommandeCard key={commande.id} commande={commande} />
                ))}
            </div>
            )}
        </div>
        </div>
    );
    }