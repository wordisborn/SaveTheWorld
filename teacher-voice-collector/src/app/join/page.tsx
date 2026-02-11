"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

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
          <a href="/" className="text-ink font-semibold tracking-tight">
            Teacher Voice
          </a>
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
        <a href="/" className="text-ink font-semibold tracking-tight">
          Teacher Voice
        </a>
      </nav>

      <main className="flex-1 flex flex-col justify-center px-6 pb-20">
        <div className="max-w-sm space-y-6">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            Create your account
          </h1>

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

          <p className="text-sm text-muted">
            We&apos;ll send you a quick verification email. That&apos;s it.
          </p>

          <p className="text-sm text-pencil">
            Already have an account?{" "}
            <a href="/login" className="text-warmth underline">
              Log in
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
