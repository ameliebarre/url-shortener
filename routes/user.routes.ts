import express, { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { randomBytes, createHmac } from 'crypto';
import { db } from '../db';
import { usersTable } from '../models';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;

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
      email,
      firstname,
      lastname,
      salt,
      password: hashedPassword,
    })
    .returning({ id: usersTable.id });

  return res.status(201).json({ data: { userId: user.id } });
});

export default router;
