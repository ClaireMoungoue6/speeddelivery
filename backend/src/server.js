    const express = require('express');
    const cors = require('cors');
    require('dotenv').config();

    const authRoutes = require('./routes/authRoutes');
    const commandeRoutes = require('./routes/commandeRoutes');

    const app = express();

    app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
    }));
    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/commandes', commandeRoutes);

    app.get('/', (req, res) => {
    res.json({ message: 'SpeedDelivery API is running 🚀' });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });