import { ChevronDown, ChevronRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { principles } from "@/lib/data";
import { cn } from "@/lib/utils";

const layers = [
  { title: "Clients", nodes: ["Web · React", "Web · Next.js", "Mobile · React Native"] },
  { title: "Edge", nodes: ["Nginx", "Traefik", "JWT · OAuth2"] },
  {
    title: "Services NestJS",
    nodes: ["Orders", "Payments", "Shipping", "Users"],
    highlight: true,
  },
  { title: "Données & async", nodes: ["MongoDB · Prisma", "Redis · BullMQ", "Webhooks"] },
  { title: "Fournisseurs", nodes: ["Stripe · PayPal", "Mobile Money", "UPS · USPS"] },
];

function Diagram() {
  return (
    <figure className="rounded-xl border bg-card p-4 sm:p-6">
      <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
        {layers.map((layer, i) => (
          <div key={layer.title} className="contents">
            <div
              className={cn(
                "flex-1 rounded-lg border p-4",
                layer.highlight ? "border-primary/50 bg-accent" : "bg-background",
              )}
            >
              <p
                className={cn(
                  "mb-3 font-mono text-[11px] tracking-wider uppercase",
                  layer.highlight ? "text-primary" : "text-muted-foreground",
                )}
              >
                {layer.title}
              </p>
              <ul className={cn("grid gap-1.5", layer.highlight && "grid-cols-2 lg:grid-cols-1")}>
                {layer.nodes.map((node) => (
                  <li
                    key={node}
                    className="rounded-md border bg-background/60 px-2.5 py-1.5 font-mono text-xs"
                  >
                    {node}
                  </li>
                ))}
              </ul>
            </div>
            {i < layers.length - 1 && (
              <div className="flex justify-center text-muted-foreground" aria-hidden>
                <ChevronRight className="hidden size-4 lg:block" />
                <ChevronDown className="size-4 lg:hidden" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-lg border border-dashed px-4 py-3 font-mono text-xs text-muted-foreground">
        <span className="text-primary">déployé sur</span>
        Docker <span className="text-border">/</span> K3s <span className="text-border">/</span>
        Argo CD <span className="text-border">/</span> GitHub Actions
      </div>
      <figcaption className="mt-4 text-center text-xs text-muted-foreground">
        Vue simplifiée d&apos;une plateforme e-commerce telle que je la conçois.
      </figcaption>
    </figure>
  );
}

export function Architecture() {
  return (
    <section id="architecture" className="scroll-mt-16 border-y bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          index="02"
          label="Architecture"
          title={
            <>
              Des systèmes pensés pour{" "}
              <span className="font-serif text-primary italic">durer</span>, pas seulement
              pour fonctionner.
            </>
          }
        />
        <Diagram />
        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.title} className="flex gap-5">
              <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-medium">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
