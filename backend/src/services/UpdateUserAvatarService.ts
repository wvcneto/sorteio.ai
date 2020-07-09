import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import uploadConfig from '../config/upload.config';
import User from '../models/User';

interface RequestDTO {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvataService {
  public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {
    try {
      const usersRepository = getRepository(User);

      const user = await usersRepository.findOne(user_id);

      if (!user) {
        throw new AppError('Only authenticated users can change avatar.', 401);
      }

      if (user.avatar) {
        // Excluir avatar anterior
        const userAvatarFilePath = path.join(
          uploadConfig.directory,
          user.avatar,
        );

        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

        if (userAvatarFileExists) {
          await fs.promises.unlink(userAvatarFilePath);
        }
      }

      user.avatar = avatarFileName;

      await usersRepository.save(user);

      return user;
    } catch {
      throw new AppError('User does not updated.');
    }
  }
}

export default UpdateUserAvataService;
