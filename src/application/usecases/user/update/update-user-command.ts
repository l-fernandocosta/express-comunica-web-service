import UpdateUserDTO from '@/application/dto/user/update-user.dto';

export default class UpdateUserCommand {
  private readonly id: string;
  private readonly name: string;
  private readonly email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  public static fromDTO(dto: UpdateUserDTO) {
    return new UpdateUserCommand(dto.id, dto.name, dto.email);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }
}
