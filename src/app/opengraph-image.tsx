import { ImageResponse } from "next/og";

export const alt = "Lucas Maingi — AI/ML engineer and full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: monogram + label */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              border: "2px solid #3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f5f5f5",
              fontSize: 30,
              fontWeight: 700,
              marginRight: 20,
            }}
          >
            LM
          </div>
          <div style={{ color: "#3b82f6", fontSize: 24, letterSpacing: 4, textTransform: "uppercase" }}>
            AI/ML Engineer · Full-Stack Developer
          </div>
        </div>

        {/* Middle: name + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#f5f5f5", fontSize: 84, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>
            Lucas Maingi
          </div>
          <div style={{ color: "#a3a3a3", fontSize: 34, marginTop: 24, lineHeight: 1.3 }}>
            Web applications, machine learning & LLM integrations
          </div>
        </div>

        {/* Bottom: project keywords + url */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ color: "#737373", fontSize: 24 }}>
            Python · FastAPI · React/Next.js · ML · LLM APIs · payments
          </div>
          <div style={{ color: "#f5f5f5", fontSize: 24, fontWeight: 600 }}>lucasmaingi.vercel.app</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
