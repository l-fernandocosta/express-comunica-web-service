import SwapiEntity from '../entity/swapi.entity';
import ISwapiGateway from './swapi-gateway';

class SwapiGatewayMock implements ISwapiGateway {
  async fetchPerson(id: string): Promise<SwapiEntity> {
    if (!id) {
      throw new Error('Invalid ID');
    }

    const mockData = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'Tatooine',
      created: '2025-01-25T00:00:00.000Z',
      edited: '2025-01-25T00:00:00.000Z',
      url: 'https://swapi.dev/api/people/1/',
    };

    return SwapiEntity.create(mockData);
  }
}

describe('SwapiGateway', () => {
  let gateway: SwapiGatewayMock;

  beforeEach(() => {
    gateway = new SwapiGatewayMock();
  });

  it('should return a SwapiEntity when given a valid ID', async () => {
    const id = '1'; // ID válido
    const result = await gateway.fetchPerson(id);

    expect(result).toBeInstanceOf(SwapiEntity);
    expect(result.name).toBe('Luke Skywalker');
    expect(result.height).toBe('172');
    expect(result.mass).toBe('77');
    expect(result.hair_color).toBe('blond');
    expect(result.skin_color).toBe('fair');
    expect(result.eye_color).toBe('blue');
    expect(result.birth_year).toBe('19BBY');
    expect(result.gender).toBe('male');
    expect(result.homeworld).toBe('Tatooine');
    expect(result.url).toBe('https://swapi.dev/api/people/1/');
  });

  it('should throw an error when given an invalid ID', async () => {
    const invalidId = ''; // ID inválido

    await expect(gateway.fetchPerson(invalidId)).rejects.toThrowError(
      'Invalid ID',
    );
  });
});
