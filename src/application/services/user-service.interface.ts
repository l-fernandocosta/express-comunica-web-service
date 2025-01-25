import User from '@/domain/entities/user.entity';
import CreateUserDTO from '../dto/user/create-user.dto';

export default interface IUserService {
  listUsers(): Promise<User[]>;
  getUser(id: string): Promise<User>;
  deleteUser(id: string): Promise<void>;
  createUser(user: CreateUserDTO): Promise<User>;
  updateUser(user: Partial<CreateUserDTO>): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
