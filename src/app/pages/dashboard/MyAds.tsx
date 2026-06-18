import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Pencil, Pause, Play, Trash2, Ban } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, TEXT_MUTE, STROKE, CYAN, PURPLE, GREEN } from "../../p2p/shared";
import { PaymentIcon } from "../../p2p/PaymentSelect";
import { useOffers } from "../../offers/OfferStore";

type Tab = "active" | "paused" | "completed" | "cancelled";

export default function MyAds() {
  const navigate = useNavigate();
  const { offers } = useOffers();
  const [tab, setTab] = useState<Tab>("active");
  const [paused, setPaused] = useState<Record<string, boolean>>({});
  const [cancelled, setCancelled] = useState<Record<string, boolean>>({});

  const visible = offers.filter((o) => {
    // For visual testing, we treat the offer list locally. 
    // In reality, progress / filled amounts would come from the backend.
    const isCompleted = false; // Add mock logic for completed if needed
    const isCancelled = !!cancelled[o.id];
    const isPaused = !!paused[o.id] && !isCancelled && !isCompleted;
    const isActive = !isPaused && !isCancelled && !isCompleted;

    if (tab === "active") return isActive;
    if (tab === "paused") return isPaused;
    if (tab === "completed") return isCompleted;
    if (tab === "cancelled") return isCancelled;
    return false;
  });

  return (
    <Shell back="/p2p/profile/me">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, color: TEXT }}>My P2P Ads</div>
          <div style={{ marginTop: 6, fontSize: 14, color: TEXT_DIM }}>Manage your active listings and trade terms.</div>
        </div>
        <button onClick={() => navigate("/p2p/create")} style={{ ...primaryBtnStyle(44), width: "auto", padding: "0 18px" }}><Plus size={15} /> Post New Ad</button>
      </div>

      <div style={{ display: "flex", gap: 6, padding: 6, borderRadius: 16, background: "rgba(8,12,26,0.6)", backdropFilter: "blur(12px)", border: `1px solid ${STROKE}`, alignSelf: "flex-start", marginBottom: 24, boxShadow: `0 8px 24px rgba(0,0,0,0.4)` }}>
        {(["active", "paused", "completed", "cancelled"] as Tab[]).map((k) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding: "10px 20px", borderRadius: 12, border: 0, cursor: "pointer", fontFamily: "inherit",
            background: tab === k ? `linear-gradient(180deg, rgba(0,229,255,0.18), rgba(0,229,255,0.04))` : "transparent",
            color: tab === k ? TEXT : TEXT_DIM, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)", boxShadow: tab === k ? `inset 0 1px 0 rgba(255,255,255,0.1), 0 0 16px rgba(0,229,255,0.15)` : "none"
          }}>{k}</button>
        ))}
      </div>

      {visible.length === 0 ? (
        <Card style={{ padding: 48, textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>No {tab} ads</div>
          <div style={{ fontSize: 14, color: TEXT_DIM, marginTop: 8 }}>You don't have any ads in this category.</div>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {visible.map((o, idx) => {
            const isPaused = !!paused[o.id];
            const isCancelled = !!cancelled[o.id];
            const isCompleted = false; // Mock

            const filledPercent = 40; // Mock: 40% filled
            const totalOrig = parseFloat(o.available.split(" ")[0]);
            const remaining = totalOrig * 0.6; // 60% remaining

            return (
              <div key={o.id} style={{ animation: `chxFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.05}s both`, opacity: 0 }}>
                <Card className="chx-card-hover" style={{ padding: 0, overflow: "hidden", opacity: isPaused ? 0.7 : 1 }}>
                  <div style={{ padding: "24px", display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start", background: isPaused ? "rgba(13,20,40,0.4)" : "transparent" }}>
                    <div style={{ flex: 1, minWidth: 280 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <img src={`https://cryptologos.cc/logos/${o.asset.toLowerCase()}-${o.asset.toLowerCase()}-logo.svg?v=024`} alt={o.asset} style={{ width: 28, height: 28 }} onError={(e) => e.currentTarget.style.display='none'} />
                      <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>{o.asset}</div>
                      <div style={{ padding: "4px 10px", borderRadius: 99, background: o.side === "sell" ? "rgba(139,92,246,0.15)" : "rgba(0,229,255,0.15)", color: o.side === "sell" ? PURPLE : CYAN, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {o.side}ING
                      </div>
                      {isPaused && <div style={{ padding: "4px 10px", borderRadius: 99, background: "rgba(156,163,175,0.15)", color: "#9CA3AF", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em" }}>PAUSED</div>}
                      {isCompleted && <div style={{ padding: "4px 10px", borderRadius: 99, background: "rgba(74,222,128,0.15)", color: GREEN, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em" }}>COMPLETED</div>}
                      {isCancelled && <div style={{ padding: "4px 10px", borderRadius: 99, background: "rgba(239,68,68,0.15)", color: "#EF4444", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em" }}>CANCELLED</div>}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 16 }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: TEXT_MUTE, letterSpacing: "0.05em", marginBottom: 4 }}>PRICE</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>{o.price.includes("Market") ? o.price : `£${o.price}`}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: TEXT_MUTE, letterSpacing: "0.05em", marginBottom: 4 }}>LIMITS</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>£{o.min} – £{o.max}</div>
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                        <span style={{ color: TEXT_DIM }}>{remaining.toFixed(4)} {o.asset} remaining of {totalOrig.toFixed(4)} {o.asset}</span>
                        <span style={{ color: CYAN, fontWeight: 700 }}>{filledPercent}% filled</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 99, background: "rgba(8,12,26,0.8)", border: `1px solid ${STROKE}`, overflow: "hidden" }}>
                        <div style={{ width: `${filledPercent}%`, height: "100%", background: `linear-gradient(90deg, #0096D6, ${CYAN})` }} />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {o.methods.map((m: any) => (
                        <div key={m} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 8, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}`, fontSize: 12, color: TEXT_DIM }}>
                          <PaymentIcon method={m} size={16} />{m}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ flex: "0 0 200px", display: "flex", flexDirection: "column", gap: 12, paddingLeft: 24, borderLeft: `1px solid ${STROKE}` }}>
                    <div style={{ fontSize: 12, color: TEXT_DIM }}>Date posted: <strong style={{ color: TEXT }}>Today, 14:30</strong></div>
                    <div style={{ fontSize: 12, color: TEXT_DIM }}>Active orders: <strong style={{ color: CYAN }}>2</strong></div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                      {(!isCancelled && !isCompleted) && (
                        <>
                          <button onClick={() => navigate(`/p2p/create?edit=${o.id}`)} style={{ ...secondaryBtnStyle(36), width: "100%", background: "transparent", fontSize: 13 }}>
                            <Pencil size={14} /> Edit Ad
                          </button>
                          <button onClick={() => setPaused((p) => ({ ...p, [o.id]: !p[o.id] }))} style={{ ...secondaryBtnStyle(36), width: "100%", background: "transparent", fontSize: 13 }}>
                            {isPaused ? <><Play size={14} /> Resume Ad</> : <><Pause size={14} /> Pause Ad</>}
                          </button>
                          <button onClick={() => setCancelled((c) => ({ ...c, [o.id]: true }))} style={{ ...secondaryBtnStyle(36), width: "100%", background: "transparent", color: "#FCA5A5", borderColor: "rgba(239,68,68,0.2)", fontSize: 13 }}>
                            <Ban size={14} /> Cancel Ad
                          </button>
                        </>
                      )}
                      {isCancelled && (
                        <button onClick={() => setCancelled((c) => ({ ...c, [o.id]: false }))} style={{ ...secondaryBtnStyle(36), width: "100%", background: "transparent", fontSize: 13 }}>
                          Republish
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
        </div>
      )}
    </Shell>
  );
}
