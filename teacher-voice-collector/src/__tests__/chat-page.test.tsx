import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import ChatPage from "@/app/chat/page";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock useChat from AI SDK
vi.mock("@ai-sdk/react", () => ({
  useChat: () => ({
    messages: [
      {
        id: "opening",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Thanks for being here. I know time is the one thing teachers don't have enough of.",
          },
        ],
      },
    ],
    sendMessage: vi.fn(),
    status: "ready",
  }),
}));

describe("Chat page", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /** Advance fake timers far enough for the typing animation to finish. */
  function completeTypingAnimation() {
    // The opening message in the mock is ~80 chars.
    // At 2 chars per 12ms tick, ~500ms is more than enough.
    act(() => {
      vi.advanceTimersByTime(2000);
    });
  }

  it("renders the opening message", () => {
    render(<ChatPage />);
    completeTypingAnimation();
    expect(
      screen.getByText(/Thanks for being here/)
    ).toBeInTheDocument();
  });

  it("renders the header with Teacher Voice", () => {
    render(<ChatPage />);
    expect(screen.getByText("Teacher Voice")).toBeInTheDocument();
  });

  it("has a finish conversation button", () => {
    render(<ChatPage />);
    expect(
      screen.getByRole("button", { name: /finish conversation/i })
    ).toBeInTheDocument();
  });

  it("renders a text input area", () => {
    render(<ChatPage />);
    expect(
      screen.getByPlaceholderText(/type your response/i)
    ).toBeInTheDocument();
  });

  it("renders a send button", () => {
    render(<ChatPage />);
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  it("shows the time estimate note", () => {
    render(<ChatPage />);
    expect(screen.getByText(/15 minutes/)).toBeInTheDocument();
  });

  it("progressively reveals the opening message (typing animation)", () => {
    render(<ChatPage />);
    // Initially the message has started typing but not yet complete
    expect(screen.queryByText(/teachers don't have enough of\./)).not.toBeInTheDocument();

    // After enough time, the full message is visible
    completeTypingAnimation();
    expect(
      screen.getByText(/Thanks for being here/)
    ).toBeInTheDocument();
  });
});
