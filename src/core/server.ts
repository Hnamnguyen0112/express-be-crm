import http from 'http';
import { createTerminus } from '@godaddy/terminus';
import { DataSource } from 'typeorm';
import { Express } from 'express';
import config from '../config/config';

const PORT = parseInt(config.port, 10);

const onHealthCheck = async () => ({
  foo: 'bar'
});

const onBeforeShutdown = async () => {
  console.info('Server is shutting down');
};

const onSignal = async (database: DataSource) => {
  console.info('Server is cleaning up');

  console.info('Database is disconnecting');
  await database.destroy();
  console.info('Database disconnected');
};

const onShutdown = async () => {
  console.info('Server shut down');
};

const createServer = (app: Express, database: DataSource) => {
  const server = http.createServer(app);

  createTerminus(server, {
    healthChecks: {
      '/healthCheck': onHealthCheck
    },
    beforeShutdown: onBeforeShutdown,
    onSignal: onSignal.bind(null, database),
    onShutdown,
    signals: ['SIGINT', 'SIGTERM']
  });

  server.on('listening', () => {
    console.info(`Server is listening at ${PORT}`);
  });
  server.on('error', (err) => {
    console.error(err);
  });

  return server;
};

export default createServer;
