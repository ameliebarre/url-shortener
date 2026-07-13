import { z } from 'zod';

export const userTokenSchema = z.object({
  id: z.string(),
});

export type UserTokenPayload = z.infer<typeof userTokenSchema>;
