import express, { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { randomBytes, createHmac } from 'crypto';
import { z } from 'zod';
import { db } from '../db';
import { usersTable } from '../models';
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

    const [existingUser] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser)
      return res
        .status(400)
        .json({ error: `User with email ${email} already exists.` });

    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
      .update(password)
      .digest('hex');

    const [user] = await db
      .insert(usersTable)
      .values({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: usersTable.id });

    return res.status(201).json({ data: { userId: user.id } });
  },
);

export default router;
