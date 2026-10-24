import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  label,
  title,
  className,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 max-w-2xl", className)}>
      <p className="mb-4 font-mono text-xs tracking-widest text-primary uppercase">
        {index} — {label}
      </p>
      <h2 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
