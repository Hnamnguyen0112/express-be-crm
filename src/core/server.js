const config = require('../config/config');
const http = require('http');
const { createTerminus } = require('@godaddy/terminus');

const PORT = parseInt(config.port, 10);

const onHealthCheck = async () => ({
  foo: 'bar',
});

const onBeforeShutdown = async () => {
  console.info('Server is shutting down');
};

const onSignal = async (database) => {
  console.info('Server is cleaning up');

  console.info('Database is disconnecting');
  await database.shutdown();
  console.info('Database disconnected');
};

const onShutdown = async () => {
  console.info('Server shut down');
};

module.exports = (app, database) => {
  const server = http.createServer(app);

  createTerminus(server, {
    healthChecks: {
      '/healthCheck': onHealthCheck,
    },
    beforeShutdown: onBeforeShutdown,
    onSignal: onSignal.bind(null, database),
    onShutdown,
    signals: ['SIGINT', 'SIGTERM'],
  });

  server.on('listening', () => {
    console.info(`Server is listening at ${PORT}`);
  });
  server.on('error', (err) => {
    console.error(err);
  });

  return server;
};
