import { useState } from "react";
import {
  Bell,
  Menu,
  Search,
  ChevronDown,
  SlidersHorizontal,
  Shield,
  Zap,
  Star,
  BadgeCheck,
  TrendingUp,
  Users,
  CreditCard,
  Building2,
  Wallet,
  Headphones,
  Inbox,
  RefreshCw,
  AlertTriangle,
  Lock,
  CheckCircle2,
  Clock,
} from "lucide-react";

const BG_1 = "#05070F";
const BG_2 = "#0A0F1F";
const CARD_BG = "rgba(13, 20, 40, 0.6)";
const CYAN = "#00E5FF";
const CYAN_SOFT = "rgba(0,229,255,0.35)";
const BLUE = "#2E7BFF";
const PURPLE = "#8B5CF6";
const PURPLE_SOFT = "rgba(139,92,246,0.35)";
const GREEN = "#4ADE80";
const TEXT = "#F1F5FF";
const TEXT_DIM = "#8B9CC2";
const TEXT_MUTE = "#5B6A8A";
const STROKE = "rgba(120,170,220,0.12)";

const ShieldLogo = () => (
  <div style={{ width: 42, height: 42, borderRadius: 13, background: "linear-gradient(180deg, rgba(0,229,255,0.12), rgba(139,92,246,0.08))", border: `1px solid ${CYAN_SOFT}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px rgba(0,229,255,0.25), inset 0 1px 0 rgba(255,255,255,0.06)` }}>
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
      <path d="M11 1.5 L20 5 V11 C20 16.5 15.5 20.5 11 22.5 C6.5 20.5 2 16.5 2 11 V5 Z" stroke={CYAN} strokeWidth="1.5" fill="rgba(0,229,255,0.06)" />
      <path d="M7.5 11.5 L10 14 L14.5 9" stroke={CYAN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const HeroIllustration = () => (
  <svg viewBox="0 0 220 190" width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
    <defs>
      <linearGradient id="hPhone" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1a2348" />
        <stop offset="100%" stopColor="#0a0f24" />
      </linearGradient>
      <linearGradient id="hScreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0d1632" />
        <stop offset="100%" stopColor="#050814" />
      </linearGradient>
      <linearGradient id="hCoin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E9F7FF" />
        <stop offset="100%" stopColor="#7AB8FF" />
      </linearGradient>
      <linearGradient id="hArrow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={CYAN} />
        <stop offset="100%" stopColor={PURPLE} />
      </linearGradient>
      <radialGradient id="hGlowBg" cx="0.5" cy="0.6" r="0.55">
        <stop offset="0%" stopColor={CYAN} stopOpacity="0.45" />
        <stop offset="55%" stopColor={PURPLE} stopOpacity="0.2" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <filter id="hBlur" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <filter id="hGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <ellipse cx="110" cy="110" rx="100" ry="70" fill="url(#hGlowBg)" />
    {/* Phone - tilted 3D */}
    <g transform="translate(55 30) rotate(-10 45 70)">
      <rect x="-2" y="-2" width="94" height="144" rx="18" fill={PURPLE} opacity="0.35" filter="url(#hBlur)" />
      <rect x="0" y="0" width="90" height="140" rx="16" fill="url(#hPhone)" stroke={CYAN_SOFT} strokeWidth="1.4" />
      <rect x="5" y="5" width="80" height="130" rx="12" fill="url(#hScreen)" />
      <rect x="38" y="9" width="14" height="3" rx="1.5" fill="#1a2348" />
      <rect x="12" y="24" width="30" height="3" rx="1.5" fill={CYAN} opacity="0.55" />
      <rect x="12" y="33" width="48" height="3" rx="1.5" fill="#2a3868" />
      <rect x="12" y="42" width="40" height="3" rx="1.5" fill="#2a3868" />
      <rect x="12" y="62" width="66" height="22" rx="6" fill={CYAN} opacity="0.12" stroke={CYAN_SOFT} strokeWidth="0.8" />
      <text x="45" y="77" textAnchor="middle" fontSize="9" fontWeight="700" fill={CYAN}>BUY USDT</text>
      <rect x="12" y="94" width="66" height="6" rx="2" fill="#1b2448" />
      <rect x="12" y="104" width="50" height="6" rx="2" fill="#1b2448" />
    </g>
    {/* Coin floating front */}
    <g filter="url(#hGlow)">
      <circle cx="152" cy="95" r="26" fill="url(#hCoin)" stroke="#E9F7FF" strokeWidth="1.2" />
      <circle cx="152" cy="95" r="21" fill="none" stroke={CYAN} strokeWidth="0.8" opacity="0.6" />
      <text x="152" y="105" textAnchor="middle" fontSize="24" fontFamily="Georgia, serif" fontWeight="700" fill="#1B2A52">₮</text>
    </g>
    {/* Curved arrows */}
    <g filter="url(#hGlow)">
      <path d="M35 75 Q90 30 160 55" stroke="url(#hArrow)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <polygon points="155,46 170,55 153,64" fill={PURPLE} />
      <path d="M170 140 Q115 170 45 145" stroke="url(#hArrow)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <polygon points="52,137 38,145 53,154" fill={CYAN} />
    </g>
    {/* Small escrow shield badge */}
    <g transform="translate(170 140)" filter="url(#hGlow)">
      <circle r="14" fill="#0e1530" stroke={PURPLE_SOFT} strokeWidth="1.2" />
      <path d="M0 -7 L6 -4 V0 C6 3.5 3 6 0 7 C-3 6 -6 3.5 -6 0 V-4 Z" fill="none" stroke={PURPLE} strokeWidth="1.4" />
      <path d="M-2.5 0 L-0.5 2 L2.5 -2" stroke={PURPLE} strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

function Pill({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: "rgba(13,20,40,0.6)", border: `1px solid ${STROKE}`, color: TEXT, fontSize: 13, fontWeight: 500 }}>{children}</div>;
}

function RoundBtn({ children, glow }: { children: React.ReactNode; glow?: boolean }) {
  return <button style={{ position: "relative", width: 40, height: 40, borderRadius: 999, background: "rgba(13,20,40,0.6)", border: `1px solid ${glow ? CYAN_SOFT : STROKE}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: glow ? `0 0 14px rgba(0,229,255,0.2)` : "none" }}>{children}</button>;
}

function Card({ children, accent = "cyan", bright, style }: { children: React.ReactNode; accent?: "cyan" | "purple" | "none"; bright?: boolean; style?: React.CSSProperties }) {
  const ring = accent === "cyan" ? `1px solid rgba(0,229,255,${bright ? 0.45 : 0.22})` : accent === "purple" ? `1px solid rgba(139,92,246,${bright ? 0.45 : 0.22})` : `1px solid ${STROKE}`;
  const glow = accent === "cyan" ? `0 0 ${bright ? 40 : 24}px rgba(0,229,255,${bright ? 0.18 : 0.05})` : accent === "purple" ? `0 0 ${bright ? 40 : 24}px rgba(139,92,246,${bright ? 0.18 : 0.05})` : "none";
  return <div style={{ position: "relative", borderRadius: 22, background: bright ? "linear-gradient(180deg, rgba(16,24,52,0.8), rgba(8,12,30,0.9))" : CARD_BG, border: ring, boxShadow: `0 1px 0 rgba(255,255,255,0.04) inset, ${glow}`, ...style }}>{children}</div>;
}

function IconTile({ color, children, size = 38 }: { color: "cyan" | "purple" | "blue"; children: React.ReactNode; size?: number }) {
  const map = { cyan: CYAN, purple: PURPLE, blue: BLUE };
  const bgMap = {
    cyan: "linear-gradient(180deg, rgba(0,229,255,0.18), rgba(0,229,255,0.04))",
    purple: "linear-gradient(180deg, rgba(139,92,246,0.18), rgba(139,92,246,0.04))",
    blue: "linear-gradient(180deg, rgba(46,123,255,0.2), rgba(46,123,255,0.04))",
  };
  const borderMap = { cyan: CYAN_SOFT, purple: PURPLE_SOFT, blue: "rgba(46,123,255,0.4)" };
  const shadowMap = { cyan: "rgba(0,229,255,0.25)", purple: "rgba(139,92,246,0.25)", blue: "rgba(46,123,255,0.3)" };
  return <div style={{ width: size, height: size, borderRadius: 10, background: bgMap[color], border: `1px solid ${borderMap[color]}`, display: "flex", alignItems: "center", justifyContent: "center", color: map[color], boxShadow: `0 0 14px ${shadowMap[color]}, inset 0 1px 0 rgba(255,255,255,0.08)`, flexShrink: 0 }}>{children}</div>;
}

const input: React.CSSProperties = {
  height: 44,
  padding: "0 14px",
  borderRadius: 12,
  background: "rgba(5,8,20,0.7)",
  border: `1px solid ${STROKE}`,
  color: TEXT,
  fontSize: 13.5,
  outline: "none",
  width: "100%",
  fontFamily: "inherit",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), inset 0 0 10px rgba(0,0,0,0.35)",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", color: TEXT_MUTE, marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

function SelectBox({ value, options, onChange }: { value: string; options: string[]; onChange?: (v: string) => void }) {
  return (
    <div style={{ position: "relative" }}>
      <select value={value} onChange={(e) => onChange?.(e.target.value)} style={{ ...input, appearance: "none", paddingRight: 34, cursor: "pointer" }}>
        {options.map((o) => <option key={o} style={{ background: "#07101f" }}>{o}</option>)}
      </select>
      <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM, pointerEvents: "none" }} />
    </div>
  );
}

function AssetSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
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

type Offer = { id: string; name: string; letter: string; accent: "cyan" | "purple"; rating: number; completion: number; trades: number; limit: string; price: string; available: string; methods: string[]; topPick?: boolean };
type ListState = { kind: "loading" } | { kind: "empty" } | { kind: "error" } | { kind: "live"; offers: Offer[] };

function Skeleton({ w, h, round }: { w: number | string; h: number; round?: boolean }) {
  return <div style={{ width: w, height: h, borderRadius: round ? "50%" : 6, background: "linear-gradient(90deg, rgba(0,229,255,0.04), rgba(0,229,255,0.14), rgba(0,229,255,0.04))", backgroundSize: "200% 100%", animation: "chxShim 1.4s linear infinite" }} />;
}

function TrustChip({ icon, label, tone }: { icon: React.ReactNode; label: string; tone: "cyan" | "purple" | "green" }) {
  const c = tone === "cyan" ? CYAN : tone === "purple" ? PURPLE : GREEN;
  const bg = tone === "cyan" ? "rgba(0,229,255,0.08)" : tone === "purple" ? "rgba(139,92,246,0.08)" : "rgba(74,222,128,0.08)";
  const border = tone === "cyan" ? CYAN_SOFT : tone === "purple" ? PURPLE_SOFT : "rgba(74,222,128,0.35)";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 999, background: bg, border: `1px solid ${border}`, color: c, fontSize: 11, fontWeight: 700, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
      {icon}
      {label}
    </div>
  );
}

export default function App() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [asset, setAsset] = useState("USDT");
  const [currency, setCurrency] = useState("USD");
  const [payMethod, setPayMethod] = useState("All Payment Methods");
  const [amount, setAmount] = useState("");

  // No fake data — real offers come from backend
  const [offersState, setOffersState] = useState<ListState>({ kind: "empty" });
  // Stats are hidden unless a real backend provides them
  const statsState: ListState = { kind: "empty" };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "radial-gradient(600px 360px at 0% -5%, rgba(0,229,255,0.14), transparent 60%), radial-gradient(600px 360px at 100% 0%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(800px 500px at 50% 110%, rgba(46,123,255,0.12), transparent 60%), linear-gradient(180deg, " + BG_1 + " 0%, " + BG_2 + " 50%, " + BG_1 + " 100%)", color: TEXT, fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @keyframes chxShim { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes chxPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        input::placeholder { color: ${TEXT_MUTE}; }
        select { color-scheme: dark; }
      `}</style>

      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 20, padding: "14px 16px", background: "rgba(5,7,15,0.72)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", borderBottom: `1px solid ${STROKE}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, maxWidth: 720, margin: "0 auto" }}>
          <ShieldLogo />
          <span style={{ color: TEXT, fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>CoinHubX</span>
          <div style={{ flex: 1 }} />
          <Pill><span style={{ fontSize: 14 }}>🇬🇧</span><span>English</span></Pill>
          <RoundBtn glow>
            <Bell size={16} color={TEXT} />
            <span style={{ position: "absolute", top: 8, right: 9, width: 7, height: 7, borderRadius: 99, background: CYAN, boxShadow: `0 0 8px ${CYAN}` }} />
          </RoundBtn>
          <RoundBtn><Menu size={16} color={TEXT_DIM} /></RoundBtn>
        </div>
      </header>

      <main style={{ maxWidth: 520, margin: "0 auto", padding: "14px 14px 40px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* HERO */}
        <Card accent="cyan" style={{ padding: 20, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(460px 220px at 100% 10%, rgba(139,92,246,0.22), transparent 60%), radial-gradient(420px 260px at 0% 100%, rgba(0,229,255,0.18), transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.05, background: `linear-gradient(90deg, ${CYAN}, #9FE9FF 60%, ${PURPLE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>P2P Marketplace</div>
              <div style={{ marginTop: 8, color: TEXT_DIM, fontSize: 13, lineHeight: 1.45 }}>Buy and sell crypto directly with verified traders.</div>
            </div>
            <div style={{ width: 150, height: 130, flexShrink: 0 }}><HeroIllustration /></div>
          </div>
          {/* Trust chips */}
          <div style={{ position: "relative", marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
            <TrustChip tone="green" icon={<span style={{ width: 6, height: 6, borderRadius: 99, background: GREEN, boxShadow: `0 0 6px ${GREEN}`, animation: "chxPulse 1.6s infinite" }} />} label="LIVE" />
            <TrustChip tone="purple" icon={<Lock size={11} />} label="Escrow enabled" />
            <TrustChip tone="cyan" icon={<BadgeCheck size={12} />} label="Verified traders" />
            <TrustChip tone="cyan" icon={<Zap size={11} />} label="Fast settlement" />
          </div>
        </Card>

        {/* STATS — only if real data exists (hidden when empty) */}
        {statsState.kind !== "empty" && (
          <Card accent="cyan" style={{ padding: 14 }}>
            <div style={{ color: TEXT_DIM, fontSize: 12 }}>Stats will appear here when available.</div>
          </Card>
        )}

        {/* INSTANT BUY — primary flow, bright & prominent */}
        <Card accent="cyan" bright style={{ padding: 18, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(300px 160px at 90% -10%, rgba(0,229,255,0.18), transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <IconTile color="cyan" size={44}><Zap size={20} fill={CYAN} /></IconTile>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ color: TEXT, fontSize: 16, fontWeight: 700 }}>Instant Buy</span>
                  <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.14em", padding: "3px 8px", borderRadius: 999, background: "rgba(0,229,255,0.14)", color: CYAN, border: `1px solid ${CYAN_SOFT}`, boxShadow: `0 0 10px rgba(0,229,255,0.3)` }}>AUTO-MATCH</span>
                </div>
                <div style={{ color: TEXT_DIM, fontSize: 12, marginTop: 3 }}>We'll match you with the best available seller.</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
              <Field label="AMOUNT">
                <input placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} style={input} inputMode="decimal" />
              </Field>
              <Field label="CURRENCY">
                <SelectBox value={currency} options={["USD", "EUR", "GBP", "AUD", "CAD"]} onChange={setCurrency} />
              </Field>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
              <Field label="ASSET">
                <AssetSelector value={asset} onChange={setAsset} />
              </Field>
              <Field label="PAYMENT">
                <SelectBox value={payMethod} options={["All Payment Methods", "Bank Transfer", "PayPal", "Wise", "Revolut"]} onChange={setPayMethod} />
              </Field>
            </div>

            <button style={{ position: "relative", marginTop: 14, width: "100%", height: 52, borderRadius: 14, border: "1px solid rgba(180,230,255,0.7)", background: `linear-gradient(180deg, #7DF2FF 0%, ${CYAN} 20%, #0096D6 60%, ${BLUE} 100%)`, color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em", boxShadow: `0 14px 32px rgba(46,123,255,0.55), 0 0 40px rgba(0,229,255,0.45), inset 0 2px 0 rgba(255,255,255,0.55), inset 0 -2px 0 rgba(0,30,60,0.45), inset 0 0 0 1px rgba(255,255,255,0.15)`, textShadow: "0 1px 1px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Zap size={16} fill="#fff" /> Find Best Offer
            </button>

            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 10, background: "rgba(139,92,246,0.07)", border: `1px solid ${PURPLE_SOFT}` }}>
              <Lock size={13} color={PURPLE} />
              <span style={{ color: TEXT_DIM, fontSize: 11.5, lineHeight: 1.4 }}>
                Funds are protected by escrow until both sides complete the trade.
              </span>
            </div>
          </div>
        </Card>

        {/* MARKETPLACE LIST — second flow, manual browsing */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
            <div>
              <div style={{ color: TEXT, fontSize: 16, fontWeight: 700 }}>Marketplace</div>
              <div style={{ color: TEXT_DIM, fontSize: 11.5, marginTop: 2 }}>Browse offers and pick your trader</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: TEXT_MUTE, padding: "4px 8px", borderRadius: 6, background: "rgba(120,170,220,0.06)", border: `1px solid ${STROKE}` }}>MANUAL</span>
          </div>

          {/* Buy/Sell + asset */}
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, display: "flex", padding: 4, borderRadius: 14, background: "rgba(8,12,26,0.8)", border: `1px solid ${STROKE}` }}>
              {(["buy", "sell"] as const).map((s) => {
                const active = side === s;
                return (
                  <button key={s} onClick={() => setSide(s)} style={{ flex: 1, height: 38, borderRadius: 10, border: "none", cursor: "pointer", color: active ? "#04121E" : TEXT_DIM, fontSize: 13, fontWeight: 700, letterSpacing: "0.02em", textTransform: "capitalize", background: active ? `linear-gradient(180deg, ${CYAN}, #00B8D4)` : "transparent", boxShadow: active ? `0 0 16px rgba(0,229,255,0.4)` : "none", fontFamily: "inherit" }}>{s}</button>
                );
              })}
            </div>
            <div style={{ width: 128 }}>
              <AssetSelector value={asset} onChange={setAsset} />
            </div>
          </div>

          {/* Search + Filters */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, height: 46, padding: "0 14px", borderRadius: 14, background: "rgba(8,12,26,0.8)", border: `1px solid ${STROKE}` }}>
            <Search size={15} color={TEXT_MUTE} />
            <input placeholder="Amount or payment method…" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: TEXT, fontSize: 13, fontFamily: "inherit" }} />
            <button style={{ display: "flex", alignItems: "center", gap: 6, color: TEXT_DIM, fontSize: 12, fontWeight: 600, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              <SlidersHorizontal size={13} />
              Filters
            </button>
          </div>

          {/* Sort */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
            <div style={{ color: TEXT, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              Live Offers
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: TEXT_MUTE }}>
                {offersState.kind === "live" ? `· ${offersState.offers.length}` : ""}
              </span>
            </div>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "transparent", border: "none", color: CYAN, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              Sort: Price
              <ChevronDown size={12} />
            </button>
          </div>

          {/* Offers states */}
          {offersState.kind === "loading" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[0, 1, 2].map((i) => (
                <Card key={i} accent="none" style={{ padding: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Skeleton w={40} h={40} round />
                    <div style={{ flex: 1 }}>
                      <Skeleton w="45%" h={12} />
                      <div style={{ height: 6 }} />
                      <Skeleton w="70%" h={9} />
                    </div>
                    <Skeleton w={60} h={18} />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {offersState.kind === "empty" && (
            <Card accent="none" style={{ padding: "34px 18px", textAlign: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,229,255,0.08)", border: `1px solid ${CYAN_SOFT}`, color: CYAN, boxShadow: `0 0 20px rgba(0,229,255,0.18)` }}>
                <Inbox size={22} />
              </div>
              <div style={{ color: TEXT, fontSize: 14, fontWeight: 700 }}>No live P2P offers available yet.</div>
              <div style={{ color: TEXT_DIM, fontSize: 12, marginTop: 4 }}>Check back soon — traders will post offers here.</div>
            </Card>
          )}

          {offersState.kind === "error" && (
            <Card accent="none" style={{ padding: "30px 18px", textAlign: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,181,71,0.08)", border: "1px solid rgba(255,181,71,0.3)", color: "#FFB547" }}>
                <AlertTriangle size={22} />
              </div>
              <div style={{ color: TEXT, fontSize: 14, fontWeight: 700 }}>Unable to load P2P offers.</div>
              <button onClick={() => setOffersState({ kind: "empty" })} style={{ marginTop: 14, height: 38, padding: "0 18px", borderRadius: 10, border: `1px solid ${CYAN_SOFT}`, background: `linear-gradient(180deg, ${CYAN}, #00B8D4)`, color: "#04121E", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <RefreshCw size={13} /> Retry
              </button>
            </Card>
          )}

          {offersState.kind === "live" && offersState.offers.map((o) => (
            <Card key={o.id} accent={o.topPick ? "cyan" : "none"} style={{ padding: 14 }}>
              {o.topPick && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px", borderRadius: 6, background: "rgba(0,229,255,0.1)", border: `1px solid ${CYAN_SOFT}`, color: CYAN, fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", marginBottom: 10 }}>
                  <TrendingUp size={10} /> TOP PICK
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <IconTile color={o.accent} size={40}><span style={{ fontSize: 15, fontWeight: 800 }}>{o.letter}</span></IconTile>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, color: TEXT, fontSize: 14, fontWeight: 700 }}>
                    {o.name}
                    <BadgeCheck size={13} color={CYAN} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3, fontSize: 11, color: TEXT_DIM }}>
                    <Star size={10} color="#FFB547" fill="#FFB547" />
                    {o.rating}
                    <span style={{ opacity: 0.4 }}>·</span>
                    {o.completion}%
                    <span style={{ opacity: 0.4 }}>·</span>
                    {o.trades} trades
                  </div>
                  <div style={{ fontSize: 11, color: TEXT_MUTE, marginTop: 2 }}>{o.limit}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: CYAN, fontSize: 16, fontWeight: 700 }}>{o.price}</div>
                  <div style={{ color: TEXT_MUTE, fontSize: 10.5 }}>{o.available}</div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {[Building2, CreditCard, Wallet].map((Icon, i) => (
                    <div key={i} style={{ width: 26, height: 22, borderRadius: 5, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}`, display: "flex", alignItems: "center", justifyContent: "center", color: TEXT_DIM }}>
                      <Icon size={11} />
                    </div>
                  ))}
                </div>
                <button style={{ position: "relative", height: 38, padding: "0 20px", borderRadius: 12, border: "1px solid rgba(180,240,255,0.7)", background: `linear-gradient(180deg, #7DF2FF 0%, ${CYAN} 30%, #00A8CC 75%, #007A99 100%)`, color: "#04121E", fontSize: 12.5, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em", boxShadow: `0 6px 14px rgba(0,120,160,0.55), 0 0 18px rgba(0,229,255,0.5), inset 0 1.5px 0 rgba(255,255,255,0.85), inset 0 -2px 0 rgba(0,50,70,0.4), inset 0 0 0 1px rgba(255,255,255,0.18)`, textShadow: "0 1px 0 rgba(255,255,255,0.35)" }}>
                  {side === "buy" ? "Buy" : "Sell"} {asset}
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* ESCROW PROTECTION — expanded */}
        <Card accent="purple" style={{ padding: 18, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(320px 180px at 100% 0%, rgba(139,92,246,0.18), transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <IconTile color="purple" size={44}><Shield size={20} /></IconTile>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: TEXT, fontSize: 15, fontWeight: 700 }}>Escrow Protection</span>
                  <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.14em", color: GREEN, padding: "3px 8px", borderRadius: 999, background: "rgba(74,222,128,0.1)", border: `1px solid rgba(74,222,128,0.35)` }}>ACTIVE</span>
                </div>
                <div style={{ color: TEXT_DIM, fontSize: 12, marginTop: 3 }}>Every trade is fully protected, start to finish.</div>
              </div>
            </div>

            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { Icon: Lock, text: "Funds are locked in escrow when a trade begins" },
                { Icon: CheckCircle2, text: "Seller only receives funds after buyer confirmation" },
                { Icon: AlertTriangle, text: "Disputes can be opened and reviewed by our team" },
                { Icon: Clock, text: "Trade status is tracked step by step in real time" },
              ].map(({ Icon, text }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(139,92,246,0.1)", border: `1px solid ${PURPLE_SOFT}`, display: "flex", alignItems: "center", justifyContent: "center", color: PURPLE, flexShrink: 0 }}>
                    <Icon size={13} />
                  </div>
                  <span style={{ color: TEXT_DIM, fontSize: 12.5, lineHeight: 1.4 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* TRUST CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {([
            { Icon: Shield, label: "Secure Escrow", desc: "Funds locked until trade completes", color: "cyan" as const },
            { Icon: BadgeCheck, label: "Verified Traders", desc: "Trader verification coming soon", color: "purple" as const },
            { Icon: CreditCard, label: "Multiple Payments", desc: "Bank, e-wallets, and more", color: "cyan" as const },
            { Icon: Headphones, label: "24/7 Support", desc: "We're here whenever you need us", color: "purple" as const },
          ]).map(({ Icon, label, desc, color }) => (
            <Card key={label} accent="none" style={{ padding: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <IconTile color={color} size={38}><Icon size={16} /></IconTile>
                <div>
                  <div style={{ color: TEXT, fontSize: 13, fontWeight: 700 }}>{label}</div>
                  <div style={{ color: TEXT_DIM, fontSize: 11.5, marginTop: 3, lineHeight: 1.35 }}>{desc}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
