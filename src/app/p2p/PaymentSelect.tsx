import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { CYAN, BLUE, PURPLE, TEXT, TEXT_DIM, TEXT_MUTE, STROKE, CYAN_SOFT } from "./shared";
import escrowShieldImg from "../../imports/a19fa6bb-e9ab-401f-982b-dd8eaffb5835_(1)_2.jpg";

export type PaymentMethod =
  | "Bank Transfer"
  | "Faster Payments"
  | "Debit / Credit Card"
  | "Wise"
  | "Revolut"
  | "PayPal"
  | "Apple Pay"
  | "Google Pay"
  | "Cash"
  | "Other";

export const PAYMENT_METHODS: PaymentMethod[] = [
  "Bank Transfer",
  "Faster Payments",
  "Debit / Credit Card",
  "Wise",
  "Revolut",
  "PayPal",
  "Apple Pay",
  "Google Pay",
  "Cash",
  "Other",
];

const SUBTITLES: Record<PaymentMethod, string> = {
  "Bank Transfer": "SEPA / SWIFT / ACH",
  "Faster Payments": "UK · Instant",
  "Debit / Credit Card": "Visa, Mastercard",
  Wise: "Multi-currency",
  Revolut: "Revolut transfer",
  PayPal: "PayPal balance",
  "Apple Pay": "iPhone · Watch",
  "Google Pay": "Android · Web",
  Cash: "In person",
  Other: "Custom method",
};

export function PaymentSelect({ value, onChange }: { value: PaymentMethod; onChange: (v: PaymentMethod) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="chx-pay-trigger"
        style={{
          width: "100%",
          height: 56,
          padding: "0 14px",
          borderRadius: 14,
          background: "linear-gradient(180deg, rgba(5,8,20,0.85), rgba(8,12,28,0.65))",
          border: `1px solid ${open ? CYAN_SOFT : "rgba(0,229,255,0.18)"}`,
          color: TEXT,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          gap: 12,
          outline: "none",
          boxShadow: open
            ? `inset 0 1px 0 rgba(255,255,255,0.05), inset 0 0 14px rgba(0,229,255,0.08), 0 0 0 3px rgba(0,229,255,0.12)`
            : `inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 14px rgba(0,229,255,0.04)`,
          transition: "border-color .2s ease, box-shadow .2s ease",
        }}
      >
        <PaymentIcon method={value} size={32} />
        <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: TEXT, lineHeight: 1.15 }}>{value}</div>
          <div style={{ fontSize: 10.5, color: TEXT_MUTE, marginTop: 2, letterSpacing: "0.04em" }}>{SUBTITLES[value]}</div>
        </div>
        <ChevronDown size={16} color={TEXT_DIM} style={{ transition: "transform .2s ease", transform: open ? "rotate(180deg)" : "rotate(0)" }} />
      </button>

      {open && (
        <div
          className="chx-pay-pop"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 60,
            maxHeight: 320,
            overflowY: "auto",
            padding: 6,
            borderRadius: 16,
            background: "linear-gradient(180deg, rgba(16,24,52,0.96), rgba(8,12,30,0.98))",
            border: `1px solid rgba(0,229,255,0.3)`,
            boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 50px rgba(0,229,255,0.18), inset 0 1px 0 rgba(255,255,255,0.04)`,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          {PAYMENT_METHODS.map((m) => {
            const selected = m === value;
            return (
              <button
                key={m}
                type="button"
                onClick={() => { onChange(m); setOpen(false); }}
                className="chx-pay-row"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  background: selected ? "linear-gradient(180deg, rgba(0,229,255,0.14), rgba(0,229,255,0.04))" : "transparent",
                  border: selected ? `1px solid rgba(0,229,255,0.35)` : "1px solid transparent",
                  color: TEXT,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: "inherit",
                  textAlign: "left",
                  transition: "transform .15s ease, background .2s ease, border-color .2s ease, box-shadow .2s ease",
                }}
              >
                <PaymentIcon method={m} size={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: TEXT, lineHeight: 1.15 }}>{m}</div>
                  <div style={{ fontSize: 10.5, color: TEXT_MUTE, marginTop: 2, letterSpacing: "0.04em" }}>{SUBTITLES[m]}</div>
                </div>
                {selected && (
                  <div style={{ width: 22, height: 22, borderRadius: 99, background: `linear-gradient(180deg, ${CYAN}, ${BLUE})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#04121E", boxShadow: `0 0 12px ${CYAN_SOFT}` }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        .chx-pay-trigger:hover { border-color: ${CYAN_SOFT} !important; }
        .chx-pay-pop { animation: chxPopIn .2s cubic-bezier(.2,.9,.3,1.1); transform-origin: top center; }
        @keyframes chxPopIn { from { opacity: 0; transform: translateY(-6px) scale(0.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
        .chx-pay-row:hover { background: linear-gradient(180deg, rgba(0,229,255,0.08), rgba(0,229,255,0.02)) !important; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,229,255,0.12), inset 0 1px 0 rgba(255,255,255,0.04); border-color: rgba(0,229,255,0.22) !important; }
        .chx-pay-pop::-webkit-scrollbar { width: 8px; }
        .chx-pay-pop::-webkit-scrollbar-track { background: transparent; }
        .chx-pay-pop::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.18); border-radius: 99px; }
        .chx-pay-pop::-webkit-scrollbar-thumb:hover { background: rgba(0,229,255,0.32); }
      `}</style>
    </div>
  );
}

/* -------------------- 3D PAYMENT ICONS -------------------- */

export function PaymentIcon({ method, size = 32 }: { method: PaymentMethod; size?: number }) {
  const Comp = ICONS[method];
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <Comp size={size} />
    </div>
  );
}

type IconProps = { size: number };

const baseStyle = (size: number, glow: string): React.CSSProperties => ({
  width: size,
  height: size,
  borderRadius: size * 0.28,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  background: "linear-gradient(180deg, #1A2342 0%, #0B1228 50%, #060A1A 100%)",
  border: "1px solid rgba(120,170,220,0.18)",
  boxShadow: `0 4px 10px rgba(0,0,0,0.5), 0 0 14px ${glow}, inset 0 1.2px 0 rgba(255,255,255,0.16), inset 0 -1.5px 0 rgba(0,0,0,0.45)`,
  overflow: "hidden",
});

const innerHighlight: React.CSSProperties = {
  position: "absolute",
  inset: 1,
  borderRadius: "inherit",
  background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 35%)",
  pointerEvents: "none",
};

const ICONS: Record<PaymentMethod, (p: IconProps) => JSX.Element> = {
  "Bank Transfer": ({ size }) => (
    <div style={baseStyle(size, "rgba(0,229,255,0.28)")}>
      <div style={innerHighlight} />
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="bnk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9FF5FF" /><stop offset="100%" stopColor={BLUE} /></linearGradient>
        </defs>
        <path d="M3 9 L12 3.5 L21 9 V10.5 H3 Z" fill="url(#bnk)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeLinejoin="round" />
        <rect x="4.5" y="11" width="2" height="7" rx="0.4" fill="url(#bnk)" />
        <rect x="9" y="11" width="2" height="7" rx="0.4" fill="url(#bnk)" />
        <rect x="13" y="11" width="2" height="7" rx="0.4" fill="url(#bnk)" />
        <rect x="17.5" y="11" width="2" height="7" rx="0.4" fill="url(#bnk)" />
        <rect x="3" y="19" width="18" height="1.6" rx="0.4" fill="url(#bnk)" />
      </svg>
    </div>
  ),
  "Faster Payments": ({ size }) => (
    <div style={baseStyle(size, "rgba(0,229,255,0.32)")}>
      <div style={innerHighlight} />
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="fp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFE26B" /><stop offset="100%" stopColor="#FF9F43" /></linearGradient>
        </defs>
        <path d="M13 2 L4 14 H11 L9 22 L20 9 H13 Z" fill="url(#fp)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" strokeLinejoin="round" />
      </svg>
      <span style={{ position: "absolute", bottom: 3, right: 3, fontSize: size * 0.18, fontWeight: 800, color: "#9FE9FF", letterSpacing: "0.04em", textShadow: "0 1px 0 rgba(0,0,0,0.6)" }}>UK</span>
    </div>
  ),
  "Debit / Credit Card": ({ size }) => (
    <div style={baseStyle(size, "rgba(46,123,255,0.32)")}>
      <div style={innerHighlight} />
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="cd" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7AB8FF" /><stop offset="100%" stopColor={BLUE} /></linearGradient>
          <linearGradient id="cdc" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FFE26B" /><stop offset="100%" stopColor="#FF9F43" /></linearGradient>
        </defs>
        <rect x="3" y="6" width="18" height="12" rx="2" fill="url(#cd)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <rect x="3" y="9" width="18" height="2" fill="rgba(0,0,0,0.5)" />
        <rect x="5" y="13" width="4" height="3" rx="0.6" fill="url(#cdc)" />
      </svg>
    </div>
  ),
  Wise: ({ size }) => (
    <div style={baseStyle(size, "rgba(0,229,255,0.3)")}>
      <div style={innerHighlight} />
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="ws" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9FF5C8" /><stop offset="100%" stopColor="#00D26A" /></linearGradient>
        </defs>
        <path d="M3 6 L7 6 L11.5 14 L13 6 L17 6 L13.5 18 L9.5 18 L5 10 L4 12 L8 12 L7 14.5 L3 14.5 Z" fill="url(#ws)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" strokeLinejoin="round" />
      </svg>
    </div>
  ),
  Revolut: ({ size }) => (
    <div style={baseStyle(size, "rgba(139,92,246,0.32)")}>
      <div style={innerHighlight} />
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="rv" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C7B5FF" /><stop offset="100%" stopColor={PURPLE} /></linearGradient>
        </defs>
        <path d="M5 4 H13 C16 4 18 6 18 9 C18 11.5 16.4 13.4 14 13.9 L18.5 20 H14 L10 14 H8.5 V20 H5 Z M8.5 7 V11 H12.5 C13.6 11 14.5 10.1 14.5 9 C14.5 7.9 13.6 7 12.5 7 Z" fill="url(#rv)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" strokeLinejoin="round" />
      </svg>
    </div>
  ),
  PayPal: ({ size }) => (
    <div style={baseStyle(size, "rgba(46,123,255,0.32)")}>
      <div style={innerHighlight} />
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="pp1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7AB8FF" /><stop offset="100%" stopColor="#1E5BD6" /></linearGradient>
          <linearGradient id="pp2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9FF5FF" /><stop offset="100%" stopColor={CYAN} /></linearGradient>
        </defs>
        <path d="M6.5 4 H12 C15 4 17 5.7 16.6 8.6 C16.2 11.7 13.9 13.2 11 13.2 H9 L8.2 18.4 C8.1 18.9 7.7 19.2 7.2 19.2 H5.4 C4.9 19.2 4.6 18.8 4.7 18.3 Z" fill="url(#pp1)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.3" strokeLinejoin="round" />
        <path d="M9 7 H14 C17 7 19 8.6 18.7 11.5 C18.3 14.6 16 16.2 13.1 16.2 H11.1 L10.3 21.4 C10.2 21.9 9.8 22.2 9.3 22.2 H7.5 C7 22.2 6.7 21.8 6.8 21.3 Z" fill="url(#pp2)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.3" strokeLinejoin="round" opacity="0.85" />
      </svg>
    </div>
  ),
  "Apple Pay": ({ size }) => (
    <div style={baseStyle(size, "rgba(255,255,255,0.18)")}>
      <div style={innerHighlight} />
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="ap" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#C8CFE0" /></linearGradient>
        </defs>
        <path d="M16.4 12.6 C16.4 10.4 18.2 9.4 18.3 9.3 C17.3 7.9 15.7 7.7 15.2 7.7 C13.9 7.6 12.7 8.5 12 8.5 C11.3 8.5 10.3 7.7 9.2 7.7 C7.7 7.7 6.4 8.5 5.7 9.8 C4.2 12.4 5.3 16.2 6.7 18.3 C7.4 19.3 8.3 20.5 9.4 20.4 C10.4 20.4 10.8 19.7 12 19.7 C13.2 19.7 13.5 20.4 14.6 20.4 C15.7 20.4 16.5 19.4 17.2 18.4 C18 17.2 18.3 16.1 18.3 16 C18.3 16 16.4 15.3 16.4 12.6 Z M14.4 6.4 C15 5.7 15.4 4.7 15.3 3.7 C14.4 3.7 13.4 4.3 12.8 5 C12.2 5.6 11.8 6.7 11.9 7.6 C12.9 7.7 13.8 7.1 14.4 6.4 Z" fill="url(#ap)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.3" strokeLinejoin="round" />
      </svg>
    </div>
  ),
  "Google Pay": ({ size }) => (
    <div style={baseStyle(size, "rgba(46,123,255,0.3)")}>
      <div style={innerHighlight} />
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
        <path d="M12 11 V13.5 H15.5 C15.3 14.6 14.7 15.5 13.7 16.1 V18.1 H16.4 C18 16.7 18.9 14.6 18.9 12.2 C18.9 11.6 18.8 11.1 18.7 10.6 H12 Z" fill="#4285F4" />
        <path d="M12 19 C13.9 19 15.5 18.4 16.4 17.4 L13.7 16.1 C12.9 16.6 12 16.9 12 16.9 C10.2 16.9 8.7 15.7 8.2 14 H5.4 V16 C6.4 17.8 8.9 19 12 19 Z" fill="#34A853" />
        <path d="M8.2 14 C8.1 13.6 8 13.2 8 12.7 C8 12.3 8.1 11.8 8.2 11.4 V9.4 H5.4 C4.9 10.4 4.6 11.5 4.6 12.7 C4.6 14 4.9 15 5.4 16 Z" fill="#FBBC04" />
        <path d="M12 8.6 C13 8.6 13.9 8.9 14.7 9.6 L17 7.3 C15.5 6 13.9 5.4 12 5.4 C8.9 5.4 6.4 6.7 5.4 9.4 L8.2 11.4 C8.7 9.8 10.2 8.6 12 8.6 Z" fill="#EA4335" />
      </svg>
    </div>
  ),
  Cash: ({ size }) => (
    <div style={baseStyle(size, "rgba(74,222,128,0.32)")}>
      <div style={innerHighlight} />
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="ch" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9FF5C8" /><stop offset="100%" stopColor="#16A34A" /></linearGradient>
        </defs>
        <rect x="3" y="6.5" width="18" height="11" rx="1.6" fill="url(#ch)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <circle cx="12" cy="12" r="2.6" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.6" />
        <text x="12" y="13.6" textAnchor="middle" fontSize="3.4" fontWeight="800" fill="rgba(255,255,255,0.9)" fontFamily="system-ui">$</text>
        <circle cx="5.5" cy="9" r="0.6" fill="rgba(255,255,255,0.5)" />
        <circle cx="18.5" cy="15" r="0.6" fill="rgba(255,255,255,0.5)" />
      </svg>
    </div>
  ),
  Other: ({ size }) => (
    <div style={baseStyle(size, "rgba(120,170,220,0.22)")}>
      <div style={innerHighlight} />
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="ot" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E0E8FA" /><stop offset="100%" stopColor="#7C8AAB" /></linearGradient>
        </defs>
        <circle cx="6" cy="12" r="2" fill="url(#ot)" />
        <circle cx="12" cy="12" r="2" fill="url(#ot)" />
        <circle cx="18" cy="12" r="2" fill="url(#ot)" />
      </svg>
    </div>
  ),
};

/* -------------------- 3D ESCROW SHIELD -------------------- */

export function EscrowShield3D({ size = 44, pulse = true }: { size?: number; pulse?: boolean }) {
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }} className={pulse ? "chx-escrow-pulse" : undefined}>
      <div style={{ position: "absolute", inset: -size * 0.28, borderRadius: "50%", background: `radial-gradient(circle, rgba(0,229,255,0.55), rgba(0,229,255,0.18) 38%, transparent 72%)`, filter: "blur(12px)", pointerEvents: "none" }} />
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "relative", overflow: "visible", filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.5)) drop-shadow(0 0 14px rgba(0,229,255,0.5))" }}>
        <defs>
          <filter id="chxShieldSoftEdge">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
          <mask id="chxShieldMask" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            <rect x="0" y="0" width="100" height="100" fill="black" />
            <path d="M50 3 L90 16 V47 C90 70 74 87 50 97 C26 87 10 70 10 47 V16 Z" fill="white" filter="url(#chxShieldSoftEdge)" />
          </mask>
        </defs>
        <image href={escrowShieldImg} x="-2" y="-2" width="104" height="104" preserveAspectRatio="xMidYMid slice" mask="url(#chxShieldMask)" />
      </svg>

      <style>{`
        .chx-escrow-pulse { animation: chxEscrowPulse 3.2s ease-in-out infinite; }
        @keyframes chxEscrowPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,229,255,0)); }
          50% { transform: scale(1.04); filter: drop-shadow(0 0 12px rgba(0,229,255,0.35)); }
        }
      `}</style>
    </div>
  );
}
