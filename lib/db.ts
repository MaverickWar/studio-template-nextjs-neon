// The database: Postgres through Prisma. On Vercel the Neon integration sets DATABASE_URL for you;
// locally, put it in .env.local. Import `db` in server code only.
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

/** True once a database is connected. Until then the app runs and shows how to connect one. */
export const dbReady = !!process.env.DATABASE_URL;

const globalForDb = globalThis as unknown as { db?: PrismaClient };

export const db: PrismaClient =
  globalForDb.db ?? new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL || "" }) });

if (process.env.NODE_ENV !== "production") globalForDb.db = db;
