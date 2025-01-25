import User from '@/domain/entities/user.entity';
import IUserRepository from '@/domain/repositories/user-repository';
import { TYPES } from '@/infra/config/di/types';
import { inject, injectable } from 'inversify';
import DefaultListUsersUseCase from './default-list-users.usecase';

@injectable()
export default class ListUsersUseCase implements DefaultListUsersUseCase {
  @inject(TYPES.UserRepository)
  private readonly repository!: IUserRepository;

  async execute(): Promise<User[]> {
    const users = await this.repository.list();
    return users;
  }
}
