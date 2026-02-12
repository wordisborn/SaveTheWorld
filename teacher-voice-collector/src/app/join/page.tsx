"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleGoogleSignIn() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/consent`,
        },
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          setError(
            "That email is already signed up. Try logging in instead."
          );
        } else {
          setError(signUpError.message);
        }
        setLoading(false);
        return;
      }

      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-paper flex flex-col">
        <nav className="flex items-center px-6 h-14">
          <Link href="/" className="text-ink font-semibold tracking-tight">
            Teacher Voice
          </Link>
        </nav>
        <main className="flex-1 flex flex-col justify-center px-6 pb-20">
          <div className="max-w-sm space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight text-ink">
              Check your email.
            </h1>
            <p className="text-base leading-relaxed text-pencil">
              We sent you a link to verify your address. Once you click it,
              you&apos;re in.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <nav className="flex items-center px-6 h-14">
        <Link href="/" className="text-ink font-semibold tracking-tight">
          Teacher Voice
        </Link>
      </nav>

      <main className="flex-1 flex flex-col justify-center px-6 pb-20">
        <div className="max-w-sm space-y-6">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            Create your account
          </h1>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full rounded-xl border border-border bg-rest px-8 py-4 text-base font-medium text-ink transition-colors hover:bg-paper flex items-center justify-center gap-3"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-border" />
            <span className="mx-4 text-sm text-muted">or</span>
            <div className="flex-grow border-t border-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-ink"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-rest px-4 py-3 text-base text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-warmth/40 focus:border-warmth"
                placeholder="you@email.com"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-ink"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-rest px-4 py-3 text-base text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-warmth/40 focus:border-warmth"
                placeholder="At least 8 characters"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-warmth px-8 py-4 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-sm text-pencil">
            Already have an account?{" "}
            <Link href="/login" className="text-warmth underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
