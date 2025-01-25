import bcrypt from 'bcrypt';
import Password from './password.vo';

jest.mock('bcrypt');

describe('Password Value Object', () => {
  const rawPassword = 'ValidPass123!';
  const hashedPassword = 'hashed_password_mock';

  beforeEach(() => {
    jest.spyOn(bcrypt, 'hashSync').mockReturnValue(hashedPassword);

    jest
      .spyOn(bcrypt, 'compareSync')
      .mockImplementation(
        (raw, hash) => raw === rawPassword && hash === hashedPassword,
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a Password instance with a valid value', () => {
    const password = Password.create(rawPassword);

    expect(password).toBeInstanceOf(Password);
    expect(password.getValue()).toBe(rawPassword);
  });

  it('should throw an error for null or undefined passwords', () => {
    const invalid_null_password = undefined as unknown as string;
    const invalid_undefined_password = undefined as unknown as string;

    expect(() => {
      Password.create(invalid_undefined_password);
    }).toThrow('Password is required');

    expect(() => {
      Password.create(invalid_null_password);
    }).toThrow('Password is required');
  });

  it('should hash a password correctly', () => {
    const password = Password.hash(rawPassword);

    expect(password).toBeInstanceOf(Password);
    expect(password.getValue()).toBe(hashedPassword);
    expect(bcrypt.hashSync).toHaveBeenCalledWith(rawPassword, 10);
  });

  it('should verify a valid password against its hash', () => {
    const isValid = Password.verify(rawPassword, hashedPassword);

    expect(isValid).toBe(true);
    expect(bcrypt.compareSync).toHaveBeenCalledWith(
      rawPassword,
      hashedPassword,
    );
  });

  it('should fail verification for an invalid password', () => {
    const invalidPassword = 'WrongPass123!';
    const isValid = Password.verify(invalidPassword, hashedPassword);

    expect(isValid).toBe(false);
    expect(bcrypt.compareSync).toHaveBeenCalledWith(
      invalidPassword,
      hashedPassword,
    );
  });

  it('should validate a correct password format', () => {
    const validPassword = 'StrongPass@123!';
    expect(Password.isValid(validPassword)).toBe(true);
  });

  it('should invalidate an incorrect password format', () => {
    const invalidPassword = 'weakpass';
    expect(Password.isValid(invalidPassword)).toBe(false);
  });

  it('should return the raw password as a string', () => {
    const password = Password.create(rawPassword);
    expect(password.toString()).toBe(rawPassword);
  });
});
