const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    async register({ nombre, correo, contraseña, rol }) {
        try {
            const userExists = await User.findOne({ where: { correo } });
            if (userExists) {
                throw new Error('El correo ya está registrado');
            }
            const hashedPassword = await bcrypt.hash(contraseña, 10);
            const user = await User.create({
                nombre,
                correo,
                contraseña: hashedPassword,
                rol,
            });
            return { message: 'Usuario registrado exitosamente', userId: user.id };
        } catch (error) {
            throw new Error('Error al registrar usuario: ' + error.message);
        }
    }

    async login({ correo, contraseña }) {
        try {
            const user = await User.findOne({ where: { correo } });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const isMatch = await bcrypt.compare(contraseña, user.contraseña);
            if (!isMatch) {
                throw new Error('Contraseña incorrecta');
            }
            const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token, user: { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol } };
        } catch (error) {
            throw new Error('Error al iniciar sesión: ' + error.message);
        }
    }

    async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error) {
            throw new Error('Token no válido');
        }
    }
}

module.exports = new AuthService();
