import User from '@/domain/entities/user.entity';
import IUserRepository from '../user-repository';
import UserID from '@/domain/value-objects/user-id.vo';
import UpdateUserCommand from '@/application/usecases/user/update/update-user-command';

export default class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(input: User): Promise<User> {
    this.users.push(input);
    return input;
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async find(id: UserID): Promise<User> {
    const user = this.users.find((user) => user.getId().equals(id));
    if (!user) throw new Error('User not found');
    return user;
  }

  async delete(id: UserID): Promise<void> {
    this.users = this.users.filter((user) => !user.getId().equals(id));
  }

  async update(userCommand: UpdateUserCommand, userID: UserID): Promise<User> {
    const user = await this.find(userID);
    Object.assign(user, userCommand);
    return user;
  }

  async findByEmailOrThrow(email: string): Promise<User> {
    const user = this.users.find(
      (user) => user.getEmail().getValue() === email,
    );
    if (!user) throw new Error('User not found');
    return user;
  }
}
