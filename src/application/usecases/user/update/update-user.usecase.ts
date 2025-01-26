import User from '@/domain/entities/user.entity';
import UserNotFoundException from '@/domain/exceptions/user-not-found.exception';
import IUserRepository from '@/domain/repositories/user-repository';
import UserID from '@/domain/value-objects/user-id.vo';
import { TYPES } from '@/infra/config/di/types';
import { inject, injectable } from 'inversify';
import DefaultUpdateUserUseCase from './default-update-user.usecase';
import UpdateUserCommand from './update-user-command';

@injectable()
export default class UpdateUserUseCase implements DefaultUpdateUserUseCase {
  @inject(TYPES.UserRepository)
  private readonly repository!: IUserRepository;

  async execute(command: UpdateUserCommand): Promise<void> {
    User.update({
      email: command.getEmail(),
      name: command.getName(),
    });

    const foundUser = await this.repository.find(
      UserID.fromString(command.getId()),
    );

    if (!foundUser) {
      throw new UserNotFoundException({
        logging: true,
      });
    }

    await this.repository.update(command, UserID.fromString(command.getId()));
  }
}
