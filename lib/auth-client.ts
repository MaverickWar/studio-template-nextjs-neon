"use client";
// Sign-in from the browser: signIn.email, signUp.email and signOut.
import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession } = createAuthClient();
