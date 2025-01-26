import { Container } from 'inversify';
import { TYPES } from './types';

import IUserRepository from '@/domain/repositories/user-repository';
import PrismaUserRepositoryImpl from '@/infra/persistence/repository/prisma-user-repository.impl';

// impl
import CreateUserUseCase from '@/application/usecases/user/create/create-user.usecase';
import DeleteUserUseCase from '@/application/usecases/user/delete/delete-user-usecase';
import FindUserUseCase from '@/application/usecases/user/retrieve/find/find-user.usecase';
import ListUsersUseCase from '@/application/usecases/user/retrieve/list/list-users.usecase';
import UpdateUserUseCase from '@/application/usecases/user/update/update-user.usecase';

// abstraction
import DefaultCreateUserUseCase from '@/application/usecases/user/create/default-create-user.usecase';
import DefaultDeleteUserUseCase from '@/application/usecases/user/delete/default-delete-user.usecase';
import DefaultFindUserUseCase from '@/application/usecases/user/retrieve/find/default-find-user-usecase';
import DefaultListUsersUseCase from '@/application/usecases/user/retrieve/list/default-list-users.usecase';
import DefaultUpdateUserUseCase from '@/application/usecases/user/update/default-update-user.usecase';

// service
import { HttpClient } from '@/__shared__/external/http/http-client';
import SwapiGateway from '@/__shared__/external/swapi/gateway/swapi-gateway.impl';
import FetchPersonUseCase from '@/__shared__/external/swapi/usecases/fetch-person.usecase';
import IUserService from '@/application/services/user-service.interface';
import AuthController from '@/infra/http/controllers/auth.controller';
import UserController from '@/infra/http/controllers/user.controller';
import UserServiceImpl from '@/infra/services/user-service.impl';
import SwapiController from '@/infra/http/controllers/swapi.controller';

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

container.bind<SwapiController>(TYPES.SwapiController).to(SwapiController);

container.bind<IUserService>(TYPES.UserService).to(UserServiceImpl);

container.bind<AuthController>(TYPES.AuthController).to(AuthController);

// SWAPI
container.bind<HttpClient>(TYPES.HttpClient).toDynamicValue(() => {
  return new HttpClient(SwapiGateway.URL);
});

container.bind<SwapiGateway>(TYPES.SwapGateway).toDynamicValue((context) => {
  const httpClient = context.container.get<HttpClient>(TYPES.HttpClient);
  return new SwapiGateway(httpClient);
});

container
  .bind<FetchPersonUseCase>(TYPES.FetchPersonUseCase)
  .toDynamicValue((context) => {
    const swapiRepo = context.container.get<SwapiGateway>(TYPES.SwapGateway);
    return new FetchPersonUseCase(swapiRepo);
  });

export default container;
