"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("That email or password doesn't match our records.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
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
            Welcome back
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-rest px-4 py-3 text-base text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-warmth/40 focus:border-warmth"
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
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="text-sm text-pencil">
            Don&apos;t have an account?{" "}
            <a href="/join" className="text-warmth underline">
              Sign up
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
