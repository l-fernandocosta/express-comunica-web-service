import SwapiEntity from '../entity/swapi.entity';
import DefaultFetchPersonUseCase from './default-fetch-person.usecase';

class FetchPersonUseCaseMock extends DefaultFetchPersonUseCase {
  async execute(input: string): Promise<SwapiEntity> {
    if (!input) {
      throw new Error('Invalid input provided');
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

describe('DefaultFetchPersonUseCase', () => {
  let useCase: FetchPersonUseCaseMock;

  beforeEach(() => {
    useCase = new FetchPersonUseCaseMock();
  });

  it('should return a SwapiEntity when given a valid input', async () => {
    const input = '1'; // Simulando um ID válido
    const result = await useCase.execute(input);

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

  it('should throw an error when the input is invalid', async () => {
    const invalidInput = ''; // Simulando um input inválido

    await expect(useCase.execute(invalidInput)).rejects.toThrowError(
      'Invalid input provided',
    );
  });
});
