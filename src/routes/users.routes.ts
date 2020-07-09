import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

// Create
usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.status(201).json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// List(all)
usersRouter.get('/', async (request, response) => {
  try {
    const users = await getRepository(User).find();

    // eslint-disable-next-line no-param-reassign
    users.map(user => delete user.password);

    return response.status(200).json(users);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
