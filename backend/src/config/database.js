/**
 * Database configuration
 */

const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite database configuration
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../data/database.sqlite'),
    logging: false // Set to console.log to see SQL queries
});

// Test connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Sync models
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database models synchronized.');
    })
    .catch(err => {
        console.error('Error synchronizing models:', err);
    });

module.exports = sequelize;