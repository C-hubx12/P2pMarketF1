import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { CYAN, TEXT, TEXT_DIM, TEXT_MUTE, STROKE, CYAN_SOFT, input as inputStyle } from "./shared";

export type Currency = {
  code: string;
  name: string;
  flag: string;
  symbol: string;
};

export const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", symbol: "$" },
  { code: "EUR", name: "Euro", flag: "🇪🇺", symbol: "€" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭", symbol: "CHF" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰", symbol: "HK$" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", symbol: "S$" },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿", symbol: "NZ$" },
  { code: "KRW", name: "South Korean Won", flag: "🇰🇷", symbol: "₩" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽", symbol: "$" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦", symbol: "R" },
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬", symbol: "₦" },
  { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪", symbol: "KSh" },
  { code: "EGP", name: "Egyptian Pound", flag: "🇪🇬", symbol: "E£" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦", symbol: "﷼" },
  { code: "QAR", name: "Qatari Riyal", flag: "🇶🇦", symbol: "﷼" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷", symbol: "₺" },
  { code: "RUB", name: "Russian Ruble", flag: "🇷🇺", symbol: "₽" },
  { code: "UAH", name: "Ukrainian Hryvnia", flag: "🇺🇦", symbol: "₴" },
  { code: "PLN", name: "Polish Złoty", flag: "🇵🇱", symbol: "zł" },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", flag: "🇩🇰", symbol: "kr" },
  { code: "CZK", name: "Czech Koruna", flag: "🇨🇿", symbol: "Kč" },
  { code: "HUF", name: "Hungarian Forint", flag: "🇭🇺", symbol: "Ft" },
  { code: "RON", name: "Romanian Leu", flag: "🇷🇴", symbol: "lei" },
  { code: "ILS", name: "Israeli Shekel", flag: "🇮🇱", symbol: "₪" },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭", symbol: "฿" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩", symbol: "Rp" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾", symbol: "RM" },
  { code: "PHP", name: "Philippine Peso", flag: "🇵🇭", symbol: "₱" },
  { code: "VND", name: "Vietnamese Đồng", flag: "🇻🇳", symbol: "₫" },
  { code: "PKR", name: "Pakistani Rupee", flag: "🇵🇰", symbol: "₨" },
  { code: "BDT", name: "Bangladeshi Taka", flag: "🇧🇩", symbol: "৳" },
  { code: "ARS", name: "Argentine Peso", flag: "🇦🇷", symbol: "$" },
  { code: "CLP", name: "Chilean Peso", flag: "🇨🇱", symbol: "$" },
  { code: "COP", name: "Colombian Peso", flag: "🇨🇴", symbol: "$" },
  { code: "PEN", name: "Peruvian Sol", flag: "🇵🇪", symbol: "S/" },
  { code: "GHS", name: "Ghanaian Cedi", flag: "🇬🇭", symbol: "₵" },
  { code: "MAD", name: "Moroccan Dirham", flag: "🇲🇦", symbol: "DH" },
  { code: "TWD", name: "Taiwan Dollar", flag: "🇹🇼", symbol: "NT$" },
];

export function findCurrency(code: string): Currency {
  return CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
}

export function CurrencySelect({ value, onChange, compact = false }: { value: string; onChange: (code: string) => void; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const cur = findCurrency(value);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter((c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
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
          boxShadow: open ? `inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px ${CYAN_SOFT}, 0 0 18px rgba(0,229,255,0.22)` : (inputStyle.boxShadow as string),
        }}
      >
        <span style={{ fontSize: 22, lineHeight: 1, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))" }}>{cur.flag}</span>
        <span style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
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
          boxShadow: "0 30px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 26px rgba(0,229,255,0.22)",
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          animation: "chxDropIn .18s ease-out",
        }}>
          <div style={{ padding: 8, borderBottom: `1px solid ${STROKE}`, display: "flex", alignItems: "center", gap: 8 }}>
            <Search size={14} color={TEXT_MUTE} style={{ marginLeft: 8 }} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search currency…"
              style={{ flex: 1, height: 34, padding: "0 8px", border: 0, outline: 0, background: "transparent", color: TEXT, fontSize: 13, fontFamily: "inherit" }}
            />
          </div>
          <div style={{ overflowY: "auto", padding: 6 }}>
            {filtered.length === 0 && (
              <div style={{ padding: 14, textAlign: "center", color: TEXT_MUTE, fontSize: 12 }}>No currency found</div>
            )}
            {filtered.map((c) => {
              const selected = c.code === value;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => { onChange(c.code); setOpen(false); setQuery(""); }}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 12,
                    padding: "9px 10px", borderRadius: 10, border: 0,
                    background: selected ? "linear-gradient(180deg, rgba(0,229,255,0.18), rgba(0,229,255,0.06))" : "transparent",
                    color: TEXT, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                    transition: "background 0.12s ease",
                  }}
                  onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = "rgba(0,229,255,0.06)"; }}
                  onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ fontSize: 22, lineHeight: 1 }}>{c.flag}</span>
                  <span style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: TEXT, letterSpacing: "0.04em" }}>{c.code} <span style={{ color: TEXT_MUTE, fontWeight: 600, marginLeft: 4 }}>{c.symbol}</span></span>
                    <span style={{ fontSize: 11, color: TEXT_DIM, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                  </span>
                  {selected && <Check size={14} color={CYAN} />}
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

export const COUNTRIES: { code: string; name: string; flag: string }[] = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "TW", name: "Taiwan", flag: "🇹🇼" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "MA", name: "Morocco", flag: "🇲🇦" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "PE", name: "Peru", flag: "🇵🇪" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "CZ", name: "Czechia", flag: "🇨🇿" },
  { code: "HU", name: "Hungary", flag: "🇭🇺" },
  { code: "RO", name: "Romania", flag: "🇷🇴" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
];

export function findCountry(code: string) {
  return COUNTRIES.find((c) => c.code === code) || COUNTRIES[0];
}

export function CountrySelect({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const cur = findCountry(value);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={{
        ...inputStyle, height: 48, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", textAlign: "left",
        borderColor: open ? CYAN_SOFT : "rgba(0,229,255,0.18)",
      }}>
        <span style={{ fontSize: 22, lineHeight: 1 }}>{cur.flag}</span>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: TEXT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cur.name}</span>
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
        }}>
          <div style={{ padding: 8, borderBottom: `1px solid ${STROKE}`, display: "flex", alignItems: "center", gap: 8 }}>
            <Search size={14} color={TEXT_MUTE} style={{ marginLeft: 8 }} />
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search country…" style={{ flex: 1, height: 34, padding: "0 8px", border: 0, outline: 0, background: "transparent", color: TEXT, fontSize: 13, fontFamily: "inherit" }} />
          </div>
          <div style={{ overflowY: "auto", padding: 6 }}>
            {filtered.map((c) => {
              const selected = c.code === value;
              return (
                <button key={c.code} type="button" onClick={() => { onChange(c.code); setOpen(false); setQuery(""); }} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "9px 10px", borderRadius: 10, border: 0,
                  background: selected ? "linear-gradient(180deg, rgba(0,229,255,0.18), rgba(0,229,255,0.06))" : "transparent",
                  color: TEXT, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                }}
                onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = "rgba(0,229,255,0.06)"; }}
                onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = "transparent"; }}>
                  <span style={{ fontSize: 22, lineHeight: 1 }}>{c.flag}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: TEXT }}>{c.name}</span>
                  {selected && <Check size={14} color={CYAN} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
