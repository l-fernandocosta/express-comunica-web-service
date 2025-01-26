import { injectable } from 'inversify';

import BadRequestError from '@/domain/exceptions/bad-request-exception';
import SwapiEntity from '../entity/swapi.entity';
import ISwapiGateway from '../gateway/swapi-gateway';
import DefaultFetchPersonUseCase from './default-fetch-person.usecase';

@injectable()
export default class FetchPersonUseCase implements DefaultFetchPersonUseCase {
  constructor(private readonly gateway: ISwapiGateway) {}

  async execute(command: string): Promise<SwapiEntity> {
    if (!command) {
      throw new BadRequestError({
        context: {
          id: '`id` is required',
        },
      });
    }
    return this.gateway.fetchPerson(command);
  }
}
