import DomainException from '../exceptions/domain.exception';
import Identifier from '../value-objects/identifier.vo';
import Entity from './entity';

class TestEntity extends Entity {
  constructor(id: Identifier) {
    super(id);
  }
}

describe('Entity', () => {
  it('should create an entity with a valid identifier', () => {
    const id = new Identifier('12345');
    const entity = new TestEntity(id);

    expect(entity.getId()).toBe(id);
  });

  it('should throw a DomainException if identifier is invalid', () => {
    const invalid_null_id = null as unknown as Identifier;
    const invalid_undefined_id = undefined as unknown as Identifier;

    expect(() => {
      new TestEntity(invalid_null_id);
    }).toThrow(DomainException);

    expect(() => {
      new TestEntity(invalid_undefined_id);
    }).toThrow(DomainException);
  });

  it('should return true for equal entities (same ID)', () => {
    const id = new Identifier('12345');
    const entity1 = new TestEntity(id);
    const entity2 = new TestEntity(id);

    expect(entity1.equals(entity2)).toBe(true);
  });

  it('should return false for different entities (different IDs)', () => {
    const id1 = new Identifier('12345');
    const id2 = new Identifier('67890');
    const entity1 = new TestEntity(id1);
    const entity2 = new TestEntity(id2);

    expect(entity1.equals(entity2)).toBe(false);
  });
});
