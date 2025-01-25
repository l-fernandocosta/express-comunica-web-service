import isEmpty from 'lodash/isEmpty';
import DomainException from '../exceptions/domain.exception';

export default abstract class ValueObject<T> {
  protected readonly value: T;

  constructor(value: T) {
    if (value == undefined || value == null || isEmpty(value)) {
      throw new DomainException({
        message: `ValueObject ${this.constructor.name} cannot be null or undefined`,
      });
    }
    this.value = value;
    Object.freeze(this);
  }

  public equals(other: ValueObject<T>) {
    return this.value == other.value;
  }

  public getValue() {
    return this.value;
  }
}
