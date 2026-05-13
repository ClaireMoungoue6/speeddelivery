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
        { name: 'Express', price: '500', desc: 'Livraison dans le meme quartier', features: ['Delai 20-30 min', "Jusqu'a 5kg", 'Suivi en temps reel'], popular: false },
        { name: 'Standard', price: '1000', desc: 'Livraison intra-ville Douala', features: ['Delai 45-60 min', "Jusqu'a 15kg", 'Suivi en temps reel', 'Confirmation SMS'], popular: true },
        { name: 'Premium', price: '2000', desc: 'Livraison prioritaire et fragile', features: ['Delai 30 min garanti', 'Poids illimite', 'Suivi GPS live', 'Assurance colis'], popular: false },
    ];

    const temoignages = [
        { name: 'Marie K.', role: 'Cliente', city: 'Akwa, Douala', msg: 'Livraison recue en 25 minutes ! Le livreur etait tres professionnel. Je recommande vivement SpeedDelivery.' },
        { name: 'Jean-Paul N.', role: 'Commercant', city: 'Bonaberi, Douala', msg: 'Grace a SpeedDelivery, mes clients recoivent leurs commandes le jour meme. Mon chiffre a augmente de 30%.' },
        { name: 'Fatima B.', role: 'Cliente', city: 'Bonapriso, Douala', msg: 'Service rapide et prix raisonnables. Le suivi en temps reel est tres rassurant. Bravo a toute equipe !' },
    ];

    const contacts = [
        { icon: '📱', title: 'WhatsApp', info: '+237 651 424 351', link: 'https://wa.me/237651424351', btn: 'Ecrire sur WhatsApp' },
        { icon: '📘', title: 'Facebook', info: 'SpeedDelivery Douala', link: 'https://www.facebook.com/profile.php?id=61577940581858&mibextid=ZbWKwL', btn: 'Suivre sur Facebook' },
        { icon: '🎵', title: 'TikTok', info: '@speeddelivery', link: 'https://www.tiktok.com/@_.mc224_', btn: 'Suivre sur TikTok' },
    ];

    return (
        <div style={{ fontFamily: 'sans-serif', backgroundColor: '#0f1923', color: '#f1f5f9', overflowX: 'hidden' }}>
        <style>{`
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .nav-links { display: flex; gap: 32px; align-items: center; }
            .nav-btns { display: flex; gap: 12px; }
            .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
            .hero-card-col { display: block; }
            .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
            .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
            .tarif-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: center; }
            .footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; }
            .footer-links { display: flex; gap: 24px; }
            .stats-row { display: flex; gap: 40px; margin-top: 48px; }
            .card-hover:hover { border-color: rgba(5,150,105,0.5) !important; }
            @media (max-width: 768px) {
            .nav-links { display: none; }
            .hero-grid { grid-template-columns: 1fr; gap: 32px; }
            .hero-card-col { display: none; }
            .grid-3 { grid-template-columns: 1fr; }
            .grid-2 { grid-template-columns: 1fr; }
            .tarif-grid { grid-template-columns: 1fr; gap: 32px; }
            .footer-inner { flex-direction: column; text-align: center; }
            .footer-links { flex-wrap: wrap; justify-content: center; }
            .stats-row { gap: 24px; }
            h1.hero-title { font-size: 42px !important; }
            .section-title { font-size: 28px !important; }
            .tarif-pop { transform: none !important; }
            .nav-btns button { padding: 6px 12px !important; font-size: 12px !important; }
            .hero-btns { flex-direction: column; }
            .hero-btns button, .hero-btns a { width: 100%; text-align: center; justify-content: center; }
            }
            @media (max-width: 480px) {
            .section-inner { padding: 0 16px !important; }
            h1.hero-title { font-size: 34px !important; }
            }
        `}</style>

        {/* NAVBAR */}
        <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, backgroundColor: 'rgba(15,25,35,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(16,185,129,0.15)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 38, height: 38, backgroundColor: '#059669', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
                <div>
                <div style={{ fontWeight: 900, fontSize: 18, color: '#f1f5f9' }}><span style={{ color: '#10b981' }}>SPEED</span>DELIVERY</div>
                <div style={{ fontSize: 9, color: '#10b981', letterSpacing: 2 }}>DOUALA · CAMEROUN</div>
                </div>
            </div>
            <div className="nav-links">
                <a href="#services" style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none' }}>Services</a>
                <a href="#comment" style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none' }}>Comment ca marche</a>
                <a href="#tarifs" style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none' }}>Tarifs</a>
                <a href="#contact" style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none' }}>Contact</a>
            </div>
            <div className="nav-btns">
                <button onClick={() => navigate('/login')} style={{ fontSize: 13, color: '#10b981', border: '1px solid #059669', padding: '8px 16px', borderRadius: 8, background: 'transparent', cursor: 'pointer' }}>Connexion</button>
                <button onClick={() => navigate('/register')} style={{ fontSize: 13, backgroundColor: '#059669', color: 'white', padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700 }}>Commander</button>
            </div>
            </div>
        </nav>

        {/* HERO */}
        <section style={{ minHeight: '100vh', backgroundColor: '#0f1923', display: 'flex', alignItems: 'center', paddingTop: 80, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 80, left: 40, width: 300, height: 300, backgroundColor: 'rgba(5,150,105,0.07)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
            <div style={{ position: 'absolute', bottom: 80, right: 40, width: 400, height: 400, backgroundColor: 'rgba(16,185,129,0.04)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
            <div className="section-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', width: '100%' }}>
            <div className="hero-grid">
                <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.25)', color: '#10b981', padding: '8px 16px', borderRadius: 999, fontSize: 13, marginBottom: 24 }}>
                    <span style={{ width: 8, height: 8, backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
                    Service disponible a Douala
                </div>
                <h1 className="hero-title" style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.05, marginBottom: 20, color: '#f1f5f9' }}>
                    On livre<br />
                    <span style={{ color: '#10b981' }}>quoi</span><br />
                    aujourd hui ?
                </h1>
                <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                    SpeedDelivery, la livraison express urbaine a Douala. Rapide, fiable et abordable.
                </p>
                <div className="hero-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    <button onClick={() => navigate('/register')} style={{ backgroundColor: '#059669', color: 'white', fontWeight: 700, padding: '13px 28px', borderRadius: 12, fontSize: 15, border: 'none', cursor: 'pointer' }}>
                    🚀 Commander maintenant
                    </button>
                    <a href="https://wa.me/237651424351" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #059669', color: '#10b981', fontWeight: 700, padding: '13px 28px', borderRadius: 12, fontSize: 15, textDecoration: 'none' }}>
                    📱 WhatsApp
                    </a>
                </div>
                <div className="stats-row">
                    <div><div style={{ fontSize: 30, fontWeight: 900, color: '#10b981' }}>500+</div><div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Livraisons</div></div>
                    <div><div style={{ fontSize: 30, fontWeight: 900, color: '#10b981' }}>98%</div><div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Satisfaction</div></div>
                    <div><div style={{ fontSize: 30, fontWeight: 900, color: '#10b981' }}>1h</div><div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Delai moyen</div></div>
                </div>
                </div>
                <div className="hero-card-col">
                <div style={{ backgroundColor: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.18)', borderRadius: 24, padding: 32, textAlign: 'center' }}>
                    <div style={{ fontSize: 72, marginBottom: 16 }}>🛵</div>
                    <div style={{ backgroundColor: 'rgba(5,150,105,0.12)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 10 }}>
                    <span style={{ color: '#10b981', fontWeight: 700, fontSize: 14 }}>📍 Depart : Akwa, Douala</span>
                    </div>
                    <div style={{ color: '#10b981', fontSize: 22, margin: '8px 0' }}>↓</div>
                    <div style={{ backgroundColor: 'rgba(5,150,105,0.12)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 10 }}>
                    <span style={{ color: '#10b981', fontWeight: 700, fontSize: 14 }}>🎯 Arrivee : Bonapriso</span>
                    </div>
                    <div style={{ backgroundColor: '#059669', borderRadius: 12, padding: 12, marginTop: 12 }}>
                    <span style={{ color: 'white', fontWeight: 900 }}>✅ Livre en 35 min !</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* SERVICES */}
        <section id="services" style={{ backgroundColor: '#0a1520', padding: '80px 0' }}>
            <div className="section-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h2 className="section-title" style={{ fontSize: 36, fontWeight: 900, color: '#f1f5f9', marginBottom: 10 }}>Ce qu on <span style={{ color: '#10b981' }}>livre</span></h2>
                <p style={{ color: '#64748b', fontSize: 15 }}>Tout ce dont vous avez besoin, livre a votre porte</p>
            </div>
            <div className="grid-3">
                {services.map((s, i) => (
                <div key={i} className="card-hover" style={{ backgroundColor: '#131f2e', border: '1px solid #1e2d3d', borderRadius: 18, padding: 22, transition: 'border-color 0.2s' }}>
                    <div style={{ fontSize: 34, marginBottom: 14 }}>{s.icon}</div>
                    <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.title}</div>
                    <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* COMMENT CA MARCHE */}
        <section id="comment" style={{ backgroundColor: '#0f1923', padding: '80px 0' }}>
            <div className="section-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h2 className="section-title" style={{ fontSize: 36, fontWeight: 900, color: '#f1f5f9', marginBottom: 10 }}>Comment ca <span style={{ color: '#10b981' }}>marche ?</span></h2>
                <p style={{ color: '#64748b', fontSize: 15 }}>3 etapes simples pour recevoir votre commande</p>
            </div>
            <div className="grid-3">
                {etapes.map((e, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ width: 60, height: 60, backgroundColor: '#059669', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 14px' }}>{e.icon}</div>
                    <span style={{ display: 'inline-block', backgroundColor: '#10b981', color: '#0f1923', fontSize: 11, fontWeight: 900, padding: '2px 10px', borderRadius: 999, marginBottom: 10 }}>{e.num}</span>
                    <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{e.title}</div>
                    <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{e.desc}</div>
                </div>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 44 }}>
                <button onClick={() => navigate('/register')} style={{ backgroundColor: '#059669', color: 'white', fontWeight: 700, padding: '13px 32px', borderRadius: 12, fontSize: 15, border: 'none', cursor: 'pointer' }}>
                🚀 Essayer maintenant
                </button>
            </div>
            </div>
        </section>

        {/* TARIFS */}
        <section id="tarifs" style={{ backgroundColor: '#0a1520', padding: '80px 0' }}>
            <div className="section-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h2 className="section-title" style={{ fontSize: 36, fontWeight: 900, color: '#f1f5f9', marginBottom: 10 }}>Tarifs <span style={{ color: '#10b981' }}>transparents</span></h2>
                <p style={{ color: '#64748b', fontSize: 15 }}>Pas de frais caches. Payez uniquement ce que vous voyez.</p>
            </div>
            <div className="tarif-grid">
                {tarifs.map((t, i) => (
                <div key={i} className={t.popular ? 'tarif-pop' : ''} style={{ backgroundColor: '#131f2e', border: t.popular ? '2px solid #059669' : '1px solid #1e2d3d', borderRadius: 20, padding: 28, position: 'relative', transform: t.popular ? 'scale(1.04)' : 'none' }}>
                    {t.popular && (
                    <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#059669', color: 'white', fontSize: 11, fontWeight: 900, padding: '4px 16px', borderRadius: 999, whiteSpace: 'nowrap' }}>⭐ POPULAIRE</div>
                    )}
                    <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 19, marginBottom: 4 }}>{t.name}</div>
                    <div style={{ color: '#64748b', fontSize: 13, marginBottom: 14 }}>{t.desc}</div>
                    <div style={{ marginBottom: 20 }}>
                    <span style={{ fontSize: 38, fontWeight: 900, color: '#10b981' }}>{t.price}</span>
                    <span style={{ color: '#64748b', fontSize: 13, marginLeft: 4 }}>FCFA</span>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                    {t.features.map((f, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#cbd5e1', fontSize: 13, marginBottom: 8 }}>
                        <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span> {f}
                        </div>
                    ))}
                    </div>
                    <button onClick={() => navigate('/register')} style={{ width: '100%', padding: '11px 0', borderRadius: 10, backgroundColor: t.popular ? '#059669' : 'transparent', color: t.popular ? 'white' : '#10b981', fontWeight: 700, border: t.popular ? 'none' : '1px solid #059669', cursor: 'pointer', fontSize: 14 }}>
                    Choisir ce plan
                    </button>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* TEMOIGNAGES */}
        <section style={{ backgroundColor: '#0f1923', padding: '80px 0' }}>
            <div className="section-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h2 className="section-title" style={{ fontSize: 36, fontWeight: 900, color: '#f1f5f9', marginBottom: 10 }}>Ils nous font <span style={{ color: '#10b981' }}>confiance</span></h2>
            </div>
            <div className="grid-3">
                {temoignages.map((t, i) => (
                <div key={i} style={{ backgroundColor: '#131f2e', border: '1px solid #1e2d3d', borderRadius: 18, padding: 22 }}>
                    <div style={{ color: '#fbbf24', fontSize: 16, marginBottom: 12 }}>★★★★★</div>
                    <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>{t.msg}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 38, height: 38, backgroundColor: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 15 }}>{t.name[0]}</div>
                    <div>
                        <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13 }}>{t.name}</div>
                        <div style={{ color: '#64748b', fontSize: 11 }}>{t.role} · {t.city}</div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* DEVENIR LIVREUR */}
        <section style={{ backgroundColor: '#059669', padding: '80px 0', textAlign: 'center' }}>
            <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🛵</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: 'white', marginBottom: 14 }}>Devenez livreur SpeedDelivery</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 28, lineHeight: 1.6 }}>
                Rejoignez notre equipe a Douala. Travaillez a votre rythme et soyez votre propre patron.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 32 }}>
                {['💰 Revenus attractifs', '⏰ Horaires flexibles', '🏍️ Votre propre moto', '📱 App simple'].map((b, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: 'white', padding: '7px 16px', borderRadius: 999, fontSize: 13, fontWeight: 500 }}>{b}</div>
                ))}
            </div>
            <button onClick={() => navigate('/register')} style={{ backgroundColor: 'white', color: '#059669', fontWeight: 900, padding: '13px 36px', borderRadius: 12, fontSize: 16, border: 'none', cursor: 'pointer' }}>
                Je veux devenir livreur
            </button>
            </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ backgroundColor: '#0a1520', padding: '80px 0' }}>
            <div className="section-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h2 className="section-title" style={{ fontSize: 36, fontWeight: 900, color: '#f1f5f9', marginBottom: 10 }}>Nous <span style={{ color: '#10b981' }}>contacter</span></h2>
            </div>
            <div className="grid-3">
                {contacts.map((c, i) => (
                <div key={i} style={{ backgroundColor: '#131f2e', border: '1px solid #1e2d3d', borderRadius: 18, padding: 24, textAlign: 'center' }}>
                    <div style={{ fontSize: 34, marginBottom: 10 }}>{c.icon}</div>
                    <div style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
                    <div style={{ color: '#64748b', fontSize: 13, marginBottom: 14 }}>{c.info}</div>
                    <a href={c.link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', border: '1px solid #059669', color: '#10b981', padding: '8px 16px', borderRadius: 8, fontSize: 13, textDecoration: 'none' }}>{c.btn}</a>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* FOOTER */}
        <footer style={{ backgroundColor: '#080f18', borderTop: '1px solid #1e2d3d', padding: '36px 0' }}>
            <div className="section-inner footer-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, backgroundColor: '#059669', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>⚡</div>
                <div>
                <div style={{ fontWeight: 900, fontSize: 16, color: '#f1f5f9' }}><span style={{ color: '#10b981' }}>SPEED</span>DELIVERY</div>
                <div style={{ fontSize: 10, color: '#64748b' }}>Vos livraisons, notre priorite</div>
                <div style={{ fontSize: 9, color: '#10b981', letterSpacing: 2 }}>📍 DOUALA · CAMEROUN</div>
                </div>
            </div>
            <div className="footer-links" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <a href="#services" style={{ color: '#64748b', fontSize: 13, textDecoration: 'none' }}>Services</a>
                <a href="#tarifs" style={{ color: '#64748b', fontSize: 13, textDecoration: 'none' }}>Tarifs</a>
                <a href="#contact" style={{ color: '#64748b', fontSize: 13, textDecoration: 'none' }}>Contact</a>
                <button onClick={() => navigate('/login')} style={{ color: '#64748b', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}>Connexion</button>
            </div>
            <div style={{ color: '#334155', fontSize: 11 }}>2026 SpeedDelivery. Tous droits reserves.</div>
            </div>
        </footer>
        </div>
    );
    }
