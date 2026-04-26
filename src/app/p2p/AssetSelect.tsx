import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { CYAN, TEXT, TEXT_DIM, TEXT_MUTE, STROKE, CYAN_SOFT, input as inputStyle } from "./shared";

export type Asset = {
  code: string;
  name: string;
  network?: string;
  /** main face colour for the 3D coin */
  c1: string;
  c2: string;
  /** unicode glyph or short ticker rendered on the face */
  glyph: string;
};

export const ASSETS: Asset[] = [
  { code: "USDT", name: "Tether",          network: "TRC20 / ERC20", c1: "#3FCFA0", c2: "#0E7B5A", glyph: "₮" },
  { code: "USDC", name: "USD Coin",        network: "ERC20",          c1: "#5AB1FF", c2: "#1F4FCC", glyph: "$" },
  { code: "BTC",  name: "Bitcoin",         network: "BTC",            c1: "#FFB347", c2: "#B7621A", glyph: "₿" },
  { code: "ETH",  name: "Ethereum",        network: "ERC20",          c1: "#A2B8FF", c2: "#3B4CCB", glyph: "Ξ" },
  { code: "BNB",  name: "BNB",             network: "BEP20",          c1: "#F7D24A", c2: "#B98911", glyph: "B" },
  { code: "SOL",  name: "Solana",          network: "SOL",            c1: "#C786FF", c2: "#5C2EB0", glyph: "◎" },
  { code: "XRP",  name: "XRP",             network: "XRPL",           c1: "#9CA3AF", c2: "#374151", glyph: "✕" },
  { code: "ADA",  name: "Cardano",         network: "Cardano",        c1: "#5EA1FF", c2: "#143C8A", glyph: "₳" },
  { code: "DOGE", name: "Dogecoin",        network: "DOGE",           c1: "#F9D77E", c2: "#9A7012", glyph: "Ð" },
  { code: "TON",  name: "Toncoin",         network: "TON",            c1: "#5DD0FF", c2: "#1670A6", glyph: "◆" },
  { code: "TRX",  name: "TRON",            network: "TRC20",          c1: "#FF6F6F", c2: "#9C1414", glyph: "T" },
  { code: "MATIC",name: "Polygon",         network: "Polygon",        c1: "#B98DFF", c2: "#5B2EE0", glyph: "M" },
  { code: "AVAX", name: "Avalanche",       network: "C-Chain",        c1: "#FF7A7A", c2: "#9C1414", glyph: "A" },
  { code: "DOT",  name: "Polkadot",        network: "Polkadot",       c1: "#FF8FB7", c2: "#9C1B57", glyph: "•" },
  { code: "LTC",  name: "Litecoin",        network: "LTC",            c1: "#C7D0DC", c2: "#5A6373", glyph: "Ł" },
  { code: "LINK", name: "Chainlink",       network: "ERC20",          c1: "#7FA9FF", c2: "#1F4DAB", glyph: "L" },
  { code: "ATOM", name: "Cosmos",          network: "Cosmos",         c1: "#A1B6FF", c2: "#2A3A99", glyph: "⚛" },
  { code: "NEAR", name: "NEAR",            network: "NEAR",           c1: "#9DEDC9", c2: "#1E7A55", glyph: "N" },
  { code: "ARB",  name: "Arbitrum",        network: "Arbitrum",       c1: "#7FBFFF", c2: "#13518F", glyph: "▲" },
  { code: "OP",   name: "Optimism",        network: "Optimism",       c1: "#FF8A8A", c2: "#A11212", glyph: "O" },
  { code: "SHIB", name: "Shiba Inu",       network: "ERC20",          c1: "#FFA873", c2: "#A33C0E", glyph: "S" },
  { code: "DAI",  name: "Dai",             network: "ERC20",          c1: "#F5C46B", c2: "#A6700C", glyph: "D" },
  { code: "PEPE", name: "Pepe",            network: "ERC20",          c1: "#A8DC7C", c2: "#3F7917", glyph: "P" },
  { code: "BCH",  name: "Bitcoin Cash",    network: "BCH",            c1: "#9EE6A2", c2: "#1F8025", glyph: "Ƀ" },
  { code: "ETC",  name: "Ethereum Classic",network: "ETC",            c1: "#9DEDB1", c2: "#1F8038", glyph: "Ξ" },
  { code: "XLM",  name: "Stellar",         network: "Stellar",        c1: "#C8C8C8", c2: "#3D3D3D", glyph: "✦" },
  { code: "ALGO", name: "Algorand",        network: "Algorand",       c1: "#9CB6FF", c2: "#1A2D78", glyph: "A" },
  { code: "FIL",  name: "Filecoin",        network: "FIL",            c1: "#7FE0FF", c2: "#0F6E92", glyph: "F" },
  { code: "AAVE", name: "Aave",            network: "ERC20",          c1: "#C8B7FF", c2: "#5C3DB5", glyph: "A" },
  { code: "UNI",  name: "Uniswap",         network: "ERC20",          c1: "#FFA0CB", c2: "#A0306C", glyph: "🦄" },
];

export function findAsset(code: string): Asset {
  return ASSETS.find((a) => a.code === code) || ASSETS[0];
}

/** Premium 3D coin: gradient face, top highlight, bottom rim, ticker glyph */
export function AssetCoin({ asset, size = 30 }: { asset: Asset; size?: number }) {
  const r = size / 2;
  const fontSize = Math.max(11, Math.round(size * 0.42));
  return (
    <div
      style={{
        position: "relative", width: size, height: size, flexShrink: 0,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 28%, #FFFFFF 0%, ${asset.c1} 28%, ${asset.c2} 100%)`,
        boxShadow: `inset 0 ${Math.max(1, r * 0.12)}px 0 rgba(255,255,255,0.55), inset 0 -${Math.max(1, r * 0.18)}px 0 rgba(0,0,0,0.32), 0 ${Math.max(2, r * 0.28)}px ${Math.max(4, r * 0.48)}px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.18)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#FFFFFF",
        textShadow: "0 1px 1px rgba(0,0,0,0.35)",
        fontWeight: 900,
        fontSize,
        letterSpacing: "-0.02em",
      }}
    >
      <span style={{ position: "relative", zIndex: 1, lineHeight: 1, transform: "translateY(-1%)" }}>{asset.glyph}</span>
      {/* top sheen */}
      <span style={{
        position: "absolute", top: r * 0.12, left: r * 0.28, width: r * 1.0, height: r * 0.55,
        borderRadius: "50%",
        background: "radial-gradient(ellipse at center, rgba(255,255,255,0.7), rgba(255,255,255,0) 70%)",
        pointerEvents: "none", filter: "blur(0.5px)",
      }} />
    </div>
  );
}

export function AssetSelect({ value, onChange, compact = false }: { value: string; onChange: (code: string) => void; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const cur = findAsset(value);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ASSETS;
    return ASSETS.filter((a) => a.code.toLowerCase().includes(q) || a.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          ...inputStyle,
          height: compact ? 40 : 48,
          display: "flex", alignItems: "center", gap: 10,
          cursor: "pointer", textAlign: "left",
          borderColor: open ? CYAN_SOFT : "rgba(0,229,255,0.18)",
          boxShadow: open ? `0 0 0 1px ${CYAN_SOFT}, 0 0 18px rgba(0,229,255,0.22)` : (inputStyle.boxShadow as string),
        }}
      >
        <AssetCoin asset={cur} size={28} />
        <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: TEXT, letterSpacing: "0.04em" }}>{cur.code}</span>
          {!compact && <span style={{ fontSize: 11, color: TEXT_DIM, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cur.name}</span>}
        </span>
        <ChevronDown size={14} color={TEXT_DIM} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.18s ease" }} />
      </button>

      {open && (
        <div style={{
          position: "absolute", zIndex: 60, top: "calc(100% + 6px)", left: 0, right: 0,
          maxHeight: 360, overflow: "hidden", display: "flex", flexDirection: "column",
          borderRadius: 14, border: `1px solid ${CYAN_SOFT}`,
          background: "linear-gradient(180deg, rgba(16,24,52,0.96), rgba(8,12,30,0.98))",
          boxShadow: "0 30px 60px rgba(0,0,0,0.55), 0 0 26px rgba(0,229,255,0.22)",
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          animation: "chxDropIn .18s ease-out",
        }}>
          <div style={{ padding: 8, borderBottom: `1px solid ${STROKE}`, display: "flex", alignItems: "center", gap: 8 }}>
            <Search size={14} color={TEXT_MUTE} style={{ marginLeft: 8 }} />
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search asset…" style={{ flex: 1, height: 34, padding: "0 8px", border: 0, outline: 0, background: "transparent", color: TEXT, fontSize: 13, fontFamily: "inherit" }} />
          </div>
          <div style={{ overflowY: "auto", padding: 6 }}>
            {filtered.length === 0 && (
              <div style={{ padding: 14, textAlign: "center", color: TEXT_MUTE, fontSize: 12 }}>No asset found</div>
            )}
            {filtered.map((a) => {
              const sel = a.code === value;
              return (
                <button key={a.code} type="button" onClick={() => { onChange(a.code); setOpen(false); setQuery(""); }} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "9px 10px", borderRadius: 10, border: 0,
                  background: sel ? "linear-gradient(180deg, rgba(0,229,255,0.18), rgba(0,229,255,0.06))" : "transparent",
                  color: TEXT, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                }}
                onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = "rgba(0,229,255,0.06)"; }}
                onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = "transparent"; }}>
                  <AssetCoin asset={a} size={28} />
                  <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: TEXT, letterSpacing: "0.04em" }}>{a.code} <span style={{ color: TEXT_MUTE, fontWeight: 600, marginLeft: 4 }}>{a.network}</span></span>
                    <span style={{ fontSize: 11, color: TEXT_DIM, marginTop: 1 }}>{a.name}</span>
                  </span>
                  {sel && <Check size={14} color={CYAN} />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <style>{`@keyframes chxDropIn { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: translateY(0) } }`}</style>
    </div>
  );
}
