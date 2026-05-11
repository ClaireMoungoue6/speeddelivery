    const express = require('express');
    const router = express.Router();
    const {
    creerCommande,
    mesCommandes,
    commandesDisponibles,
    accepterCommande,
    updateStatut,
    toutesCommandes,
    mesCourses,
    } = require('../controllers/commandeController');
    const { protect, authorize } = require('../middlewares/authMiddleware');

    // CLIENT
    router.post('/', protect, authorize('CLIENT'), creerCommande);
    router.get('/mes-commandes', protect, authorize('CLIENT'), mesCommandes);

    // LIVREUR
    router.get('/disponibles', protect, authorize('LIVREUR'), commandesDisponibles);
    router.put('/:id/accepter', protect, authorize('LIVREUR'), accepterCommande);
    router.put('/:id/statut', protect, authorize('LIVREUR'), updateStatut);
    router.get('/mes-courses', protect, authorize('LIVREUR'), mesCourses);

    // ADMIN
    router.get('/toutes', protect, authorize('ADMIN'), toutesCommandes);

    module.exports = router;