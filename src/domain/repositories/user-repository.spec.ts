import { randomUUID } from 'crypto';
import User from '../entities/user.entity';
import UserID from '../value-objects/user-id.vo';
import MockUserRepository from './in-memory/user-in-memory.repository';
import UpdateUserCommand from '@/application/usecases/user/update/update-user-command';
describe('MockUserRepository', () => {
  let sampleUser: User;
  const id = randomUUID();
  let repository: MockUserRepository;

  beforeEach(() => {
    repository = new MockUserRepository();
    sampleUser = User.create({
      id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'PassWord@!23!',
    });
  });

  it('should create a new user', async () => {
    const createdUser = await repository.create(sampleUser);
    expect(createdUser).toEqual(sampleUser);
  });

  it('should list all users', async () => {
    await repository.create(sampleUser);
    const users = await repository.list();
    expect(users).toHaveLength(1);
    expect(users[0]).toEqual(sampleUser);
  });

  it('should find a user by ID', async () => {
    await repository.create(sampleUser);
    const user = await repository.find(UserID.fromString(id));
    expect(user).toEqual(sampleUser);
  });

  it('should throw an error if user is not found by ID', async () => {
    await expect(
      repository.find(UserID.fromString(randomUUID())),
    ).rejects.toThrow('User not found');
  });

  it('should delete a user by ID', async () => {
    await repository.create(sampleUser);
    await repository.delete(UserID.fromString(id));
    const users = await repository.list();
    expect(users).toHaveLength(0);
  });

  it('should update a user', async () => {
    await repository.create(sampleUser);
    const updateCommand = new UpdateUserCommand(
      id,
      'Updated',
      'newemail@gmail.com',
    );
    const updatedUser = await repository.update(
      updateCommand,
      UserID.fromString(id),
    );

    expect(updatedUser.getName()).toBe('Updated');
  });

  it('should find a user by email', async () => {
    await repository.create(sampleUser);
    const user = await repository.findByEmailOrThrow('john.doe@example.com');
    expect(user).toEqual(sampleUser);
  });

  it('should throw an error if user is not found by email', async () => {
    await expect(
      repository.findByEmailOrThrow('notfound@example.com'),
    ).rejects.toThrow('User not found');
  });
});
