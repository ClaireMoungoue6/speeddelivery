    export default function CommandeCard({ commande }) {
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

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-500">
            Commande #{commande.id}
            </span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${statutColors[commande.statut]}`}>
            {statutLabels[commande.statut]}
            </span>
        </div>

        {/* Adresses */}
        <div className="space-y-2 mb-3">
            <div className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">📍</span>
            <div>
                <p className="text-xs text-gray-400">Départ</p>
                <p className="text-sm text-gray-700">{commande.adresseDepart}</p>
            </div>
            </div>
            <div className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">🎯</span>
            <div>
                <p className="text-xs text-gray-400">Arrivée</p>
                <p className="text-sm text-gray-700">{commande.adresseArrivee}</p>
            </div>
            </div>
        </div>

        {/* Description */}
        {commande.description && (
            <p className="text-sm text-gray-500 mb-3 italic">
            "{commande.description}"
            </p>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <span className="text-orange-500 font-bold">
            {commande.prix} FCFA
            </span>
            {commande.livreur && (
            <span className="text-xs text-gray-500">
                🛵 {commande.livreur.name}
            </span>
            )}
            <span className="text-xs text-gray-400">
            {new Date(commande.createdAt).toLocaleDateString('fr-FR')}
            </span>
        </div>
        </div>
    );
    }