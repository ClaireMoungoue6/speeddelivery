    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import API from '../services/api';

    function Toast({ msg, type, onClose }) {
    useState(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); });
    return (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, backgroundColor: type === 'success' ? '#059669' : '#ef4444', color: 'white', padding: '12px 20px', borderRadius: 12, fontWeight: 600, fontSize: 14, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: 8 }}>
        {type === 'success' ? '✅' : '❌'} {msg}
        </div>
    );
    }

    export default function NouvelleCommande() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ adresseDepart: '', adresseArrivee: '', description: '' });
    const [prix, setPrix] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
        const res = await API.post('/commandes', formData);
        setPrix(res.data.commande.prix);
        setToast({ msg: 'Commande creee avec succes !', type: 'success' });
        setTimeout(() => navigate('/dashboard/client'), 2500);
        } catch (err) {
        setToast({ msg: err.response?.data?.message || 'Erreur lors de la commande', type: 'error' });
        } finally {
        setLoading(false);
        }
    };

    const inputStyle = { width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '11px 14px', fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9fafb' };
    const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8faf8', fontFamily: 'sans-serif' }}>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
        <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ maxWidth: 700, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, backgroundColor: '#059669', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
                <div style={{ fontWeight: 900, fontSize: 17, color: '#111827' }}><span style={{ color: '#059669' }}>SPEED</span>DELIVERY</div>
            </div>
            <button onClick={() => navigate('/dashboard/client')} style={{ fontSize: 13, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}>← Retour</button>
            </div>
        </nav>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 24px' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#111827', marginBottom: 4 }}>Nouvelle commande</div>
            <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 28 }}>Renseignez les adresses de votre livraison</div>

            {prix && (
            <div style={{ backgroundColor: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: 14, padding: 20, textAlign: 'center', marginBottom: 24 }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#047857', marginBottom: 4 }}>✅ Commande creee !</div>
                <div style={{ fontSize: 14, color: '#059669' }}>Prix estime : <strong>{prix} FCFA</strong></div>
                <div style={{ fontSize: 12, color: '#6ee7b7', marginTop: 4 }}>Redirection en cours...</div>
            </div>
            )}

            {!prix && (
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 20, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>📍 Adresse de depart</label>
                    <input style={inputStyle} type="text" name="adresseDepart" value={formData.adresseDepart} onChange={handleChange} required placeholder="Ex: Rue de la Paix, Douala" />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>🎯 Adresse d arrivee</label>
                    <input style={inputStyle} type="text" name="adresseArrivee" value={formData.adresseArrivee} onChange={handleChange} required placeholder="Ex: Akwa, Douala" />
                </div>
                <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>📝 Description du colis (optionnel)</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Ex: Petit colis fragile, documents importants..."
                    style={{ ...inputStyle, resize: 'none' }} />
                </div>
                <button type="submit" disabled={loading}
                    style={{ width: '100%', backgroundColor: loading ? '#6ee7b7' : '#059669', color: 'white', fontWeight: 700, padding: '13px 0', borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15 }}>
                    {loading ? 'Creation...' : '🚀 Commander maintenant'}
                </button>
                </form>
            </div>
            )}
        </div>
        </div>
    );
    }
