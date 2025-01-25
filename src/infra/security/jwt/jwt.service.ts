import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

export type GenerateTokenPayload = {
  userid: string;
};

@injectable()
export default class JwtService {
  private readonly secret: string = process.env.TOKEN_SECRET ?? '';
  private static readonly EXPIRES_IN = '2h';

  public static generate(payload: GenerateTokenPayload): string {
    return jwt.sign(payload, process.env.TOKEN_SECRET ?? '', {
      expiresIn: JwtService.EXPIRES_IN,
    });
  }

  public static decode(token: string): GenerateTokenPayload {
    return jwt.verify(
      token,
      process.env.TOKEN_SECRET ?? '',
    ) as GenerateTokenPayload;
  }
}
