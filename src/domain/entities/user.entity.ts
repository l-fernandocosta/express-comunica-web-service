import { createUserSchema } from '@/infra/validation/zod/user/create-user.validation';
import BadRequestError from '../exceptions/bad-request-exception';
import Email from '../value-objects/email.vo';
import Password from '../value-objects/password.vo';
import UserID from '../value-objects/user-id.vo';
import Entity from './entity';

type UserConstructorProps = {
  id?: string;
  name: string;
  password: string;
  email: string;
};

type UserCommand = {
  id?: string;
  name: string;
  password: string;
  email: string;
};

export default class User extends Entity {
  private email: Email;
  private name: string;
  private password: Password;

  constructor(props: UserConstructorProps) {
    super(props.id ? UserID.fromString(props.id) : UserID.create());

    this.name = props.name;
    this.email = Email.fromString(props.email);
    this.password = Password.create(props.password);
  }

  public static create(props: UserCommand): User {
    const parsed = createUserSchema.safeParse(props);

    if (!parsed.success) {
      throw new BadRequestError({
        message: `Validation failed: ${parsed.error.errors.map((e) => e.message).join(', ')}`,
        logging: true,
        context: {
          'validation-errors': parsed.error.errors,
        },
      });
    }

    return new User(props);
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPassword(): Password {
    return this.password;
  }

  public setPassword(password: string) {
    this.password = Password.hash(password);
  }

  public setName(name: string) {
    this.name = name;
  }

  public setEmail(email: string) {
    this.email = Email.fromString(email);
  }

  public toObject() {
    return {
      id: this.getId().getValue(),
      name: this.name,
      email: this.email.toString(),
    } as unknown as User;
  }
}
