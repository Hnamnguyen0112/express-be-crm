import express, { Router } from 'express';
import docsRoute from './docs.route';

const router: Router = express.Router();

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
];

devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
