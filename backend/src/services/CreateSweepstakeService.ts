import { getRepository } from 'typeorm';

import Sweepstake from '../models/Sweepstake';

import AppError from '../errors/AppError';

interface RequestDTO {
  title: string;
  description: string;
  type: string;
  award: string;
  award_image: string;
  date: Date;
  owner_id: string;
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
    owner_id,
    participants,
  }: RequestDTO): Promise<Sweepstake> {
    try {
      const sweepstakesRepository = getRepository(Sweepstake);

      const sweepstake = sweepstakesRepository.create({
        title,
        description,
        type,
        award,
        award_image,
        date,
        owner_id,
        participants,
      });

      await sweepstakesRepository.save(sweepstake);

      return sweepstake;
    } catch {
      throw new AppError('Sweepstake does not created.');
    }
  }
}

export default CreateSweepstakeService;
