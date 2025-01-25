import { v4 } from 'uuid';

import Regex from '@/__shared__/regex';
import ValueObject from './value-object';
import DomainException from '../exceptions/domain.exception';
import UserID from './user-id.vo';

export default class Identifier extends ValueObject<string> {
  constructor(value: string) {
    if (!value) {
      throw new DomainException({
        message: 'Identifier cannot be null or undefined',
      });
    }

    super(value);
  }

  public static create(): UserID {
    return Identifier.fromString(v4());
  }

  public static fromString(value: string): UserID {
    const isIDValid = Identifier.isValid(value);

    if (!isIDValid) {
      throw new DomainException({
        message: 'Identifier cannot be null or undefined',
      });
    }

    return new Identifier(value);
  }

  public static isValid(value: string): boolean {
    return Regex.UUID.test(value);
  }

  public toString(): string {
    return this.value;
  }
}
