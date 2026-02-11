"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConsentPage() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  function handleStart() {
    if (agreed) {
      router.push("/chat");
    }
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <nav className="flex items-center px-6 h-14">
        <a href="/" className="text-ink font-semibold tracking-tight">
          Teacher Voice
        </a>
      </nav>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-lg space-y-8">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            How we&apos;ll use what you share.
          </h1>

          <div className="space-y-6 text-[15px] leading-relaxed text-pencil">
            <div className="space-y-2">
              <p className="font-semibold text-ink">
                Your words belong to you.
              </p>
              <p>
                Here&apos;s what happens with what you share in your
                conversation:
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-ink">
                We read it to find patterns.
              </p>
              <p>
                Your conversation will be combined with hundreds of others to
                find common themes &mdash; like &ldquo;report cards take
                forever&rdquo; or &ldquo;I need help with parent
                emails.&rdquo; We use those patterns to decide what to build.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-ink">
                We never use your name.
              </p>
              <p>
                Before we analyze anything, we strip out names, school names,
                and anything that could identify you. The patterns are
                anonymous. No one will ever know that you, specifically, said
                anything.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-ink">
                Your school and district will never see this.
              </p>
              <p>
                Not your principal. Not your superintendent. Not HR. Not ever.
                This is between you and us.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-ink">
                An AI reads your conversation, not a person.
              </p>
              <p>
                The analysis is done by AI (Claude, made by Anthropic). Your
                conversation is not used to train AI models.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-ink">
                You can delete everything.
              </p>
              <p>
                At any time, you can delete your account and every word
                you&apos;ve shared. When we say delete, we mean delete &mdash;
                gone from the database, not hidden.
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-ink">
                This data has an expiration date.
              </p>
              <p>
                We&apos;ll keep interview data for the duration of this
                research project (about 6&ndash;12 months). When we&apos;re
                done, we&apos;ll let you know and offer you a copy of your
                conversation before we delete it.
              </p>
            </div>
          </div>

          <div className="pt-2 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-border text-warmth focus:ring-warmth/40 accent-warmth"
              />
              <span className="text-[15px] leading-relaxed text-ink">
                I understand how my conversation will be used, and I&apos;m
                okay with it.
              </span>
            </label>

            <button
              onClick={handleStart}
              disabled={!agreed}
              className="rounded-xl bg-warmth px-8 py-4 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              I&apos;m ready to start.
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
