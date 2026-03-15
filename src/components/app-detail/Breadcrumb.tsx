import Link from "next/link";

interface BreadcrumbProps {
  appName: string;
}

export function Breadcrumb({ appName }: BreadcrumbProps) {
  return (
    <div className="mx-auto max-w-[960px] px-8 pt-5 font-mono text-[11px] text-text-tertiary tracking-[0.3px] max-sm:px-5 max-sm:pt-4">
      <Link
        href="/"
        className="text-text-tertiary no-underline transition-colors duration-150 hover:text-text-secondary"
      >
        トップ
      </Link>
      <span className="mx-1.5 text-border">/</span>
      <Link
        href="/#apps"
        className="text-text-tertiary no-underline transition-colors duration-150 hover:text-text-secondary"
      >
        apps
      </Link>
      <span className="mx-1.5 text-border">/</span>
      <span className="text-text-secondary">{appName}</span>
    </div>
  );
}
