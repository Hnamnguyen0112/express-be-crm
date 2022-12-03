const core = require('./core');
const database = require('./database');
const config = require('./config/config');

const PORT = parseInt(config.port, 10);

const bootstrap = async () => {
  core.initGlobal();

  await database.init();

  const app = core.createApp();
  const server = core.createServer(app, database);
  server.listen(PORT);
}

(async () => {
  try {
    await bootstrap();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
