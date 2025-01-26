import logger from '@/__shared__/utils/logger';
import UnauthorizedException from '@/domain/exceptions/unauthorized-exception';
import JwtService from '@/infra/security/jwt/jwt.service';
import { NextFunction, Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new UnauthorizedException();
  } else {
    try {
      const decoded = JwtService.decode(token);
      req.user = { id: decoded.userid };
      next();
    } catch (err) {
      logger.error(err);
      throw new UnauthorizedException();
    }
  }
};
