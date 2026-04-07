export function SectionShell({
  id,
  as: Tag = "section",
  children,
  className,
  maxWidth = 1200,
  noBorderTop = false,
}: {
  id?: string;
  as?: "section" | "footer" | "div";
  children: React.ReactNode;
  className?: string;
  maxWidth?: number;
  noBorderTop?: boolean;
}) {
  return (
    <Tag
      id={id}
      className={`relative z-[3] bg-background px-6 py-32 lg:px-12 ${noBorderTop ? "" : "border-t border-line"} ${className ?? ""}`}
    >
      <div className="mx-auto" style={{ maxWidth }}>
        {children}
      </div>
    </Tag>
  );
}
