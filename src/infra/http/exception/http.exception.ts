export type CustomErrorContent = {
  message: string;
  context?: { [key: string]: unknown };
};

export abstract class CustomError extends Error {
  abstract readonly logging: boolean;
  abstract readonly statusCode: number;
  abstract readonly errors: CustomErrorContent[];

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
