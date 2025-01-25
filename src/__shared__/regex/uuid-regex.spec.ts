import { UUIDRegex } from './uuid.regex';

describe('UUID Validation', () => {
  it('should return true for valid UUIDs', () => {
    const validUUIDs = [
      '123e4567-e89b-12d3-a456-426614174000',
      'a1b2c3d4-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174000',
    ];

    validUUIDs.forEach((uuid) => {
      expect(UUIDRegex.test(uuid)).toBe(true);
    });
  });

  it('should return false for invalid UUIDs', () => {
    const invalidUUIDs = [
      '123e4567-e89b-12d3-a456-42661417400', // Missing 1 character at the end
      '123e4567-e89b-12d3-a456-42661417G000', // Contains an invalid character 'G'
      '123e4567-e89b-12d3-a456-4266141740000', // Too many characters
      '123e4567e89b12d3a456426614174000', // Missing hyphens
      'abcdefg-hijklmnop-1234567890abcdef', // Invalid UUID structure
      '12345678-1234-1234-1234-1234567890123', // Too many characters in the final group
    ];

    invalidUUIDs.forEach((uuid) => {
      expect(UUIDRegex.test(uuid)).toBe(false);
    });
  });
});
