import User from '@/domain/entities/user.entity';
import IUserRepository from '@/domain/repositories/user-repository';
import { TYPES } from '@/infra/config/di/types';
import { inject, injectable } from 'inversify';
import CreateUserCommand from './create-user-command';
import DefaultCreateUserUseCase from './default-create-user.usecase';

@injectable()
export default class CreateUserUseCase implements DefaultCreateUserUseCase {
  @inject(TYPES.UserRepository)
  private readonly repository!: IUserRepository;

  async execute(command: CreateUserCommand): Promise<User> {
    const user: User = command.toEntity();
    return await this.repository.create(user);
  }
}
