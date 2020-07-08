import { Router } from 'express';

import usersRouter from './users.routes';
import sweepstakesRouter from './sweepstakes.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sweepstakes', sweepstakesRouter);

export default routes;
