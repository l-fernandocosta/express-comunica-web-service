import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '12345678910',
      },
      {
        name: 'Sting',
        email: 'thepolice@sting.com',
        password: '12345678910',
      },
      {
        name: 'Kill Bill',
        email: 'killbill@gmail.com',
        password: '12345678910',
      },
      {
        name: 'Random User',
        email: 'random@gmail.com',
        password: '12345678910',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
