import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the AI SDK modules before importing the route
vi.mock("@ai-sdk/anthropic", () => ({
  anthropic: vi.fn(() => "mock-model"),
}));

vi.mock("ai", () => ({
  streamText: vi.fn(() => ({
    toUIMessageStreamResponse: vi.fn(
      () => new Response("streaming", { status: 200 })
    ),
  })),
  convertToModelMessages: vi.fn(async (messages: unknown[]) =>
    (messages as Array<{ role: string; parts: Array<{ text: string }> }>).map(
      (m) => ({
        role: m.role,
        content: m.parts?.map((p) => p.text).join("") || "",
      })
    )
  ),
}));

import { POST } from "@/app/api/chat/route";
import { streamText, convertToModelMessages } from "ai";

describe("POST /api/chat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a streaming response", async () => {
    const req = new Request("http://localhost:3456/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            id: "1",
            role: "user",
            parts: [{ type: "text", text: "Hello" }],
          },
        ],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it("calls convertToModelMessages before streamText", async () => {
    const messages = [
      {
        id: "opening",
        role: "assistant",
        parts: [{ type: "text", text: "Thanks for being here." }],
      },
      {
        id: "1",
        role: "user",
        parts: [{ type: "text", text: "Today was tough." }],
      },
    ];

    const req = new Request("http://localhost:3456/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    await POST(req);

    expect(convertToModelMessages).toHaveBeenCalledWith(messages);
    expect(streamText).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "mock-model",
        system: expect.stringContaining("Teacher Voice"),
        messages: expect.any(Array),
      })
    );
  });

  it("passes system prompt with interviewer guidelines", async () => {
    const req = new Request("http://localhost:3456/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { id: "1", role: "user", parts: [{ type: "text", text: "Hi" }] },
        ],
      }),
    });

    await POST(req);

    const call = vi.mocked(streamText).mock.calls[0][0];
    expect(call.system).toContain("warm, direct, and honest");
    expect(call.system).toContain("988 Suicide & Crisis Lifeline");
    expect(call.system).toContain("15 minutes");
  });
});
