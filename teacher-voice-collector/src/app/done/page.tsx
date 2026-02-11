"use client";

import Link from "next/link";

export default function DonePage() {
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
            Your conversation is saved.
          </h1>

          <p className="text-base leading-relaxed text-pencil">
            Thank you for your time. What you shared will help us build
            something that actually helps teachers.
          </p>

          <div className="space-y-3">
            <p className="text-sm text-pencil">
              Know a teacher who should do this?
            </p>
            <div className="flex items-center gap-2 bg-rest rounded-lg px-4 py-3 border border-border">
              <span className="text-sm text-ink font-mono flex-1 truncate">
                teachervoice.org/join
              </span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(
                    window.location.origin + "/join"
                  );
                }}
                className="text-xs text-warmth font-medium shrink-0"
              >
                Copy link
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              href="/dashboard"
              className="rounded-xl bg-warmth px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              View my conversations
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-rest"
            >
              Done
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
