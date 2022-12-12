const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const config = require('../../config/config');
const morgan = require('../../config/morgan');
const { jwtStrategy } = require('../../config/passport');
const { authLimiter } = require('../../middlewares/rateLimiter');
const router = require('./core.router');
const { errorConverter, errorHandler } = require('../../middlewares/error');

module.exports = () => {
  const app = express();

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

  // jwt authentication
  app.use(passport.initialize());
  passport.use('jwt', jwtStrategy);

  // limit repeated failed requests to auth endpoints
  if (config.env === 'production') {
    app.use('/v1/auth', authLimiter);
  }

  // v1 api routes
  app.use(router);

  // convert error to ApiError, if needed
  app.use(errorConverter);

  // handle error
  app.use(errorHandler);

  return app;
}
