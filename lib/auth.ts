// Sign-in: email and password with Better Auth, accounts kept in the app's own database (the user,
// session, account and verification tables in prisma/schema.prisma). Server code only.
import { createHash } from "node:crypto";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";

// BETTER_AUTH_SECRET signs sign-in cookies. Until one is set, a key made from the (private) database
// address is used, so sign-in works with nothing else to set up. Setting your own is still better.
const secret =
  process.env.BETTER_AUTH_SECRET ||
  createHash("sha256").update(`studio-auth:${process.env.DATABASE_URL || "not-connected"}`).digest("hex");

// The web addresses sign-in works on: this computer, Vercel's own addresses, and your own domain.
const own = (process.env.BETTER_AUTH_URL || "").replace(/^https?:\/\//, "").replace(/\/.*$/, "");
const allowedHosts = ["localhost:*", "*.vercel.app", ...(own ? [own] : [])];

export const auth = betterAuth({
  secret,
  baseURL: { allowedHosts, protocol: "auto" },
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
