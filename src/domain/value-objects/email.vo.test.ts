import DomainException from '../exceptions/domain.exception';
import Email from './email.vo';

describe('Email Value Object', () => {
  it('should create an Email instance for a valid email', () => {
    const validEmail = 'test@example.com';
    const email = Email.fromString(validEmail);

    expect(email).toBeInstanceOf(Email);
    expect(email.getValue()).toBe(validEmail);
  });

  it('should throw DomainException if email is null or undefined', () => {
    const invalid_null_email = null as unknown as string;
    const invalid_undefined_email = null as unknown as string;

    expect(() => {
      new Email(invalid_null_email);
    }).toThrow(DomainException);

    expect(() => {
      new Email(invalid_undefined_email);
    }).toThrow(DomainException);
  });

  it('should validate a correct email format', () => {
    const validEmail = 'user@example.com';
    expect(Email.isValid(validEmail)).toBe(true);
  });

  it('should invalidate an incorrect email format', () => {
    const invalidEmail = 'not-an-email';
    expect(Email.isValid(invalidEmail)).toBe(false);
  });

  it('should throw DomainException for invalid email in fromString method', () => {
    const invalidEmail = 'invalid-email';
    expect(() => {
      Email.fromString(invalidEmail);
    }).toThrow(DomainException);
  });

  it('should support equality checks with other Email objects', () => {
    const email1 = Email.fromString('test@example.com');
    const email2 = Email.fromString('test@example.com');
    const email3 = Email.fromString('different@example.com');

    expect(email1.equals(email2)).toBe(true);
    expect(email1.equals(email3)).toBe(false);
  });
});
