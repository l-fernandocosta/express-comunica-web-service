import ValueObject from './value-object';
import Regex from '@/__shared__/regex';
import DomainException from '../exceptions/domain.exception';

export default class Email extends ValueObject<string> {
  constructor(value: string) {
    if (!value) {
      throw new DomainException({
        message: 'Email cannot be null or undefined',
      });
    }
    super(value);
  }

  static isValid(email: string): boolean {
    return Regex.Email.test(email);
  }

  static fromString(email: string): Email {
    const isEmailValid = Email.isValid(email);

    if (!isEmailValid) {
      throw new DomainException({ message: 'Email is not valid' });
    }

    return new Email(email);
  }

  public toString(): string {
    return this.value;
  }
}
