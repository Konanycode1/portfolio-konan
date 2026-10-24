import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projets" className="scroll-mt-16 border-y bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          index="04"
          label="Projets"
          title="Des plateformes réelles, avec de vrais utilisateurs et de vrais paiements."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.name} className="bg-background">
              <CardHeader>
                <p className="font-mono text-xs text-muted-foreground">{project.context}</p>
                <CardTitle className="text-2xl font-medium">{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <p className="leading-relaxed text-muted-foreground">{project.summary}</p>
                <ul className="space-y-2.5 border-l border-primary/40 pl-4">
                  {project.highlights.map((h) => (
                    <li key={h} className="text-sm">
                      {h}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <Badge key={s} variant="outline" className="font-mono font-normal text-muted-foreground">
                    {s}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
