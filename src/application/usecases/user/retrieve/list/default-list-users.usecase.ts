import NullaryUseCase from '@/application/usecases/abstraction/nullary.usecase';
import User from '@/domain/entities/user.entity';

export default abstract class DefaultListUsersUseCase extends NullaryUseCase<
  User[]
> {}
