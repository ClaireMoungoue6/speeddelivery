    export default function CommandeCard({ commande }) {
    const statutColors = {
        EN_ATTENTE: { bg: '#fef3c7', color: '#d97706', border: '#fde68a' },
        ACCEPTEE: { bg: '#dbeafe', color: '#2563eb', border: '#bfdbfe' },
        EN_COURS: { bg: '#d1fae5', color: '#059669', border: '#a7f3d0' },
        LIVREE: { bg: '#d1fae5', color: '#047857', border: '#6ee7b7' },
        ANNULEE: { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' },
    };
    const statutLabels = {
        EN_ATTENTE: '⏳ En attente',
        ACCEPTEE: '✅ Acceptee',
        EN_COURS: '🚀 En cours',
        LIVREE: '📦 Livree',
        ANNULEE: '❌ Annulee',
    };
    const sc = statutColors[commande.statut] || statutColors.EN_ATTENTE;
    return (
        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 16, padding: 20, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#6b7280' }}>Commande #{commande.id}</span>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999, backgroundColor: sc.bg, color: sc.color, border: '1px solid ' + sc.border }}>{statutLabels[commande.statut]}</span>
        </div>
        <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 15 }}>📍</span>
            <div><div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 1 }}>Depart</div><div style={{ fontSize: 13, color: '#374151' }}>{commande.adresseDepart}</div></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <span style={{ fontSize: 15 }}>🎯</span>
            <div><div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 1 }}>Arrivee</div><div style={{ fontSize: 13, color: '#374151' }}>{commande.adresseArrivee}</div></div>
            </div>
        </div>
        {commande.description && <div style={{ fontSize: 12, color: '#9ca3af', fontStyle: 'italic', marginBottom: 10 }}>"{commande.description}"</div>}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
            <span style={{ fontSize: 15, fontWeight: 900, color: '#059669' }}>{commande.prix} FCFA</span>
            {commande.livreur && <span style={{ fontSize: 12, color: '#6b7280' }}>🛵 {commande.livreur.name}</span>}
            <span style={{ fontSize: 11, color: '#9ca3af' }}>{new Date(commande.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
        </div>
    );
    }
