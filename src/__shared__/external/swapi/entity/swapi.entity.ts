type ConstructorProps = {
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
};

export default class SwapiEntity {
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

  constructor(data: ConstructorProps) {
    this.name = data.name;
    this.height = data.height;
    this.mass = data.mass;
    this.hair_color = data.hair_color;
    this.skin_color = data.skin_color;
    this.eye_color = data.eye_color;
    this.birth_year = data.birth_year;
    this.gender = data.gender;
    this.homeworld = data.homeworld;
    this.created = data.created;
    this.edited = data.edited;
    this.url = data.url;
  }

  public static create(data: ConstructorProps): SwapiEntity {
    return new SwapiEntity(data);
  }
}
