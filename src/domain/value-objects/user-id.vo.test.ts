import DomainException from '../exceptions/domain.exception';
import Identifier from './identifier.vo';
import UserID from './user-id.vo';

describe('UserID Value Object', () => {
  it('should create a UserID instance with a valid UUID', () => {
    const validUUID = '550e8400-e29b-41d4-a716-446655440000';
    const userID = new UserID(validUUID);

    expect(userID).toBeInstanceOf(Identifier);
    expect(userID.getValue()).toBe(validUUID);
  });

  it('should throw DomainException for null or undefined value', () => {
    const invalid_null_id = null as unknown as string;
    const invalid_undefined_id = undefined as unknown as string;

    expect(() => {
      new UserID(invalid_null_id);
    }).toThrow(DomainException);

    expect(() => {
      new UserID(invalid_undefined_id);
    }).toThrow(DomainException);
  });

  it('should throw DomainException for an invalid UUID', () => {
    const invalidUUID = 'not-a-valid-uuid';
    expect(() => {
      new UserID(invalidUUID);
    }).toThrow(DomainException);
  });

  it('should create a UserID using Identifier.create()', () => {
    const userID = UserID.create();

    expect(userID).toBeInstanceOf(Identifier);
    expect(UserID.isValid(userID.getValue())).toBe(true);
  });

  it('should support equality checks with other UserID objects', () => {
    const uuid = '550e8400-e29b-41d4-a716-446655440000';
    const userID1 = new UserID(uuid);
    const userID2 = new UserID(uuid);
    const userID3 = new UserID('123e4567-e89b-12d3-a456-426614174000');

    expect(userID1.equals(userID2)).toBe(true);
    expect(userID1.equals(userID3)).toBe(false);
  });
});
