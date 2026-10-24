import { SectionHeading } from "@/components/section-heading";
import { education, stack } from "@/lib/data";

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6">
      <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionHeading index="05" label="Stack" title="Les outils que j'utilise au quotidien." />
          <dl className="divide-y border-y">
            {stack.map((group) => (
              <div key={group.group} className="grid gap-2 py-4 sm:grid-cols-[180px_1fr]">
                <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase sm:pt-0.5">
                  {group.group}
                </dt>
                <dd className="text-sm leading-relaxed">{group.items.join("  ·  ")}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <SectionHeading index="06" label="Formation" title="Parcours académique." />
          <ol className="space-y-8">
            {education.map((e) => (
              <li key={e.degree} className="border-l pl-5">
                <p className="font-mono text-xs text-primary">{e.period}</p>
                <p className="mt-1.5 font-medium">{e.degree}</p>
                <p className="text-sm text-muted-foreground">{e.school}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
