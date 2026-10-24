import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <p className="mb-4 font-mono text-xs tracking-widest text-primary uppercase">
          07 — Contact
        </p>
        <h2 className="max-w-3xl text-4xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
          Un backend à construire, à fiabiliser ou à{" "}
          <span className="font-serif text-primary italic">faire passer à l&apos;échelle</span>
          &nbsp;?
        </h2>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Je suis ouvert aux postes backend et aux missions où la fiabilité compte. Écrivez-moi.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-11 px-5">
            <a href={`mailto:${profile.email}`}>
              Écrire un email
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11 px-5">
            <a href={profile.phoneHref}>
              <Phone data-icon="inline-start" />
              {profile.phone}
            </a>
          </Button>
        </div>

        <Separator className="mt-24 mb-8" />
        <footer className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {profile.name}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {profile.location}
            </span>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
              <Mail className="size-3.5" /> {profile.email}
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
