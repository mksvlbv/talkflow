import Link from "next/link";

export function BrandLogo({
  size = 14,
  showText = true,
  href = "/",
  className,
  children,
}: {
  size?: number;
  showText?: boolean;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const content = (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F0551E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
      {children
        ? children
        : showText && (
            <span className="font-mono text-xs tracking-[0.15em] text-white/70">
              TALKFLOW
            </span>
          )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`flex items-center gap-2 no-underline ${className ?? ""}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {content}
    </div>
  );
}
