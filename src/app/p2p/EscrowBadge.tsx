import { EscrowShield3D } from "./PaymentSelect";
import { TEXT, TEXT_DIM, CYAN, PURPLE, GREEN } from "./shared";

type Tone = "cyan" | "purple" | "green";

const TONE: Record<Tone, { c: string; bg: string; border: string; shadow: string }> = {
  cyan: { c: CYAN, bg: "linear-gradient(180deg, rgba(0,229,255,0.16), rgba(0,229,255,0.04))", border: "rgba(0,229,255,0.55)", shadow: "0 0 28px rgba(0,229,255,0.30), inset 0 1px 0 rgba(255,255,255,0.08)" },
  purple: { c: PURPLE, bg: "linear-gradient(180deg, rgba(139,92,246,0.18), rgba(139,92,246,0.04))", border: "rgba(139,92,246,0.55)", shadow: "0 0 28px rgba(139,92,246,0.30), inset 0 1px 0 rgba(255,255,255,0.08)" },
  green: { c: GREEN, bg: "linear-gradient(180deg, rgba(74,222,128,0.18), rgba(74,222,128,0.04))", border: "rgba(74,222,128,0.55)", shadow: "0 0 28px rgba(74,222,128,0.30), inset 0 1px 0 rgba(255,255,255,0.08)" },
};

export function EscrowBadge({ tone = "cyan", title, sub, status, size = 44, style }: { tone?: Tone; title: string; sub: string; status?: string; size?: number; style?: React.CSSProperties }) {
  const t = TONE[tone];
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "center", padding: 14, borderRadius: 16, background: t.bg, border: `1.5px solid ${t.border}`, boxShadow: t.shadow, ...style }}>
      <EscrowShield3D size={size + 6} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 800, color: TEXT, letterSpacing: "-0.005em" }}>{title}</div>
        <div style={{ fontSize: 11.5, color: TEXT_DIM, marginTop: 3, lineHeight: 1.45 }}>{sub}</div>
      </div>
      {status && (
        <div style={{ padding: "6px 10px", borderRadius: 99, background: `${t.c}1F`, border: `1px solid ${t.c}66`, color: t.c, fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", display: "inline-flex", gap: 6, alignItems: "center", whiteSpace: "nowrap" }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: t.c, boxShadow: `0 0 8px ${t.c}` }} /> {status}
        </div>
      )}
    </div>
  );
}
