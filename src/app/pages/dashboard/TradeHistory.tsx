import { useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2, XCircle, AlertTriangle, ArrowUpRight } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, secondaryBtnStyle, TEXT, TEXT_DIM, TEXT_MUTE, STROKE, CYAN, GREEN } from "../../p2p/shared";

type Status = "completed" | "cancelled" | "disputed";
type Row = { id: string; side: "buy" | "sell"; party: string; amount: string; price: string; status: Status; date: string };

const ROWS: Row[] = [
  { id: "CHX-9F2A", side: "buy", party: "Verified Trader", amount: "200 USDT", price: "1.001", status: "completed", date: "2026-04-25 14:32" },
  { id: "CHX-7C81", side: "sell", party: "QuickSwap", amount: "500 USDT", price: "1.002", status: "completed", date: "2026-04-24 09:14" },
  { id: "CHX-2D40", side: "buy", party: "FiatBridge", amount: "120 USDT", price: "1.003", status: "cancelled", date: "2026-04-22 18:01" },
  { id: "CHX-5A1B", side: "sell", party: "BlueWhale", amount: "1,000 USDT", price: "1.000", status: "disputed", date: "2026-04-19 11:47" },
  { id: "CHX-A0FC", side: "buy", party: "ProTrader", amount: "75 USDT", price: "1.002", status: "completed", date: "2026-04-15 16:22" },
];

const STATUS_TONE: Record<Status, { c: string; bg: string; border: string; icon: any; label: string }> = {
  completed: { c: GREEN, bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.35)", icon: CheckCircle2, label: "Completed" },
  cancelled: { c: TEXT_DIM, bg: "rgba(120,170,220,0.08)", border: STROKE, icon: XCircle, label: "Cancelled" },
  disputed: { c: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.35)", icon: AlertTriangle, label: "Disputed" },
};

export default function TradeHistory() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Status | "all">("all");
  const rows = tab === "all" ? ROWS : ROWS.filter((r) => r.status === tab);

  return (
    <Shell back="/p2p">
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_MUTE }}>P2P · HISTORY</div>
        <div style={{ marginTop: 4, fontSize: 22, fontWeight: 800, color: TEXT }}>Trade history</div>
      </div>

      <div style={{ display: "flex", gap: 6, padding: 6, borderRadius: 14, background: "rgba(8,12,26,0.5)", border: `1px solid ${STROKE}`, alignSelf: "flex-start", flexWrap: "wrap" }}>
        {(["all", "completed", "cancelled", "disputed"] as const).map((k) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding: "8px 16px", borderRadius: 10, border: 0, cursor: "pointer", fontFamily: "inherit",
            background: tab === k ? `linear-gradient(180deg, rgba(0,229,255,0.18), rgba(0,229,255,0.04))` : "transparent",
            color: tab === k ? TEXT : TEXT_DIM, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
          }}>{k}</button>
        ))}
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        {rows.length === 0 ? (
          <div style={{ padding: 36, textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>No {tab === "all" ? "" : tab} trades</div>
            <div style={{ fontSize: 12.5, color: TEXT_DIM, marginTop: 6 }}>Trades you complete will appear here.</div>
          </div>
        ) : (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr 0.9fr 1.1fr 1fr 0.7fr", gap: 12, padding: "12px 18px", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", color: TEXT_MUTE, borderBottom: `1px solid ${STROKE}` }}>
              <span>SIDE</span><span>PARTY</span><span>AMOUNT</span><span>PRICE</span><span>DATE</span><span>STATUS</span><span></span>
            </div>
            {rows.map((r) => {
              const t = STATUS_TONE[r.status];
              const Icon = t.icon;
              return (
                <div key={r.id} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr 0.9fr 1.1fr 1fr 0.7fr", gap: 12, padding: "14px 18px", alignItems: "center", borderBottom: `1px solid ${STROKE}`, fontSize: 13 }}>
                  <span style={{ fontWeight: 800, color: r.side === "buy" ? CYAN : "#C7B5FF", letterSpacing: "0.08em" }}>{r.side.toUpperCase()}</span>
                  <span style={{ color: TEXT, fontWeight: 600 }}>{r.party}</span>
                  <span style={{ color: TEXT, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{r.amount}</span>
                  <span style={{ color: TEXT_DIM, fontVariantNumeric: "tabular-nums" }}>{r.price}</span>
                  <span style={{ color: TEXT_DIM, fontSize: 12 }}>{r.date}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 99, background: t.bg, border: `1px solid ${t.border}`, color: t.c, fontSize: 11, fontWeight: 700, justifySelf: "start" }}>
                    <Icon size={12} />{t.label}
                  </span>
                  <button onClick={() => navigate(`/p2p/order/${r.id}`)} style={{ ...secondaryBtnStyle(34), justifySelf: "end" }}>View <ArrowUpRight size={13} /></button>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <style>{`
        @media (max-width: 768px) {
          .chx-history-row { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </Shell>
  );
}
