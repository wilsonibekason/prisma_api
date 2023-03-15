import express, { Express } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({ data: { name: "wilson" } });
  const users = await prisma.user.findMany();
  console.log("User Created ", user, users);
}

main()
  .catch((e: unknown) => console.log(e instanceof Error && e.message))
  .finally(async () => {
    await prisma.$disconnect();
  });
