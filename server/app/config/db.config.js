
const fs = require('fs');
const configFile = fs.readFileSync('./config.json');
const config = JSON.parse(configFile);

module.exports = {
    HOST: config.DB_HOST,
    USER: config.DB_USER,
    PASSWORD: config.DB_PASSWORD,
    DB: config.DB,
    dialect: config.DB_DIALECT,
   // timezone: 'Europe/Berlin',
    pool: {
      max: config.DB_POOL.MAX,
      min: config.DB_POOL.MIN,
      acquire: config.DB_POOL.ACQUIRE,
      idle: config.DB_POOL.IDLE
    }
  };