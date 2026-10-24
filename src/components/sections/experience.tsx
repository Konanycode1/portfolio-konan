import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6">
      <SectionHeading
        index="03"
        label="Expérience"
        title="Trois ans à livrer du backend en production, de l'API jusqu'à l'infrastructure."
      />
      <ol className="relative">
        {experiences.map((exp) => (
          <li
            key={exp.company}
            className="grid gap-4 border-t py-10 md:grid-cols-[220px_1fr] md:gap-12"
          >
            <div className="space-y-2">
              <p className="font-mono text-xs text-muted-foreground">{exp.period}</p>
              {exp.current && (
                <Badge className="font-mono font-normal">En poste</Badge>
              )}
            </div>
            <div>
              <h3 className="text-xl font-medium">
                {exp.role}
                <span className="text-muted-foreground"> · </span>
                <span className={cn(exp.current && "text-primary")}>{exp.company}</span>
              </h3>
              <ul className="mt-4 space-y-2">
                {exp.points.map((point) => (
                  <li key={point} className="flex gap-3 leading-relaxed text-muted-foreground">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-primary/60" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {exp.stack.map((s) => (
                  <Badge key={s} variant="secondary" className="font-mono font-normal">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
