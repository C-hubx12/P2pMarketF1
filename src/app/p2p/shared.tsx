import * as React from "react";
import chxLogo from "../../imports/image.png";
import { ChevronDown, Check } from "lucide-react";

export const BG_1 = "#05070F";
export const BG_2 = "#0A0F1F";
export const CARD_BG = "rgba(13, 20, 40, 0.6)";
export const CYAN = "#00E5FF";
export const CYAN_SOFT = "rgba(0,229,255,0.35)";
export const BLUE = "#2E7BFF";
export const PURPLE = "#8B5CF6";
export const PURPLE_SOFT = "rgba(139,92,246,0.35)";
export const GREEN = "#4ADE80";
export const TEXT = "#F1F5FF";
export const TEXT_DIM = "#A8B5D1";
export const TEXT_MUTE = "#5B6A8A";
export const STROKE = "rgba(120,170,220,0.12)";

export const ShieldLogo = ({ size = 44 }: { size?: number }) => (
  <div style={{ position: "relative", width: size, height: size, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,194,255,0.5), rgba(58,123,255,0.22) 55%, transparent 75%)", filter: "blur(8px)", zIndex: 0 }} />
    <img src={chxLogo} alt="CoinHubX" style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(0,194,255,0.45))" }} />
  </div>
);

export function Pill({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: "rgba(13,20,40,0.6)", border: `1px solid ${STROKE}`, color: TEXT, fontSize: 13, fontWeight: 500 }}>{children}</div>;
}

export function RoundBtn({ children, glow, onClick }: { children: React.ReactNode; glow?: boolean; onClick?: () => void }) {
  return <button onClick={onClick} style={{ position: "relative", width: 40, height: 40, borderRadius: 999, background: "rgba(13,20,40,0.6)", border: `1px solid ${glow ? CYAN_SOFT : STROKE}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: glow ? `0 0 14px rgba(0,229,255,0.2)` : "none" }}>{children}</button>;
}

export function Card({ children, accent = "cyan", bright, style, className }: { children: React.ReactNode; accent?: "cyan" | "purple" | "none"; bright?: boolean; style?: React.CSSProperties; className?: string }) {
  const ring = accent === "cyan" ? `1px solid rgba(0,229,255,${bright ? 0.45 : 0.22})` : accent === "purple" ? `1px solid rgba(139,92,246,${bright ? 0.45 : 0.22})` : `1px solid ${STROKE}`;
  const glow = accent === "cyan" ? `0 0 ${bright ? 40 : 24}px rgba(0,229,255,${bright ? 0.18 : 0.05})` : accent === "purple" ? `0 0 ${bright ? 40 : 24}px rgba(139,92,246,${bright ? 0.18 : 0.05})` : "none";
  return <div className={className} style={{ position: "relative", borderRadius: 24, background: bright ? "linear-gradient(180deg, rgba(16,24,52,0.8), rgba(8,12,30,0.9))" : CARD_BG, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: ring, boxShadow: `0 1px 0 rgba(255,255,255,0.04) inset, ${glow}`, transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease", ...style }}>{children}</div>;
}

export function IconTile({ color, children, size = 38 }: { color: "cyan" | "purple" | "blue"; children: React.ReactNode; size?: number }) {
  const map = { cyan: CYAN, purple: PURPLE, blue: BLUE };
  const bgMap = { cyan: "linear-gradient(180deg, rgba(0,229,255,0.18), rgba(0,229,255,0.04))", purple: "linear-gradient(180deg, rgba(139,92,246,0.18), rgba(139,92,246,0.04))", blue: "linear-gradient(180deg, rgba(46,123,255,0.2), rgba(46,123,255,0.04))" };
  const borderMap = { cyan: CYAN_SOFT, purple: PURPLE_SOFT, blue: "rgba(46,123,255,0.4)" };
  const shadowMap = { cyan: "rgba(0,229,255,0.25)", purple: "rgba(139,92,246,0.25)", blue: "rgba(46,123,255,0.3)" };
  return <div style={{ width: size, height: size, borderRadius: 10, background: bgMap[color], border: `1px solid ${borderMap[color]}`, display: "flex", alignItems: "center", justifyContent: "center", color: map[color], boxShadow: `0 0 14px ${shadowMap[color]}, inset 0 1px 0 rgba(255,255,255,0.08)`, flexShrink: 0 }}>{children}</div>;
}

export const input: React.CSSProperties = {
  height: 48, padding: "0 16px", borderRadius: 14,
  background: "linear-gradient(180deg, rgba(5,8,20,0.85), rgba(8,12,28,0.65))",
  border: `1px solid rgba(0,229,255,0.18)`, color: TEXT, fontSize: 14, fontWeight: 500, outline: "none", width: "100%", fontFamily: "inherit",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 14px rgba(0,229,255,0.04), inset 0 0 0 1px rgba(0,0,0,0.2)",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", color: TEXT_MUTE, marginBottom: 6 }}>{label}</div>
      {children}
      {hint && <div style={{ fontSize: 11, color: TEXT_MUTE, marginTop: 6 }}>{hint}</div>}
    </div>
  );
}

export function SelectBox({ value, options, onChange }: { value: string; options: string[]; onChange?: (v: string) => void }) {
  return (
    <div style={{ position: "relative" }}>
      <select value={value} onChange={(e) => onChange?.(e.target.value)} style={{ ...input, appearance: "none", paddingRight: 34, cursor: "pointer" }}>
        {options.map((o) => <option key={o} style={{ background: "#07101f" }}>{o}</option>)}
      </select>
      <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM, pointerEvents: "none" }} />
    </div>
  );
}

export function AssetSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const assets = ["USDT", "USDC", "BTC", "ETH"];
  return (
    <div style={{ position: "relative" }}>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ ...input, appearance: "none", paddingLeft: 40, paddingRight: 34, cursor: "pointer", fontWeight: 600 }}>
        {assets.map((a) => <option key={a} style={{ background: "#07101f" }}>{a}</option>)}
      </select>
      <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 22, height: 22, borderRadius: 99, background: "#26A17B", color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>₮</div>
      <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM, pointerEvents: "none" }} />
    </div>
  );
}

export function TrustChip({ icon, label, tone }: { icon: React.ReactNode; label: string; tone: "cyan" | "purple" | "green" }) {
  const c = tone === "cyan" ? CYAN : tone === "purple" ? PURPLE : GREEN;
  const bg = tone === "cyan" ? "rgba(0,229,255,0.08)" : tone === "purple" ? "rgba(139,92,246,0.08)" : "rgba(74,222,128,0.08)";
  const border = tone === "cyan" ? CYAN_SOFT : tone === "purple" ? PURPLE_SOFT : "rgba(74,222,128,0.35)";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 999, background: bg, border: `1px solid ${border}`, color: c, fontSize: 11, fontWeight: 700, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
      {icon}{label}
    </div>
  );
}

export const primaryBtnStyle = (height = 56): React.CSSProperties => ({
  position: "relative", overflow: "hidden", width: "100%", height, borderRadius: 16,
  border: "1px solid rgba(180,230,255,0.75)",
  background: `linear-gradient(180deg, #9FF5FF 0%, ${CYAN} 18%, #0096D6 55%, ${BLUE} 100%)`,
  color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em",
  boxShadow: `0 22px 44px rgba(46,123,255,0.55), 0 0 60px rgba(0,229,255,0.45), 0 0 100px rgba(0,229,255,0.2), inset 0 2.5px 0 rgba(255,255,255,0.6), inset 0 -2.5px 0 rgba(0,30,60,0.5), inset 0 0 0 1.5px rgba(255,255,255,0.18)`,
  textShadow: "0 1px 1.5px rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
});

export const secondaryBtnStyle = (height = 48): React.CSSProperties => ({
  position: "relative", height, padding: "0 18px", borderRadius: 12,
  border: `1px solid ${STROKE}`,
  background: "linear-gradient(180deg, rgba(13,20,40,0.7), rgba(8,12,28,0.85))",
  color: TEXT, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
});

export type StepperStep = { label: string };

export function Stepper({ steps, current }: { steps: StepperStep[]; current: number }) {
  return (
    <div className="chx-stepper" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", borderRadius: 16, background: "linear-gradient(180deg, rgba(13,20,40,0.7), rgba(8,12,28,0.85))", border: `1px solid ${STROKE}`, boxShadow: `0 1px 0 rgba(255,255,255,0.04) inset, 0 0 22px rgba(0,229,255,0.06)` }}>
      {/* connector line */}
      <div style={{ position: "absolute", left: 36, right: 36, top: "50%", height: 2, background: "rgba(120,170,220,0.12)", transform: "translateY(-50%)", borderRadius: 99 }} />
      <div style={{ position: "absolute", left: 36, top: "50%", height: 2, width: `calc(${(current / (steps.length - 1)) * 100}% * (1 - 72px / 100%))`, background: `linear-gradient(90deg, ${CYAN}, ${PURPLE})`, transform: "translateY(-50%)", borderRadius: 99, boxShadow: `0 0 12px ${CYAN_SOFT}`, transition: "width 0.4s ease" }} />
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={s.label} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 1, flex: 1 }}>
            <div style={{ width: 28, height: 28, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", background: done ? `linear-gradient(180deg, ${CYAN}, #0096D6)` : active ? `linear-gradient(180deg, #9FF5FF 0%, ${CYAN} 50%, #0096D6 100%)` : "rgba(13,20,40,0.95)", border: done || active ? `1px solid rgba(180,230,255,0.6)` : `1px solid ${STROKE}`, color: done || active ? "#04121E" : TEXT_MUTE, fontSize: 12, fontWeight: 800, boxShadow: active ? `0 0 14px ${CYAN_SOFT}, 0 0 24px rgba(0,229,255,0.35), inset 0 1px 0 rgba(255,255,255,0.45)` : done ? `0 0 8px rgba(0,229,255,0.3), inset 0 1px 0 rgba(255,255,255,0.3)` : "none", transition: "all 0.3s ease" }}>
              {done ? <Check size={14} strokeWidth={3} /> : <span>{i + 1}</span>}
            </div>
            <div style={{ fontSize: 10.5, fontWeight: active ? 700 : 600, color: active ? TEXT : done ? "#C8D4ED" : TEXT_MUTE, letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "center", whiteSpace: "nowrap" }}>{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export const BUY_STEPS: StepperStep[] = [
  { label: "Details" },
  { label: "Confirm" },
  { label: "Pay" },
  { label: "Release" },
  { label: "Complete" },
];

export const SELL_STEPS: StepperStep[] = [
  { label: "Details" },
  { label: "Confirm" },
  { label: "Locked" },
  { label: "Receive" },
  { label: "Release" },
];

// Mock seller used until backend wires up
export type Seller = { id: string; name: string; letter: string; rating: number; completion: number; trades: number; price: string; available: string; min: string; max: string; method: string; reference: string };
export const MOCK_SELLER: Seller = {
  id: "demo-001",
  name: "Verified Trader",
  letter: "V",
  rating: 4.9,
  completion: 99,
  trades: 1240,
  price: "1.001",
  available: "12,500 USDT",
  min: "50",
  max: "5,000",
  method: "Bank Transfer",
  reference: "CHX-A8F3K2-9P",
};
