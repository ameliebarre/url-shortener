import express, { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../db';
import { usersTable } from '../models';
import { hashPasswordWithSalt } from '../utils/hash';
import { getUserByEmail, insertUser } from '../services/user.service';
import { signupPostRequestBodySchema } from '../validation/request.validation';

const router = express.Router();

type SignupBody = Pick<
  typeof usersTable.$inferInsert,
  'firstname' | 'lastname' | 'email' | 'password'
>;

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

export default router;
