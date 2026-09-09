import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { usersTable } from '@/models';

export async function getUserByEmail(email: string) {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      firstname: usersTable.firstname,
      lastname: usersTable.lastname,
      email: usersTable.email,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return existingUser;
}

export async function insertUser(
  firstname: string,
  lastname: string,
  email: string,
  password: string,
) {
  const [user] = await db
    .insert(usersTable)
    .values({
      firstname,
      lastname,
      email,
      password,
    })
    .returning({ id: usersTable.id });

  return user;
}
