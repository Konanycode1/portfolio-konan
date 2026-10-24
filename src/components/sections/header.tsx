import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data";

const links = [
  { href: "#expertise", label: "Expertise" },
  { href: "#architecture", label: "Architecture" },
  { href: "#experience", label: "Expérience" },
  { href: "#projets", label: "Projets" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-md border border-primary/40 font-mono text-xs font-semibold text-primary">
            AK
          </span>
          <span className="text-sm font-medium">{profile.shortName}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <SocialLinks className="hidden sm:flex" />
          <Button asChild size="sm">
            <a href="#contact">Me contacter</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
