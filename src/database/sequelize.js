const { Sequelize } = require('sequelize');
const cls = require('cls-hooked');
const config = require('../config/config');

const namespace = cls.createNamespace('PSA-PALS');
Sequelize.useCLS(namespace);

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.database,
  pool: {
    min: parseInt(config.database.poolMin, 10),
    max: parseInt(config.database.poolMax, 10),
    idle: 0,
    retry: {
      match: [
        Sequelize.ConnectionError,
        Sequelize.ConnectionTimedOutError,
        Sequelize.TimeoutError,
      ],
      max: 5,
    },
  },
  timezone: '+08:00',
});

module.exports = sequelize;
