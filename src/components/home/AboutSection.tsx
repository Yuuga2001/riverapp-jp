export function AboutSection() {
  return (
    <section
      className="max-w-[960px] mx-auto grid grid-cols-[1fr_2fr] gap-12 items-start opacity-0 animate-fade-up max-sm:grid-cols-1 max-sm:gap-4 max-sm:px-5 max-sm:py-10"
      style={{
        borderTopWidth: "0.5px",
        borderTopStyle: "solid",
        borderTopColor: "var(--color-border)",
        padding: "64px 32px",
        animationDelay: "0.2s",
      }}
      id="about"
    >
      <div className="font-mono text-[11px] text-text-tertiary tracking-[1.5px] uppercase pt-1">
        about
      </div>
      <div className="text-sm text-text-secondary leading-[1.9]">
        <p>
          個人開発者です。ゲームから便利ツールまで、思いついたものをとにかく作っています。
        </p>
        <p className="mt-4">
          スマホアプリ（iOS /
          Android）をメインに、WebアプリやPCツールもつくります。使ってくれる人がいると嬉しいです。
        </p>
        <p className="mt-4">お問い合わせは各アプリのサポートページからどうぞ。</p>
      </div>
    </section>
  );
}
