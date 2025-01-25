import UseCase from '@/application/usecases/abstraction/use-case';
import User from '@/domain/entities/user.entity';
import UserID from '@/domain/value-objects/user-id.vo';

export default abstract class DefaultFindUserUseCase extends UseCase<
  UserID,
  User
> {}
