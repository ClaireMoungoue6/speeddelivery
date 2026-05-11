    const jwt = require('jsonwebtoken');

    const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Non autorisé, token manquant' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
    };

    const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Accès refusé' });
        }
        next();
    };
    };

    module.exports = { protect, authorize };