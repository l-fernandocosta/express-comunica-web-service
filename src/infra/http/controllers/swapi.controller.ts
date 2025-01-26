import FetchPersonUseCase from '@/__shared__/external/swapi/usecases/fetch-person.usecase';
import express from 'express';
import { TYPES } from '@/infra/config/di/types';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  request,
} from 'inversify-express-utils';
import { authenticate } from '../middleware/private-route.middleware';

@controller('/swapi', authenticate)
export default class SwapiController extends BaseHttpController {
  @inject(TYPES.FetchPersonUseCase)
  private readonly fetchPersonUseCase!: FetchPersonUseCase;

  @httpGet('/:id')
  async fetchPeople(@request() req: express.Request) {
    const id = req.params.id;
    return await this.fetchPersonUseCase.execute(id);
  }
}
