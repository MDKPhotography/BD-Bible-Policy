/**
 * Authentication middleware
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Authenticate JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Authorize based on role
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // For now, allow all authenticated users
        // In production, check req.user.role against roles array
        if (roles && roles.length > 0) {
            // Simplified role check - expand based on your user model
            const userRole = req.user.role || 'user';
            if (!roles.includes(userRole)) {
                return res.status(403).json({ error: 'Insufficient permissions' });
            }
        }

        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRole
};