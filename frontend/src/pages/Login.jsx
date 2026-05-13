    import { useState } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { login } from '../services/api';

    export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPwd, setShowPwd] = useState(false);
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
        setError(err.response?.data?.message || 'Email ou mot de passe incorrect');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8faf8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: 'white', borderRadius: 24, boxShadow: '0 4px 32px rgba(0,0,0,0.08)', width: '100%', maxWidth: 400, padding: 40 }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 54, height: 54, backgroundColor: '#059669', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, margin: '0 auto 12px' }}>⚡</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#111827' }}><span style={{ color: '#059669' }}>SPEED</span>DELIVERY</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>Connectez-vous a votre compte</div>
            </div>

            {error && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', padding: '10px 14px', borderRadius: 10, fontSize: 13, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                ❌ {error}
            </div>
            )}

            <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email</label>
                <input
                type="email" name="email" value={formData.email} onChange={handleChange} required
                placeholder="alice@example.com"
                style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '11px 14px', fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9fafb' }}
                />
            </div>
            <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Mot de passe</label>
                <div style={{ position: 'relative' }}>
                <input
                    type={showPwd ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required
                    placeholder="••••••••"
                    style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '11px 44px 11px 14px', fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9fafb' }}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#9ca3af' }}>
                    {showPwd ? '🙈' : '👁️'}
                </button>
                </div>
            </div>
            <button type="submit" disabled={loading}
                style={{ width: '100%', backgroundColor: loading ? '#6ee7b7' : '#059669', color: 'white', fontWeight: 700, padding: '13px 0', borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15 }}>
                {loading ? 'Connexion...' : 'Se connecter'}
            </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#6b7280' }}>
            Pas encore de compte ?{' '}
            <Link to="/register" style={{ color: '#059669', fontWeight: 600, textDecoration: 'none' }}>S inscrire</Link>
            </div>
            <div style={{ textAlign: 'center', marginTop: 12 }}>
            <Link to="/" style={{ color: '#9ca3af', fontSize: 12, textDecoration: 'none' }}>← Retour a l accueil</Link>
            </div>
        </div>
        </div>
    );
    }
