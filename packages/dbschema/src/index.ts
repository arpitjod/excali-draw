import { PrismaClient } from "../generated/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || "postgresql://username:password@localhost:5432/excali_db?schema=public";

if (!process.env.DATABASE_URL) {
  console.warn("⚠️  DATABASE_URL not set, using default development database URL. Make sure to set DATABASE_URL environment variable for production.");
}

// Create a new pool using the connection string
const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool);

export const prismaClient = new PrismaClient({ adapter });