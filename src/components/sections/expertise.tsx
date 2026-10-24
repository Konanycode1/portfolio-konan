import { Boxes, CreditCard, Database, Server } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { expertise } from "@/lib/data";

const icons = [Server, CreditCard, Boxes, Database];

export function Expertise() {
  return (
    <section id="expertise" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6">
      <SectionHeading
        index="01"
        label="Expertise"
        title="Du schéma de données jusqu'au cluster, je porte le backend de bout en bout."
      />
      <div className="grid gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-2">
        {expertise.map((item, i) => {
          const Icon = icons[i];
          return (
            <article key={item.title} className="group bg-background p-8 transition-colors hover:bg-card">
              <div className="mb-6 flex items-center justify-between">
                <Icon className="size-5 text-primary" strokeWidth={1.5} />
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="font-mono font-normal text-muted-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
