import { TYPES } from './types';
import { Container } from 'inversify';

import IUserRepository from '@/domain/repositories/user-repository';
import PrismaUserRepositoryImpl from '@/infra/persistence/repository/prisma-user-repository.impl';

// impl
import CreateUserUseCase from '@/application/usecases/user/create/create-user.usecase';
import UpdateUserUseCase from '@/application/usecases/user/update/update-user.usecase';
import DeleteUserUseCase from '@/application/usecases/user/delete/delete-user-usecase';
import FindUserUseCase from '@/application/usecases/user/retrieve/find/find-user.usecase';
import ListUsersUseCase from '@/application/usecases/user/retrieve/list/list-users.usecase';

// abstraction
import DefaultCreateUserUseCase from '@/application/usecases/user/create/default-create-user.usecase';
import DefaultUpdateUserUseCase from '@/application/usecases/user/update/default-update-user.usecase';
import DefaultDeleteUserUseCase from '@/application/usecases/user/delete/default-delete-user.usecase';
import DefaultListUsersUseCase from '@/application/usecases/user/retrieve/list/default-list-users.usecase';
import DefaultFindUserUseCase from '@/application/usecases/user/retrieve/find/default-find-user-usecase';

// service
import IUserService from '@/application/services/user-service.interface';
import UserServiceImpl from '@/infra/services/user-service.impl';
import UserController from '@/infra/http/controllers/user.controller';
import AuthController from '@/infra/http/controllers/auth.controller';

const container = new Container();

container
  .bind<IUserRepository>(TYPES.UserRepository)
  .to(PrismaUserRepositoryImpl);

container
  .bind<DefaultCreateUserUseCase>(TYPES.CreateUserUseCase)
  .to(CreateUserUseCase);

container
  .bind<DefaultUpdateUserUseCase>(TYPES.UpdateUserUseCase)
  .to(UpdateUserUseCase);

container
  .bind<DefaultListUsersUseCase>(TYPES.ListUserUseCase)
  .to(ListUsersUseCase);

container
  .bind<DefaultFindUserUseCase>(TYPES.FindUserUseCase)
  .to(FindUserUseCase);

container
  .bind<DefaultDeleteUserUseCase>(TYPES.DeleteUserUseCase)
  .to(DeleteUserUseCase);

container.bind<UserController>(TYPES.UserController).to(UserController);

container.bind<IUserService>(TYPES.UserService).to(UserServiceImpl);

container.bind<AuthController>(TYPES.AuthController).to(AuthController);

export default container;
