import Regex from '@/__shared__/regex';
import ValueObject from './value-object';

import { compareSync, hashSync } from 'bcrypt';
import { isEmpty } from 'lodash';
import DomainException from '../exceptions/domain.exception';

export default class Password extends ValueObject<string> {
  constructor(value: string) {
    if (!value || value == '') {
      throw new DomainException({
        message: 'Password is required',
      });
    }

    super(value);
  }

  static isValid(password: string): boolean {
    return Regex.Password.test(password);
  }

  static create(value: string): Password {
    return new Password(value);
  }

  static hash(value: string): Password {
    if (!value || isEmpty(value)) {
      throw new DomainException();
    }
    return Password.create(hashSync(value, 10));
  }

  static verify(rawPassword: string, hashedPassword: string): boolean {
    return compareSync(rawPassword, hashedPassword);
  }

  toString(): string {
    return this.value;
  }
}
