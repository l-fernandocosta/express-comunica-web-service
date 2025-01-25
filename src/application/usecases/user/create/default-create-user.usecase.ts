import UseCase from '@/application/usecases/abstraction/use-case';
import CreateUserCommand from './create-user-command';
import User from '@/domain/entities/user.entity';

type DefaultCreateUserUseCase = UseCase<CreateUserCommand, User>;

export default DefaultCreateUserUseCase;
