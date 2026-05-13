    const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, role } = req.body;
        const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email, phone, role },
        select: { id: true, name: true, email: true, role: true, phone: true },
        });
        res.json({ message: 'Utilisateur modifie', user });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
    };

    const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Utilisateur supprime' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
    };

    module.exports = { register, login, getProfile, getAllUsers, updateUser, deleteUser };