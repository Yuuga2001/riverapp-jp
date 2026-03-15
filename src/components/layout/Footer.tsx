import Link from "next/link";

interface FooterProps {
  privacyHref?: string;
  contactHref?: string;
}

export function Footer({ privacyHref = "#", contactHref = "#" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border max-w-[960px] mx-auto px-8 py-6 flex justify-between items-center max-sm:px-5 max-sm:flex-col max-sm:gap-3 max-sm:text-center"
            style={{ borderTopWidth: "0.5px" }}>
      <span className="font-mono text-[11px] text-text-tertiary">
        &copy; {year} riverapp.jp
      </span>
      <div className="flex gap-5">
        <Link href={privacyHref} className="font-mono text-[11px] text-text-tertiary no-underline transition-colors duration-150 hover:text-text-secondary">
          privacy policy
        </Link>
        <Link href={contactHref} className="font-mono text-[11px] text-text-tertiary no-underline transition-colors duration-150 hover:text-text-secondary">
          contact
        </Link>
      </div>
    </footer>
  );
}
