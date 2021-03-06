import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';

import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload.config';

const usersRouter = Router();

// upload
const upload = multer(uploadConfig);

// Create
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.status(201).json(user);
});

// List(all)
usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const users = await getRepository(User).find();

  // eslint-disable-next-line no-param-reassign
  users.map(user => delete user.password);

  return response.status(200).json(users);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.status(200).json(user);
  },
);

export default usersRouter;
