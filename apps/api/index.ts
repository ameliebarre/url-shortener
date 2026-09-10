import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';

import { env } from '@/env';
import {
  authenticationMiddleware,
  authRateLimiter,
  errorMiddleware,
} from '@/middlewares';
import { urlRouter, userRouter } from '@/routes';
import { asyncHandler } from '@/utils';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL }));
app.use(express.json());
app.use(asyncHandler(authenticationMiddleware));

app.get('/', (req: Request, res: Response) => {
  return res.json({ status: 'Server is up and running' });
});

app.use('/auth', authRateLimiter, userRouter);
app.use(urlRouter);

app.use(errorMiddleware);

app.listen(env.PORT, () =>
  console.log(`Server is running on port ${env.PORT}`),
);
