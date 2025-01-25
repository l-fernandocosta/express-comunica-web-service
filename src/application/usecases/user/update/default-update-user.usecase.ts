import UnaryUseCase from '../../abstraction/unary.usecase';
import UpdateUserCommand from './update-user-command';

export default abstract class DefaultUpdateUserUseCase extends UnaryUseCase<UpdateUserCommand> {}
