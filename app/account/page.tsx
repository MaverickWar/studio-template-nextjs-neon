// A signed-in-only page: the person's account. Copy the check at the top to keep any page signed-in only.
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { currentSession } from "@/lib/session";
import { appShell } from "@/lib/app-shell";
import { SignOutButton } from "@/components/auth/sign-out-button";

export const metadata: Metadata = { title: `Your account · ${appShell.name}` };

async function Account() {
  const session = await currentSession();
  if (!session) redirect("/sign-in");
  return (
    <section className="flex flex-col gap-4 max-w-2xl">
      <h1 className="font-display text-4xl font-bold tracking-tight">Your account</h1>
      <dl className="rounded-lg border bg-card p-6 grid gap-3 sm:grid-cols-[8rem_1fr]">
        <dt className="text-muted-foreground">Name</dt><dd>{session.user.name}</dd>
        <dt className="text-muted-foreground">Email</dt><dd className="break-all">{session.user.email}</dd>
      </dl>
      <div><SignOutButton /></div>
    </section>
  );
}

export default function AccountPage() {
  return <Suspense fallback={<p className="text-muted-foreground">Loading…</p>}><Account /></Suspense>;
}
