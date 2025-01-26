import SwapiEntity from '../entity/swapi.entity';

export default interface ISwapiGateway {
  fetchPerson(id: string): Promise<SwapiEntity>;
}
