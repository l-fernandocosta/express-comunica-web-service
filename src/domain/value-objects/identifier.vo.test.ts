import DomainException from '../exceptions/domain.exception';
import Identifier from './identifier.vo';

describe('Identifier Value Object', () => {
  it('should create a valid Identifier instance', () => {
    const validUUID = '550e8400-e29b-41d4-a716-446655440000';
    const identifier = Identifier.fromString(validUUID);

    expect(identifier).toBeInstanceOf(Identifier);
    expect(identifier.getValue()).toBe(validUUID);
  });

  it('should throw DomainException for null or undefined values', () => {
    const invalid_null_id = null as unknown as string;
    const invalid_undefined_id = undefined as unknown as string;

    expect(() => {
      new Identifier(invalid_null_id);
    }).toThrow(DomainException);

    expect(() => {
      new Identifier(invalid_undefined_id);
    }).toThrow(DomainException);
  });

  it('should validate a correct UUID', () => {
    const validUUID = '550e8400-e29b-41d4-a716-446655440000';
    expect(Identifier.isValid(validUUID)).toBe(true);
  });

  it('should invalidate an incorrect UUID', () => {
    const invalidUUID = 'not-a-valid-uuid';
    expect(Identifier.isValid(invalidUUID)).toBe(false);
  });

  it('should throw DomainException for invalid UUID in fromString', () => {
    const invalidUUID = 'invalid-uuid';
    expect(() => {
      Identifier.fromString(invalidUUID);
    }).toThrow(DomainException);
  });

  it('should create a new Identifier instance with a valid UUID when using create()', () => {
    const identifier = Identifier.create();

    expect(identifier).toBeInstanceOf(Identifier);
    expect(Identifier.isValid(identifier.getValue())).toBe(true);
  });

  it('should support equality checks with other Identifier objects', () => {
    const uuid = '550e8400-e29b-41d4-a716-446655440000';
    const identifier1 = Identifier.fromString(uuid);
    const identifier2 = Identifier.fromString(uuid);
    const identifier3 = Identifier.fromString('123e4567-e89b-12d3-a456-426614174000');

    expect(identifier1.equals(identifier2)).toBe(true);
    expect(identifier1.equals(identifier3)).toBe(false);
  });
});
