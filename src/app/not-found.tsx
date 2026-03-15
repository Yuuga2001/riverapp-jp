import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[960px] px-8 pt-24 pb-32 text-center max-sm:px-5 max-sm:pt-16 max-sm:pb-24 animate-fade-up">
      <p className="font-mono text-[64px] font-light text-text-tertiary tracking-[-2px] mb-4 max-sm:text-[48px]">
        404
      </p>
      <h1 className="font-sans text-[18px] font-medium text-text-primary mb-3 max-sm:text-[16px]">
        ページが見つかりません
      </h1>
      <p className="font-sans text-[14px] font-light text-text-secondary mb-10">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="inline-block font-mono text-[12px] text-text-secondary tracking-[0.3px] no-underline border border-border rounded-md px-6 py-2.5 transition-colors duration-150 hover:text-text-primary hover:border-border-hover"
      >
        トップページへ戻る
      </Link>
    </section>
  );
}
