import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

const COLORS = {
  bg: "#0a0a0f",
  bgCard: "#12121a",
  text: "#e4e4e7",
  textMuted: "#71717a",
  green: "#22c55e",
  red: "#ef4444",
  greenDim: "rgba(34,197,94,0.12)",
  redDim: "rgba(239,68,68,0.12)",
};

const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// --- Slide 1: Problem ---
const SlideProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({ frame, fps, from: 60, to: 0, config: { damping: 14 } });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const items = ["Asset Flips", "Shovelware", "Abandoned Games", "AI Slop"];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 48,
            marginBottom: 40,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          😩
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 64,
            fontWeight: 800,
            color: COLORS.text,
            lineHeight: 1.15,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 48,
          }}
        >
          Your Steam Library
          <br />
          Is Full of{" "}
          <span style={{ color: COLORS.red }}>Slop</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          {items.map((item, i) => {
            const delay = 20 + i * 8;
            const itemSpring = spring({ frame: frame - delay, fps, from: 40, to: 0, config: { damping: 12 } });
            const itemOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div
                key={item}
                style={{
                  fontFamily,
                  fontSize: 36,
                  color: COLORS.red,
                  background: COLORS.redDim,
                  padding: "14px 40px",
                  borderRadius: 16,
                  fontWeight: 600,
                  opacity: itemOpacity,
                  transform: `translateY(${itemSpring}px)`,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- Slide 2: Solution ---
const SlideSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, from: 0.7, to: 1, config: { damping: 12 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const badgeY = spring({ frame: frame - 25, fps, from: 30, to: 0, config: { damping: 14 } });
  const badgeOp = interpolate(frame, [25, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          textAlign: "center",
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 32 }}>🧹</div>
        <div
          style={{
            fontFamily,
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.text,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Steam Slop
          <br />
          <span style={{ color: COLORS.green }}>Cleaner</span>
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 34,
            color: COLORS.textMuted,
            lineHeight: 1.5,
            marginBottom: 48,
          }}
        >
          Instantly find and filter
          <br />
          low-quality games in
          <br />
          your library
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 28,
            color: COLORS.green,
            background: COLORS.greenDim,
            display: "inline-block",
            padding: "12px 32px",
            borderRadius: 100,
            fontWeight: 600,
            opacity: badgeOp,
            transform: `translateY(${badgeY}px)`,
          }}
        >
          100% Free · No Login
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- Slide 3: Features ---
const SlideFeatures: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const features = [
    { icon: "🔍", label: "Slop Detection", color: COLORS.red },
    { icon: "📊", label: "Quality Scoring", color: COLORS.green },
    { icon: "🏷️", label: "Smart Categories", color: "#a855f7" },
    { icon: "⚡", label: "Instant Results", color: COLORS.green },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        <div
          style={{
            fontFamily,
            fontSize: 52,
            fontWeight: 800,
            color: COLORS.text,
            marginBottom: 56,
            opacity: titleOp,
          }}
        >
          What You Get
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
          {features.map((f, i) => {
            const delay = 10 + i * 10;
            const s = spring({ frame: frame - delay, fps, from: 50, to: 0, config: { damping: 12 } });
            const op = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div
                key={f.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  background: COLORS.bgCard,
                  border: `2px solid ${f.color}33`,
                  borderRadius: 20,
                  padding: "24px 48px",
                  width: 700,
                  opacity: op,
                  transform: `translateX(${s}px)`,
                }}
              >
                <span style={{ fontSize: 44 }}>{f.icon}</span>
                <span
                  style={{
                    fontFamily,
                    fontSize: 36,
                    fontWeight: 700,
                    color: COLORS.text,
                  }}
                >
                  {f.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- Slide 4: CTA ---
const SlideCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, from: 0.8, to: 1, config: { damping: 10 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const pulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.96, 1.04]);

  const arrowOp = interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.08) 0%, ${COLORS.bg} 70%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          textAlign: "center",
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <div style={{ fontSize: 72, marginBottom: 32 }}>🧹</div>
        <div
          style={{
            fontFamily,
            fontSize: 60,
            fontWeight: 800,
            color: COLORS.text,
            lineHeight: 1.15,
            marginBottom: 48,
          }}
        >
          Clean Your
          <br />
          Library <span style={{ color: COLORS.green }}>Now</span>
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 36,
            fontWeight: 700,
            color: "#000",
            background: COLORS.green,
            padding: "24px 64px",
            borderRadius: 20,
            display: "inline-block",
            transform: `scale(${pulse})`,
          }}
        >
          Try It Free →
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 24,
            color: COLORS.textMuted,
            marginTop: 40,
            opacity: arrowOp,
          }}
        >
          steam-slop-cleaner.netlify.app
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- Main Composition ---
export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <Sequence from={0} durationInFrames={90}>
        <SlideProblem />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <SlideSolution />
      </Sequence>
      <Sequence from={180} durationInFrames={90}>
        <SlideFeatures />
      </Sequence>
      <Sequence from={270} durationInFrames={90}>
        <SlideCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
