import UseCase from '@/application/usecases/abstraction/use-case';
import SwapiEntity from '../entity/swapi.entity';

type Input = string;
type Output = SwapiEntity;

export default abstract class DefaultFetchPersonUseCase extends UseCase<
  Input,
  Output
> {}
