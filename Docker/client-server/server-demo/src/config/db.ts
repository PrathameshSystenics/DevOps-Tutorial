import { PrismaClient } from "@prisma/client";

// Single shared Prisma client instance for the app.
export const prisma = new PrismaClient();

export const connectDB = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("MongoDB connected successfully (via Prisma)");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
