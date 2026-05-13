    import { useState } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { register } from '../services/api';

    export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', role: 'CLIENT' });
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
        const digits = value.replace(/\D/g, '');
        if (digits.length > 9) return;
        setFormData({ ...formData, phone: digits });
        } else {
        setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.phone && (formData.phone.length < 9 || !formData.phone.startsWith('6'))) {
        setError('Le numero doit commencer par 6 et avoir 9 chiffres');
        return;
        }
        setLoading(true);
        setError('');
        try {
        const payload = { ...formData, phone: formData.phone ? '237' + formData.phone : '' };
        const res = await register(payload);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        const role = res.data.user.role;
        if (role === 'CLIENT') navigate('/dashboard/client');
        else if (role === 'LIVREUR') navigate('/dashboard/livreur');
        else if (role === 'ADMIN') navigate('/dashboard/admin');
        } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors de l inscription');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8faf8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: 'white', borderRadius: 24, boxShadow: '0 4px 32px rgba(0,0,0,0.08)', width: '100%', maxWidth: 420, padding: 40 }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 54, height: 54, backgroundColor: '#059669', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, margin: '0 auto 12px' }}>⚡</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#111827' }}><span style={{ color: '#059669' }}>SPEED</span>DELIVERY</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>Creez votre compte gratuitement</div>
            </div>

            {error && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', padding: '10px 14px', borderRadius: 10, fontSize: 13, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                ❌ {error}
            </div>
            )}

            <form onSubmit={handleSubmit}>
            {[
                { label: 'Nom complet', name: 'name', type: 'text', placeholder: 'Alice Dupont' },
                { label: 'Email', name: 'email', type: 'email', placeholder: 'alice@example.com' },
            ].map((f) => (
                <div key={f.name} style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>{f.label}</label>
                <input type={f.type} name={f.name} value={formData[f.name]} onChange={handleChange} required placeholder={f.placeholder}
                    style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '11px 14px', fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9fafb' }} />
                </div>
            ))}

            <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Telephone</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: 10, backgroundColor: '#f9fafb', overflow: 'hidden' }}>
                <span style={{ padding: '11px 12px', fontSize: 14, color: '#6b7280', backgroundColor: '#f3f4f6', borderRight: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>+237</span>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="6XXXXXXXX" maxLength={9}
                    style={{ flex: 1, border: 'none', outline: 'none', padding: '11px 12px', fontSize: 14, color: '#111827', backgroundColor: 'transparent' }} />
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>Commencer par 6, ex: 651424351</div>
            </div>

            <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Mot de passe</label>
                <div style={{ position: 'relative' }}>
                <input type={showPwd ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••"
                    style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '11px 44px 11px 14px', fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9fafb' }} />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#9ca3af' }}>
                    {showPwd ? '🙈' : '👁️'}
                </button>
                </div>
            </div>

            <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Je suis</label>
                <select name="role" value={formData.role} onChange={handleChange}
                style={{ width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 10, padding: '11px 14px', fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9fafb' }}>
                <option value="CLIENT">Client</option>
                <option value="LIVREUR">Livreur</option>
                </select>
            </div>

            <button type="submit" disabled={loading}
                style={{ width: '100%', backgroundColor: loading ? '#6ee7b7' : '#059669', color: 'white', fontWeight: 700, padding: '13px 0', borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15 }}>
                {loading ? 'Creation...' : 'Creer mon compte'}
            </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#6b7280' }}>
            Deja un compte ?{' '}
            <Link to="/login" style={{ color: '#059669', fontWeight: 600, textDecoration: 'none' }}>Se connecter</Link>
            </div>
            <div style={{ textAlign: 'center', marginTop: 12 }}>
            <Link to="/" style={{ color: '#9ca3af', fontSize: 12, textDecoration: 'none' }}>← Retour a l accueil</Link>
            </div>
        </div>
        </div>
    );
    }
