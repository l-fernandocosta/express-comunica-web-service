import logger from '@/__shared__/utils/logger';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../exception/http.exception';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    if (err.logging) {
      const error_message = JSON.stringify(
        {
          code: err.statusCode,
          errors: err.errors,
          stack: err.stack,
        },
        null,
        2,
      );

      logger.error(error_message);
    }

    res
      .status(err.statusCode)
      .json({ err, message: err.message, timestamp: Date.now() })
      .send();
  } else {
    logger.error(JSON.stringify(err, null, 2));
    res
      .status(500)
      .json({
        errors: [{ message: 'Something went wrong' }],
        timestamp: Date.now(),
      })
      .send();
  }
};
