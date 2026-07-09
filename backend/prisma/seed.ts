import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.user.upsert({
    where: {
      firebaseUid: 'seed-firebase-user'
    },
    update: {},
    create: {
      firebaseUid: 'seed-firebase-user',
      username: 'seed-player',
      email: 'seed-player@example.com'
    }
  });
}

main()
  .then(async (): Promise<void> => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown): Promise<void> => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
