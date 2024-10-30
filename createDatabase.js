const { Sequelize } = require('sequelize');

// Conexión sin especificar una base de datos concreta
const sequelize = new Sequelize('', 'root', 'root1234', {
    host: 'localhost',
    dialect: 'mysql',
});

async function createDatabase() {
    try {
        // Crear la base de datos
        await sequelize.query('CREATE DATABASE IF NOT EXISTS efi_react;');
        console.log('Base de datos creada exitosamente.');

        // Conectar a la base de datos recién creada
        const sequelizeWithDB = new Sequelize('efi_react', 'root', 'root1234', {
            host: 'localhost',
            dialect: 'mysql',
        });

        // Probar la conexión a la base de datos
        await sequelizeWithDB.authenticate();
        console.log('Conexión a la base de datos "efi_react" establecida exitosamente.');

        // Cerrar la conexión a la base de datos
        await sequelizeWithDB.close();
    } catch (error) {
        console.error('Error al crear la base de datos o conectar:', error);
    } finally {
        await sequelize.close();
    }
}

createDatabase();
