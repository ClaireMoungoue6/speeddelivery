    import { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import API from '../services/api';

    function Toast({ msg, type, onClose }) {
    useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
    return (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, backgroundColor: type === 'success' ? '#059669' : '#ef4444', color: 'white', padding: '12px 20px', borderRadius: 12, fontWeight: 600, fontSize: 14, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: 8 }}>
        {type === 'success' ? '✅' : '❌'} {msg}
        </div>
    );
    }

    export default function DashboardLivreur() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [disponibles, setDisponibles] = useState([]);
    const [mesCourses, setMesCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [onglet, setOnglet] = useState('disponibles');
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = 'success') => setToast({ msg, type });

    const fetchData = async () => {
        try {
        const [dispRes, coursesRes] = await Promise.all([
            API.get('/commandes/disponibles'),
            API.get('/commandes/mes-courses'),
        ]);
        setDisponibles(dispRes.data);
        setMesCourses(coursesRes.data);
        } catch {
        showToast('Erreur de chargement', 'error');
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleAccepter = async (id) => {
        setActionLoading(id);
        try {
        await API.put('/commandes/' + id + '/accepter');
        showToast('Course acceptee avec succes !');
        await fetchData();
        } catch (err) {
        showToast(err.response?.data?.message || 'Erreur', 'error');
        } finally {
        setActionLoading(null);
        }
    };

    const handleStatut = async (id, statut) => {
        setActionLoading(id);
        try {
        await API.put('/commandes/' + id + '/statut', { statut });
        showToast(statut === 'EN_COURS' ? 'Course demarree !' : 'Livraison confirmee !');
        await fetchData();
        } catch (err) {
        showToast(err.response?.data?.message || 'Erreur', 'error');
        } finally {
        setActionLoading(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const enCours = mesCourses.filter(c => ['ACCEPTEE', 'EN_COURS'].includes(c.statut)).length;
    const completees = mesCourses.filter(c => c.statut === 'LIVREE').length;

    const statutBadge = (statut) => {
        const m = { ACCEPTEE: { bg: '#dbeafe', color: '#2563eb', label: '✅ Acceptee' }, EN_COURS: { bg: '#d1fae5', color: '#059669', label: '🚀 En cours' }, LIVREE: { bg: '#d1fae5', color: '#047857', label: '📦 Livree' } };
        return m[statut] || { bg: '#f3f4f6', color: '#374151', label: statut };
    };

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
                <span style={{ fontSize: 13, color: '#6b7280' }}>🛵 {user?.name}</span>
                <button onClick={handleLogout} style={{ fontSize: 13, backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb', padding: '8px 14px', borderRadius: 8, cursor: 'pointer' }}>Deconnexion</button>
            </div>
            </div>
        </nav>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#111827', marginBottom: 4 }}>Tableau de bord Livreur</div>
            <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 28 }}>Consultez et gerez vos courses</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 28 }}>
            {[
                { num: disponibles.length, label: 'Courses disponibles', color: '#059669' },
                { num: enCours, label: 'En cours', color: '#2563eb' },
                { num: completees, label: 'Completees', color: '#047857' },
            ].map((s, i) => (
                <div key={i} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 14, padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: s.color }}>{s.num}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{s.label}</div>
                </div>
            ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {[{ key: 'disponibles', label: 'Courses disponibles (' + disponibles.length + ')' }, { key: 'mesCourses', label: 'Mes courses (' + mesCourses.length + ')' }].map(o => (
                <button key={o.key} onClick={() => setOnglet(o.key)}
                style={{ padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', backgroundColor: onglet === o.key ? '#059669' : 'white', color: onglet === o.key ? 'white' : '#374151', boxShadow: onglet === o.key ? 'none' : '0 1px 4px rgba(0,0,0,0.06)' }}>
                {o.label}
                </button>
            ))}
            </div>
            {loading ? (
            <div style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>Chargement...</div>
            ) : onglet === 'disponibles' ? (
            disponibles.length === 0 ? (
                <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 16, padding: 48, textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🛵</div>
                <div style={{ color: '#9ca3af', fontSize: 14 }}>Aucune course disponible pour le moment</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: '#d1fae5', color: '#059669', padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, marginTop: 16 }}>
                    <span style={{ width: 8, height: 8, backgroundColor: '#059669', borderRadius: '50%', display: 'inline-block' }}></span>
                    Disponible pour des courses
                </div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {disponibles.map(c => (
                    <div key={c.id} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 16, padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#6b7280' }}>Commande #{c.id}</span>
                        <span style={{ fontSize: 16, fontWeight: 900, color: '#059669' }}>{c.prix} FCFA</span>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}><span>📍</span><div><div style={{ fontSize: 10, color: '#9ca3af' }}>Depart</div><div style={{ fontSize: 13, color: '#374151' }}>{c.adresseDepart}</div></div></div>
                        <div style={{ display: 'flex', gap: 8 }}><span>🎯</span><div><div style={{ fontSize: 10, color: '#9ca3af' }}>Arrivee</div><div style={{ fontSize: 13, color: '#374151' }}>{c.adresseArrivee}</div></div></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
                        <span style={{ fontSize: 13, color: '#6b7280' }}>👤 {c.client.name}</span>
                        <button onClick={() => handleAccepter(c.id)} disabled={actionLoading === c.id}
                        style={{ backgroundColor: actionLoading === c.id ? '#6ee7b7' : '#059669', color: 'white', fontWeight: 700, padding: '9px 20px', borderRadius: 10, border: 'none', cursor: actionLoading === c.id ? 'not-allowed' : 'pointer', fontSize: 13 }}>
                        {actionLoading === c.id ? '...' : '✅ Accepter'}
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            )
            ) : (
            mesCourses.length === 0 ? (
                <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 16, padding: 48, textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
                Aucune course acceptee pour le moment
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {mesCourses.map(c => {
                    const sb = statutBadge(c.statut);
                    return (
                    <div key={c.id} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 16, padding: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#6b7280' }}>Commande #{c.id}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999, backgroundColor: sb.bg, color: sb.color }}>{sb.label}</span>
                        </div>
                        <div style={{ marginBottom: 14 }}>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}><span>📍</span><div style={{ fontSize: 13, color: '#374151' }}>{c.adresseDepart}</div></div>
                        <div style={{ display: 'flex', gap: 8 }}><span>🎯</span><div style={{ fontSize: 13, color: '#374151' }}>{c.adresseArrivee}</div></div>
                        </div>
                        {c.statut !== 'LIVREE' && (
                        <div style={{ paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
                            {c.statut === 'ACCEPTEE' && (
                            <button onClick={() => handleStatut(c.id, 'EN_COURS')} disabled={actionLoading === c.id}
                                style={{ width: '100%', backgroundColor: '#059669', color: 'white', fontWeight: 700, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13 }}>
                                🚀 Demarrer la course
                            </button>
                            )}
                            {c.statut === 'EN_COURS' && (
                            <button onClick={() => handleStatut(c.id, 'LIVREE')} disabled={actionLoading === c.id}
                                style={{ width: '100%', backgroundColor: '#047857', color: 'white', fontWeight: 700, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13 }}>
                                📦 Marquer comme livree
                            </button>
                            )}
                        </div>
                        )}
                    </div>
                    );
                })}
                </div>
            )
            )}
        </div>
        </div>
    );
    }
