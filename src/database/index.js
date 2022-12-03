const sequelize = require('./sequelize');

const init = async () => {
  await sequelize.authenticate();
};

const shutdown = async () => {
  await sequelize.close();
};

module.exports = {
  init,
  shutdown,
  sequelize
};
