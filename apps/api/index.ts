import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';

import {
  authenticationMiddleware,
  authRateLimiter,
  errorMiddleware,
} from '@/middlewares';
import { urlRouter, userRouter } from '@/routes';

const app = express();
const PORT = process.env.PORT ?? 8000;
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';

app.use(helmet());
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());
app.use(authenticationMiddleware);

app.get('/', (req: Request, res: Response) => {
  return res.json({ status: 'Server is up and running' });
});

app.use('/auth', authRateLimiter, userRouter);
app.use(urlRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
