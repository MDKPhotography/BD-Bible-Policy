const { Pool } = require('pg');
const redis = require('redis');

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://rprc:changeme@localhost:5432/bdbible',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect();

module.exports = {
  pgPool,
  redisClient
};
