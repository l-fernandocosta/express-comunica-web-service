import User from '@/domain/entities/user.entity';
import UserNotFoundException from '@/domain/exceptions/user-not-found.exception';
import IUserRepository from '@/domain/repositories/user-repository';
import UserID from '@/domain/value-objects/user-id.vo';
import { TYPES } from '@/infra/config/di/types';
import { inject, injectable } from 'inversify';
import DefaultFindUserUseCase from './default-find-user-usecase';

@injectable()
export default class FindUserUseCase implements DefaultFindUserUseCase {
  @inject(TYPES.UserRepository)
  private readonly repository!: IUserRepository;

  async execute(anId: UserID): Promise<User> {
    const user = await this.repository.find(anId);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
