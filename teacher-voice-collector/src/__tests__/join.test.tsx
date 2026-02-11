import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JoinPage from "@/app/join/page";

// Mock supabase browser client
vi.mock("@/lib/supabase-browser", () => ({
  createClient: () => ({
    auth: {
      signUp: vi.fn().mockResolvedValue({ error: null }),
    },
  }),
}));

describe("Join page", () => {
  it("renders sign up form with heading", () => {
    render(<JoinPage />);
    expect(
      screen.getByRole("heading", { name: /create your account/i })
    ).toBeInTheDocument();
  });

  it("renders email and password inputs", () => {
    render(<JoinPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("has a submit button", () => {
    render(<JoinPage />);
    expect(
      screen.getByRole("button", { name: /create account/i })
    ).toBeInTheDocument();
  });

  it("has a link to login", () => {
    render(<JoinPage />);
    const link = screen.getByRole("link", { name: /log in/i });
    expect(link).toHaveAttribute("href", "/login");
  });

  it("email input requires valid email", () => {
    render(<JoinPage />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toBeRequired();
  });

  it("password input requires min 8 chars", () => {
    render(<JoinPage />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("minLength", "8");
  });

  it("shows confirmation after successful signup", async () => {
    const user = userEvent.setup();
    render(<JoinPage />);

    await user.type(screen.getByLabelText(/email/i), "test@teacher.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(
      await screen.findByText(/check your email/i)
    ).toBeInTheDocument();
  });
});
