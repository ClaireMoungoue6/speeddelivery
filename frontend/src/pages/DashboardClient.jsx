    import { useNavigate } from 'react-router-dom';

    export default function DashboardClient() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

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

        {/* Contenu */}
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Tableau de bord Client
            </h2>
            <p className="text-gray-500 mb-8">
            Bienvenue sur SpeedDelivery. Passez votre première commande !
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-orange-500">0</p>
                <p className="text-gray-500 text-sm mt-1">Commandes totales</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-blue-500">0</p>
                <p className="text-gray-500 text-sm mt-1">En cours</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <p className="text-3xl font-bold text-green-500">0</p>
                <p className="text-gray-500 text-sm mt-1">Livrées</p>
            </div>
            </div>

            {/* Bouton nouvelle commande */}
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-400 mb-4">Vous n'avez pas encore de commande</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition">
                + Nouvelle commande
            </button>
            </div>
        </div>
        </div>
    );
    }