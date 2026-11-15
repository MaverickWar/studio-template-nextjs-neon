// The header's account corner: "Sign in" when nobody is, or the person's name and "Sign out".
import Link from "next/link";
import { currentSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "./sign-out-button";

export async function AccountButton() {
  const session = await currentSession();
  if (!session) {
    return (
      <Button asChild size="sm" className="h-10">
        <Link href="/sign-in">Sign in</Link>
      </Button>
    );
  }
  return (
    <div className="flex items-center gap-3 text-sm">
      <Link href="/account" className="hidden sm:inline font-medium hover:text-primary truncate max-w-[12rem]">{session.user.name || session.user.email}</Link>
      <SignOutButton />
    </div>
  );
}
