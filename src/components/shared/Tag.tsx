interface TagProps {
  label: string;
  compact?: boolean;
}

export function Tag({ label, compact }: TagProps) {
  return (
    <span
      className={`font-sans font-normal border border-border bg-transparent text-text-secondary tracking-[0.2px] whitespace-nowrap rounded-xl ${
        compact
          ? "text-[10px] px-2 py-[2px]"
          : "text-[11px] px-[10px] py-[3px]"
      }`}
      style={{ borderWidth: "0.5px" }}
    >
      {label}
    </span>
  );
}
