const { join } = require('path');
const { readdirSync } = require('fs');
const sequelize = require('../database/sequelize');

const loadModels = () => {
  const modelsFolderPath = join(__dirname);
  const filenames = readdirSync(modelsFolderPath);
  filenames
    .filter((filename) => !['index.js'].includes(filename))
    .forEach((filename) => {
      sequelize.import(join(modelsFolderPath, filename));
    });
};

const associateModels = () => {
  Object.values(sequelize.models).forEach((model) => {
    if (model.associate) {
      model.associate(sequelize.models);
    }
  });
};

loadModels();
associateModels();

module.exports = sequelize.models;
