import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppsContainer } from "../AppsContainer";
import { getAllApps } from "@/lib/apps";

const apps = getAllApps();

describe("AppsContainer", () => {
  it("初期状態で全アプリ名が表示される", () => {
    render(<AppsContainer apps={apps} />);

    expect(screen.getByText("HEXLIDE")).toBeInTheDocument();
    expect(screen.getByText("TileOut")).toBeInTheDocument();
    expect(screen.getByText("SakaMap")).toBeInTheDocument();
    expect(screen.getByText("QuickNote")).toBeInTheDocument();
  });

  it("「ゲーム」クリック後、game カテゴリのみ表示", async () => {
    const user = userEvent.setup();
    render(<AppsContainer apps={apps} />);

    await user.click(screen.getByRole("button", { name: "ゲーム" }));

    // game カテゴリのアプリは表示される
    expect(screen.getByText("HEXLIDE")).toBeInTheDocument();
    expect(screen.getByText("TileOut")).toBeInTheDocument();

    // app カテゴリのアプリは非表示
    expect(screen.queryByText("SakaMap")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Git Branch Name Generator")
    ).not.toBeInTheDocument();
  });

  it("「iOS」クリック後、iOS 対応アプリのみ表示", async () => {
    const user = userEvent.setup();
    render(<AppsContainer apps={apps} />);

    await user.click(screen.getByRole("button", { name: "iOS" }));

    // iOS 対応アプリは表示される
    expect(screen.getByText("HEXLIDE")).toBeInTheDocument();
    expect(screen.getByText("SakaMap")).toBeInTheDocument();

    // Web のみのアプリは非表示
    expect(screen.queryByText("TileOut")).not.toBeInTheDocument();
    expect(screen.queryByText("CELLS")).not.toBeInTheDocument();
  });

  it("AND フィルタ（ゲーム × iOS）で該当アプリのみ表示", async () => {
    const user = userEvent.setup();
    render(<AppsContainer apps={apps} />);

    await user.click(screen.getByRole("button", { name: "ゲーム" }));
    await user.click(screen.getByRole("button", { name: "iOS" }));

    // game × iOS = HEXLIDE のみ
    expect(screen.getByText("HEXLIDE")).toBeInTheDocument();
    expect(screen.queryByText("SakaMap")).not.toBeInTheDocument();
    expect(screen.queryByText("TileOut")).not.toBeInTheDocument();
  });
});
