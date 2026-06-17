import { useState } from "react";
import { Link } from "react-router";
import { Clock, Search, SlidersHorizontal, ShieldAlert, ChevronRight } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, TEXT, TEXT_DIM, TEXT_MUTE, CYAN, STROKE, secondaryBtnStyle, pillStyle } from "../../p2p/shared";

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
    (filter === "High Risk" && r.amount === "5,000")
  );

  return (
    <Shell back="/admin">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, marginBottom: 8 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 99, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: "#F87171", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: "#F87171", boxShadow: "0 0 8px #F87171" }} />
            ADMIN · QUEUE
          </div>
          <div style={{ marginTop: 12, fontSize: 32, fontWeight: 800, color: TEXT, display: "flex", alignItems: "center", gap: 12, letterSpacing: "-0.02em" }}>
            Dispute Queue 
            <div style={{ ...pillStyle, border: "1px solid rgba(245,158,11,0.4)", background: "rgba(245,158,11,0.1)", color: "#FCD34D", fontSize: 13 }}>
              {MOCK_QUEUE.length} Open
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 280, height: 48, padding: "0 16px", borderRadius: 14, background: "linear-gradient(180deg, rgba(5,8,20,0.85), rgba(8,12,28,0.65))", border: `1px solid rgba(0,229,255,0.18)`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 14px rgba(0,229,255,0.04)" }}>
          <Search size={18} color={TEXT_MUTE} />
          <input placeholder="Search Trade ID, Username, Asset…" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: TEXT, fontSize: 14, fontWeight: 500, fontFamily: "inherit" }} />
        </div>
        
        <div style={{ display: "flex", gap: 6, padding: 6, borderRadius: 14, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}` }}>
          {["All", "Overdue", "High Risk"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "0 20px", height: 36, borderRadius: 10, border: 0, cursor: "pointer", fontFamily: "inherit",
              background: filter === f ? `linear-gradient(180deg, rgba(0,229,255,0.18), rgba(0,229,255,0.04))` : "transparent",
              color: filter === f ? TEXT : TEXT_DIM, fontSize: 13, fontWeight: 700,
              boxShadow: filter === f ? "inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
              transition: "all 0.2s ease"
            }}>{f}</button>
          ))}
        </div>

        <button style={{ ...secondaryBtnStyle(48), padding: "0 18px", borderRadius: 14, background: "rgba(8,12,26,0.6)" }}><SlidersHorizontal size={16} /> Filters</button>
      </div>

      <Card accent="none" style={{ padding: 0, overflow: "hidden", background: "linear-gradient(180deg, rgba(16,24,52,0.6), rgba(8,12,30,0.8))" }}>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 900 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 1fr 2fr 1fr 1fr 0.8fr", gap: 16, padding: "16px 24px", fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: TEXT_MUTE, borderBottom: `1px solid ${STROKE}`, background: "rgba(0,0,0,0.2)" }}>
              <span>TRADE ID</span><span>PARTIES</span><span>AMOUNT</span><span>REASON</span><span>STATUS</span><span>SLA</span><span></span>
            </div>
            {rows.map((r) => {
              const isBreached = r.sla === "breached";
              const isWarn = r.sla === "warning";
              const isFake = r.reason.includes("fake");

              return (
                <div key={r.id} style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 1fr 2fr 1fr 1fr 0.8fr", gap: 16, padding: "20px 24px", alignItems: "center", borderBottom: `1px solid ${STROKE}`, fontSize: 13, background: isBreached ? "linear-gradient(90deg, rgba(239,68,68,0.08), transparent)" : "transparent", transition: "background 0.2s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = isBreached ? "linear-gradient(90deg, rgba(239,68,68,0.12), rgba(239,68,68,0.02))" : "rgba(255,255,255,0.03)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = isBreached ? "linear-gradient(90deg, rgba(239,68,68,0.08), transparent)" : "transparent"; }}>
                  
                  <Link to={`/admin/dispute/${r.id}`} style={{ fontWeight: 800, color: CYAN, letterSpacing: "0.04em", textDecoration: "none", fontSize: 14 }}>{r.id}</Link>
                  
                  <div>
                    <div style={{ color: TEXT, fontWeight: 700, fontSize: 14 }}>{r.buyer} <span style={{ color: TEXT_MUTE, fontSize: 12, fontWeight: 600 }}>(B)</span></div>
                    <div style={{ color: TEXT_DIM, fontSize: 12, marginTop: 4, fontWeight: 600 }}>{r.seller} <span style={{ color: TEXT_MUTE }}>(S)</span></div>
                  </div>
                  
                  <span style={{ color: TEXT, fontWeight: 800, fontSize: 15 }}>{r.amount} <span style={{ color: TEXT_MUTE, fontSize: 12 }}>{r.asset}</span></span>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ padding: 6, background: isFake ? "rgba(248,113,113,0.15)" : "rgba(120,170,220,0.1)", borderRadius: 8, border: `1px solid ${isFake ? "rgba(248,113,113,0.3)" : STROKE}` }}>
                      <ShieldAlert size={14} color={isFake ? "#F87171" : TEXT_DIM} />
                    </div>
                    <span style={{ color: isFake ? "#FCA5A5" : TEXT, fontWeight: 600 }}>{r.reason}</span>
                  </div>

                  <span style={{ display: "inline-flex", padding: "6px 12px", borderRadius: 99, background: "rgba(120,170,220,0.08)", border: `1px solid ${STROKE}`, color: TEXT_DIM, fontSize: 11, fontWeight: 700, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}>
                    {r.status}
                  </span>

                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 99, fontSize: 11, fontWeight: 800, 
                      background: isBreached ? "rgba(239,68,68,0.15)" : isWarn ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.1)",
                      color: isBreached ? "#FCA5A5" : isWarn ? "#FCD34D" : "#6EE7B7",
                      border: `1px solid ${isBreached ? "rgba(239,68,68,0.3)" : isWarn ? "rgba(245,158,11,0.3)" : "rgba(16,185,129,0.3)"}`
                  }}>
                    <Clock size={12} /> {r.time}
                  </span>

                  <Link to={`/admin/dispute/${r.id}`} style={{ ...secondaryBtnStyle(36), justifySelf: "end", fontSize: 12, padding: "0 14px", textDecoration: "none" }}>
                    Review <ChevronRight size={14} />
                  </Link>
                </div>
              );
            })}
            {rows.length === 0 && (
              <div style={{ padding: 60, textAlign: "center", color: TEXT_DIM, fontSize: 15, fontWeight: 600 }}>
                No disputes match this filter.
              </div>
            )}
          </div>
        </div>
      </Card>
    </Shell>
  );
}