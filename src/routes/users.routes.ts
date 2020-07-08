import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (request, response) => {
  return response.status(200).json({ message: 'Hello Users!' });
});

export default usersRouter;
