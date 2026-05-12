    export default function CommandeCard({ commande }) {
    const statutColors = {
        EN_ATTENTE: { bg: 'rgba(234,179,8,0.12)', color: '#fbbf24', border: 'rgba(234,179,8,0.3)' },
        ACCEPTEE: { bg: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: 'rgba(59,130,246,0.3)' },
        EN_COURS: { bg: 'rgba(5,150,105,0.12)', color: '#10b981', border: 'rgba(5,150,105,0.3)' },
        LIVREE: { bg: 'rgba(5,150,105,0.2)', color: '#34d399', border: 'rgba(52,211,153,0.4)' },
        ANNULEE: { bg: 'rgba(239,68,68,0.12)', color: '#f87171', border: 'rgba(239,68,68,0.3)' },
    };

    const statutLabels = {
        EN_ATTENTE: '⏳ En attente',
        ACCEPTEE: '✅ Acceptee',
        EN_COURS: '🚀 En cours',
        LIVREE: '📦 Livree',
        ANNULEE: '❌ Annulee',
    };

    const sc = statutColors[commande.statut] || statutColors.EN_ATTENTE;

    const S = {
        card: { backgroundColor: '#131f2e', border: '1px solid #1e2d3d', borderRadius: 16, padding: 20, fontFamily: 'sans-serif' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
        id: { fontSize: 13, fontWeight: 700, color: '#64748b' },
        badge: { fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 999, backgroundColor: sc.bg, color: sc.color, border: `1px solid ${sc.border}` },
        row: { display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
        rowIcon: { fontSize: 16, marginTop: 2 },
        rowLabel: { fontSize: 11, color: '#475569', marginBottom: 2 },
        rowValue: { fontSize: 14, color: '#cbd5e1' },
        desc: { fontSize: 13, color: '#475569', fontStyle: 'italic', marginBottom: 12 },
        footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #1e2d3d' },
        price: { fontSize: 16, fontWeight: 900, color: '#10b981' },
        livreur: { fontSize: 12, color: '#64748b' },
        date: { fontSize: 12, color: '#334155' },
    };

    return (
        <div style={S.card}>
        <div style={S.header}>
            <span style={S.id}>Commande #{commande.id}</span>
            <span style={S.badge}>{statutLabels[commande.statut]}</span>
        </div>
        <div style={S.row}>
            <span style={S.rowIcon}>📍</span>
            <div><div style={S.rowLabel}>Depart</div><div style={S.rowValue}>{commande.adresseDepart}</div></div>
        </div>
        <div style={S.row}>
            <span style={S.rowIcon}>🎯</span>
            <div><div style={S.rowLabel}>Arrivee</div><div style={S.rowValue}>{commande.adresseArrivee}</div></div>
        </div>
        {commande.description && <div style={S.desc}>"{commande.description}"</div>}
        <div style={S.footer}>
            <span style={S.price}>{commande.prix} FCFA</span>
            {commande.livreur && <span style={S.livreur}>🛵 {commande.livreur.name}</span>}
            <span style={S.date}>{new Date(commande.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
        </div>
    );
    }
