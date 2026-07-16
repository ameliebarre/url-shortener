import express, { Request, Response } from 'express';

import { authenticationMiddleware } from '@/middlewares';
import { urlRouter, userRouter } from '@/routes';

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(authenticationMiddleware);

app.get('/', (req: Request, res: Response) => {
  return res.json({ status: 'Server is up and running' });
});

app.use('/auth', userRouter);
app.use(urlRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
