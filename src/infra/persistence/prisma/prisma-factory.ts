import User from '@/domain/entities/user.entity';
import { User as PrismaUser } from '@prisma/client';

export default class PrismaFactory {
  static toEntity(user: PrismaUser): User {
    return User.create({
      email: user.email,
      name: user.name,
      password: user.password,
      id: user.id,
    });
  }
}
