import express, { Express, Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { graphqlHTTP, GraphQLParams } from "express-graphql";
import { rootValue, schema } from "./graphql/gql";

const app = express();

const prisma = new PrismaClient({ log: ["query", "error", "warn", "info"] });

async function main() {
  const user = await prisma.user.create({ data: { name: "wilson" } });
  const users = await prisma.user.findMany();
  const createdUsers = await prisma.user.createMany({
    data: [
      {
        name: "Wilson Ibekason",
        id: "dld",
      },
    ],
  });

  const uniqueUsers = await prisma.user.findUnique({
    where: {},
  });
  const MnayUsers = await prisma.user.findMany({
    where: {
      name: "wilson",
      id: { not: " wilson" },
      writtenPosts: {
        every: {
          createdAt: new Date(),
        },
      },
    },
    distinct: ["id"],
  });
  const userWithIdOnly = await prisma.user.findMany({
    select: { id: true },
    take: 2,
    skip: 1,
    orderBy: {
      name: "asc",
    },
  });

  const updatedUsers = await prisma.user.updateMany({
    where: {
      name: "wilson",
    },
    data: { name: "Ibekason Wilson" },
  });
  await prisma.user.deleteMany();
  const newUser = await prisma.user.create({
    data: {
      favouritePosts: {},
      id: "ssnss",
      name: "wilson",
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    //  include: {
    //   userPreference: true
    //  }
  });
  console.log("User Created ", user, users);
}

main()
  .catch((e: unknown) => console.log(e instanceof Error && e.message))
  .finally(async () => {
    await prisma.$disconnect();
  });
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
