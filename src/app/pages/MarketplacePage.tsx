import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { useOffers } from "../offers/OfferStore";
import escrowShieldImg from "../../imports/a19fa6bb-e9ab-401f-982b-dd8eaffb5835_(1)_2.jpg";
import chxLogo from "../../imports/image.png";
import { EscrowShield3D, PaymentSelect, PaymentMethod, PAYMENT_METHODS, PaymentIcon } from "../p2p/PaymentSelect";
import { CurrencySelect, findCurrency } from "../p2p/CurrencySelect";
import { AssetSelect } from "../p2p/AssetSelect";
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
const TEXT_DIM = "#A8B5D1";
const TEXT_MUTE = "#5B6A8A";
const STROKE = "rgba(120,170,220,0.12)";

const ShieldLogo = ({ size = 44 }: { size?: number }) => (
  <div style={{ position: "relative", width: size, height: size, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,194,255,0.5), rgba(58,123,255,0.22) 55%, transparent 75%)", filter: "blur(8px)", zIndex: 0 }} />
    <img
      src={chxLogo}
      alt="CoinHubX"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: "100%",
        objectFit: "contain",
        filter: "drop-shadow(0 0 8px rgba(0,194,255,0.45))",
      }}
    />
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
    <ellipse className="chx-glow-pulse" cx="110" cy="110" rx="100" ry="70" fill="url(#hGlowBg)" />
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
    <g className="chx-float" filter="url(#hGlow)">
      <circle cx="152" cy="95" r="26" fill="url(#hCoin)" stroke="#E9F7FF" strokeWidth="1.2" />
      <circle cx="152" cy="95" r="21" fill="none" stroke={CYAN} strokeWidth="0.8" opacity="0.6" />
      <text x="152" y="105" textAnchor="middle" fontSize="24" fontFamily="Georgia, serif" fontWeight="700" fill="#1B2A52">₮</text>
    </g>
    {/* Curved arrows */}
    <g filter="url(#hGlow)">
      <path className="chx-dash" d="M35 75 Q90 30 160 55" stroke="url(#hArrow)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <polygon points="155,46 170,55 153,64" fill={PURPLE} />
      <path className="chx-dash" d="M170 140 Q115 170 45 145" stroke="url(#hArrow)" strokeWidth="3" fill="none" strokeLinecap="round" />
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

function Card({ children, accent = "cyan", bright, style, className }: { children: React.ReactNode; accent?: "cyan" | "purple" | "none"; bright?: boolean; style?: React.CSSProperties; className?: string }) {
  const ring = accent === "cyan" ? `1px solid rgba(0,229,255,${bright ? 0.45 : 0.22})` : accent === "purple" ? `1px solid rgba(139,92,246,${bright ? 0.45 : 0.22})` : `1px solid ${STROKE}`;
  const glow = accent === "cyan" ? `0 0 ${bright ? 40 : 24}px rgba(0,229,255,${bright ? 0.18 : 0.05})` : accent === "purple" ? `0 0 ${bright ? 40 : 24}px rgba(139,92,246,${bright ? 0.18 : 0.05})` : "none";
  return <div className={className} style={{ position: "relative", borderRadius: 22, background: bright ? "linear-gradient(180deg, rgba(16,24,52,0.8), rgba(8,12,30,0.9))" : CARD_BG, border: ring, boxShadow: `0 1px 0 rgba(255,255,255,0.04) inset, ${glow}`, ...style }}>{children}</div>;
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
  height: 48,
  padding: "0 16px",
  borderRadius: 14,
  background: "linear-gradient(180deg, rgba(5,8,20,0.85), rgba(8,12,28,0.65))",
  border: `1px solid rgba(0,229,255,0.18)`,
  color: TEXT,
  fontSize: 14,
  fontWeight: 500,
  outline: "none",
  width: "100%",
  fontFamily: "inherit",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 14px rgba(0,229,255,0.04), inset 0 0 0 1px rgba(0,0,0,0.2)",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
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

type Offer = { id: string; name: string; letter: string; accent: "cyan" | "purple"; rating: number; completion: number; trades: number; limit: string; price: string; available: string; methods: string[]; online?: boolean; responseMin?: number; topPick?: boolean };
type ListState = { kind: "loading" } | { kind: "empty" } | { kind: "error" } | { kind: "live"; offers: Offer[] };

function Skeleton({ w, h, round }: { w: number | string; h: number; round?: boolean }) {
  return <div style={{ width: w, height: h, borderRadius: round ? "50%" : 6, background: "linear-gradient(90deg, rgba(0,229,255,0.04), rgba(0,229,255,0.14), rgba(0,229,255,0.04))", backgroundSize: "200% 100%", animation: "chxShim 1.4s linear infinite" }} />;
}

function MiniPremiumIcon({ kind, size = 30 }: { kind: "lock" | "check" | "alert" | "clock" | "inbox"; size?: number }) {
  const id = `mp-${kind}`;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(139,92,246,0.32)" />
          <stop offset="100%" stopColor="rgba(139,92,246,0.06)" />
        </linearGradient>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C7B5FF" />
          <stop offset="100%" stopColor="#5B2EE0" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#B49BFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="9" fill={`url(#${id}-bg)`} stroke="rgba(180,150,255,0.5)" strokeWidth="1" />
      <rect x="3" y="3" width="26" height="11" rx="8" fill={`url(#${id}-glow)`} opacity="0.65" />
      <rect x="4.5" y="4" width="23" height="1.5" rx="0.75" fill="#fff" fillOpacity="0.2" />
      {kind === "lock" && (
        <g>
          <path d="M11 14 V11 C11 8.5 13 6.5 16 6.5 C19 6.5 21 8.5 21 11 V14" stroke="url(#mp-lock-fill)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <rect x="9" y="14" width="14" height="11" rx="2.5" fill="url(#mp-lock-fill)" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.5" />
          <circle cx="16" cy="19" r="1.4" fill="#fff" fillOpacity="0.85" />
          <rect x="15.4" y="20" width="1.2" height="3" rx="0.6" fill="#fff" fillOpacity="0.85" />
        </g>
      )}
      {kind === "check" && (
        <g>
          <circle cx="16" cy="16" r="9" fill="url(#mp-check-fill)" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.6" />
          <path d="M11.5 16.5 L14.5 19.5 L20.5 13" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      )}
      {kind === "alert" && (
        <g>
          <path d="M16 6 L26 24 H6 Z" fill="url(#mp-alert-fill)" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.6" strokeLinejoin="round" />
          <rect x="15" y="12" width="2" height="6.5" rx="1" fill="#fff" />
          <circle cx="16" cy="21" r="1.2" fill="#fff" />
        </g>
      )}
      {kind === "clock" && (
        <g>
          <circle cx="16" cy="16" r="9" fill="url(#mp-clock-fill)" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.6" />
          <path d="M16 11 V16 L19.5 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="16" cy="16" r="1.2" fill="#fff" />
        </g>
      )}
      {kind === "inbox" && (
        <g>
          <path d="M6 16 L9 8 H23 L26 16 V23 C26 24 25 25 24 25 H8 C7 25 6 24 6 23 Z" fill="url(#mp-inbox-fill)" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.6" strokeLinejoin="round" />
          <path d="M6 16 H11 L13 18 H19 L21 16 H26" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

function PremiumIcon({ kind }: { kind: "escrow" | "verified" | "payments" | "support" }) {
  const id = `pi-${kind}`;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={kind === "verified" || kind === "support" ? "rgba(139,92,246,0.35)" : "rgba(0,229,255,0.35)"} />
          <stop offset="100%" stopColor={kind === "verified" || kind === "support" ? "rgba(139,92,246,0.08)" : "rgba(0,229,255,0.06)"} />
        </linearGradient>
        <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={kind === "verified" || kind === "support" ? "#C7B5FF" : "#9FF5FF"} />
          <stop offset="100%" stopColor={kind === "verified" || kind === "support" ? PURPLE : CYAN} />
        </linearGradient>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={kind === "verified" || kind === "support" ? "#B49BFF" : "#7DF2FF"} />
          <stop offset="100%" stopColor={kind === "verified" || kind === "support" ? "#5B2EE0" : "#0096D6"} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor={kind === "verified" || kind === "support" ? PURPLE : CYAN} stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id={`${id}-blur`}><feGaussianBlur stdDeviation="2" /></filter>
      </defs>
      <circle cx="22" cy="22" r="20" fill={`url(#${id}-glow)`} opacity="0.7" />
      <rect x="4" y="4" width="36" height="36" rx="11" fill={`url(#${id}-bg)`} stroke={`url(#${id}-stroke)`} strokeWidth="1.2" />
      <rect x="5" y="5" width="34" height="16" rx="10" fill="url(#chx-sheen-grad)" opacity="0.18" />
      {kind === "escrow" && (
        <g>
          <path d="M22 11 L31 14.5 V20.5 C31 25.5 27 29.5 22 31.5 C17 29.5 13 25.5 13 20.5 V14.5 Z" fill={`url(#${id}-fill)`} stroke="#fff" strokeOpacity="0.4" strokeWidth="0.6" />
          <path d="M18 21.5 L21 24.5 L26.5 18.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M16 13.5 L26 13.5" stroke="#fff" strokeOpacity="0.25" strokeWidth="0.6" />
        </g>
      )}
      {kind === "verified" && (
        <g>
          <path d="M22 10 L26 13 L31 12.5 L31.5 17.5 L34 21 L31.5 24.5 L31 29.5 L26 29 L22 32 L18 29 L13 29.5 L12.5 24.5 L10 21 L12.5 17.5 L13 12.5 L18 13 Z" fill={`url(#${id}-fill)`} stroke="#fff" strokeOpacity="0.4" strokeWidth="0.6" />
          <path d="M17 21.5 L20.5 25 L27 17.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      )}
      {kind === "payments" && (
        <g>
          <rect x="11" y="15" width="22" height="15" rx="3" fill={`url(#${id}-fill)`} stroke="#fff" strokeOpacity="0.4" strokeWidth="0.6" />
          <rect x="11" y="18" width="22" height="3" fill="#fff" fillOpacity="0.25" />
          <rect x="14" y="25" width="6" height="2" rx="1" fill="#fff" fillOpacity="0.6" />
          <rect x="22" y="25" width="3" height="2" rx="1" fill="#fff" fillOpacity="0.6" />
          <circle cx="29" cy="14" r="3.5" fill="#fff" fillOpacity="0.85" />
          <circle cx="26" cy="14" r="3.5" fill={CYAN} fillOpacity="0.7" />
        </g>
      )}
      {kind === "support" && (
        <g>
          <path d="M13 22 V19 C13 14 17 10.5 22 10.5 C27 10.5 31 14 31 19 V22" stroke={`url(#${id}-stroke)`} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <rect x="11" y="22" width="5" height="9" rx="2" fill={`url(#${id}-fill)`} stroke="#fff" strokeOpacity="0.4" strokeWidth="0.5" />
          <rect x="28" y="22" width="5" height="9" rx="2" fill={`url(#${id}-fill)`} stroke="#fff" strokeOpacity="0.4" strokeWidth="0.5" />
          <circle cx="22" cy="33" r="1.5" fill={PURPLE} />
          <path d="M28 31 V32 C28 33 27 33.5 26 33.5 H23" stroke={`url(#${id}-stroke)`} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
      )}
      {/* top sheen */}
      <rect x="6" y="5.5" width="32" height="2" rx="1" fill="#fff" fillOpacity="0.18" />
    </svg>
  );
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

function PaymentMethodFilter({ value, onChange }: { value: "All" | PaymentMethod; onChange: (v: "All" | PaymentMethod) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const allOpts: ("All" | PaymentMethod)[] = ["All", ...PAYMENT_METHODS];
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={{
        height: 48, padding: "0 14px", borderRadius: 14, width: "100%",
        background: "linear-gradient(180deg, rgba(5,8,20,0.85), rgba(8,12,28,0.65))",
        border: `1px solid ${open ? CYAN_SOFT : "rgba(0,229,255,0.18)"}`,
        boxShadow: open ? `0 0 0 1px ${CYAN_SOFT}, 0 0 18px rgba(0,229,255,0.22)` : "inset 0 1px 0 rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: "inherit",
      }}>
        {value === "All" ? (
          <div style={{ width: 26, height: 26, borderRadius: 8, background: "linear-gradient(180deg, rgba(0,229,255,0.2), rgba(0,229,255,0.04))", border: `1px solid ${CYAN_SOFT}`, display: "flex", alignItems: "center", justifyContent: "center", color: CYAN, fontSize: 11, fontWeight: 800 }}>★</div>
        ) : (
          <PaymentIcon method={value} size={26} />
        )}
        <span style={{ flex: 1, minWidth: 0, textAlign: "left", color: TEXT, fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value === "All" ? "All methods" : value}</span>
        <ChevronDown size={14} color={TEXT_DIM} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.18s ease" }} />
      </button>
      {open && (
        <div style={{
          position: "absolute", zIndex: 60, top: "calc(100% + 6px)", left: 0, right: 0, maxHeight: 360, overflowY: "auto", padding: 6,
          borderRadius: 14, border: `1px solid ${CYAN_SOFT}`,
          background: "linear-gradient(180deg, rgba(16,24,52,0.96), rgba(8,12,30,0.98))",
          boxShadow: "0 30px 60px rgba(0,0,0,0.55), 0 0 26px rgba(0,229,255,0.22)",
        }}>
          {allOpts.map((m) => {
            const sel = m === value;
            return (
              <button key={m} type="button" onClick={() => { onChange(m); setOpen(false); }} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "9px 10px", borderRadius: 10, border: 0,
                background: sel ? "linear-gradient(180deg, rgba(0,229,255,0.18), rgba(0,229,255,0.06))" : "transparent",
                color: TEXT, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
              }}
              onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = "rgba(0,229,255,0.06)"; }}
              onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = "transparent"; }}>
                {m === "All" ? (
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: "linear-gradient(180deg, rgba(0,229,255,0.2), rgba(0,229,255,0.04))", border: `1px solid ${CYAN_SOFT}`, display: "flex", alignItems: "center", justifyContent: "center", color: CYAN, fontSize: 11, fontWeight: 800 }}>★</div>
                ) : (
                  <PaymentIcon method={m} size={26} />
                )}
                <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: TEXT }}>{m === "All" ? "All Payment Methods" : m}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [asset, setAsset] = useState("USDT");
  const [currency, setCurrency] = useState("USD");
  const [payMethod, setPayMethod] = useState<"All" | PaymentMethod>("All");
  const [amount, setAmount] = useState("");

  const { isLoggedIn } = useAuth();
  const { offers: storeOffers } = useOffers();
  const goSell = () => navigate(isLoggedIn ? "/p2p/sell" : `/auth/signup?next=${encodeURIComponent("/p2p/sell")}`);
  const goCreate = () => navigate(isLoggedIn ? "/p2p/create" : `/auth/signup?next=${encodeURIComponent("/p2p/create")}`);

  // No fake data — real offers come from backend or user-published store
  const [offersState, setOffersState] = useState<ListState>({ kind: "empty" });
  // Stats are hidden unless a real backend provides them
  const statsState: ListState = { kind: "empty" };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "radial-gradient(700px 400px at 0% -5%, rgba(0,229,255,0.18), transparent 60%), radial-gradient(700px 400px at 100% 5%, rgba(139,92,246,0.22), transparent 60%), radial-gradient(600px 400px at 100% 50%, rgba(46,123,255,0.12), transparent 60%), radial-gradient(800px 500px at 50% 110%, rgba(46,123,255,0.14), transparent 60%), linear-gradient(180deg, " + BG_1 + " 0%, " + BG_2 + " 50%, " + BG_1 + " 100%)", color: TEXT, fontFamily: "'Space Grotesk', 'Inter', system-ui, -apple-system, sans-serif" }}>
      {/* Animated background orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", left: "-10%", width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, rgba(0,229,255,0.18), transparent 70%)`, filter: "blur(40px)", animation: "chxFloat 9s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "40%", right: "-12%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, rgba(139,92,246,0.16), transparent 70%)`, filter: "blur(40px)", animation: "chxFloat 11s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "30%", width: 280, height: 280, borderRadius: "50%", background: `radial-gradient(circle, rgba(46,123,255,0.14), transparent 70%)`, filter: "blur(40px)", animation: "chxFloat 13s ease-in-out infinite" }} />
        {/* Grid pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)`, backgroundSize: "50px 50px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000, transparent)", WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000, transparent)" }} />
      </div>

      <style>{`
        @keyframes chxShim { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes chxPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes chxFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes chxSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes chxGlowPulse { 0%,100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
        @keyframes chxDash { to { stroke-dashoffset: -40; } }
        @keyframes chxScan { 0% { transform: translateY(-100%); opacity: 0; } 10% { opacity: 0.7; } 90% { opacity: 0.7; } 100% { transform: translateY(220%); opacity: 0; } }
        @keyframes chxBtnSheen { 0% { transform: translateX(-120%) skewX(-20deg); } 100% { transform: translateX(240%) skewX(-20deg); } }
        @keyframes chxBorder { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes chxBlink { 0%,100% { opacity: 1; } 50% { opacity: 0.2; } }
        @keyframes chxTilt { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-7px) rotate(1.5deg); } }
        @keyframes chxFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes chxBadgePulse { 0%,100% { box-shadow: 0 0 12px rgba(139,92,246,0.4), inset 0 0 10px rgba(139,92,246,0.25), 0 0 0 0 rgba(139,92,246,0.35); } 50% { box-shadow: 0 0 22px rgba(139,92,246,0.7), inset 0 0 14px rgba(139,92,246,0.4), 0 0 0 5px rgba(139,92,246,0); } }
        .chx-badge-pulse { animation: chxBadgePulse 2.6s ease-in-out infinite; }
        input::placeholder { color: ${TEXT_MUTE}; }
        select { color-scheme: dark; }
        input:focus, select:focus { border-color: ${CYAN} !important; box-shadow: 0 0 0 3px rgba(0,229,255,0.15), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 12px rgba(0,229,255,0.08) !important; }
        button { transition: transform 0.12s ease, box-shadow 0.2s ease, filter 0.2s ease; }
        button:hover { filter: brightness(1.08); }
        button:active { transform: scale(0.97); }
        .chx-card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
        .chx-card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,229,255,0.18), 0 0 28px rgba(139,92,246,0.12); }
        .chx-phone-anim { animation: chxTilt 6s ease-in-out infinite; transform-origin: center; }
        option { animation: chxFadeIn 0.18s ease-out; }
        .chx-float { animation: chxFloat 3.2s ease-in-out infinite; }
        .chx-glow-pulse { animation: chxGlowPulse 2.6s ease-in-out infinite; transform-origin: center; }
        .chx-dash { stroke-dasharray: 6 10; animation: chxDash 2.2s linear infinite; }
        .chx-scan { position: absolute; left: 0; right: 0; height: 30%; background: linear-gradient(180deg, transparent, rgba(0,229,255,0.35), transparent); pointer-events: none; animation: chxScan 3.5s ease-in-out infinite; }
        .chx-sheen { position: absolute; top: 0; bottom: 0; width: 40%; background: linear-gradient(100deg, transparent, rgba(255,255,255,0.45), transparent); animation: chxBtnSheen 3.8s ease-in-out infinite; pointer-events: none; }
        .chx-blink { animation: chxBlink 1.4s ease-in-out infinite; }
        .chx-spin-slow { animation: chxSpin 18s linear infinite; transform-origin: 152px 95px; }
        .chx-ib-border::before { content: ""; position: absolute; inset: -1px; border-radius: 22px; padding: 1px; background: linear-gradient(120deg, rgba(0,229,255,0.7), rgba(139,92,246,0.5), rgba(0,229,255,0.7), rgba(139,92,246,0.5)); background-size: 200% 200%; -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; animation: chxBorder 6s linear infinite; pointer-events: none; }
        .chx-main { max-width: 520px; }
        .chx-grid-row { display: contents; }
        .chx-col { display: contents; }
        @media (min-width: 1024px) {
          .chx-main { max-width: 1360px !important; padding: 36px 48px 72px !important; gap: 48px !important; }
          .chx-grid-row { display: grid !important; grid-template-columns: 1.55fr 1fr; gap: 40px; align-items: start; }
          .chx-col { display: flex !important; flex-direction: column; gap: 28px; }
          .chx-col-right { position: sticky !important; top: 96px; }
          .chx-hero-card { padding: 56px 56px !important; min-height: 320px; }
          .chx-hero-grid { display: grid !important; grid-template-columns: 1fr 460px; align-items: center; gap: 64px; }
          .chx-hero-illus { width: 460px !important; height: 360px !important; }
          .chx-hero-title { font-size: 60px !important; line-height: 1.02 !important; letter-spacing: -0.02em !important; }
          .chx-hero-sub { font-size: 17px !important; max-width: 600px !important; margin-top: 18px !important; line-height: 1.55 !important; }
          .chx-trust-grid { grid-template-columns: 1fr 1fr 1fr 1fr !important; gap: 22px !important; }
          .chx-trust-card { padding: 26px !important; min-height: 180px !important; }
          .chx-ib-card { padding: 36px !important; }
          .chx-ib-title { font-size: 26px !important; }
          .chx-ib-cta { height: 66px !important; font-size: 17px !important; }
          .chx-section-title { font-size: 22px !important; }
          .chx-nav-desktop { display: flex !important; }
        }
        .chx-nav-desktop { display: none; gap: 6px; align-items: center; margin-left: 32px; }
        .chx-nav-desktop a { padding: 8px 14px; border-radius: 10px; font-size: 13.5px; font-weight: 500; color: rgba(214,222,240,0.72); text-decoration: none; letter-spacing: 0.01em; transition: color 0.2s, background 0.2s; }
        .chx-nav-desktop a:hover { color: #fff; background: rgba(0,229,255,0.06); }
        .chx-nav-desktop a.active { color: #9FF5FF; background: rgba(0,229,255,0.1); border: 1px solid rgba(0,229,255,0.22); }
        .chx-stats-ribbon { grid-template-columns: 1fr 1fr !important; }
        @media (min-width: 1024px) {
          .chx-stats-ribbon { grid-template-columns: 1fr 1fr 1fr 1fr !important; gap: 22px !important; }
          .chx-ib-grid { grid-template-columns: 1.2fr 1fr 1fr 1.4fr !important; gap: 16px !important; }
        }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
        ::selection { background: rgba(0,229,255,0.32); color: #fff; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, rgba(0,229,255,0.35), rgba(139,92,246,0.35)); border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, rgba(0,229,255,0.6), rgba(139,92,246,0.6)); }
        html, body { background: #05070F; }
        @keyframes chxTickerDot { 0%,100% { transform: scale(1); opacity: 1; box-shadow: 0 0 8px ${GREEN}; } 50% { transform: scale(1.4); opacity: 0.7; box-shadow: 0 0 14px ${GREEN}; } }
        .chx-ticker-dot { animation: chxTickerDot 1.8s ease-in-out infinite; }
      `}</style>

      {/* STATUS MICROBAR */}
      <div style={{ position: "relative", zIndex: 21, padding: "5px 16px", background: "linear-gradient(90deg, rgba(0,12,30,0.85), rgba(8,4,30,0.85))", borderBottom: `1px solid rgba(74,222,128,0.12)`, fontSize: 10.5, color: TEXT_DIM, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, letterSpacing: "0.05em" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span className="chx-ticker-dot" style={{ width: 6, height: 6, borderRadius: 99, background: GREEN }} />
          <span style={{ color: "#C6E8D2", fontWeight: 600 }}>All systems operational</span>
        </span>
        <span style={{ width: 1, height: 10, background: STROKE }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <Lock size={9} color={CYAN} />
          <span>Encrypted session</span>
        </span>
        <span style={{ width: 1, height: 10, background: STROKE, display: "none" }} className="chx-hide-narrow" />
      </div>

      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 20, padding: "14px 16px", background: "rgba(5,7,15,0.72)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", borderBottom: `1px solid ${STROKE}`, boxShadow: `0 1px 0 rgba(0,229,255,0.08), 0 8px 24px rgba(0,0,0,0.4)` }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 1, background: `linear-gradient(90deg, transparent, ${CYAN}, ${PURPLE}, transparent)`, opacity: 0.5 }} />
        <div className="chx-main" style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 auto" }}>
          <ShieldLogo />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ color: "#fff", fontSize: 16, fontWeight: 800, letterSpacing: "0.16em", fontFamily: "'Space Grotesk', sans-serif", textShadow: `0 0 14px rgba(0,229,255,0.45)` }}>COINHUBX</span>
            <span style={{ color: CYAN, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.32em", marginTop: 3, opacity: 0.85 }}>CRYPTO · P2P</span>
          </div>
          <nav className="chx-nav-desktop">
            <a href="#">Dashboard</a>
            <a href="#">Markets</a>
            <a href="#">Trade</a>
            <a href="#" className="active">P2P</a>
            <a href="#">Wallets</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/p2p/my-ads"); }}>My Ads</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/p2p/history"); }}>History</a>
          </nav>
          <div style={{ flex: 1 }} />
          <Pill><span style={{ fontSize: 14 }}>{findCurrency(currency).flag}</span><span>{currency}</span></Pill>
          <RoundBtn glow>
            <Bell size={16} color={TEXT} />
            <span style={{ position: "absolute", top: 8, right: 9, width: 7, height: 7, borderRadius: 99, background: CYAN, boxShadow: `0 0 8px ${CYAN}` }} />
          </RoundBtn>
          <RoundBtn><Menu size={16} color={TEXT_DIM} /></RoundBtn>
        </div>
      </header>

      <main className="chx-main" style={{ position: "relative", zIndex: 1, margin: "0 auto", padding: "20px 14px 48px", display: "flex", flexDirection: "column", gap: 24 }}>

        {/* HERO */}
        <Card accent="cyan" className="chx-hero-card" style={{ padding: 20, overflow: "hidden", background: "linear-gradient(135deg, rgba(20,30,60,0.7) 0%, rgba(8,12,30,0.85) 60%, rgba(20,15,45,0.75) 100%)", boxShadow: `0 1px 0 rgba(255,255,255,0.06) inset, 0 0 36px rgba(0,229,255,0.12), 0 0 60px rgba(139,92,246,0.08)` }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(460px 220px at 100% 10%, rgba(139,92,246,0.28), transparent 60%), radial-gradient(420px 260px at 0% 100%, rgba(0,229,255,0.22), transparent 60%)", pointerEvents: "none" }} />
          {/* CHX watermark */}
          <div style={{ position: "absolute", right: -20, bottom: -30, fontSize: 140, fontWeight: 800, letterSpacing: "-0.04em", color: "rgba(255,255,255,0.025)", pointerEvents: "none", lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif" }}>CHX</div>
          <div className="chx-hero-grid" style={{ position: "relative", display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="chx-hero-title" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.1, background: `linear-gradient(135deg, #FFFFFF 0%, ${CYAN} 60%, ${PURPLE} 100%)`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.015em", paddingRight: 6, paddingBottom: 4, display: "inline-block" }}>P2P Marketplace</div>
              <div className="chx-hero-sub" style={{ marginTop: 10, color: "#B6C5E2", fontSize: 13, lineHeight: 1.45, maxWidth: 540 }}>Buy and sell crypto directly with verified traders. Protected by escrow, settled in seconds.</div>
            </div>
            <div className="chx-phone-anim chx-hero-illus" style={{ width: 150, height: 130, flexShrink: 0, filter: "drop-shadow(0 12px 28px rgba(0,229,255,0.35)) drop-shadow(0 0 24px rgba(139,92,246,0.3))" }}><HeroIllustration /></div>
          </div>
          {/* Trust chips */}
          <div style={{ position: "relative", marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
            <TrustChip tone="green" icon={<span style={{ position: "relative", width: 8, height: 8, borderRadius: 99, background: `radial-gradient(circle at 30% 30%, #B8FFD9, ${GREEN} 60%, #0A8B3D)`, boxShadow: `0 0 10px ${GREEN}, 0 0 20px rgba(74,222,128,0.6), inset 0 1px 0 rgba(255,255,255,0.4)`, animation: "chxPulse 1.6s infinite" }} />} label="LIVE" />
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

        <div className="chx-grid-row">
        <div className="chx-col">
        {/* SECTION LABEL */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: -6, marginBottom: -10, padding: "0 4px" }}>
          <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.22em", color: CYAN, padding: "3px 9px", borderRadius: 6, background: "rgba(0,229,255,0.08)", border: `1px solid ${CYAN_SOFT}` }}>01 · PRIMARY</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${CYAN_SOFT}, transparent)` }} />
        </div>

        {/* INSTANT BUY — primary flow, bright & prominent */}
        <Card accent="cyan" bright className="chx-ib-card" style={{ padding: 24, overflow: "hidden", boxShadow: `0 1px 0 rgba(255,255,255,0.06) inset, 0 0 56px rgba(0,229,255,0.22), 0 20px 50px rgba(0,80,140,0.35)` }}>
          <div className="chx-ib-border" style={{ position: "absolute", inset: 0, borderRadius: 22, pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(360px 200px at 90% -10%, rgba(0,229,255,0.22), transparent 60%), radial-gradient(280px 200px at 10% 110%, rgba(46,123,255,0.16), transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <IconTile color="cyan" size={52}><Zap size={24} fill={CYAN} /></IconTile>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span className="chx-ib-title" style={{ color: "#FFFFFF", fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em" }}>Instant Buy</span>
                  <span className="chx-badge-pulse" style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.14em", padding: "4px 10px", borderRadius: 999, background: `${CYAN}1F`, color: CYAN, border: `1px solid ${CYAN}66`, display: "inline-flex", gap: 6, alignItems: "center" }}><span style={{ width: 6, height: 6, borderRadius: 99, background: CYAN, boxShadow: `0 0 8px ${CYAN}` }} />AUTO-MATCH</span>
                </div>
                <div style={{ color: "#B6C5E2", fontSize: 13, marginTop: 4, lineHeight: 1.4 }}>We'll match you with the best available seller automatically.</div>
              </div>
            </div>

            <div className="chx-ib-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
              <Field label="AMOUNT">
                <input placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} style={input} inputMode="decimal" />
              </Field>
              <Field label="CURRENCY">
                <CurrencySelect value={currency} onChange={setCurrency} />
              </Field>
              <Field label="ASSET">
                <AssetSelect value={asset} onChange={setAsset} />
              </Field>
              <Field label="PAYMENT">
                <PaymentMethodFilter value={payMethod} onChange={setPayMethod} />
              </Field>
            </div>

            <button onClick={() => side === "buy" ? navigate("/p2p/buy", { state: { amount, currency, asset, payMethod } }) : goSell()} className="chx-ib-cta" style={{ position: "relative", overflow: "hidden", marginTop: 20, width: "100%", height: 58, borderRadius: 16, border: "1px solid rgba(180,230,255,0.75)", background: `linear-gradient(180deg, #9FF5FF 0%, ${CYAN} 18%, #0096D6 55%, ${BLUE} 100%)`, color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em", boxShadow: `0 22px 44px rgba(46,123,255,0.6), 0 0 60px rgba(0,229,255,0.55), 0 0 100px rgba(0,229,255,0.25), inset 0 2.5px 0 rgba(255,255,255,0.6), inset 0 -2.5px 0 rgba(0,30,60,0.5), inset 0 0 0 1.5px rgba(255,255,255,0.18)`, textShadow: "0 1px 1.5px rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span className="chx-sheen" />
              <Zap size={18} fill="#fff" /> Find Best Offer
            </button>

            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 16, background: "linear-gradient(180deg, rgba(0,229,255,0.22), rgba(0,229,255,0.06))", border: `1.5px solid rgba(0,229,255,0.65)`, boxShadow: `0 0 32px rgba(0,229,255,0.35), 0 8px 22px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.10)` }}>
              <EscrowShield3D size={48} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 800, letterSpacing: "-0.005em" }}>Protected by escrow</div>
                <div style={{ color: "#C8D4ED", fontSize: 11.5, marginTop: 2, lineHeight: 1.4 }}>Funds release only when both sides confirm the trade.</div>
              </div>
              <div style={{ padding: "5px 9px", borderRadius: 99, background: "rgba(0,229,255,0.18)", border: `1px solid rgba(0,229,255,0.6)`, color: CYAN, fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", display: "inline-flex", gap: 6, alignItems: "center", whiteSpace: "nowrap" }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: CYAN, boxShadow: `0 0 8px ${CYAN}` }} /> ACTIVE
              </div>
            </div>
          </div>
        </Card>

        {/* SECTION LABEL */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: -10, padding: "0 4px" }}>
          <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.22em", color: TEXT_DIM, padding: "3px 9px", borderRadius: 6, background: "rgba(120,170,220,0.06)", border: `1px solid ${STROKE}` }}>02 · MANUAL</span>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${STROKE}, transparent)` }} />
        </div>

        {/* MARKETPLACE LIST — second flow, manual browsing */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
            <div>
              <div className="chx-section-title" style={{ color: TEXT, fontSize: 16, fontWeight: 700 }}>Marketplace</div>
              <div style={{ color: TEXT_DIM, fontSize: 11.5, marginTop: 2 }}>Browse offers and pick your trader</div>
            </div>
            <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.18em", color: "#9FE9FF", padding: "5px 10px", borderRadius: 999, background: "linear-gradient(180deg, rgba(0,229,255,0.12), rgba(0,229,255,0.04))", border: `1px solid rgba(0,229,255,0.3)`, boxShadow: "0 0 12px rgba(0,229,255,0.2), inset 0 1px 0 rgba(255,255,255,0.08)" }}>MANUAL</span>
          </div>

          {/* Buy/Sell + asset */}
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, position: "relative", display: "flex", padding: 4, borderRadius: 14, background: "linear-gradient(180deg, rgba(5,8,20,0.9), rgba(8,12,26,0.7))", border: `1px solid ${STROKE}`, boxShadow: "inset 0 2px 6px rgba(0,0,0,0.5), inset 0 -1px 0 rgba(255,255,255,0.04)" }}>
              <div style={{ position: "absolute", top: 4, bottom: 4, left: side === "buy" ? 4 : "calc(50% + 0px)", width: "calc(50% - 4px)", borderRadius: 10, background: side === "buy" ? `linear-gradient(180deg, #7DF2FF 0%, ${CYAN} 35%, #00A8CC 100%)` : `linear-gradient(180deg, #C7B5FF 0%, ${PURPLE} 35%, #5B2EE0 100%)`, boxShadow: side === "buy" ? `0 4px 12px rgba(0,229,255,0.45), 0 0 20px rgba(0,229,255,0.4), inset 0 1.5px 0 rgba(255,255,255,0.65), inset 0 -1.5px 0 rgba(0,40,60,0.4)` : `0 4px 12px rgba(139,92,246,0.45), 0 0 20px rgba(139,92,246,0.4), inset 0 1.5px 0 rgba(255,255,255,0.55), inset 0 -1.5px 0 rgba(40,15,80,0.4)`, transition: "left 0.28s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s ease, box-shadow 0.28s ease" }} />
              {(["buy", "sell"] as const).map((s) => {
                const active = side === s;
                return (
                  <button key={s} onClick={() => { setSide(s); s === "buy" ? navigate("/p2p/buy") : goSell(); }} style={{ position: "relative", zIndex: 1, flex: 1, height: 38, borderRadius: 10, border: "none", cursor: "pointer", color: active ? "#04121E" : TEXT_DIM, fontSize: 13, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", background: "transparent", fontFamily: "inherit", textShadow: active ? "0 1px 0 rgba(255,255,255,0.35)" : "none", transition: "color 0.2s ease" }}>{s}</button>
                );
              })}
            </div>
            <div style={{ width: 128 }}>
              <AssetSelect value={asset} onChange={setAsset} />
            </div>
          </div>

          {/* Search + Filters */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, height: 46, padding: "0 14px", borderRadius: 14, background: "rgba(8,12,26,0.8)", border: `1px solid ${STROKE}` }}>
            <Search size={15} color={TEXT_MUTE} />
            <input placeholder="Amount or payment method…" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: TEXT, fontSize: 13, fontFamily: "inherit" }} />
            <button style={{ display: "flex", alignItems: "center", gap: 6, color: "#D5DEF1", fontSize: 11.5, fontWeight: 700, padding: "6px 11px", borderRadius: 999, background: "linear-gradient(180deg, rgba(0,229,255,0.1), rgba(0,229,255,0.03))", border: `1px solid rgba(0,229,255,0.25)`, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 0 10px rgba(0,229,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
              <SlidersHorizontal size={12} color={CYAN} />
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
            <button style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 999, background: "linear-gradient(180deg, rgba(0,229,255,0.08), rgba(0,229,255,0.02))", border: `1px solid rgba(0,229,255,0.22)`, color: CYAN, fontSize: 11.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}>
              Sort: Price
              <ChevronDown size={11} />
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

          {storeOffers.filter((o) => o.side === side).length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
              {storeOffers.filter((o) => o.side === side).map((o) => (
                <Card key={o.id} accent={side === "sell" ? "purple" : "cyan"} style={{ padding: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <IconTile color={side === "sell" ? "purple" : "cyan"} size={40}><span style={{ fontSize: 15, fontWeight: 800 }}>{(o.ownerName?.[0] || "Y").toUpperCase()}</span></IconTile>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: TEXT, fontSize: 14, fontWeight: 700 }}>{o.ownerName} <BadgeCheck size={13} color={CYAN} style={{ display: "inline", verticalAlign: "middle" }} /></div>
                      <div style={{ color: TEXT_DIM, fontSize: 11, marginTop: 3 }}>{o.trades} trades · limits {o.min}–{o.max}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: side === "sell" ? PURPLE : CYAN, fontSize: 16, fontWeight: 700 }}>{o.price}</div>
                      <div style={{ color: TEXT_MUTE, fontSize: 10.5 }}>{o.available}</div>
                    </div>
                    <button onClick={() => navigate(`/p2p/order/${o.id}`)} style={{ marginLeft: 10, height: 36, padding: "0 14px", borderRadius: 10, border: `1px solid ${STROKE}`, background: side === "sell" ? `linear-gradient(180deg, #C7B5FF 0%, ${PURPLE} 30%, #5B2EE0 75%, #2E0E80 100%)` : `linear-gradient(180deg, #7DF2FF 0%, ${CYAN} 30%, #00A8CC 75%, #007A99 100%)`, color: side === "sell" ? "#fff" : "#04121E", fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em", textTransform: "uppercase" }}>Open</button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {offersState.kind === "empty" && storeOffers.filter((o) => o.side === side).length === 0 && (
            <Card accent="none" style={{ padding: "34px 18px", textAlign: "center", overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(280px 180px at 50% 0%, rgba(0,229,255,0.1), transparent 60%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", margin: "0 auto 12px", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", filter: "drop-shadow(0 0 14px rgba(0,229,255,0.45))" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.3), transparent 70%)", filter: "blur(8px)" }} />
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ position: "relative" }}>
                  <defs>
                    <linearGradient id="ib-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(0,229,255,0.32)" /><stop offset="100%" stopColor="rgba(0,229,255,0.06)" /></linearGradient>
                    <linearGradient id="ib-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9FF5FF" /><stop offset="100%" stopColor="#0096D6" /></linearGradient>
                  </defs>
                  <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#ib-bg)" stroke="rgba(159,245,255,0.5)" strokeWidth="1.2" />
                  <rect x="7" y="7" width="50" height="20" rx="15" fill="#fff" fillOpacity="0.06" />
                  <path d="M14 32 L19 18 H45 L50 32 V44 C50 46 48 48 46 48 H18 C16 48 14 46 14 44 Z" fill="url(#ib-fill)" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.8" strokeLinejoin="round" />
                  <path d="M14 32 H22 L25 36 H39 L42 32 H50" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
                  <circle cx="32" cy="14" r="2" fill={CYAN} opacity="0.85"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" /></circle>
                </svg>
              </div>
              <div style={{ color: TEXT, fontSize: 14, fontWeight: 700, letterSpacing: "-0.005em" }}>No live P2P offers available yet</div>
              <div style={{ color: TEXT_DIM, fontSize: 12, marginTop: 4 }}>Start a trade or create your own offer.</div>
              <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => navigate("/p2p/buy")} style={{ position: "relative", height: 40, padding: "0 18px", borderRadius: 12, border: "1px solid rgba(180,240,255,0.7)", background: `linear-gradient(180deg, #7DF2FF 0%, ${CYAN} 30%, #00A8CC 75%, #007A99 100%)`, color: "#04121E", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em", textTransform: "uppercase", boxShadow: `0 6px 14px rgba(0,120,160,0.5), 0 0 18px rgba(0,229,255,0.45), inset 0 1.5px 0 rgba(255,255,255,0.85), inset 0 -1.5px 0 rgba(0,50,70,0.35)` }}>Buy USDT</button>
                <button onClick={goSell} style={{ position: "relative", height: 40, padding: "0 18px", borderRadius: 12, border: "1px solid rgba(199,181,255,0.7)", background: `linear-gradient(180deg, #C7B5FF 0%, ${PURPLE} 30%, #5B2EE0 75%, #2E0E80 100%)`, color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em", textTransform: "uppercase", boxShadow: `0 6px 14px rgba(91,46,224,0.5), 0 0 18px rgba(139,92,246,0.45), inset 0 1.5px 0 rgba(255,255,255,0.45), inset 0 -1.5px 0 rgba(20,5,60,0.4)` }}>Sell USDT</button>
                <button onClick={goCreate} style={{ position: "relative", height: 40, padding: "0 18px", borderRadius: 12, border: `1px solid ${STROKE}`, background: "linear-gradient(180deg, rgba(13,20,40,0.7), rgba(8,12,28,0.85))", color: TEXT, fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em", textTransform: "uppercase" }}>Create Offer</button>
              </div>
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
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: TEXT, fontSize: 14, fontWeight: 700 }}>
                    {o.name}
                    <BadgeCheck size={13} color={CYAN} />
                    {o.online && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", color: GREEN, padding: "2px 6px", borderRadius: 999, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.35)" }}>
                        <span style={{ width: 5, height: 5, borderRadius: 99, background: GREEN, boxShadow: `0 0 6px ${GREEN}` }} />
                        ONLINE
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, fontSize: 11, color: TEXT_DIM, flexWrap: "wrap" }}>
                    <Star size={10} color="#FFB547" fill="#FFB547" />
                    <span style={{ color: "#F1F5FF", fontWeight: 600 }}>{o.rating}</span>
                    <span style={{ opacity: 0.4 }}>·</span>
                    <span><span style={{ color: GREEN, fontWeight: 600 }}>{o.completion}%</span> completion</span>
                    <span style={{ opacity: 0.4 }}>·</span>
                    {o.trades} trades
                    {o.responseMin !== undefined && (
                      <>
                        <span style={{ opacity: 0.4 }}>·</span>
                        <Clock size={9} /> ~{o.responseMin}m
                      </>
                    )}
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
                <button onClick={() => side === "buy" ? navigate("/p2p/buy") : goSell()} style={{ position: "relative", overflow: "hidden", height: 38, padding: "0 20px", borderRadius: 12, border: "1px solid rgba(180,240,255,0.7)", background: `linear-gradient(180deg, #7DF2FF 0%, ${CYAN} 30%, #00A8CC 75%, #007A99 100%)`, color: "#04121E", fontSize: 12.5, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em", boxShadow: `0 6px 14px rgba(0,120,160,0.55), 0 0 18px rgba(0,229,255,0.5), inset 0 1.5px 0 rgba(255,255,255,0.85), inset 0 -2px 0 rgba(0,50,70,0.4), inset 0 0 0 1px rgba(255,255,255,0.18)`, textShadow: "0 1px 0 rgba(255,255,255,0.35)" }}>
                  <span className="chx-sheen" />
                  {side === "buy" ? "Buy" : "Sell"} {asset}
                </button>
              </div>
            </Card>
          ))}
        </div>

        </div>
        <div className="chx-col chx-col-right">
        {/* ESCROW PROTECTION — expanded */}
        <Card accent="purple" style={{ padding: 18, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(320px 180px at 100% 0%, rgba(139,92,246,0.18), transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.32), rgba(139,92,246,0.18) 50%, transparent 75%)", filter: "blur(10px)" }} />
                <img
                  src={escrowShieldImg}
                  alt=""
                  style={{ position: "relative", width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "screen", filter: "brightness(0.9) contrast(1.15) saturate(1.1) drop-shadow(0 0 10px rgba(0,229,255,0.45))", WebkitMaskImage: "radial-gradient(ellipse 48% 52% at 50% 50%, #000 70%, transparent 100%)", maskImage: "radial-gradient(ellipse 48% 52% at 50% 50%, #000 70%, transparent 100%)" }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: TEXT, fontSize: 15, fontWeight: 700 }}>Escrow Protection</span>
                  <span className="chx-badge-pulse" style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.14em", color: "#E8DCFF", padding: "3.5px 10px", borderRadius: 999, background: "linear-gradient(180deg, rgba(139,92,246,0.28), rgba(139,92,246,0.12))", border: `1px solid rgba(180,150,255,0.5)` }}>ACTIVE</span>
                </div>
                <div style={{ color: TEXT_DIM, fontSize: 12, marginTop: 3 }}>Funds are locked and only released when both sides confirm.</div>
              </div>
            </div>

            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { kind: "lock" as const, text: "Funds are locked in escrow when a trade begins" },
                { kind: "check" as const, text: "Seller only receives funds after buyer confirmation" },
                { kind: "alert" as const, text: "Disputes can be opened and reviewed by our team" },
                { kind: "clock" as const, text: "Trade status is tracked step by step in real time" },
              ].map(({ kind, text }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ flexShrink: 0, filter: "drop-shadow(0 0 8px rgba(139,92,246,0.35))" }}>
                    <MiniPremiumIcon kind={kind} size={32} />
                  </div>
                  <span style={{ color: "#D5DEF1", fontSize: 12.5, lineHeight: 1.4 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Step indicator */}
            <div style={{ position: "relative", marginTop: 14, display: "flex", alignItems: "center", gap: 6, padding: "11px 12px", borderRadius: 12, background: "linear-gradient(180deg, rgba(139,92,246,0.1), rgba(139,92,246,0.04))", border: `1px solid ${PURPLE_SOFT}`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04)` }}>
              {/* Connecting glow line */}
              <div style={{ position: "absolute", left: 28, right: 28, top: "50%", height: 1, background: `linear-gradient(90deg, rgba(139,92,246,0.5), rgba(0,229,255,0.35), rgba(139,92,246,0.5))`, transform: "translateY(-50%)", boxShadow: `0 0 6px rgba(139,92,246,0.4)`, pointerEvents: "none" }} />
              {[
                { Icon: Lock, label: "Lock", active: true },
                { Icon: CreditCard, label: "Pay", active: false },
                { Icon: CheckCircle2, label: "Confirm", active: false },
                { Icon: Zap, label: "Release", active: false },
              ].map(({ Icon, label, active }) => (
                <div key={label} style={{ position: "relative", display: "flex", alignItems: "center", gap: 5, flex: 1, justifyContent: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: 99, background: active ? `linear-gradient(180deg, ${PURPLE}, #6D3DD8)` : "rgba(139,92,246,0.14)", border: active ? `1px solid rgba(180,150,255,0.7)` : `1px solid ${PURPLE_SOFT}`, display: "flex", alignItems: "center", justifyContent: "center", color: active ? "#fff" : PURPLE, boxShadow: active ? `0 0 12px rgba(139,92,246,0.7), inset 0 1px 0 rgba(255,255,255,0.3)` : `0 0 4px rgba(139,92,246,0.25)`, flexShrink: 0, zIndex: 1 }}>
                    <Icon size={11} />
                  </div>
                  <span style={{ fontSize: 10.5, fontWeight: active ? 700 : 600, color: active ? "#F1F5FF" : TEXT_DIM, letterSpacing: "0.04em" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        </div>
        </div>
        {/* TRUST CARDS — full width below the grid */}
        <div className="chx-trust-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 4 }}>
          {([
            { iconKind: "escrow" as const, label: "Secure Escrow", desc: "Funds locked until trade completes", color: "cyan" as const, kind: "default" },
            { iconKind: "verified" as const, label: "Verified Traders", desc: "", color: "purple" as const, kind: "soon" },
            { iconKind: "payments" as const, label: "Multiple Payments", desc: "Bank, e-wallets, and more", color: "cyan" as const, kind: "payments" },
            { iconKind: "support" as const, label: "24/7 Support", desc: "We're here whenever you need us", color: "purple" as const, kind: "default" },
          ]).map(({ iconKind, label, desc, color, kind }) => {
            const tint = color === "cyan" ? "0,229,255" : "139,92,246";
            return (
              <div key={label} className="chx-card-hover chx-trust-card" style={{ position: "relative", borderRadius: 22, padding: 16, background: `linear-gradient(180deg, rgba(13,20,40,0.7), rgba(8,12,28,0.85))`, border: `1px solid rgba(${tint},0.22)`, boxShadow: `0 1px 0 rgba(255,255,255,0.05) inset, 0 0 22px rgba(${tint},0.1), 0 8px 22px rgba(0,0,0,0.35)`, cursor: "pointer", minHeight: 130 }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, rgba(${tint},0.5), transparent)` }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ filter: `drop-shadow(0 0 10px rgba(${tint},0.5))` }}><PremiumIcon kind={iconKind} /></div>
                  <div>
                    <div style={{ color: "#F8FAFF", fontSize: 13.5, fontWeight: 700 }}>{label}</div>
                    {kind === "soon" ? (
                      <span style={{ display: "inline-block", marginTop: 6, fontSize: 9.5, fontWeight: 800, letterSpacing: "0.14em", color: PURPLE, padding: "3px 8px", borderRadius: 999, background: "rgba(139,92,246,0.12)", border: `1px solid ${PURPLE_SOFT}`, boxShadow: `0 0 10px rgba(139,92,246,0.3)` }}>COMING SOON</span>
                    ) : kind === "payments" ? (
                      <>
                        <div style={{ color: TEXT_DIM, fontSize: 11.5, marginTop: 3, lineHeight: 1.35 }}>{desc}</div>
                        <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
                          {["VISA", "MC", "BANK"].map((p) => (
                            <div key={p} style={{ height: 18, padding: "0 7px", borderRadius: 4, background: "rgba(0,229,255,0.06)", border: `1px solid rgba(0,229,255,0.2)`, color: "#C8D4ED", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.08em", display: "flex", alignItems: "center", justifyContent: "center" }}>{p}</div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div style={{ color: TEXT_DIM, fontSize: 11.5, marginTop: 3, lineHeight: 1.35 }}>{desc}</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* PREMIUM FOOTER */}
        <div style={{ marginTop: 18, padding: "20px 16px 4px", borderTop: `1px solid ${STROKE}`, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: -1, height: 1, background: `linear-gradient(90deg, transparent, ${CYAN}, ${PURPLE}, transparent)`, opacity: 0.35 }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <ShieldLogo />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 800, letterSpacing: "0.16em", fontFamily: "'Space Grotesk', sans-serif" }}>COINHUBX</span>
              <span style={{ color: TEXT_MUTE, fontSize: 8, fontWeight: 600, letterSpacing: "0.28em", marginTop: 2 }}>EST · 2026</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            {["256-BIT TLS", "COLD STORAGE", "PROOF-OF-RESERVES", "GDPR"].map((b) => (
              <span key={b} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 8.5, fontWeight: 700, letterSpacing: "0.16em", color: "#C8D4ED", padding: "4px 9px", borderRadius: 999, background: "linear-gradient(180deg, rgba(13,20,40,0.8), rgba(8,12,28,0.6))", border: `1px solid rgba(0,229,255,0.18)`, boxShadow: "0 0 10px rgba(0,229,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)" }}>
                <CheckCircle2 size={9} color={CYAN} />
                {b}
              </span>
            ))}
          </div>
          <div style={{ textAlign: "center", color: TEXT_MUTE, fontSize: 10.5, lineHeight: 1.55, maxWidth: 360, margin: "0 auto" }}>
            Trade responsibly. Crypto assets are volatile and your capital is at risk.
          </div>
          <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 14, fontSize: 10.5, color: TEXT_DIM }}>
            {["Terms", "Privacy", "Security", "Support"].map((l) => (
              <a key={l} href="#" style={{ color: TEXT_DIM, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <div style={{ marginTop: 14, textAlign: "center", color: TEXT_MUTE, fontSize: 9.5, letterSpacing: "0.08em" }}>
            © 2026 CoinHubX · All rights reserved
          </div>
        </div>
      </main>
    </div>
  );
}
