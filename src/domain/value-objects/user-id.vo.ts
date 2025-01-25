import Identifier from './identifier.vo';

export default class UserID extends Identifier {
  constructor(value: string) {
    super(Identifier.fromString(value).getValue());
  }
}
