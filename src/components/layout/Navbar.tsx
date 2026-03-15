import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-100 bg-bg/88 backdrop-blur-[12px] border-b border-border"
         style={{ borderBottomWidth: "0.5px" }}>
      <div className="max-w-[960px] mx-auto px-8 h-14 flex items-center justify-between max-sm:px-5">
        <Link href="/" className="font-mono text-[13px] font-normal text-text-primary tracking-[-0.2px] no-underline">
          riverapp<span className="text-text-tertiary">.jp</span>
        </Link>
        <ul className="flex gap-7 list-none">
          <li>
            <Link href="/#apps" className="font-mono text-xs text-text-secondary no-underline tracking-[0.3px] transition-colors duration-150 hover:text-text-primary">
              apps
            </Link>
          </li>
          <li>
            <Link href="/#about" className="font-mono text-xs text-text-secondary no-underline tracking-[0.3px] transition-colors duration-150 hover:text-text-primary">
              about
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
