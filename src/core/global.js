const Promise = require('bluebird');
const logger = require('../config/logger');

module.exports = () => {
  global.logger = logger;
  global.Promise = Promise;
};
