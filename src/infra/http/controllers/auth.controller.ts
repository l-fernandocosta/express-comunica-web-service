import UserNotFoundException from '@/domain/exceptions/user-not-found.exception';
import Password from '@/domain/value-objects/password.vo';
import { prisma } from '@/infra/persistence/prisma/prisma-client';
import JwtService from '@/infra/security/jwt/jwt.service';
import express from 'express';
import {
  BaseHttpController,
  controller,
  httpPost,
  request,
} from 'inversify-express-utils';

@controller('/auth')
export default class AuthController extends BaseHttpController {
  @httpPost('/login')
  public async login(@request() request: express.Request) {
    const user = await prisma.user.findUnique({
      where: {
        email: request.body.email,
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordOK = Password.verify(request.body.password, user.password);

    if (!isPasswordOK) {
      return this.json({ error: 'INVALID_PASSWORD' }, 401);
    }

    const token = JwtService.generate({ userid: user.id });

    return this.json({ token, userId: user.id });
  }
}
