import express, { Express } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import morgan from '../../config/morgan';
import config from '../../config/config';
import { trpcRouter, createContext } from '../../routes/trpc';
import apiRouter from '../../routes/api';

export default function createApp(): Express {
  const app: Express = express();

  if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
  }

  // set security HTTP headers
  app.use(helmet());

  // parse json request body
  app.use(express.json());

  // parse urlencoded request body
  app.use(express.urlencoded({ extended: true }));

  // sanitize request data
  app.use(xss());

  // gzip compression
  app.use(compression());

  // enable cors
  app.use(cors());
  app.options('*', cors());

  app.use('/api', apiRouter);

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext
    })
  );

  return app;
}
