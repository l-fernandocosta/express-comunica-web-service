import UserID from '@/domain/value-objects/user-id.vo';
import UnaryUseCase from '../../abstraction/unary.usecase';

export default abstract class DefaultDeleteUserUseCase extends UnaryUseCase<UserID> {}
