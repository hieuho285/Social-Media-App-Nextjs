import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const categories = [
  "Cars and vehicles",
  "Comedy",
  "Education",
  "Gaming",
  "Music",
  "Entertainment",
  "Film and animation",
  "New and politics",
  "People and blogs",
  "Pets and animals",
  "Science and technology",
  "Sports",
  "Travel and events",
];

async function main() {
  console.log("Start seeding...");

  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category,
      },
    });
  }

  console.log("Categories seeded.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
