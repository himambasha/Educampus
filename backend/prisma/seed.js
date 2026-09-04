const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany(); // Clear existing temporary records

  await prisma.user.createMany({
    data: [
      { name: 'Admin User', email: 'admin@educampus.com' },
      { name: 'John Doe', email: 'john.doe@educampus.com' },
      { name: 'Jane Smith', email: 'jane.smith@educampus.com' },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });