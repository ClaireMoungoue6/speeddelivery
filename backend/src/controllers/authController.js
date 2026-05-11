    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const { PrismaClient } = require('@prisma/client');

    const prisma = new PrismaClient();

    const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    };

    const register = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
        return res.status(400).json({ message: 'Email déjà utilisé' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || 'CLIENT',
        },
        });

        const token = generateToken(user);

        res.status(201).json({
        message: 'Compte créé avec succès',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
    };

    const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const token = generateToken(user);

        res.json({
        message: 'Connexion réussie',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
    };

    const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            createdAt: true,
        },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
    };

    module.exports = { register, login, getProfile };