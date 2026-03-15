interface PromoSectionProps {
  text: string;
}

export function PromoSection({ text }: PromoSectionProps) {
  return (
    <section className="mx-auto max-w-[960px] px-8 pb-10 max-sm:px-5 max-sm:pb-8">
      <p className="text-lg font-normal text-text-primary leading-[1.8] tracking-[-0.2px] max-w-[640px] max-sm:text-base">
        {text}
      </p>
    </section>
  );
}
