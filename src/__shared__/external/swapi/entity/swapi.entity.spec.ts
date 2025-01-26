import SwapiEntity from '../entity/swapi.entity';

describe('SwapiEntity', () => {
  const validData = {
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

  it('should correctly create an instance using the constructor', () => {
    const entity = new SwapiEntity(validData);

    expect(entity).toBeInstanceOf(SwapiEntity);
    expect(entity.name).toBe(validData.name);
    expect(entity.height).toBe(validData.height);
    expect(entity.mass).toBe(validData.mass);
    expect(entity.hair_color).toBe(validData.hair_color);
    expect(entity.skin_color).toBe(validData.skin_color);
    expect(entity.eye_color).toBe(validData.eye_color);
    expect(entity.birth_year).toBe(validData.birth_year);
    expect(entity.gender).toBe(validData.gender);
    expect(entity.homeworld).toBe(validData.homeworld);
    expect(entity.created).toBe(validData.created);
    expect(entity.edited).toBe(validData.edited);
    expect(entity.url).toBe(validData.url);
  });

  it('should correctly create an instance using the static create method', () => {
    const entity = SwapiEntity.create(validData);

    expect(entity).toBeInstanceOf(SwapiEntity);
    expect(entity.name).toBe(validData.name);
    expect(entity.height).toBe(validData.height);
    expect(entity.mass).toBe(validData.mass);
    expect(entity.hair_color).toBe(validData.hair_color);
    expect(entity.skin_color).toBe(validData.skin_color);
    expect(entity.eye_color).toBe(validData.eye_color);
    expect(entity.birth_year).toBe(validData.birth_year);
    expect(entity.gender).toBe(validData.gender);
    expect(entity.homeworld).toBe(validData.homeworld);
    expect(entity.created).toBe(validData.created);
    expect(entity.edited).toBe(validData.edited);
    expect(entity.url).toBe(validData.url);
  });

  it('should handle missing or empty fields gracefully', () => {
    const incompleteData = {
      name: '',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      gender: '',
      homeworld: '',
      created: '',
      edited: '',
      url: '',
    };

    const entity = SwapiEntity.create(incompleteData);

    expect(entity).toBeInstanceOf(SwapiEntity);
    expect(entity.name).toBe('');
    expect(entity.height).toBe('');
    expect(entity.mass).toBe('');
    expect(entity.hair_color).toBe('');
    expect(entity.skin_color).toBe('');
    expect(entity.eye_color).toBe('');
    expect(entity.birth_year).toBe('');
    expect(entity.gender).toBe('');
    expect(entity.homeworld).toBe('');
    expect(entity.created).toBe('');
    expect(entity.edited).toBe('');
    expect(entity.url).toBe('');
  });
});
