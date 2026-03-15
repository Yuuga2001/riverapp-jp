import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterSection } from "../FilterSection";

describe("FilterSection", () => {
  const defaultProps = {
    activeCategory: "all" as const,
    activePlatform: "all" as const,
    onCategoryChange: vi.fn(),
    onPlatformChange: vi.fn(),
  };

  it("全カテゴリボタンが描画される", () => {
    render(<FilterSection {...defaultProps} />);
    expect(screen.getByText("ゲーム")).toBeInTheDocument();
    expect(screen.getByText("アプリ")).toBeInTheDocument();
    // 「すべて」はカテゴリとプラットフォームの両方にあるため2件
    expect(screen.getAllByText("すべて")).toHaveLength(2);
  });

  it("全プラットフォームボタンが描画される", () => {
    render(<FilterSection {...defaultProps} />);
    expect(screen.getByText("Web")).toBeInTheDocument();
    expect(screen.getByText("iOS")).toBeInTheDocument();
    expect(screen.getByText("Android")).toBeInTheDocument();
  });

  it("アクティブなボタンに aria-pressed=true が付く", () => {
    render(
      <FilterSection
        {...defaultProps}
        activeCategory="game"
        activePlatform="ios"
      />
    );

    const gameButton = screen.getByText("ゲーム");
    expect(gameButton).toHaveAttribute("aria-pressed", "true");

    const iosButton = screen.getByText("iOS");
    expect(iosButton).toHaveAttribute("aria-pressed", "true");

    // 非アクティブな「すべて」ボタンは両方 false
    const allButtons = screen.getAllByText("すべて");
    allButtons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-pressed", "false");
    });
  });

  it("カテゴリボタンクリックで onCategoryChange が呼ばれる", async () => {
    const user = userEvent.setup();
    const onCategoryChange = vi.fn();
    render(
      <FilterSection {...defaultProps} onCategoryChange={onCategoryChange} />
    );

    await user.click(screen.getByText("ゲーム"));
    expect(onCategoryChange).toHaveBeenCalledWith("game");
  });

  it("プラットフォームボタンクリックで onPlatformChange が呼ばれる", async () => {
    const user = userEvent.setup();
    const onPlatformChange = vi.fn();
    render(
      <FilterSection {...defaultProps} onPlatformChange={onPlatformChange} />
    );

    await user.click(screen.getByText("iOS"));
    expect(onPlatformChange).toHaveBeenCalledWith("ios");
  });
});
