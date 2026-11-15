// Who is signed in, for server components and server actions. Null when nobody is, or no database yet.
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { dbReady } from "@/lib/db";

export async function currentSession() {
  if (!dbReady) return null;
  return auth.api.getSession({ headers: await headers() });
}
