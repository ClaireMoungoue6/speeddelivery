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

    export default function DashboardAdmin() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [commandes, setCommandes] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [onglet, setOnglet] = useState('commandes');
    const [toast, setToast] = useState(null);
    const [modal, setModal] = useState(null);
    const [formUser, setFormUser] = useState({ name: '', email: '', password: '', phone: '', role: 'CLIENT' });
    const [saving, setSaving] = useState(false);

    const showToast = (msg, type = 'success') => setToast({ msg, type });

    const fetchData = async () => {
        try {
        const [cmdRes, usersRes] = await Promise.all([
            API.get('/commandes/toutes'),
            API.get('/auth/users'),
        ]);
        setCommandes(cmdRes.data);
        setUsers(usersRes.data);
        } catch (error) {
        showToast('Erreur de chargement', 'error');
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const openAdd = () => {
        setFormUser({ name: '', email: '', password: '', phone: '', role: 'CLIENT' });
        setModal('add');
    };

    const openEdit = (u) => {
        setFormUser({ name: u.name, email: u.email, password: '', phone: u.phone || '', role: u.role, id: u.id });
        setModal('edit');
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm('Supprimer ' + name + ' ?')) return;
        try {
        await API.delete('/auth/users/' + id);
        showToast('Utilisateur supprime avec succes');
        fetchData();
        } catch {
        showToast('Erreur lors de la suppression', 'error');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
        if (modal === 'add') {
            await API.post('/auth/register', formUser);
            showToast('Utilisateur cree avec succes');
        } else {
            await API.put('/auth/users/' + formUser.id, formUser);
            showToast('Utilisateur modifie avec succes');
        }
        setModal(null);
        fetchData();
        } catch (err) {
        showToast(err.response?.data?.message || 'Erreur', 'error');
        } finally {
        setSaving(false);
        }
    };

    const statutColors = {
        EN_ATTENTE: { bg: '#fef3c7', color: '#d97706' },
        ACCEPTEE: { bg: '#dbeafe', color: '#2563eb' },
        EN_COURS: { bg: '#d1fae5', color: '#059669' },
        LIVREE: { bg: '#d1fae5', color: '#047857' },
        ANNULEE: { bg: '#fee2e2', color: '#dc2626' },
    };

    const statutLabels = { EN_ATTENTE: '⏳ En attente', ACCEPTEE: '✅ Acceptee', EN_COURS: '🚀 En cours', LIVREE: '📦 Livree', ANNULEE: '❌ Annulee' };
    const roleColors = { ADMIN: { bg: '#ede9fe', color: '#7c3aed' }, LIVREUR: { bg: '#dbeafe', color: '#2563eb' }, CLIENT: { bg: '#d1fae5', color: '#059669' } };

    const clients = users.filter(u => u.role === 'CLIENT');
    const livreurs = users.filter(u => u.role === 'LIVREUR');
    const enCours = commandes.filter(c => ['ACCEPTEE', 'EN_COURS'].includes(c.statut)).length;

    const inputStyle = { width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9fafb', marginBottom: 12 };
    const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8faf8', fontFamily: 'sans-serif' }}>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

        {/* MODAL */}
        {modal && (
            <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <div style={{ backgroundColor: 'white', borderRadius: 20, width: '100%', maxWidth: 440, padding: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 20 }}>
                {modal === 'add' ? '➕ Ajouter un utilisateur' : '✏️ Modifier l utilisateur'}
                </h3>
                <form onSubmit={handleSave}>
                <label style={labelStyle}>Nom complet</label>
                <input style={inputStyle} type="text" value={formUser.name} onChange={e => setFormUser({ ...formUser, name: e.target.value })} required placeholder="Nom complet" />
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="email" value={formUser.email} onChange={e => setFormUser({ ...formUser, email: e.target.value })} required placeholder="email@example.com" />
                {modal === 'add' && (
                    <>
                    <label style={labelStyle}>Mot de passe</label>
                    <input style={inputStyle} type="password" value={formUser.password} onChange={e => setFormUser({ ...formUser, password: e.target.value })} required placeholder="••••••••" />
                    </>
                )}
                <label style={labelStyle}>Telephone</label>
                <input style={inputStyle} type="tel" value={formUser.phone} onChange={e => setFormUser({ ...formUser, phone: e.target.value })} placeholder="+237 6XX XXX XXX" />
                <label style={labelStyle}>Role</label>
                <select style={inputStyle} value={formUser.role} onChange={e => setFormUser({ ...formUser, role: e.target.value })}>
                    <option value="CLIENT">Client</option>
                    <option value="LIVREUR">Livreur</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <button type="button" onClick={() => setModal(null)} style={{ flex: 1, padding: '11px 0', borderRadius: 10, border: '1.5px solid #e5e7eb', backgroundColor: 'white', cursor: 'pointer', fontWeight: 600, color: '#6b7280', fontSize: 14 }}>Annuler</button>
                    <button type="submit" disabled={saving} style={{ flex: 1, padding: '11px 0', borderRadius: 10, border: 'none', backgroundColor: '#059669', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 700, color: 'white', fontSize: 14 }}>
                    {saving ? 'Sauvegarde...' : (modal === 'add' ? 'Creer' : 'Modifier')}
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}

        {/* NAVBAR */}
        <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '0' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, backgroundColor: '#059669', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
                <div style={{ fontWeight: 900, fontSize: 17, color: '#111827' }}><span style={{ color: '#059669' }}>SPEED</span>DELIVERY</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>👑 Admin : {user?.name}</span>
                <button onClick={handleLogout} style={{ fontSize: 13, backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb', padding: '8px 14px', borderRadius: 8, cursor: 'pointer' }}>Deconnexion</button>
            </div>
            </div>
        </nav>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 24px' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#111827', marginBottom: 4 }}>Panel Administrateur</div>
            <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 28 }}>Gerez les commandes et les utilisateurs</div>

            {/* STATS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
            {[
                { num: commandes.length, label: 'Commandes totales', color: '#059669' },
                { num: clients.length, label: 'Clients', color: '#2563eb' },
                { num: livreurs.length, label: 'Livreurs', color: '#059669' },
                { num: enCours, label: 'En cours', color: '#7c3aed' },
            ].map((s, i) => (
                <div key={i} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 14, padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: s.color }}>{s.num}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{s.label}</div>
                </div>
            ))}
            </div>

            {/* ONGLETS */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {[{ key: 'commandes', label: 'Commandes (' + commandes.length + ')' }, { key: 'users', label: 'Utilisateurs (' + users.length + ')' }].map(o => (
                <button key={o.key} onClick={() => setOnglet(o.key)}
                style={{ padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', backgroundColor: onglet === o.key ? '#059669' : 'white', color: onglet === o.key ? 'white' : '#374151', boxShadow: onglet === o.key ? 'none' : '0 1px 4px rgba(0,0,0,0.06)' }}>
                {o.label}
                </button>
            ))}
            {onglet === 'users' && (
                <button onClick={openAdd} style={{ marginLeft: 'auto', padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', backgroundColor: '#059669', color: 'white' }}>
                + Ajouter un utilisateur
                </button>
            )}
            </div>

            {loading ? (
            <div style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>Chargement...</div>
            ) : onglet === 'commandes' ? (
            <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                    <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        {['#', 'Client', 'Depart', 'Arrivee', 'Livreur', 'Prix', 'Statut', 'Date'].map(h => (
                        <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {commandes.map(c => {
                        const sc = statutColors[c.statut] || { bg: '#f3f4f6', color: '#374151' };
                        return (
                        <tr key={c.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <td style={{ padding: '12px 14px', fontWeight: 700, color: '#374151' }}>#{c.id}</td>
                            <td style={{ padding: '12px 14px', color: '#374151' }}>{c.client?.name}</td>
                            <td style={{ padding: '12px 14px', color: '#6b7280', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.adresseDepart}</td>
                            <td style={{ padding: '12px 14px', color: '#6b7280', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.adresseArrivee}</td>
                            <td style={{ padding: '12px 14px', color: '#6b7280' }}>{c.livreur?.name || '—'}</td>
                            <td style={{ padding: '12px 14px', fontWeight: 700, color: '#059669' }}>{c.prix} F</td>
                            <td style={{ padding: '12px 14px' }}>
                            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, backgroundColor: sc.bg, color: sc.color }}>{statutLabels[c.statut]}</span>
                            </td>
                            <td style={{ padding: '12px 14px', color: '#9ca3af' }}>{new Date(c.createdAt).toLocaleDateString('fr-FR')}</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>
            </div>
            ) : (
            <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                    <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        {['#', 'Nom', 'Email', 'Telephone', 'Role', 'Inscrit le', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(u => {
                        const rc = roleColors[u.role] || { bg: '#f3f4f6', color: '#374151' };
                        return (
                        <tr key={u.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <td style={{ padding: '12px 14px', fontWeight: 700, color: '#374151' }}>#{u.id}</td>
                            <td style={{ padding: '12px 14px', fontWeight: 600, color: '#111827' }}>{u.name}</td>
                            <td style={{ padding: '12px 14px', color: '#6b7280' }}>{u.email}</td>
                            <td style={{ padding: '12px 14px', color: '#6b7280' }}>{u.phone || '—'}</td>
                            <td style={{ padding: '12px 14px' }}>
                            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, backgroundColor: rc.bg, color: rc.color }}>{u.role}</span>
                            </td>
                            <td style={{ padding: '12px 14px', color: '#9ca3af' }}>{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
                            <td style={{ padding: '12px 14px' }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <button onClick={() => openEdit(u)} style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #d1fae5', backgroundColor: '#f0fdf4', color: '#059669', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>✏️ Modifier</button>
                                <button onClick={() => handleDelete(u.id, u.name)} style={{ padding: '5px 12px', borderRadius: 7, border: '1px solid #fecaca', backgroundColor: '#fef2f2', color: '#ef4444', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>🗑️ Supprimer</button>
                            </div>
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>
            </div>
            )}
        </div>
        </div>
    );
    }
