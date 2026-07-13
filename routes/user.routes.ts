import express, { Request, Response } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { usersTable } from '../models';
import { hashPasswordWithSalt } from '../utils/hash';
import { getUserByEmail, insertUser } from '../services/user.service';
import {
  signupPostRequestBodySchema,
  loginPostRequestBodySchema,
} from '../validation/request.validation';

const router = express.Router();

type SignupBody = Pick<
  typeof usersTable.$inferInsert,
  'firstname' | 'lastname' | 'email' | 'password'
>;

type LoginBody = Pick<typeof usersTable.$inferInsert, 'email' | 'password'>;

router.post(
  '/signup',
  async (req: Request<{}, {}, SignupBody>, res: Response) => {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(
      req.body,
    );

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: z.flattenError(validationResult.error) });
    }

    const { firstname, lastname, email, password } = validationResult.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser)
      return res
        .status(400)
        .json({ error: `User with email ${email} already exists.` });

    const { salt, password: hashedPassword } = hashPasswordWithSalt(password);

    const user = await insertUser(
      firstname,
      lastname,
      email,
      hashedPassword,
      salt,
    );

    return res.status(201).json({ data: { userId: user.id } });
  },
);

router.post(
  '/login',
  async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(
      req.body,
    );

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: z.flattenError(validationResult.error) });
    }

    const { email, password } = validationResult.data;

    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(404)
        .json({ error: `User with email ${email} does not exist.` });
    }

    const { password: hashedPassword } = hashPasswordWithSalt(
      password,
      user.salt,
    );

    if (user.password !== hashedPassword) {
      return res.status(400).json({ error: `Invalid password.` });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign({ id: user.id }, jwtSecret);

    return res.json({ token });
  },
);

export default router;
