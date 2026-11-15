"use client";
// The sign-in and sign-up form: email and password, kept in the app's own database.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const up = mode === "sign-up";

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = up
      ? await signUp.email({ name: name.trim() || email.split("@")[0], email, password })
      : await signIn.email({ email, password });
    setBusy(false);
    if (error) { setError(error.message || "That didn't work. Try again."); return; }
    router.push("/account");
    router.refresh();
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-display text-2xl">{up ? "Create your account" : "Sign in"}</CardTitle>
        <CardDescription>{up ? "Use your email and a password of at least 8 characters." : "Welcome back. Enter your email and password."}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="flex flex-col gap-5">
          {up && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="h-11" />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete={up ? "new-password" : "current-password"} required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" />
          </div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full h-11" disabled={busy}>
            {busy ? (up ? "Creating your account…" : "Signing in…") : up ? "Create account" : "Sign in"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {up ? "Already have an account? " : "New here? "}
            <Link href={up ? "/sign-in" : "/sign-up"} className="text-foreground underline underline-offset-4">{up ? "Sign in" : "Create an account"}</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
