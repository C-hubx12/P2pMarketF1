import { useState } from "react";
import { Link } from "react-router";
import { AlertTriangle, Clock, Search, SlidersHorizontal, Filter, ShieldAlert } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, TEXT, TEXT_DIM, TEXT_MUTE, CYAN, STROKE, secondaryBtnStyle } from "../../p2p/shared";

type Row = { id: string; buyer: string; seller: string; amount: string; asset: string; reason: string; time: string; sla: "safe" | "warning" | "breached"; status: "Open" | "Awaiting Buyer" | "Awaiting Seller" };

const MOCK_QUEUE: Row[] = [
  { id: "CHX-9F2A", buyer: "CryptoKing", seller: "CoinSwap", amount: "1,200", asset: "USDT", reason: "Payment sent but not credited", time: "14 mins", sla: "safe", status: "Open" },
  { id: "CHX-4F11", buyer: "FiatBridge", seller: "MoonHODL", amount: "450", asset: "USDC", reason: "Counterparty unresponsive", time: "22 hours", sla: "breached", status: "Awaiting Seller" },
  { id: "CHX-7B88", buyer: "NewTrader99", seller: "VerifiedPro", amount: "5,000", asset: "USDT", reason: "Suspected fake payment proof", time: "2 hours", sla: "warning", status: "Open" },
  { id: "CHX-1C22", buyer: "FastPay", seller: "QuickSwap", amount: "800", asset: "BTC", reason: "Wrong amount received", time: "45 mins", sla: "safe", status: "Awaiting Buyer" },
];

export default function AdminDisputeQueue() {
  const [filter, setFilter] = useState("All");

  const rows = filter === "All" ? MOCK_QUEUE : MOCK_QUEUE.filter(r => 
    (filter === "Overdue" && r.sla === "breached") ||
    (filter === "High Risk" && r.amount === "5,000") // Mock high risk
  );

  return (
    <Shell back="/admin">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: "#F87171" }}>ADMIN · QUEUE</div>
          <div style={{ marginTop: 4, fontSize: 24, fontWeight: 800, color: TEXT, display: "flex", alignItems: "center", gap: 10 }}>
            Dispute Queue 
            <span style={{ fontSize: 12, padding: "4px 10px", background: "rgba(245,158,11,0.15)", color: "#FCD34D", borderRadius: 99, fontWeight: 700 }}>{MOCK_QUEUE.length} Open</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 260, height: 44, padding: "0 14px", borderRadius: 12, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}` }}>
          <Search size={15} color={TEXT_MUTE} />
          <input placeholder="Search Trade ID, Username…" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: TEXT, fontSize: 13, fontFamily: "inherit" }} />
        </div>
        
        <div style={{ display: "flex", gap: 6, padding: 4, borderRadius: 12, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}` }}>
          {["All", "Overdue", "High Risk"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "0 16px", height: 34, borderRadius: 8, border: 0, cursor: "pointer", fontFamily: "inherit",
              background: filter === f ? `rgba(255,255,255,0.1)` : "transparent",
              color: filter === f ? TEXT : TEXT_DIM, fontSize: 12, fontWeight: 700
            }}>{f}</button>
          ))}
        </div>

        <button style={{ ...secondaryBtnStyle(44), padding: "0 14px" }}><SlidersHorizontal size={14} /> Filters</button>
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 800 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 1fr 2fr 1fr 1fr 0.8fr", gap: 12, padding: "14px 20px", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", color: TEXT_MUTE, borderBottom: `1px solid ${STROKE}`, background: "rgba(8,12,26,0.4)" }}>
              <span>TRADE ID</span><span>PARTIES</span><span>AMOUNT</span><span>REASON</span><span>STATUS</span><span>SLA</span><span></span>
            </div>
            {rows.map((r) => (
              <div key={r.id} style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 1fr 2fr 1fr 1fr 0.8fr", gap: 12, padding: "16px 20px", alignItems: "center", borderBottom: `1px solid ${STROKE}`, fontSize: 13, background: r.sla === "breached" ? "rgba(239,68,68,0.05)" : "transparent" }}>
                <span style={{ fontWeight: 800, color: CYAN, letterSpacing: "0.04em" }}>{r.id}</span>
                
                <div>
                  <div style={{ color: TEXT, fontWeight: 600 }}>{r.buyer} <span style={{ color: TEXT_MUTE, fontSize: 11 }}>(B)</span></div>
                  <div style={{ color: TEXT_DIM, fontSize: 11, marginTop: 4 }}>{r.seller} <span style={{ color: TEXT_MUTE }}>(S)</span></div>
                </div>
                
                <span style={{ color: TEXT, fontWeight: 700 }}>{r.amount} <span style={{ color: TEXT_MUTE, fontSize: 11 }}>{r.asset}</span></span>
                
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <ShieldAlert size={14} color={r.reason.includes("fake") ? "#F87171" : TEXT_DIM} />
                  <span style={{ color: r.reason.includes("fake") ? "#FCA5A5" : TEXT_DIM }}>{r.reason}</span>
                </div>

                <span style={{ display: "inline-flex", padding: "4px 10px", borderRadius: 99, background: "rgba(120,170,220,0.1)", border: `1px solid ${STROKE}`, color: TEXT_DIM, fontSize: 10.5, fontWeight: 700 }}>
                  {r.status}
                </span>

                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: r.sla === "breached" ? "#FCA5A5" : r.sla === "warning" ? "#FCD34D" : TEXT_DIM, fontSize: 11, fontWeight: 600 }}>
                  <Clock size={12} /> {r.time}
                </span>

                <button style={{ ...secondaryBtnStyle(32), justifySelf: "end", fontSize: 11 }}>Review</button>
              </div>
            ))}
            {rows.length === 0 && (
              <div style={{ padding: 40, textAlign: "center", color: TEXT_DIM, fontSize: 14 }}>
                No disputes match this filter.
              </div>
            )}
          </div>
        </div>
      </Card>
    </Shell>
  );
}
