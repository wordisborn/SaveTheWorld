"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const OPENING_MESSAGE = `Thanks for being here. I know time is the one thing teachers don't have enough of, so I want to make this count.

I'm an AI research assistant. I'm not a chatbot — I'm here to have a real conversation about what your day looks like, especially the stuff that isn't teaching. The paperwork, the admin tasks, the things that eat your time.

There are no right answers. I'm not evaluating you. I'm trying to understand what's hard so we can build tools that actually help.

To start — could you tell me what today was like?`;

/** Characters revealed per tick during the opening typing animation. */
const TYPING_CHARS_PER_TICK = 2;
/** Milliseconds between each tick of the typing animation. */
const TYPING_INTERVAL_MS = 12;

function getMessageText(
  message: { parts?: Array<{ type: string; text?: string }> }
) {
  if (!message.parts) return "";
  return message.parts
    .filter(
      (p): p is { type: "text"; text: string } =>
        p.type === "text" && typeof p.text === "string"
    )
    .map((p) => p.text)
    .join("");
}

/**
 * Hook that progressively reveals a string, simulating a typing / streaming
 * effect.  Returns the visible portion of `fullText`.  Once the animation
 * finishes the full string is returned on every subsequent render.
 */
function useTypingAnimation(fullText: string) {
  const [charIndex, setCharIndex] = useState(0);
  const done = charIndex >= fullText.length;

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => {
      setCharIndex((prev) => {
        const next = prev + TYPING_CHARS_PER_TICK;
        return next >= fullText.length ? fullText.length : next;
      });
    }, TYPING_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fullText, done]);

  return done ? fullText : fullText.slice(0, charIndex);
}

export default function ChatPage() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const [finishing, setFinishing] = useState(false);

  const { messages, sendMessage, status } = useChat({
    messages: [
      {
        id: "opening",
        role: "assistant" as const,
        parts: [{ type: "text" as const, text: OPENING_MESSAGE }],
      },
    ],
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Typing animation for the opening assistant message
  const openingFullText = getMessageText(
    messages.find((m) => m.id === "opening") || {}
  );
  const openingDisplayText = useTypingAnimation(openingFullText);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  function handleFinish() {
    setFinishing(true);
    router.push("/done");
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    if (inputRef.current) {
      inputRef.current.style.height = "48px";
    }
    await sendMessage({ text });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col h-dvh bg-paper">
      {/* Header */}
      <header className="flex items-center justify-between px-4 h-12 border-b border-border shrink-0">
        <span className="text-sm font-semibold text-ink tracking-tight">
          Teacher Voice
        </span>
        <button
          onClick={handleFinish}
          disabled={finishing}
          className="text-sm text-pencil hover:text-warmth transition-colors"
        >
          Finish conversation
        </button>
      </header>

      {/* Subheader note */}
      <div className="px-4 py-2 text-xs text-muted text-center shrink-0">
        This usually takes about 15 minutes. You can pause anytime.
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-lg mx-auto space-y-4 pt-2">
          {messages.map((message) => {
            const isOpening = message.id === "opening";
            const text = isOpening
              ? openingDisplayText
              : getMessageText(message);
            if (!text) return null;

            return (
              <div key={message.id}>
                {message.role === "assistant" ? (
                  <div className="text-[15px] leading-relaxed text-ink whitespace-pre-wrap">
                    {text}
                  </div>
                ) : (
                  <div className="bg-warmth-light rounded-2xl rounded-br-md px-4 py-3 ml-8">
                    <p className="text-[15px] leading-relaxed text-ink whitespace-pre-wrap">
                      {text}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {status === "submitted" && (
            <div className="text-pencil text-sm animate-pulse">...</div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border px-4 py-3 shrink-0">
        <div className="max-w-lg mx-auto flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your response..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-border bg-rest px-4 py-3 text-[15px] text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-warmth/40 focus:border-warmth max-h-32 overflow-y-auto"
            style={{ minHeight: "48px" }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "48px";
              target.style.height =
                Math.min(target.scrollHeight, 128) + "px";
            }}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="shrink-0 w-12 h-12 rounded-xl bg-warmth text-white flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
