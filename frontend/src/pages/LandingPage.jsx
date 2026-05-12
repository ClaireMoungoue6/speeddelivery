    import { useNavigate } from 'react-router-dom';

    export default function LandingPage() {
    const navigate = useNavigate();

    const services = [
        { icon: '📦', title: 'Colis et Documents', desc: 'Lettres, contrats, colis fragiles livres avec soin et rapidite.' },
        { icon: '🛍️', title: 'Courses et Achats', desc: 'Vos achats en boutique livres directement chez vous.' },
        { icon: '🍽️', title: 'Repas et Nourriture', desc: 'Vos plats preferes livres chauds depuis vos restaurants favoris.' },
        { icon: '💊', title: 'Medicaments', desc: 'Ordonnances et medicaments depuis les pharmacies de Douala.' },
        { icon: '🏪', title: 'Commerce local', desc: 'Soutenez les commercants locaux, on gere la livraison.' },
        { icon: '⚡', title: 'Urgences', desc: 'Besoin urgent ? Notre equipe intervient en moins de 30 minutes.' },
    ];

    const etapes = [
        { num: '01', icon: '📝', title: 'Passez commande', desc: 'Creez votre compte et renseignez les adresses de depart et arrivee.' },
        { num: '02', icon: '🛵', title: 'Un livreur accepte', desc: 'Un livreur proche accepte votre course et se met en route.' },
        { num: '03', icon: '📦', title: 'Reception garantie', desc: 'Suivez votre livraison en temps reel et recevez votre colis.' },
    ];

    const tarifs = [
        { name: 'Express', price: '500', desc: 'Livraison dans le meme quartier', features: ['Delai 20-30 min', 'Jusqu a 5kg', 'Suivi en temps reel'], popular: false },
        { name: 'Standard', price: '1000', desc: 'Livraison intra-ville Douala', features: ['Delai 45-60 min', 'Jusqu a 15kg', 'Suivi en temps reel', 'Confirmation SMS'], popular: true },
        { name: 'Premium', price: '2000', desc: 'Livraison prioritaire et fragile', features: ['Delai 30 min garanti', 'Poids illimite', 'Suivi GPS live', 'Assurance colis'], popular: false },
    ];

    const temoignages = [
        { name: 'Marie K.', role: 'Cliente', city: 'Akwa, Douala', msg: 'Livraison recue en 25 minutes ! Le livreur etait tres professionnel. Je recommande vivement SpeedDelivery.' },
        { name: 'Jean-Paul N.', role: 'Commercant', city: 'Bonaberi, Douala', msg: 'Grace a SpeedDelivery, mes clients recoivent leurs commandes le jour meme. Mon chiffre a augmente de 30 pourcent.' },
        { name: 'Fatima B.', role: 'Cliente', city: 'Bonapriso, Douala', msg: 'Service rapide et prix raisonnables. Le suivi en temps reel est tres rassurant. Bravo a toute equipe !' },
    ];

    const contacts = [
        { icon: '📱', title: 'WhatsApp', info: '+237 658 056 947', link: 'https://wa.me/237658056947', btn: 'Ecrire sur WhatsApp' },
        { icon: '📘', title: 'Facebook', info: 'SpeedDelivery Douala', link: '#', btn: 'Suivre sur Facebook' },
        { icon: '🎵', title: 'TikTok', info: '@speeddelivery', link: '#', btn: 'Suivre sur TikTok' },
    ];

    const S = {
        page: { fontFamily: 'sans-serif', backgroundColor: '#0f1923', color: '#f1f5f9' },
        nav: { position: 'fixed', top: 0, width: '100%', zIndex: 50, backgroundColor: 'rgba(15,25,35,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(16,185,129,0.15)', padding: '0' },
        navInner: { maxWidth: 1200, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        logo: { display: 'flex', alignItems: 'center', gap: 12 },
        logoIcon: { width: 40, height: 40, backgroundColor: '#059669', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 },
        logoText: { fontWeight: 900, fontSize: 20, color: '#f1f5f9' },
        logoSub: { fontSize: 10, color: '#10b981', letterSpacing: 3, marginTop: 2 },
        navLinks: { display: 'flex', gap: 32, alignItems: 'center' },
        navLink: { color: '#94a3b8', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' },
        btnOutline: { fontSize: 13, color: '#10b981', border: '1px solid #059669', padding: '8px 18px', borderRadius: 8, background: 'transparent', cursor: 'pointer', transition: 'all 0.2s' },
        btnSolid: { fontSize: 13, backgroundColor: '#059669', color: 'white', padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, transition: 'all 0.2s' },
        hero: { minHeight: '100vh', backgroundColor: '#0f1923', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 },
        heroInner: { maxWidth: 1200, margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' },
        badge: { display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(5,150,105,0.12)', border: '1px solid rgba(5,150,105,0.3)', color: '#10b981', padding: '8px 16px', borderRadius: 999, fontSize: 13, marginBottom: 24 },
        dot: { width: 8, height: 8, backgroundColor: '#10b981', borderRadius: '50%' },
        h1: { fontSize: 68, fontWeight: 900, lineHeight: 1.05, marginBottom: 24, color: '#f1f5f9' },
        h1accent: { color: '#10b981' },
        heroP: { color: '#94a3b8', fontSize: 17, lineHeight: 1.7, marginBottom: 36 },
        heroBtns: { display: 'flex', gap: 16, flexWrap: 'wrap' },
        btnHero: { backgroundColor: '#059669', color: 'white', fontWeight: 700, padding: '14px 32px', borderRadius: 12, fontSize: 16, border: 'none', cursor: 'pointer' },
        btnHeroOut: { border: '1px solid #059669', color: '#10b981', fontWeight: 700, padding: '14px 32px', borderRadius: 12, fontSize: 16, background: 'transparent', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 },
        stats: { display: 'flex', gap: 40, marginTop: 48 },
        statNum: { fontSize: 32, fontWeight: 900, color: '#10b981' },
        statLabel: { fontSize: 13, color: '#64748b', marginTop: 2 },
        heroCard: { backgroundColor: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: 24, padding: 32, textAlign: 'center' },
        heroCardRow: { backgroundColor: 'rgba(5,150,105,0.12)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 12 },
        heroCardText: { color: '#10b981', fontWeight: 700, fontSize: 14 },
        heroCardResult: { backgroundColor: '#059669', borderRadius: 12, padding: 12, marginTop: 16 },
        sectionDark: { backgroundColor: '#0a1520', padding: '80px 0' },
        sectionMid: { backgroundColor: '#0f1923', padding: '80px 0' },
        sectionInner: { maxWidth: 1200, margin: '0 auto', padding: '0 24px' },
        sectionTitle: { textAlign: 'center', marginBottom: 56 },
        h2: { fontSize: 38, fontWeight: 900, color: '#f1f5f9', marginBottom: 12 },
        h2accent: { color: '#10b981' },
        sectionSub: { color: '#64748b', fontSize: 16 },
        grid3: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 },
        card: { backgroundColor: '#131f2e', border: '1px solid #1e2d3d', borderRadius: 20, padding: 24, transition: 'border-color 0.2s' },
        cardIcon: { fontSize: 36, marginBottom: 16 },
        cardTitle: { color: '#f1f5f9', fontWeight: 700, fontSize: 17, marginBottom: 8 },
        cardDesc: { color: '#64748b', fontSize: 14, lineHeight: 1.6 },
        etapeNum: { display: 'inline-block', backgroundColor: '#10b981', color: '#0f1923', fontSize: 11, fontWeight: 900, padding: '2px 8px', borderRadius: 999, marginBottom: 12 },
        etapeIcon: { width: 60, height: 60, backgroundColor: '#059669', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' },
        etapeTitle: { color: '#f1f5f9', fontWeight: 700, fontSize: 19, marginBottom: 10 },
        etapeDesc: { color: '#64748b', lineHeight: 1.6 },
        tarifCard: { backgroundColor: '#131f2e', borderRadius: 20, padding: 32, position: 'relative' },
        tarifCardPop: { backgroundColor: '#131f2e', borderRadius: 20, padding: 32, position: 'relative', border: '2px solid #059669', transform: 'scale(1.05)' },
        popularBadge: { position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#059669', color: 'white', fontSize: 11, fontWeight: 900, padding: '4px 16px', borderRadius: 999, whiteSpace: 'nowrap' },
        tarifName: { color: '#f1f5f9', fontWeight: 700, fontSize: 20, marginBottom: 4 },
        tarifDesc: { color: '#64748b', fontSize: 13, marginBottom: 16 },
        tarifPrice: { fontSize: 40, fontWeight: 900, color: '#10b981' },
        tarifUnit: { color: '#64748b', fontSize: 14, marginLeft: 4 },
        tarifFeature: { display: 'flex', alignItems: 'center', gap: 8, color: '#cbd5e1', fontSize: 14, marginBottom: 8 },
        tarifCheck: { color: '#10b981', fontWeight: 700 },
        btnTarifSolid: { width: '100%', padding: '12px 0', borderRadius: 12, backgroundColor: '#059669', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: 24 },
        btnTarifOut: { width: '100%', padding: '12px 0', borderRadius: 12, backgroundColor: 'transparent', color: '#10b981', fontWeight: 700, border: '1px solid #059669', cursor: 'pointer', marginTop: 24 },
        temoCard: { backgroundColor: '#131f2e', border: '1px solid #1e2d3d', borderRadius: 20, padding: 24 },
        stars: { color: '#fbbf24', fontSize: 16, marginBottom: 12 },
        temoMsg: { color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginBottom: 20 },
        temoAvatar: { width: 40, height: 40, backgroundColor: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16 },
        temoName: { color: '#f1f5f9', fontWeight: 700, fontSize: 14 },
        temoRole: { color: '#64748b', fontSize: 12 },
        livreurSection: { backgroundColor: '#059669', padding: '80px 0', textAlign: 'center' },
        livreurInner: { maxWidth: 800, margin: '0 auto', padding: '0 24px' },
        livreurH2: { fontSize: 38, fontWeight: 900, color: 'white', marginBottom: 16 },
        livreurP: { color: 'rgba(255,255,255,0.85)', fontSize: 17, marginBottom: 32 },
        livreurBadges: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 36 },
        livreurBadge: { backgroundColor: 'rgba(255,255,255,0.18)', color: 'white', padding: '8px 18px', borderRadius: 999, fontSize: 14, fontWeight: 500 },
        btnLivreur: { backgroundColor: 'white', color: '#059669', fontWeight: 900, padding: '14px 40px', borderRadius: 12, fontSize: 17, border: 'none', cursor: 'pointer' },
        contactCard: { backgroundColor: '#131f2e', border: '1px solid #1e2d3d', borderRadius: 20, padding: 24, textAlign: 'center' },
        contactIcon: { fontSize: 36, marginBottom: 12 },
        contactTitle: { color: '#f1f5f9', fontWeight: 700, marginBottom: 4 },
        contactInfo: { color: '#64748b', fontSize: 14, marginBottom: 16 },
        contactBtn: { display: 'inline-block', border: '1px solid #059669', color: '#10b981', padding: '8px 18px', borderRadius: 8, fontSize: 14, textDecoration: 'none' },
        footer: { backgroundColor: '#080f18', borderTop: '1px solid #1e2d3d', padding: '40px 0' },
        footerInner: { maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 },
        footerLinks: { display: 'flex', gap: 24 },
        footerLink: { color: '#64748b', fontSize: 14, textDecoration: 'none' },
        footerCopy: { color: '#334155', fontSize: 12 },
    };

    return (
        <div style={S.page}>

        <nav style={S.nav}>
            <div style={S.navInner}>
            <div style={S.logo}>
                <div style={S.logoIcon}>⚡</div>
                <div>
                <div style={S.logoText}><span style={{ color: '#10b981' }}>SPEED</span>DELIVERY</div>
                <div style={S.logoSub}>DOUALA · CAMEROUN</div>
                </div>
            </div>
            <div style={S.navLinks}>
                <a href="#services" style={S.navLink}>Services</a>
                <a href="#comment" style={S.navLink}>Comment ca marche</a>
                <a href="#tarifs" style={S.navLink}>Tarifs</a>
                <a href="#contact" style={S.navLink}>Contact</a>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
                <button style={S.btnOutline} onClick={() => navigate('/login')}>Connexion</button>
                <button style={S.btnSolid} onClick={() => navigate('/register')}>Commander</button>
            </div>
            </div>
        </nav>

        <section style={S.hero}>
            <div style={{ position: 'absolute', top: 80, left: 40, width: 300, height: 300, backgroundColor: 'rgba(5,150,105,0.08)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
            <div style={{ position: 'absolute', bottom: 80, right: 40, width: 400, height: 400, backgroundColor: 'rgba(16,185,129,0.05)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
            <div style={S.heroInner}>
            <div>
                <div style={S.badge}>
                <div style={S.dot}></div>
                Service disponible a Douala
                </div>
                <h1 style={S.h1}>
                On livre<br />
                <span style={S.h1accent}>quoi</span><br />
                aujourd hui ?
                </h1>
                <p style={S.heroP}>
                SpeedDelivery, la livraison express urbaine a Douala.
                Rapide, fiable et abordable. Vos colis livres en moins d une heure.
                </p>
                <div style={S.heroBtns}>
                <button style={S.btnHero} onClick={() => navigate('/register')}>
                    🚀 Commander maintenant
                </button>
                <a href="https://wa.me/237658056947" target="_blank" rel="noreferrer" style={S.btnHeroOut}>
                    📱 WhatsApp
                </a>
                </div>
                <div style={S.stats}>
                <div><div style={S.statNum}>500+</div><div style={S.statLabel}>Livraisons</div></div>
                <div><div style={S.statNum}>98%</div><div style={S.statLabel}>Satisfaction</div></div>
                <div><div style={S.statNum}>1h</div><div style={S.statLabel}>Delai moyen</div></div>
                </div>
            </div>
            <div style={S.heroCard}>
                <div style={{ fontSize: 72, marginBottom: 16 }}>🛵</div>
                <div style={S.heroCardRow}><div style={S.heroCardText}>📍 Depart : Akwa, Douala</div></div>
                <div style={{ color: '#10b981', fontSize: 24, margin: '8px 0' }}>↓</div>
                <div style={S.heroCardRow}><div style={S.heroCardText}>🎯 Arrivee : Bonapriso</div></div>
                <div style={S.heroCardResult}><span style={{ color: 'white', fontWeight: 900 }}>✅ Livre en 35 min !</span></div>
            </div>
            </div>
        </section>

        <section id="services" style={S.sectionDark}>
            <div style={S.sectionInner}>
            <div style={S.sectionTitle}>
                <h2 style={S.h2}>Ce qu on <span style={S.h2accent}>livre</span></h2>
                <p style={S.sectionSub}>Tout ce dont vous avez besoin, livre a votre porte</p>
            </div>
            <div style={S.grid3}>
                {services.map((s, i) => (
                <div key={i} style={S.card}>
                    <div style={S.cardIcon}>{s.icon}</div>
                    <div style={S.cardTitle}>{s.title}</div>
                    <div style={S.cardDesc}>{s.desc}</div>
                </div>
                ))}
            </div>
            </div>
        </section>

        <section id="comment" style={S.sectionMid}>
            <div style={S.sectionInner}>
            <div style={S.sectionTitle}>
                <h2 style={S.h2}>Comment ca <span style={S.h2accent}>marche ?</span></h2>
                <p style={S.sectionSub}>3 etapes simples pour recevoir votre commande</p>
            </div>
            <div style={S.grid3}>
                {etapes.map((e, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                    <div style={S.etapeIcon}>{e.icon}</div>
                    <div style={S.etapeNum}>{e.num}</div>
                    <div style={S.etapeTitle}>{e.title}</div>
                    <div style={S.etapeDesc}>{e.desc}</div>
                </div>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
                <button style={S.btnHero} onClick={() => navigate('/register')}>
                🚀 Essayer maintenant
                </button>
            </div>
            </div>
        </section>

        <section id="tarifs" style={S.sectionDark}>
            <div style={S.sectionInner}>
            <div style={S.sectionTitle}>
                <h2 style={S.h2}>Tarifs <span style={S.h2accent}>transparents</span></h2>
                <p style={S.sectionSub}>Pas de frais caches. Payez uniquement ce que vous voyez.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, alignItems: 'center' }}>
                {tarifs.map((t, i) => (
                <div key={i} style={t.popular ? S.tarifCardPop : { ...S.tarifCard, border: '1px solid #1e2d3d' }}>
                    {t.popular && <div style={S.popularBadge}>⭐ POPULAIRE</div>}
                    <div style={S.tarifName}>{t.name}</div>
                    <div style={S.tarifDesc}>{t.desc}</div>
                    <div style={{ marginBottom: 24 }}>
                    <span style={S.tarifPrice}>{t.price}</span>
                    <span style={S.tarifUnit}>FCFA</span>
                    </div>
                    <div>
                    {t.features.map((f, j) => (
                        <div key={j} style={S.tarifFeature}>
                        <span style={S.tarifCheck}>✓</span> {f}
                        </div>
                    ))}
                    </div>
                    <button
                    style={t.popular ? S.btnTarifSolid : S.btnTarifOut}
                    onClick={() => navigate('/register')}
                    >
                    Choisir ce plan
                    </button>
                </div>
                ))}
            </div>
            </div>
        </section>

        <section style={S.sectionMid}>
            <div style={S.sectionInner}>
            <div style={S.sectionTitle}>
                <h2 style={S.h2}>Ils nous font <span style={S.h2accent}>confiance</span></h2>
            </div>
            <div style={S.grid3}>
                {temoignages.map((t, i) => (
                <div key={i} style={S.temoCard}>
                    <div style={S.stars}>★★★★★</div>
                    <p style={S.temoMsg}>{t.msg}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={S.temoAvatar}>{t.name[0]}</div>
                    <div>
                        <div style={S.temoName}>{t.name}</div>
                        <div style={S.temoRole}>{t.role} · {t.city}</div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        <section style={S.livreurSection}>
            <div style={S.livreurInner}>
            <div style={{ fontSize: 60, marginBottom: 24 }}>🛵</div>
            <h2 style={S.livreurH2}>Devenez livreur SpeedDelivery</h2>
            <p style={S.livreurP}>
                Rejoignez notre equipe de livreurs a Douala. Travaillez a votre rythme et soyez votre propre patron.
            </p>
            <div style={S.livreurBadges}>
                {['💰 Revenus attractifs', '⏰ Horaires flexibles', '🏍️ Votre propre moto', '📱 App simple'].map((b, i) => (
                <div key={i} style={S.livreurBadge}>{b}</div>
                ))}
            </div>
            <button style={S.btnLivreur} onClick={() => navigate('/register')}>
                Je veux devenir livreur
            </button>
            </div>
        </section>

        <section id="contact" style={S.sectionDark}>
            <div style={S.sectionInner}>
            <div style={S.sectionTitle}>
                <h2 style={S.h2}>Nous <span style={S.h2accent}>contacter</span></h2>
            </div>
            <div style={S.grid3}>
                {contacts.map((c, i) => (
                <div key={i} style={S.contactCard}>
                    <div style={S.contactIcon}>{c.icon}</div>
                    <div style={S.contactTitle}>{c.title}</div>
                    <div style={S.contactInfo}>{c.info}</div>
                    <a href={c.link} target="_blank" rel="noreferrer" style={S.contactBtn}>{c.btn}</a>
                </div>
                ))}
            </div>
            </div>
        </section>

        <footer style={S.footer}>
            <div style={S.footerInner}>
            <div style={S.logo}>
                <div style={S.logoIcon}>⚡</div>
                <div>
                <div style={S.logoText}><span style={{ color: '#10b981' }}>SPEED</span>DELIVERY</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>Vos livraisons, notre priorite</div>
                <div style={S.logoSub}>📍 DOUALA · CAMEROUN</div>
                </div>
            </div>
            <div style={S.footerLinks}>
                <a href="#services" style={S.footerLink}>Services</a>
                <a href="#tarifs" style={S.footerLink}>Tarifs</a>
                <a href="#contact" style={S.footerLink}>Contact</a>
                <button onClick={() => navigate('/login')} style={{ ...S.footerLink, background: 'none', border: 'none', cursor: 'pointer' }}>Connexion</button>
            </div>
            <div style={S.footerCopy}>2026 SpeedDelivery. Tous droits reserves.</div>
            </div>
        </footer>

        </div>
    );
    }
