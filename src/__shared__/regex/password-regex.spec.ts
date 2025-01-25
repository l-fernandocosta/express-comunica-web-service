import { passwordRegex } from './password.regex';

describe('Password Validation', () => {
  it('should return true for valid passwords', () => {
    const validPasswords = [
      'Password1@', // 1 uppercase, 1 lowercase, 1 digit, 1 special character, 8 chars
      'Abc123$%', // 1 uppercase, 2 lowercase, 3 digits, 1 special character, 8 chars
      'Str0ngP@ssw0rd', // 1 uppercase, 1 lowercase, 2 digits, 1 special character, 12 chars
      'A1b@2C!d3$', // 1 uppercase, 2 lowercase, 3 digits, 2 special characters, 9 chars
    ];

    validPasswords.forEach((password) => {
      expect(passwordRegex.test(password)).toBe(true);
    });
  });

  it('should return false for invalid passwords', () => {
    const invalidPasswords = [
      'password', // No uppercase, no digit, no special character
      'PASSWORD123', // No lowercase, no special character
      '12345678', // No uppercase, no lowercase, no special character
      'Ab1$', // Too short (less than 8 characters)
      'NoSpecialChar123', // No special character
      'lowercase@1', // No uppercase
      'UPPERCASE@123', // No lowercase
    ];

    invalidPasswords.forEach((password) => {
      expect(passwordRegex.test(password)).toBe(false);
    });
  });
});
