    import { useState } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { login } from '../services/api';

    export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
        const res = await login(formData);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        const role = res.data.user.role;
        if (role === 'CLIENT') navigate('/dashboard/client');
        else if (role === 'LIVREUR') navigate('/dashboard/livreur');
        else if (role === 'ADMIN') navigate('/dashboard/admin');
        } catch (err) {
        setError(err.response?.data?.message || 'Erreur de connexion');
        } finally {
        setLoading(false);
        }
    };

    const S = {
        page: { minHeight: '100vh', backgroundColor: '#0f1923', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: 'sans-serif' },
        card: { backgroundColor: '#131f2e', border: '1px solid #1e2d3d', borderRadius: 24, width: '100%', maxWidth: 420, padding: 40 },
        logoWrap: { textAlign: 'center', marginBottom: 32 },
        logoIcon: { width: 56, height: 56, backgroundColor: '#059669', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 12px' },
        logoText: { fontSize: 22, fontWeight: 900, color: '#f1f5f9' },
        logoSub: { fontSize: 13, color: '#64748b', marginTop: 4 },
        error: { backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '10px 14px', borderRadius: 10, fontSize: 13, marginBottom: 16 },
        label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 6 },
        input: { width: '100%', backgroundColor: '#0f1923', border: '1px solid #1e2d3d', borderRadius: 10, padding: '12px 14px', fontSize: 14, color: '#f1f5f9', outline: 'none', boxSizing: 'border-box', marginBottom: 16 },
        btn: { width: '100%', backgroundColor: '#059669', color: 'white', fontWeight: 700, padding: '13px 0', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 15, marginTop: 4 },
        footer: { textAlign: 'center', marginTop: 24, fontSize: 13, color: '#64748b' },
        link: { color: '#10b981', fontWeight: 600, textDecoration: 'none' },
    };

    return (
        <div style={S.page}>
        <div style={S.card}>
            <div style={S.logoWrap}>
            <div style={S.logoIcon}>⚡</div>
            <div style={S.logoText}><span style={{ color: '#10b981' }}>SPEED</span>DELIVERY</div>
            <div style={S.logoSub}>Connectez-vous a votre compte</div>
            </div>
            {error && <div style={S.error}>{error}</div>}
            <form onSubmit={handleSubmit}>
            <label style={S.label}>Email</label>
            <input style={S.input} type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="alice@example.com" />
            <label style={S.label}>Mot de passe</label>
            <input style={S.input} type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
            <button style={S.btn} type="submit" disabled={loading}>
                {loading ? 'Connexion...' : 'Se connecter'}
            </button>
            </form>
            <div style={S.footer}>
            Pas encore de compte ?{' '}
            <Link to="/register" style={S.link}>S inscrire</Link>
            </div>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Link to="/" style={{ ...S.link, fontSize: 12, color: '#475569' }}>← Retour a l accueil</Link>
            </div>
        </div>
        </div>
    );
    }
