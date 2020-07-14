import { Router } from 'express';

import { getRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import Sweepstake from '../models/Sweepstake';
import CreateSweepstakeService from '../services/CreateSweepstakeService';

const sweepstakesRouter = Router();

// sweepstakesRouter.use(ensureAuthenticated);

// Create
sweepstakesRouter.post('/', async (request, response) => {
  const {
    title,
    description,
    type,
    award,
    award_image,
    date,
    owner_id,
    participants,
  } = request.body;

  const createSweepstake = new CreateSweepstakeService();

  const sweepstake = await createSweepstake.execute({
    title,
    description,
    type,
    award,
    award_image,
    date,
    owner_id,
    participants,
  });

  return response.status(201).json(sweepstake);
});

// List(All)
sweepstakesRouter.get('/', async (request, response) => {
  const sweepstakes = await getRepository(Sweepstake).find();
  return response.status(200).json(sweepstakes);
});

// List(All)
sweepstakesRouter.get('/', async (request, response) => {
  const sweepstake = await getRepository(Sweepstake).findOne(request.body.id);
  return response.status(200).json(sweepstake);
});

export default sweepstakesRouter;
