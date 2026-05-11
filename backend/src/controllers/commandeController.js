    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    // Calculer le prix selon la distance (simulation)
    const calculerPrix = (depart, arrivee) => {
    const prixBase = 500;
    const prixKm = 100;
    const distanceSimulee = Math.floor(Math.random() * 10) + 1;
    return prixBase + distanceSimulee * prixKm;
    };

    // CLIENT : Créer une commande
    const creerCommande = async (req, res) => {
    try {
        const { adresseDepart, adresseArrivee, description } = req.body;

        if (!adresseDepart || !adresseArrivee) {
        return res.status(400).json({ message: 'Adresses obligatoires' });
        }

        const prix = calculerPrix(adresseDepart, adresseArrivee);

        const commande = await prisma.commande.create({
        data: {
            adresseDepart,
            adresseArrivee,
            description,
            prix,
            clientId: req.user.id,
        },
        include: {
            client: { select: { id: true, name: true, phone: true } },
        },
        });

        res.status(201).json({ message: 'Commande créée', commande });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
    };

    // CLIENT : Voir ses commandes
    const mesCommandes = async (req, res) => {
    try {
        const commandes = await prisma.commande.findMany({
        where: { clientId: req.user.id },
        include: {
            livreur: { select: { id: true, name: true, phone: true } },
        },
        orderBy: { createdAt: 'desc' },
        });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
    };

    // LIVREUR : Voir les commandes disponibles
    const commandesDisponibles = async (req, res) => {
    try {
        const commandes = await prisma.commande.findMany({
        where: { statut: 'EN_ATTENTE' },
        include: {
            client: { select: { id: true, name: true, phone: true } },
        },
        orderBy: { createdAt: 'desc' },
        });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
    };

    // LIVREUR : Accepter une commande
    const accepterCommande = async (req, res) => {
    try {
        const { id } = req.params;

        const commande = await prisma.commande.findUnique({
        where: { id: parseInt(id) },
        });

        if (!commande) {
        return res.status(404).json({ message: 'Commande introuvable' });
        }
        if (commande.statut !== 'EN_ATTENTE') {
        return res.status(400).json({ message: 'Commande déjà prise' });
        }

        const updated = await prisma.commande.update({
        where: { id: parseInt(id) },
        data: {
            statut: 'ACCEPTEE',
            livreurId: req.user.id,
        },
        include: {
            client: { select: { id: true, name: true, phone: true } },
        },
        });

        res.json({ message: 'Commande acceptée', commande: updated });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
    };

    // LIVREUR : Mettre à jour le statut
    const updateStatut = async (req, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;

        const statutsValides = ['EN_COURS', 'LIVREE'];
        if (!statutsValides.includes(statut)) {
        return res.status(400).json({ message: 'Statut invalide' });
        }

        const commande = await prisma.commande.findUnique({
        where: { id: parseInt(id) },
        });

        if (!commande || commande.livreurId !== req.user.id) {
        return res.status(403).json({ message: 'Non autorisé' });
        }

        const updated = await prisma.commande.update({
        where: { id: parseInt(id) },
        data: { statut },
        });

        res.json({ message: 'Statut mis à jour', commande: updated });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
    };

    // ADMIN : Toutes les commandes
    const toutesCommandes = async (req, res) => {
    try {
        const commandes = await prisma.commande.findMany({
        include: {
            client: { select: { id: true, name: true, phone: true } },
            livreur: { select: { id: true, name: true, phone: true } },
        },
        orderBy: { createdAt: 'desc' },
        });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
    };

    // LIVREUR : Voir ses propres courses
    const mesCourses = async (req, res) => {
    try {
        const commandes = await prisma.commande.findMany({
        where: { livreurId: req.user.id },
        include: {
            client: { select: { id: true, name: true, phone: true } },
        },
        orderBy: { createdAt: 'desc' },
        });
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
    };

        module.exports = {
    creerCommande,
    mesCommandes,
    commandesDisponibles,
    accepterCommande,
    updateStatut,
    toutesCommandes,
    mesCourses,
    };