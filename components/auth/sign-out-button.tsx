"use client";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();
  return (
    <Button size="sm" variant="outline" className="h-10" onClick={async () => { await signOut(); router.push("/"); router.refresh(); }}>
      Sign out
    </Button>
  );
}
