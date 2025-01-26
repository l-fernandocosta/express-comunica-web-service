const TYPES = {
  UserService: Symbol.for('UserService'),
  AuthController: Symbol.for('AuthController'),
  UserController: Symbol.for('UserController'),
  UserRepository: Symbol.for('UserRepository'),
  ListUserUseCase: Symbol.for('ListUserUseCase'),
  FindUserUseCase: Symbol.for('FindUserUseCase'),
  UpdateUserUseCase: Symbol.for('UpdateUserUseCase'),
  CreateUserUseCase: Symbol.for('CreateUserUseCase'),
  DeleteUserUseCase: Symbol.for('DeleteUserUseCase'),
  SwapGateway: Symbol.for('SwapGateway'),
  HttpClient: Symbol.for('HttpClient'),
  FetchPersonUseCase: Symbol.for('FetchPersonUseCase'),
  SwapiController: Symbol.for('SwapiController'),
};

export { TYPES };
