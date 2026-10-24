import { ImageResponse } from "next/og";

export const alt = "Abraham Konan Kouamé — Développeur Backend Node.js / NestJS à Abidjan, Côte d'Ivoire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#0c0e12";
const bone = "#eae6df";
const amber = "#f0a54a";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: ink,
          color: bone,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 12,
              border: `2px solid ${amber}`,
              color: amber,
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            AK
          </div>
          <div style={{ fontSize: 28, opacity: 0.7 }}>abrahamkonany.com</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -2, lineHeight: 1 }}>
            Abraham Konan Kouamé
          </div>
          <div style={{ fontSize: 48, color: amber }}>Développeur Backend</div>
          <div style={{ fontSize: 30, opacity: 0.7 }}>
            Node.js · NestJS · TypeScript · Mobile Money · Kubernetes
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, opacity: 0.6 }}>
          Abidjan, Côte d&apos;Ivoire
        </div>
      </div>
    ),
    size,
  );
}
