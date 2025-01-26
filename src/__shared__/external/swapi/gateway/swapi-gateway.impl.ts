import { HttpClient } from '@/__shared__/external/http/http-client';
import { injectable } from 'inversify';

import SwapiEntity from '../entity/swapi.entity';
import ISwapiGateway from './swapi-gateway';
import InternalServerException from '@/domain/exceptions/internal-server-exception';

export interface ExternalSwapiOutput {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  created: string;
  edited: string;
  url: string;
}

@injectable()
export default class SwapiGateway implements ISwapiGateway {
  static readonly URL = 'https://swapi.dev/api/people/';

  constructor(private readonly httpClient: HttpClient) {}

  async fetchPerson(id: string): Promise<SwapiEntity> {
    const url: string = `${id}`;

    const externalPerson: ExternalSwapiOutput = await this.httpClient
      .get<ExternalSwapiOutput>(url)
      .then((r) => r.data)
      .catch((e) => {
        throw new InternalServerException({
          code: e.status,
          message: e.code,
          context: {
            message: 'Error fetching person',
          },
        });
      });

    return SwapiEntity.create(externalPerson);
  }
}
