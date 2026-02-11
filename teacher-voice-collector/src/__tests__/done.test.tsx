import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DonePage from "@/app/done/page";

describe("Done page", () => {
  it("renders the thank you heading", () => {
    render(<DonePage />);
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toHaveTextContent(/conversation is saved/i);
  });

  it("renders the share link", () => {
    render(<DonePage />);
    expect(screen.getByText(/teachervoice.org\/join/)).toBeInTheDocument();
  });

  it("has a copy link button", () => {
    render(<DonePage />);
    expect(
      screen.getByRole("button", { name: /copy link/i })
    ).toBeInTheDocument();
  });

  it("has a link to dashboard", () => {
    render(<DonePage />);
    const link = screen.getByRole("link", { name: /view my conversations/i });
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("has a link to home", () => {
    render(<DonePage />);
    const link = screen.getByRole("link", { name: /^done$/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
