import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { ConnectDatabase } from "@/components/connect-database";
import { appShell } from "@/lib/app-shell";
import { dbReady } from "@/lib/db";

export const metadata: Metadata = { title: `Create an account · ${appShell.name}` };

export default function SignUpPage() {
  return <div className="flex justify-center py-6">{dbReady ? <AuthForm mode="sign-up" /> : <ConnectDatabase />}</div>;
}
