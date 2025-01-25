import UserNotFoundException from '@/domain/exceptions/user-not-found.exception';
import IUserRepository from '@/domain/repositories/user-repository';
import UserID from '@/domain/value-objects/user-id.vo';
import { TYPES } from '@/infra/config/di/types';
import { inject, injectable } from 'inversify';
import DefaultDeleteUserUseCase from './default-delete-user.usecase';

@injectable()
export default class DeleteUserUseCase implements DefaultDeleteUserUseCase {
  @inject(TYPES.UserRepository)
  private readonly repository!: IUserRepository;

  async execute(anId: UserID): Promise<void> {
    const user = await this.repository.find(anId);

    if (!user) {
      throw new UserNotFoundException();
    }

    return this.repository.delete(anId);
  }
}
