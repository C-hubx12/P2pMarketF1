import * as React from "react";
import { Card, primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, TEXT_MUTE, STROKE, CYAN, PURPLE } from "./shared";

type Tone = "info" | "warn" | "muted";

const TONE: Record<Tone, { c: string; bg: string; border: string }> = {
  info: { c: CYAN, bg: "rgba(0,229,255,0.08)", border: "rgba(0,229,255,0.28)" },
  warn: { c: "#F59E0B", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.32)" },
  muted: { c: TEXT_DIM, bg: "rgba(120,170,220,0.06)", border: STROKE },
};

export function StateCard({
  icon, eyebrow, title, sub, primary, secondary, tone = "info",
}: {
  icon?: React.ReactNode;
  eyebrow?: string;
  title: string;
  sub?: string;
  primary?: { label: string; onClick: () => void };
  secondary?: { label: string; onClick: () => void };
  tone?: Tone;
}) {
  const t = TONE[tone];
  return (
    <Card accent={tone === "warn" ? "purple" : "cyan"} style={{ padding: 28, maxWidth: 480, margin: "24px auto", textAlign: "center" }}>
      {icon && (
        <div style={{ width: 64, height: 64, borderRadius: 18, margin: "0 auto 14px", background: t.bg, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: t.c, boxShadow: `0 0 24px ${t.bg}` }}>{icon}</div>
      )}
      {eyebrow && <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.22em", color: t.c }}>{eyebrow}</div>}
      <div style={{ marginTop: 6, fontSize: 18, fontWeight: 800, color: TEXT }}>{title}</div>
      {sub && <div style={{ marginTop: 8, fontSize: 13, color: TEXT_DIM, lineHeight: 1.5, maxWidth: 360, margin: "8px auto 0" }}>{sub}</div>}
      {(primary || secondary) && (
        <div style={{ marginTop: 18, display: "flex", gap: 10, justifyContent: "center" }}>
          {secondary && <button onClick={secondary.onClick} style={{ ...secondaryBtnStyle(46), minWidth: 140 }}>{secondary.label}</button>}
          {primary && <button onClick={primary.onClick} style={{ ...primaryBtnStyle(46), minWidth: 160, width: "auto", padding: "0 22px" }}>{primary.label}</button>}
        </div>
      )}
    </Card>
  );
}

export function Skeleton({ height = 14, width = "100%", radius = 8, style }: { height?: number | string; width?: number | string; radius?: number; style?: React.CSSProperties }) {
  return (
    <div style={{
      height, width, borderRadius: radius,
      background: "linear-gradient(90deg, rgba(120,170,220,0.06) 0%, rgba(120,170,220,0.18) 50%, rgba(120,170,220,0.06) 100%)",
      backgroundSize: "200% 100%",
      animation: "chxShimmer 1.6s linear infinite",
      ...style,
    }} />
  );
}

export function OfferCardSkeleton() {
  return (
    <Card style={{ padding: 18 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Skeleton width={44} height={44} radius={99} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <Skeleton width="40%" height={14} />
          <Skeleton width="60%" height={11} />
        </div>
        <Skeleton width={84} height={36} radius={12} />
      </div>
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <Skeleton height={28} />
        <Skeleton height={28} />
        <Skeleton height={28} />
      </div>
    </Card>
  );
}
