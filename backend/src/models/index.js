/**
 * Model exports and associations
 */

const sequelize = require('../config/database');
const User = require('./User');
const {
    QuadChartSubmission,
    QuadChartHistory,
    QuadChartComment
} = require('./QuadChartSubmission');

// Define associations
const models = {
    User,
    QuadChartSubmission,
    QuadChartHistory,
    QuadChartComment
};

// Initialize associations
Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = {
    sequelize,
    ...models
};