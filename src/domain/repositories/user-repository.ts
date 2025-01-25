import UpdateUserCommand from '@/application/usecases/user/update/update-user-command';
import User from '../entities/user.entity';
import UserID from '../value-objects/user-id.vo';

export default interface IUserRepository {
  create(input: User): Promise<User>;
  list(): Promise<Array<User>>;
  find(id: UserID): Promise<User>;
  delete(id: UserID): Promise<void>;
  update(user: UpdateUserCommand, userID: UserID): Promise<User>;
  findByEmailOrThrow(email: string): Promise<User>;
}
