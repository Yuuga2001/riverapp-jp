import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("category=game で 'game' テキストが表示される", () => {
    render(<Badge category="game" />);
    expect(screen.getByText("game")).toBeInTheDocument();
  });

  it("category=app で 'app' テキストが表示される", () => {
    render(<Badge category="app" />);
    expect(screen.getByText("app")).toBeInTheDocument();
  });
});
