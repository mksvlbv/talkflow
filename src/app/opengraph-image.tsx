import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TalkFlow — Voice to Structured Content";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#060606",
          padding: "60px 70px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-100px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(240,85,30,0.15) 0%, rgba(240,85,30,0.05) 40%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-300px",
            left: "-200px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(240,85,30,0.08) 0%, transparent 60%)",
            display: "flex",
          }}
        />

        {/* Border frame */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            right: "24px",
            bottom: "24px",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            display: "flex",
          }}
        />

        {/* Top: Logo + badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* Logo mark */}
            <div
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#F0551E",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: "22px",
                fontWeight: 600,
                color: "white",
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
              }}
            >
              TalkFlow
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#4ade80",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
              }}
            >
              Live on Vercel
            </span>
          </div>
        </div>

        {/* Center: Main headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "#F0551E",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "1px",
                backgroundColor: "#F0551E",
                display: "flex",
              }}
            />
            Voice-to-Content Engine
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 300,
              color: "white",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Record your thoughts.</span>
            <span>
              Get <span style={{ color: "#F0551E", fontWeight: 400 }}>publish-ready</span> content.
            </span>
          </div>
        </div>

        {/* Bottom: Tech badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {["Next.js 16", "React 19", "OpenAI", "Stripe", "Clerk"].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: "6px 14px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.45)",
                    letterSpacing: "0.04em",
                    display: "flex",
                  }}
                >
                  {tech}
                </div>
              ),
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "2px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.05em",
              }}
            >
              talkflow-five.vercel.app
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
