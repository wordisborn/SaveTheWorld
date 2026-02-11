import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Landing page", () => {
  it("renders the headline", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toHaveTextContent(/listening/i);
  });

  it("renders the CTA link to /join", () => {
    render(<Home />);
    const cta = screen.getByRole("link", { name: /let.s talk/i });
    expect(cta).toHaveAttribute("href", "/join");
  });

  it("renders the About sections", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /what is this/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /how does it work/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /what about my privacy/i })
    ).toBeInTheDocument();
  });

  it("renders the nav with project name", () => {
    render(<Home />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveTextContent("Teacher Voice");
  });

  it("renders the About anchor link in nav", () => {
    render(<Home />);
    const aboutLink = screen.getByRole("link", { name: "About" });
    expect(aboutLink).toHaveAttribute("href", "#about");
  });
});
