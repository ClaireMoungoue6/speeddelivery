    import { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import API from '../services/api';
    import CommandeCard from '../components/CommandeCard';

    function Toast({ msg, type, onClose }) {
    useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
    return (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, backgroundColor: type === 'success' ? '#059669' : '#ef4444', color: 'white', padding: '12px 20px', borderRadius: 12, fontWeight: 600, fontSize: 14, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: 8 }}>
        {type === 'success' ? '✅' : '❌'} {msg}
        </div>
    );
    }

    export default function DashboardClient() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const fetchCommandes = async () => {
        try {
            const res = await API.get('/commandes/mes-commandes');
            setCommandes(res.data);
        } catch {
            setToast({ msg: 'Erreur lors du chargement', type: 'error' });
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
        <div style={{ minHeight: '100vh', backgroundColor: '#f8faf8', fontFamily: 'sans-serif' }}>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
        <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, backgroundColor: '#059669', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
                <div style={{ fontWeight: 900, fontSize: 17, color: '#111827' }}><span style={{ color: '#059669' }}>SPEED</span>DELIVERY</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>Bonjour, {user?.name}</span>
                <button onClick={handleLogout} style={{ fontSize: 13, backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb', padding: '8px 14px', borderRadius: 8, cursor: 'pointer' }}>Deconnexion</button>
            </div>
            </div>
        </nav>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#111827', marginBottom: 4 }}>Tableau de bord Client</div>
            <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 28 }}>Bienvenue sur SpeedDelivery !</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 28 }}>
            {[
                { num: total, label: 'Commandes totales', color: '#059669' },
                { num: enCours, label: 'En cours', color: '#2563eb' },
                { num: livrees, label: 'Livrees', color: '#047857' },
            ].map((s, i) => (
                <div key={i} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 14, padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: s.color }}>{s.num}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{s.label}</div>
                </div>
            ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>Mes commandes</div>
            <button onClick={() => navigate('/commandes/new')} style={{ backgroundColor: '#059669', color: 'white', fontWeight: 700, padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13 }}>+ Nouvelle commande</button>
            </div>
            {loading ? (
            <div style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>Chargement...</div>
            ) : commandes.length === 0 ? (
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 16, padding: 48, textAlign: 'center' }}>
                <div style={{ color: '#9ca3af', marginBottom: 16 }}>Vous n avez pas encore de commande</div>
                <button onClick={() => navigate('/commandes/new')} style={{ backgroundColor: '#059669', color: 'white', fontWeight: 700, padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13 }}>+ Passer ma premiere commande</button>
            </div>
            ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
                {commandes.map(c => <CommandeCard key={c.id} commande={c} />)}
            </div>
            )}
        </div>
        </div>
    );
    }
