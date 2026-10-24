import { education, experiences, expertise, profile, seo } from "@/lib/data";

const personId = `${profile.website}/#person`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: profile.nameVariants.filter((n) => n !== profile.name),
      givenName: "Abraham",
      familyName: "Konan Kouamé",
      jobTitle: profile.role,
      description: seo.description,
      url: profile.website,
      image: `${profile.website}/opengraph-image`,
      email: `mailto:${profile.email}`,
      telephone: profile.phone,
      nationality: { "@type": "Country", name: "Côte d'Ivoire" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Abidjan",
        addressCountry: "CI",
      },
      worksFor: { "@type": "Organization", name: experiences[0].company },
      alumniOf: { "@type": "CollegeOrUniversity", name: education[0].school },
      knowsAbout: [...new Set(expertise.flatMap((e) => e.tags))],
      knowsLanguage: ["fr"],
      sameAs: Object.values(profile.socials),
    },
    {
      "@type": "WebSite",
      "@id": `${profile.website}/#website`,
      url: profile.website,
      name: profile.shortName,
      inLanguage: "fr-CI",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${profile.website}/#profile`,
      url: profile.website,
      name: seo.title,
      inLanguage: "fr-CI",
      mainEntity: { "@id": personId },
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
