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
        {
        name: 'Express',
        price: '500',
        desc: 'Livraison dans le meme quartier',
        features: ['Delai 20-30 min', 'Jusqu a 5kg', 'Suivi en temps reel'],
        popular: false,
        },
        {
        name: 'Standard',
        price: '1000',
        desc: 'Livraison intra-ville Douala',
        features: ['Delai 45-60 min', 'Jusqu a 15kg', 'Suivi en temps reel', 'Confirmation SMS'],
        popular: true,
        },
        {
        name: 'Premium',
        price: '2000',
        desc: 'Livraison prioritaire et fragile',
        features: ['Delai 30 min garanti', 'Poids illimite', 'Suivi GPS live', 'Assurance colis'],
        popular: false,
        },
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

    return (
        <div className="font-sans">

        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-green-900/30">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⚡</span>
                </div>
                <div>
                <span className="text-white font-black text-xl">
                    <span className="text-green-400">SPEED</span>DELIVERY
                </span>
                <p className="text-green-400 text-xs tracking-widest">DOUALA · CAMEROUN</p>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
                <a href="#services" className="text-gray-300 hover:text-green-400 text-sm transition">Services</a>
                <a href="#comment" className="text-gray-300 hover:text-green-400 text-sm transition">Comment ca marche</a>
                <a href="#tarifs" className="text-gray-300 hover:text-green-400 text-sm transition">Tarifs</a>
                <a href="#contact" className="text-gray-300 hover:text-green-400 text-sm transition">Contact</a>
            </div>
            <div className="flex gap-3">
                <button
                onClick={() => navigate('/login')}
                className="text-sm text-green-400 border border-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition"
                >
                Connexion
                </button>
                <button
                onClick={() => navigate('/register')}
                className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition font-semibold"
                >
                Commander
                </button>
            </div>
            </div>
        </nav>

        <section className="relative min-h-screen bg-black flex items-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            <div className="relative max-w-6xl mx-auto px-6 pt-24 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-600/40 text-green-400 px-4 py-2 rounded-full text-sm mb-6">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Service disponible a Douala
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                    On livre<br />
                    <span className="text-green-400">quoi</span><br />
                    aujourd hui ?
                </h1>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    SpeedDelivery, la livraison express urbaine a Douala.
                    Rapide, fiable et abordable. Vos colis livres en moins d une heure.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button
                    onClick={() => navigate('/register')}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition"
                    >
                    🚀 Commander maintenant
                    </button>
                    <a
                    href="https://wa.me/237658056947"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border border-green-600 text-green-400 hover:bg-green-600 hover:text-white font-bold px-8 py-4 rounded-xl text-lg transition"
                    >
                    📱 WhatsApp
                    </a>
                </div>
                <div className="flex gap-8 mt-12">
                    <div>
                    <p className="text-3xl font-black text-green-400">500+</p>
                    <p className="text-gray-500 text-sm">Livraisons</p>
                    </div>
                    <div>
                    <p className="text-3xl font-black text-green-400">98%</p>
                    <p className="text-gray-500 text-sm">Satisfaction</p>
                    </div>
                    <div>
                    <p className="text-3xl font-black text-green-400">1h</p>
                    <p className="text-gray-500 text-sm">Delai moyen</p>
                    </div>
                </div>
                </div>
                <div className="relative hidden md:block">
                <div className="w-80 h-80 mx-auto relative">
                    <div className="absolute inset-0 bg-green-600/20 rounded-full blur-2xl"></div>
                    <div className="relative bg-green-900/30 border border-green-700/30 rounded-3xl p-8 text-center">
                    <div className="text-8xl mb-4">🛵</div>
                    <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-4 mb-3">
                        <p className="text-green-400 font-bold text-sm">📍 Depart : Akwa, Douala</p>
                    </div>
                    <div className="text-green-400 text-2xl my-2">↓</div>
                    <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-4 mb-3">
                        <p className="text-green-400 font-bold text-sm">🎯 Arrivee : Bonapriso</p>
                    </div>
                    <div className="bg-green-500 rounded-xl p-3 mt-4">
                        <p className="text-white font-black">✅ Livre en 35 min !</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>

        <section id="services" className="bg-gray-950 py-20">
            <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-white mb-4">
                Ce qu on <span className="text-green-400">livre</span>
                </h2>
                <p className="text-gray-400 text-lg">Tout ce dont vous avez besoin, livre a votre porte</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {services.map((s, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 hover:border-green-600/50 rounded-2xl p-6 transition group">
                    <div className="text-4xl mb-4">{s.icon}</div>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-green-400 transition">{s.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
                ))}
            </div>
            </div>
        </section>

        <section id="comment" className="bg-black py-20">
            <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-white mb-4">
                Comment ca <span className="text-green-400">marche ?</span>
                </h2>
                <p className="text-gray-400 text-lg">3 etapes simples pour recevoir votre commande</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {etapes.map((e, i) => (
                <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                    {e.icon}
                    </div>
                    <span className="inline-block bg-green-400 text-black text-xs font-black px-2 py-0.5 rounded-full mb-3">
                    {e.num}
                    </span>
                    <h3 className="text-white font-bold text-xl mb-3">{e.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{e.desc}</p>
                </div>
                ))}
            </div>
            <div className="text-center mt-12">
                <button
                onClick={() => navigate('/register')}
                className="bg-green-600 hover:bg-green-500 text-white font-bold px-10 py-4 rounded-xl text-lg transition"
                >
                🚀 Essayer maintenant
                </button>
            </div>
            </div>
        </section>

        <section id="tarifs" className="bg-gray-950 py-20">
            <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-white mb-4">
                Tarifs <span className="text-green-400">transparents</span>
                </h2>
                <p className="text-gray-400 text-lg">Pas de frais caches. Payez uniquement ce que vous voyez.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 items-center">
                {tarifs.map((t, i) => (
                <div key={i} className={`bg-gray-900 border-2 rounded-2xl p-8 relative ${t.popular ? 'border-green-600 scale-105' : 'border-gray-700'}`}>
                    {t.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-black px-4 py-1.5 rounded-full">
                        ⭐ POPULAIRE
                    </div>
                    )}
                    <h3 className="text-white font-bold text-xl mb-1">{t.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{t.desc}</p>
                    <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-green-400">{t.price}</span>
                    <span className="text-gray-400">FCFA</span>
                    </div>
                    <ul className="space-y-2 mb-8">
                    {t.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="text-green-400">✓</span> {f}
                        </li>
                    ))}
                    </ul>
                    <button
                    onClick={() => navigate('/register')}
                    className={`w-full py-3 rounded-xl font-bold transition ${t.popular ? 'bg-green-600 hover:bg-green-500 text-white' : 'border border-green-600 text-green-400 hover:bg-green-600 hover:text-white'}`}
                    >
                    Choisir ce plan
                    </button>
                </div>
                ))}
            </div>
            </div>
        </section>

        <section className="bg-black py-20">
            <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-white mb-4">
                Ils nous font <span className="text-green-400">confiance</span>
                </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {temoignages.map((t, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map((j) => (
                        <span key={j} className="text-yellow-400">★</span>
                    ))}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">{t.msg}</p>
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        {t.name[0]}
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm">{t.name}</p>
                        <p className="text-gray-400 text-xs">{t.role} · {t.city}</p>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        <section className="bg-green-600 py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="text-6xl mb-6">🛵</div>
            <h2 className="text-4xl font-black text-white mb-4">
                Devenez livreur SpeedDelivery
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                Rejoignez notre equipe de livreurs a Douala. Travaillez a votre rythme et soyez votre propre patron.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['💰 Revenus attractifs', '⏰ Horaires flexibles', '🏍️ Votre propre moto', '📱 App simple'].map((b, i) => (
                <div key={i} className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">{b}</div>
                ))}
            </div>
            <button
                onClick={() => navigate('/register')}
                className="bg-white text-green-700 hover:bg-green-50 font-black px-10 py-4 rounded-xl text-lg transition"
            >
                Je veux devenir livreur
            </button>
            </div>
        </section>

        <section id="contact" className="bg-gray-950 py-20">
            <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-white mb-4">
                Nous <span className="text-green-400">contacter</span>
                </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {contacts.map((c, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                    <div className="text-4xl mb-3">{c.icon}</div>
                    <h3 className="text-white font-bold mb-1">{c.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{c.info}</p>
                    <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg text-sm transition"
                    >
                    {c.btn}
                    </a>
                </div>
                ))}
            </div>
            </div>
        </section>

        <footer className="bg-black border-t border-gray-900 py-10">
            <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">⚡</span>
                </div>
                <div>
                    <p className="text-white font-black">
                    <span className="text-green-400">SPEED</span>DELIVERY
                    </p>
                    <p className="text-gray-500 text-xs">Vos livraisons, notre priorite</p>
                    <p className="text-green-400 text-xs tracking-widest">📍 DOUALA · CAMEROUN</p>
                </div>
                </div>
                <div className="flex gap-6 text-sm text-gray-400">
                <a href="#services" className="hover:text-green-400 transition">Services</a>
                <a href="#tarifs" className="hover:text-green-400 transition">Tarifs</a>
                <a href="#contact" className="hover:text-green-400 transition">Contact</a>
                <button onClick={() => navigate('/login')} className="hover:text-green-400 transition">Connexion</button>
                </div>
                <p className="text-gray-600 text-xs">2026 SpeedDelivery. Tous droits reserves.</p>
            </div>
            </div>
        </footer>

        </div>
    );
    }
