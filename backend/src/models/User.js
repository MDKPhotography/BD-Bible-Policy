/**
 * User model
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'manager', 'admin'),
        defaultValue: 'user'
    },
    managerId: {
        type: DataTypes.INTEGER,
        field: 'manager_id',
        references: {
            model: 'users',
            key: 'id'
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

// Instance methods
User.prototype.validatePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// Create default admin user if none exists
User.sync().then(async () => {
    const adminExists = await User.findOne({ where: { email: 'admin@gmu.edu' } });
    if (!adminExists) {
        await User.create({
            name: 'Admin User',
            email: 'admin@gmu.edu',
            password: 'admin123',
            role: 'admin'
        });
        console.log('Default admin user created: admin@gmu.edu / admin123');
    }
});

module.exports = User;