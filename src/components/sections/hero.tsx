import { ArrowDownRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile, stats } from "@/lib/data";

const trace = [
  { span: "auth.jwt.verify", start: 0, ms: 2 },
  { span: "orders.validate", start: 2, ms: 1 },
  { span: "db.orders.create", start: 3, ms: 14 },
  { span: "payments.stripe.intent", start: 17, ms: 138 },
  { span: "queue.shipping.ups", start: 155, ms: 4 },
  { span: "cache.redis.invalidate", start: 159, ms: 2 },
];
const total = 161;

function RequestTrace() {
  return (
    <div className="rounded-xl border bg-card shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b px-4 py-3 font-mono text-xs">
        <span>
          <span className="text-primary">POST</span> /v1/orders
        </span>
        <span className="text-muted-foreground">
          201 · <span className="text-foreground">{total} ms</span>
        </span>
      </div>
      <ul className="space-y-2.5 p-4 font-mono text-[11px] sm:text-xs">
        {trace.map((row, i) => (
          <li key={row.span} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5">
            <span className="truncate text-muted-foreground">
              <span className="text-border">{i === trace.length - 1 ? "└─" : "├─"}</span>{" "}
              {row.span}
            </span>
            <span className="text-right tabular-nums text-muted-foreground">{row.ms} ms</span>
            <span className="relative col-span-2 h-1.5 rounded-full bg-muted">
              <span
                className="absolute inset-y-0 rounded-full bg-primary"
                style={{
                  left: `${(row.start / total) * 100}%`,
                  width: `max(${(row.ms / total) * 100}%, 4px)`,
                  opacity: row.ms > 50 ? 1 : 0.55,
                }}
              />
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 border-t px-4 py-3 font-mono text-[11px] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-primary" />
        idempotency-key vérifiée · webhook en file
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pt-20 pb-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pt-28">
        <div>
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Ouvert aux nouvelles opportunités
          </p>
          <h1 className="mb-5 font-mono text-xs tracking-wider text-muted-foreground uppercase sm:text-sm">
            {profile.shortName} · {profile.role} à Abidjan, Côte d&apos;Ivoire
          </h1>
          <p className="text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl">
            Je conçois des backends qui{" "}
            <span className="font-serif text-primary italic">tiennent la charge</span>.
          </p>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
            Développeur backend Node.js, NestJS et TypeScript. APIs REST, paiements Mobile
            Money et Stripe, files de traitement et infrastructure Kubernetes pour des
            plateformes en production, en Côte d&apos;Ivoire et à l&apos;international.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-11 px-5">
              <a href="#experience">
                Voir mon parcours
                <ArrowDownRight data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-5">
              <a href={`mailto:${profile.email}`}>
                <Mail data-icon="inline-start" />
                {profile.email}
              </a>
            </Button>
          </div>
        </div>
        <RequestTrace />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <dl className="grid grid-cols-2 overflow-hidden rounded-xl border bg-border gap-px lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background p-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-3xl font-medium tracking-tight">{stat.value}</dd>
              <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
