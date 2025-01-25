import CreateUserDTO from '@/application/dto/user/create-user.dto';
import User from '@/domain/entities/user.entity';

export default class CreateUserCommand {
  private readonly name: string;
  private readonly email: string;
  private readonly password: string;

  public constructor(aName: string, aPassword: string, anEmail: string) {
    this.name = aName;
    this.email = anEmail;
    this.password = aPassword;
  }

  static create(aName: string, aPassword: string, anEmail: string) {
    return new CreateUserCommand(aName, aPassword, anEmail);
  }

  public toEntity() {
    return User.create({
      email: this.email,
      name: this.name,
      password: this.password,
    });
  }

  public static fromDTO(dto: CreateUserDTO): CreateUserCommand {
    return CreateUserCommand.create(dto.name, dto.password, dto.email);
  }
}
