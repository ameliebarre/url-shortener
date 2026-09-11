import express, { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { ensureAuthenticated } from '@/middlewares';
import { usersTable } from '@/models';
import {
  consumeRefreshToken,
  createRefreshToken,
  getUserByEmail,
  getUserById,
  insertUser,
  revokeAllRefreshTokensForUser,
  revokeToken,
} from '@/services';
import {
  asyncHandler,
  createUserToken,
  errorBody,
  hashPassword,
  validationErrorBody,
  verifyPassword,
} from '@/utils';
import {
  signupPostRequestBodySchema,
  loginPostRequestBodySchema,
  refreshRequestBodySchema,
} from '@/validation';

const router = express.Router();

type SignupBody = Pick<
  typeof usersTable.$inferInsert,
  'firstname' | 'lastname' | 'email' | 'password'
>;

type LoginBody = Pick<typeof usersTable.$inferInsert, 'email' | 'password'>;

router.post(
  '/signup',
  asyncHandler(
    async (
      req: Request<ParamsDictionary, unknown, SignupBody>,
      res: Response,
    ) => {
      const validationResult =
        await signupPostRequestBodySchema.safeParseAsync(req.body);

      if (validationResult.error) {
        return res
          .status(400)
          .json(validationErrorBody(validationResult.error));
      }

      const { firstname, lastname, email, password } = validationResult.data;

      const existingUser = await getUserByEmail(email);

      if (existingUser)
        return res
          .status(400)
          .json(errorBody(`User with email ${email} already exists.`));

      const hashedPassword = await hashPassword(password);

      const user = await insertUser(
        firstname,
        lastname,
        email,
        hashedPassword,
      );

      return res.status(201).json({ data: { userId: user.id } });
    },
  ),
);

router.post(
  '/login',
  asyncHandler(
    async (
      req: Request<ParamsDictionary, unknown, LoginBody>,
      res: Response,
    ) => {
      const validationResult =
        await loginPostRequestBodySchema.safeParseAsync(req.body);

      if (validationResult.error) {
        return res
          .status(400)
          .json(validationErrorBody(validationResult.error));
      }

      const { email, password } = validationResult.data;

      const user = await getUserByEmail(email);

      if (!user) {
        return res
          .status(404)
          .json(errorBody(`User with email ${email} does not exist.`));
      }

      const isPasswordValid = await verifyPassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json(errorBody('Invalid password.'));
      }

      const token = await createUserToken({ id: user.id });
      const refreshToken = await createRefreshToken(user.id);

      return res.json({ token, refreshToken: refreshToken.id });
    },
  ),
);

router.post(
  '/refresh',
  asyncHandler(async (req: Request, res: Response) => {
    const validationResult =
      await refreshRequestBodySchema.safeParseAsync(req.body);

    if (validationResult.error) {
      return res
        .status(400)
        .json(validationErrorBody(validationResult.error));
    }

    const { refreshToken } = validationResult.data;

    const consumed = await consumeRefreshToken(refreshToken);

    if (!consumed) {
      return res
        .status(401)
        .json(errorBody('Invalid or expired refresh token.'));
    }

    const token = await createUserToken({ id: consumed.userId });
    const newRefreshToken = await createRefreshToken(consumed.userId);

    return res.json({ token, refreshToken: newRefreshToken.id });
  }),
);

router.get(
  '/me',
  ensureAuthenticated,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await getUserById(req.user!.id);

    if (!user) {
      return res.status(404).json(errorBody('User not found'));
    }

    return res.json(user);
  }),
);

router.post(
  '/logout',
  ensureAuthenticated,
  asyncHandler(async (req: Request, res: Response) => {
    const { jti, exp, id } = req.user!;

    await revokeToken(jti, new Date(exp * 1000));
    await revokeAllRefreshTokensForUser(id);

    return res.status(200).json({ loggedOut: true });
  }),
);

export default router;
