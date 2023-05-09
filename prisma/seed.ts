import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const test_player_1 = await prisma.text_data.create({
    data: {
      id: "sdfdsf",
      text: "Test text 1",
    //   date: new Date(),
    },
  });

  const test_player_2 = await prisma.text_data.create({
    data: {
        id: "sdfsdfdsf",
        text: "Test text 2",
        // date: new Date(),
    },
  });

  const test_player_3 = await prisma.text_data.create({
    data: {
        id: "sdffgdsf",
        text: "Test text 3",
        // date: new Date(),
    },
  });

  console.log({ test_player_1, test_player_2, test_player_3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
