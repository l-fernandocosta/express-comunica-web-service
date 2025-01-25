import 'reflect-metadata';
import './http/controllers/user.controller';

import * as bodyParser from 'body-parser';
import cors from 'cors';
import container from './config/di/container';

import customMorgan from '@/__shared__/utils/custom-morgan';
import logger from '@/__shared__/utils/logger';
import helmet from 'helmet';
import { InversifyExpressServer } from 'inversify-express-utils';
import { errorHandler } from './http/middleware/error.middleware';

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(customMorgan);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  app.use(
    helmet({
      contentSecurityPolicy: false,
      xXssProtection: true,
    }),
  );
});

server.setErrorConfig((app) => {
  app.use(errorHandler);
});

const app = server.build();

app.listen(3000, () => {
  logger.info('Listen on port 3000');
});
