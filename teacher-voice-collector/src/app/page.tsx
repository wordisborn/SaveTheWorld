export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 h-14">
        <span className="text-ink font-semibold tracking-tight">
          Teacher Voice
        </span>
        <a href="#about" className="text-pencil text-sm">
          About
        </a>
      </nav>

      {/* Hero */}
      <main className="flex flex-col justify-center px-6 pt-16 pb-10 min-h-[calc(100vh-56px)]">
        <div className="max-w-lg space-y-6">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink">
            We&apos;re building tools for teachers. But first, we&apos;re
            listening.
          </h1>
          <p className="text-base leading-relaxed text-pencil">
            Before we build anything, we want to hear from you &mdash; what your
            day actually looks like, what takes your time, what you wish existed.
            A 15-minute conversation. Your words shape what gets built. Nothing
            you share is ever seen by your school or district.
          </p>
          <a
            href="/join"
            className="inline-block rounded-xl bg-warmth px-8 py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            I&apos;m a teacher. Let&apos;s talk.
          </a>
        </div>
      </main>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Below the fold */}
      <section id="about" className="px-6 py-12 space-y-10 max-w-lg">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold tracking-tight text-ink">
            What is this?
          </h2>
          <p className="text-[15px] leading-relaxed text-pencil">
            We&apos;re a team building open-source tools to reduce the paperwork
            and busywork that buries teachers. Before we build, we need to hear
            from the people who live it.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold tracking-tight text-ink">
            How does it work?
          </h2>
          <p className="text-[15px] leading-relaxed text-pencil">
            You sign up (takes a minute), then have a conversation with an AI
            research assistant. It asks questions. You answer honestly. About 15
            minutes.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold tracking-tight text-ink">
            What about my privacy?
          </h2>
          <p className="text-[15px] leading-relaxed text-pencil">
            Your interview is confidential. It is never shared with
            administrators, districts, or any third party. You can delete
            everything you&apos;ve shared at any time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-xs text-muted">
        Teacher Voice &middot; A SaveTheWorld project
      </footer>
    </div>
  );
}
