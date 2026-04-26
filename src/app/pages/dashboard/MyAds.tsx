import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Pencil, Pause, Play, Trash2, BarChart3 } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, TEXT_MUTE, STROKE, CYAN, PURPLE, GREEN } from "../../p2p/shared";
import { PaymentIcon } from "../../p2p/PaymentSelect";
import { EscrowBadge } from "../../p2p/EscrowBadge";
import { useOffers } from "../../offers/OfferStore";

type Tab = "active" | "paused" | "completed";

export default function MyAds() {
  const navigate = useNavigate();
  const { offers } = useOffers();
  const [tab, setTab] = useState<Tab>("active");
  const [paused, setPaused] = useState<Record<string, boolean>>({});
  const [deleted, setDeleted] = useState<Record<string, boolean>>({});

  const visible = offers.filter((o) => {
    if (deleted[o.id]) return tab === "completed";
    if (tab === "active") return !paused[o.id];
    if (tab === "paused") return paused[o.id];
    return false;
  });

  return (
    <Shell back="/p2p">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_MUTE }}>SELLER · DASHBOARD</div>
          <div style={{ marginTop: 4, fontSize: 22, fontWeight: 800, color: TEXT }}>My ads</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => navigate("/p2p/history")} style={secondaryBtnStyle(44)}><BarChart3 size={14} /> History</button>
          <button onClick={() => navigate("/p2p/create")} style={{ ...primaryBtnStyle(44), width: "auto", padding: "0 18px" }}><Plus size={15} /> New ad</button>
        </div>
      </div>

      <EscrowBadge tone="cyan" title="All ads protected by escrow" sub="USDT locks automatically when a buyer matches." status="ACTIVE" />

      <div style={{ display: "flex", gap: 6, padding: 6, borderRadius: 14, background: "rgba(8,12,26,0.5)", border: `1px solid ${STROKE}`, alignSelf: "flex-start" }}>
        {(["active", "paused", "completed"] as Tab[]).map((k) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding: "8px 16px", borderRadius: 10, border: 0, cursor: "pointer", fontFamily: "inherit",
            background: tab === k ? `linear-gradient(180deg, rgba(0,229,255,0.18), rgba(0,229,255,0.04))` : "transparent",
            color: tab === k ? TEXT : TEXT_DIM, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
          }}>{k}</button>
        ))}
      </div>

      {visible.length === 0 ? (
        <Card style={{ padding: 36, textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>No {tab} ads</div>
          <div style={{ fontSize: 12.5, color: TEXT_DIM, marginTop: 6 }}>Create your first offer to start receiving orders.</div>
          <button onClick={() => navigate("/p2p/create")} style={{ ...primaryBtnStyle(48), marginTop: 16, maxWidth: 220, marginLeft: "auto", marginRight: "auto" }}>Create offer</button>
        </Card>
      ) : (
        <div style={{ display: "grid", gap: 14 }}>
          {visible.map((o) => {
            const isPaused = !!paused[o.id];
            const tone = isPaused ? "#F59E0B" : GREEN;
            return (
              <Card key={o.id} style={{ padding: 18 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                  <div style={{ flex: "1 1 240px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: o.side === "sell" ? CYAN : PURPLE }}>{o.side.toUpperCase()} · {o.asset}</span>
                      <span style={{ padding: "3px 8px", borderRadius: 99, background: `${tone}1F`, border: `1px solid ${tone}66`, color: tone, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em" }}>{isPaused ? "PAUSED" : "LIVE"}</span>
                    </div>
                    <div style={{ marginTop: 4, fontSize: 18, fontWeight: 800, color: TEXT }}>{o.price} <span style={{ fontSize: 12, color: TEXT_DIM, fontWeight: 600 }}>/ {o.asset}</span></div>
                    <div style={{ marginTop: 4, fontSize: 12, color: TEXT_DIM }}>Avail {o.available} · Limits {o.min}–{o.max}</div>
                    <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {o.methods.slice(0, 4).map((m) => (
                        <div key={m} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 8px", borderRadius: 99, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}`, fontSize: 11, color: TEXT_DIM }}>
                          <PaymentIcon method={m} size={14} />{m}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button onClick={() => navigate(`/p2p/order/${o.id}`)} style={secondaryBtnStyle(40)}><BarChart3 size={13} /> View</button>
                    <button onClick={() => navigate(`/p2p/create?edit=${o.id}`)} style={secondaryBtnStyle(40)}><Pencil size={13} /> Edit</button>
                    <button onClick={() => setPaused((p) => ({ ...p, [o.id]: !p[o.id] }))} style={secondaryBtnStyle(40)}>
                      {isPaused ? <><Play size={13} /> Resume</> : <><Pause size={13} /> Pause</>}
                    </button>
                    <button onClick={() => { if (confirm("Delete this ad?")) setDeleted((d) => ({ ...d, [o.id]: true })); }} style={{ ...secondaryBtnStyle(40), color: "#FCA5A5", borderColor: "rgba(239,68,68,0.3)" }}><Trash2 size={13} /> Delete</button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </Shell>
  );
}
