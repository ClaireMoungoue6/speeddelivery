    import { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import API from '../services/api';
    import CommandeCard from '../components/CommandeCard';

    export default function DashboardClient() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommandes = async () => {
        try {
            const res = await API.get('/commandes/mes-commandes');
            setCommandes(res.data);
        } catch (error) {
            console.error(error);
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

    const S = {
        page: { minHeight: '100vh', backgroundColor: '#0f1923', fontFamily: 'sans-serif', color: '#f1f5f9' },
        nav: { backgroundColor: '#0a1520', borderBottom: '1px solid #1e2d3d', padding: '0' },
        navInner: { maxWidth: 1200, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        logo: { display: 'flex', alignItems: 'center', gap: 10 },
        logoIcon: { width: 36, height: 36, backgroundColor: '#059669', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 },
        logoText: { fontWeight: 900, fontSize: 17, color: '#f1f5f9' },
        navRight: { display: 'flex', alignItems: 'center', gap: 16 },
        greeting: { fontSize: 14, color: '#64748b' },
        btnLogout: { fontSize: 13, backgroundColor: '#131f2e', color: '#94a3b8', border: '1px solid #1e2d3d', padding: '8px 16px', borderRadius: 8, cursor: 'pointer' },
        main: { maxWidth: 1100, margin: '0 auto', padding: '40px 24px' },
        pageTitle: { fontSize: 26, fontWeight: 900, color: '#f1f5f9', marginBottom: 4 },
        pageSub: { color: '#64748b', fontSize: 14, marginBottom: 32 },
        statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 },
        statCard: { backgroundColor: '#131f2e', border: '1px solid #1e2d3d', borderRadius: 16, padding: 24, textAlign: 'center' },
        statNum: (color) => ({ fontSize: 32, fontWeight: 900, color }),
        statLabel: { fontSize: 13, color: '#64748b', marginTop: 4 },
        topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
        sectionTitle: { fontSize: 17, fontWeight: 700, color: '#f1f5f9' },
        btnNew: { backgroundColor: '#059669', color: 'white', fontWeight: 700, padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 14 },
        emptyCard: { backgroundColor: '#131f2e', border: '1px solid #1e2d3d', borderRadius: 16, padding: 48, textAlign: 'center' },
        emptyText: { color: '#64748b', marginBottom: 20 },
        grid2: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 },
        loading: { textAlign: 'center', color: '#64748b', padding: 40 },
    };

    return (
        <div style={S.page}>
        <nav style={S.nav}>
            <div style={S.navInner}>
            <div style={S.logo}>
                <div style={S.logoIcon}>⚡</div>
                <div style={S.logoText}><span style={{ color: '#10b981' }}>SPEED</span>DELIVERY</div>
            </div>
            <div style={S.navRight}>
                <span style={S.greeting}>Bonjour, {user?.name}</span>
                <button style={S.btnLogout} onClick={handleLogout}>Deconnexion</button>
            </div>
            </div>
        </nav>
        <div style={S.main}>
            <div style={S.pageTitle}>Tableau de bord Client</div>
            <div style={S.pageSub}>Bienvenue sur SpeedDelivery !</div>
            <div style={S.statsGrid}>
            <div style={S.statCard}>
                <div style={S.statNum('#10b981')}>{total}</div>
                <div style={S.statLabel}>Commandes totales</div>
            </div>
            <div style={S.statCard}>
                <div style={S.statNum('#3b82f6')}>{enCours}</div>
                <div style={S.statLabel}>En cours</div>
            </div>
            <div style={S.statCard}>
                <div style={S.statNum('#059669')}>{livrees}</div>
                <div style={S.statLabel}>Livrees</div>
            </div>
            </div>
            <div style={S.topRow}>
            <div style={S.sectionTitle}>Mes commandes</div>
            <button style={S.btnNew} onClick={() => navigate('/commandes/new')}>+ Nouvelle commande</button>
            </div>
            {loading ? (
            <div style={S.loading}>Chargement...</div>
            ) : commandes.length === 0 ? (
            <div style={S.emptyCard}>
                <div style={S.emptyText}>Vous n avez pas encore de commande</div>
                <button style={S.btnNew} onClick={() => navigate('/commandes/new')}>+ Passer ma premiere commande</button>
            </div>
            ) : (
            <div style={S.grid2}>
                {commandes.map((commande) => (
                <CommandeCard key={commande.id} commande={commande} />
                ))}
            </div>
            )}
        </div>
        </div>
    );
    }
