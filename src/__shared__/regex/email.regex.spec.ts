import { emailRegex } from './email.regex';

describe('Email Validation', () => {
  it('should return true for valid emails', () => {
    const validEmails = [
      'user@example.com',
      'user.name@domain.co',
      'first.last@sub.domain.com',
      'email@domain.org',
      'test123@domain.co.uk',
    ];

    validEmails.forEach((email) => {
      expect(emailRegex.test(email)).toBe(true);
    });
  });
});
