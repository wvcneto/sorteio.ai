import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    try {
      const usersRepository = getRepository(User);

      const checkUserExists = await usersRepository.findOne({
        where: { email },
      });

      if (checkUserExists) {
        throw new AppError('Email adress aleready used.');
      }

      const hashedPassword = await hash(password, 8);

      const user = usersRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      await usersRepository.save(user);

      return user;
    } catch {
      throw new AppError('User does not created.');
    }
  }
}

export default CreateUserService;
