import { PrismaClient } from "../generated/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

// Create a new pool using the connection string
const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool);

export const prismaClient = new PrismaClient({ adapter });