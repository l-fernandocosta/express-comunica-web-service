import { inject, injectable } from 'inversify';
import { TYPES } from '../config/di/types';

import IUserService from '@/application/services/user-service.interface';

// command
import CreateUserCommand from '@/application/usecases/user/create/create-user-command';
import UpdateUserCommand from '@/application/usecases/user/update/update-user-command';

import User from '@/domain/entities/user.entity';
import UserID from '@/domain/value-objects/user-id.vo';

// dto
import CreateUserDTO from '@/application/dto/user/create-user.dto';
import UpdateUserDTO from '@/application/dto/user/update-user.dto';

// usecases
import CreateUserUseCase from '@/application/usecases/user/create/create-user.usecase';
import DeleteUserUseCase from '@/application/usecases/user/delete/delete-user-usecase';
import FindUserUseCase from '@/application/usecases/user/retrieve/find/find-user.usecase';
import ListUsersUseCase from '@/application/usecases/user/retrieve/list/list-users.usecase';
import UpdateUserUseCase from '@/application/usecases/user/update/update-user.usecase';

@injectable()
export default class UserServiceImpl implements IUserService {
  private readonly find: FindUserUseCase;
  private readonly list: ListUsersUseCase;
  private readonly create: CreateUserUseCase;
  private readonly update: UpdateUserUseCase;
  private readonly remove: DeleteUserUseCase;

  constructor(
    @inject(TYPES.FindUserUseCase) find: FindUserUseCase,
    @inject(TYPES.ListUserUseCase) list: ListUsersUseCase,
    @inject(TYPES.CreateUserUseCase) create: CreateUserUseCase,
    @inject(TYPES.UpdateUserUseCase) update: UpdateUserUseCase,
    @inject(TYPES.DeleteUserUseCase) remove: DeleteUserUseCase,
  ) {
    this.find = find;
    this.list = list;
    this.create = create;
    this.update = update;
    this.remove = remove;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.findByEmail(email);
  }

  async getUser(id: string): Promise<User> {
    return await this.find.execute(UserID.fromString(id));
  }

  async createUser(user: CreateUserDTO): Promise<User> {
    const command = CreateUserCommand.fromDTO(user);
    return await this.create.execute(command);
  }

  async updateUser(user: UpdateUserDTO): Promise<void> {
    const command = UpdateUserCommand.fromDTO(user);
    return await this.update.execute(command);
  }

  async deleteUser(id: string): Promise<void> {
    return await this.remove.execute(UserID.fromString(id));
  }

  async listUsers(): Promise<User[]> {
    return await this.list.execute();
  }
}
