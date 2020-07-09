import { Router } from 'express';

import usersRouter from './users.routes';
import sweepstakesRouter from './sweepstakes.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sweepstakes', sweepstakesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
