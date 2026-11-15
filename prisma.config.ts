// Where Prisma finds the database. On Vercel, the Neon integration sets DATABASE_URL (pooled) and
// DATABASE_URL_UNPOOLED (direct, which changes to the tables need). Without either, the app still builds.
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: { url: process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL || "" },
});
