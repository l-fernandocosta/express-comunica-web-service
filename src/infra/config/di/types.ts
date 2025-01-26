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
};

export { TYPES };
