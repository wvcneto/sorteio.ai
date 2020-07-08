import { getRepository } from 'typeorm';

import Sweepstake from '../models/Sweepstake';

interface Request {
  title: string;
  description: string;
  type: string;
  award: string;
  award_image: string;
  date: Date;
  owner: string;
  participants: string;
}

class CreateSweepstakeService {
  public async execute({
    title,
    description,
    type,
    award,
    award_image,
    date,
    owner,
    participants,
  }: Request): Promise<Sweepstake> {
    const sweepstakesRepository = getRepository(Sweepstake);

    const sweepstake = sweepstakesRepository.create({
      title,
      description,
      type,
      award,
      award_image,
      date,
      owner,
      participants,
    });

    await sweepstakesRepository.save(sweepstake);

    return sweepstake;
  }
}

export default CreateSweepstakeService;
