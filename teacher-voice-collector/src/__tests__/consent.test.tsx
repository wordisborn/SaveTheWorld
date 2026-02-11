import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConsentPage from "@/app/consent/page";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("Consent page", () => {
  it("renders the consent heading", () => {
    render(<ConsentPage />);
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toHaveTextContent(/how we.ll use what you share/i);
  });

  it("renders all privacy sections", () => {
    render(<ConsentPage />);
    expect(screen.getByText(/Your words belong to you/)).toBeInTheDocument();
    expect(screen.getByText(/We read it to find patterns/)).toBeInTheDocument();
    expect(screen.getByText(/We never use your name/)).toBeInTheDocument();
    expect(
      screen.getByText(/Your school and district will never see this/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/An AI reads your conversation, not a person/)
    ).toBeInTheDocument();
    expect(screen.getByText(/You can delete everything/)).toBeInTheDocument();
    expect(
      screen.getByText(/This data has an expiration date/)
    ).toBeInTheDocument();
  });

  it("start button is disabled until checkbox is checked", () => {
    render(<ConsentPage />);
    const button = screen.getByRole("button", { name: /ready to start/i });
    expect(button).toBeDisabled();
  });

  it("enables start button when checkbox is checked", async () => {
    const user = userEvent.setup();
    render(<ConsentPage />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    const button = screen.getByRole("button", { name: /ready to start/i });
    expect(button).not.toBeDisabled();
  });

  it("navigates to /chat when agreed and clicked", async () => {
    const user = userEvent.setup();
    render(<ConsentPage />);

    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /ready to start/i }));

    expect(mockPush).toHaveBeenCalledWith("/chat");
  });
});
