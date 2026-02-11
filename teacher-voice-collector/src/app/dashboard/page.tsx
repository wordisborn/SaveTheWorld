export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <nav className="flex items-center justify-between px-6 h-14">
        <a href="/" className="text-ink font-semibold tracking-tight">
          Teacher Voice
        </a>
        <span className="text-sm text-pencil">Your conversations</span>
      </nav>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-lg space-y-8">
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight text-ink">
              Your conversations
            </h1>

            <div className="space-y-3">
              {/* Placeholder for when there are conversations */}
              <div className="rounded-xl border border-border bg-rest p-5 space-y-2">
                <p className="text-sm text-muted">No conversations yet.</p>
                <p className="text-sm text-pencil">
                  When you have a conversation, it will appear here.
                </p>
              </div>
            </div>
          </div>

          <a
            href="/chat"
            className="inline-block rounded-xl bg-warmth px-8 py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            Start a new conversation
          </a>

          <div className="pt-8 border-t border-border">
            <button className="text-sm text-muted hover:text-red-500 transition-colors">
              Delete my account and all my data
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
