export function MetaLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-primary ${className ?? ""}`}
    >
      <span className="inline-block size-1 bg-primary" aria-hidden="true" />
      {children}
    </p>
  );
}
