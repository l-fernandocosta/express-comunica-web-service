import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma };

/**
 * Reset the database by deleting all the records
 * Only for testing purposes
 */
export const resetDb = async () => {
  await prisma.$transaction([prisma.user.deleteMany()]);
};
