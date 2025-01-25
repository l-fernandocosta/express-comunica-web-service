import User from '@/domain/entities/user.entity';
import ConflictException from '@/domain/exceptions/conflict-exception';
import UserNotFoundException from '@/domain/exceptions/user-not-found.exception';
import IUserRepository from '@/domain/repositories/user-repository';
import Password from '@/domain/value-objects/password.vo';
import UserID from '@/domain/value-objects/user-id.vo';
import { injectable } from 'inversify';
import { prisma } from '../prisma/prisma-client';
import PrismaFactory from '../prisma/prisma-factory';
import UpdateUserCommand from '@/application/usecases/user/update/update-user-command';

@injectable()
export default class PrismaUserRepositoryImpl implements IUserRepository {
  async create(input: User): Promise<User> {
    await this.validateConstraintOrThrow(input.getEmail().getValue());

    const body = {
      id: input.getId().getValue(),
      email: input.getEmail().getValue(),
      name: input.getName(),
      password: input.getPassword().getValue(),
    };

    const prismaUser = await prisma.user.create({
      data: {
        ...body,
        password: Password.hash(body.password).toString(),
      },
    });

    return PrismaFactory.toEntity(prismaUser).toObject();
  }

  async list(): Promise<Array<User>> {
    const prismaUsers = await prisma.user.findMany();
    return prismaUsers.map((prismaUser) =>
      PrismaFactory.toEntity(prismaUser).toObject(),
    );
  }

  async find(id: UserID): Promise<User> {
    const prismaUser = await prisma.user.findUnique({
      where: {
        id: id.getValue(),
      },
    });

    if (!prismaUser) {
      throw new UserNotFoundException({
        context: {
          user: 'User not found',
        },
      });
    }

    return PrismaFactory.toEntity(prismaUser).toObject();
  }

  async delete(id: UserID): Promise<void> {
    await prisma.user.delete({
      where: {
        id: id.getValue(),
      },
    });
  }

  async update(user: UpdateUserCommand, userID: UserID): Promise<User> {
    const isEmailUsed = await prisma.user.findUnique({
      where: {
        email: user.getEmail(),
        AND: {
          id: {
            not: userID.getValue(),
          },
        },
      },
    });

    if (isEmailUsed) {
      throw new ConflictException({
        context: {
          email: 'Email already in use',
        },
      });
    }

    const prismaUser = await prisma.user.update({
      where: {
        id: userID.getValue(),
      },
      data: {
        email: user.getEmail(),
        name: user.getName(),
      },
    });

    return PrismaFactory.toEntity(prismaUser).toObject();
  }

  private async validateConstraintOrThrow(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new ConflictException({
        context: {
          email: 'Email already in use',
        },
      });
    }
  }

  async findByEmailOrThrow(email: string): Promise<User> {
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!prismaUser) {
      throw new UserNotFoundException({
        context: {
          user: 'User not found',
        },
        logging: true,
      });
    }

    return PrismaFactory.toEntity(prismaUser);
  }
}
