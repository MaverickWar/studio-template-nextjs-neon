// Better Auth's own routes (sign in, sign up, sign out, session) under /api/auth.
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

export const { GET, POST } = toNextJsHandler(auth);
