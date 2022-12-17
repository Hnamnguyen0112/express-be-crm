import core from './core';
import config from './config/config';
import 'reflect-metadata';
import database from './database';

const PORT = parseInt(config.port, 10);

const bootstrap = async () => {
  core.initGlobal();
  await database.initialize();

  const app = core.createApp();
  const server = core.createServer(app, database);
  server.listen(PORT);
};

(async () => {
  try {
    await bootstrap();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
