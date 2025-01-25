import DomainException from '../exceptions/domain.exception';
import Identifier from '../value-objects/identifier.vo';

export default abstract class Entity {
  protected readonly _id: Identifier;

  constructor(id: Identifier) {
    if (!id) {
      throw new DomainException({
        message: 'Entity must have a valid `id`',
      });
    }
    this._id = id;
  }

  public getId(): Identifier {
    return this._id;
  }

  public equals(other: Entity): boolean {
    return this._id.equals(other._id);
  }

  public toString(): string {
    return this._id.toString();
  }
}
