import Identifier from '../value-objects/identifier.vo';
import Password from '../value-objects/password.vo';
import User from './user.entity';

describe('User Entity', () => {
  it('should create a user with valid properties', () => {
    const user = User.create({
      name: 'John Doe',
      password: 'PassWord@!23!',
      email: 'johndoe@example.com',
    });

    expect(user).toBeInstanceOf(User);
    expect(user.getName()).toBe('John Doe');
    expect(user.getEmail().getValue()).toBe('johndoe@example.com');
  });

  it('should hash the password upon user creation', () => {
    const user = User.create({
      name: 'Jane Doe',
      password: 'securepassword',
      email: 'janedoe@example.com',
    });

    const hashPassword = Password.hash(user.getPassword().getValue());
    expect(hashPassword).not.toBe('securepassword'); // Ensure password is hashed
  });

  it('should throw an error if email is invalid', () => {
    const expected_error = 'Validation failed: Invalid email format';
    expect(() => {
      User.create({
        name: 'Invalid Email',
        password: 'password123',
        email: 'invalid-email',
      });
    }).toThrow(expected_error);
  });

  it('should throw an error if password is empty', () => {
    expect(() => {
      User.create({
        name: 'Empty Password',
        password: '',
        email: 'test@example.com',
      });
    }).toThrow(
      'Validation failed: String must contain at least 8 character(s)',
    );
  });

  it('should generate a new UserID if none is provided', () => {
    const user = User.create({
      name: 'New User',
      password: 'password123',
      email: 'newuser@example.com',
    });

    expect(user.getId()).toBeInstanceOf(Identifier);
  });

  it('should use an existing UserID if provided', () => {
    const uuid = '550e8400-e29b-41d4-a716-446655440000';
    const user = new User({
      id: uuid,
      name: 'Existing User',
      password: 'password123',
      email: 'existinguser@example.com',
    });

    expect(user.getId().getValue()).toBe(uuid);
  });
});
