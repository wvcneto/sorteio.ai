import { Router } from 'express';

import { getRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import Sweepstake from '../models/Sweepstake';
import CreateSweepstakeService from '../services/CreateSweepstakeService';

const sweepstakesRouter = Router();

sweepstakesRouter.use(ensureAuthenticated);

// Create
sweepstakesRouter.post('/', async (request, response) => {
  try {
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
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// List(All)
sweepstakesRouter.get('/', async (request, response) => {
  try {
    const sweepstakes = await getRepository(Sweepstake).find();
    return response.status(200).json(sweepstakes);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sweepstakesRouter;
