import { useNavigate, useLocation, Navigate } from "react-router";
import { Activity, ArrowRight } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, Stepper, SELL_STEPS, primaryBtnStyle, secondaryBtnStyle, GREEN, TEXT, TEXT_DIM, TEXT_MUTE, STROKE } from "../../p2p/shared";

export default function SellComplete() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { amount?: string; currency?: string } };
  if (!state?.amount) return <Navigate to="/p2p/sell" replace />;

  return (
    <Shell back="/p2p">
      <Stepper steps={SELL_STEPS} current={4} />

      <Card accent="cyan" bright style={{ padding: 32, maxWidth: 560, margin: "0 auto", width: "100%", textAlign: "center" }}>
        <div className="chx-success" style={{ position: "relative", width: 100, height: 100, margin: "0 auto 18px" }}>
          <div className="chx-burst" />
          <div className="chx-burst chx-burst-2" />
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "50%", background: `linear-gradient(180deg, ${GREEN}, #16A34A)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 32px rgba(74,222,128,0.55), inset 0 2px 0 rgba(255,255,255,0.4)` }}>
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path className="chx-check-path" d="M5 12l4 4L19 8" />
            </svg>
          </div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", color: GREEN }}>USDT RELEASED</div>
        <div style={{ marginTop: 6, fontSize: 24, fontWeight: 800, color: TEXT }}>Trade completed</div>
        <div style={{ marginTop: 6, fontSize: 13, color: TEXT_DIM }}>{state.amount} USDT released to the buyer.</div>

        <div style={{ marginTop: 22, padding: 16, borderRadius: 14, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}` }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: TEXT_MUTE, marginBottom: 10 }}>RATE THE BUYER</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} className="chx-star-btn" style={{ width: 38, height: 38, borderRadius: 10, background: "transparent", border: `1px solid ${STROKE}`, color: "#FCD34D", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .15s ease, background .2s ease" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FCD34D"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <button onClick={() => navigate("/p2p")} style={{ ...secondaryBtnStyle(52), flex: 1 }}>Back to P2P</button>
          <button onClick={() => navigate("/p2p")} className="chx-cta" style={{ ...primaryBtnStyle(52), flex: 1 }}>
            <Activity size={15} /> View activity <ArrowRight size={14} />
          </button>
        </div>
      </Card>

      <style>{`
        .chx-burst { position: absolute; inset: -10px; border-radius: 50%; border: 2px solid rgba(74,222,128,0.5); animation: chxRing 1.6s ease-out 1; }
        .chx-burst-2 { animation-delay: .25s; border-color: rgba(74,222,128,0.3); }
        .chx-check-path { stroke-dasharray: 60; stroke-dashoffset: 60; animation: chxCheck .55s ease-out .15s forwards; }
        .chx-star-btn:hover { transform: translateY(-2px); background: rgba(252,211,77,0.1); }
        .chx-cta { transition: transform .15s ease; }
        .chx-cta:hover { transform: translateY(-1px); }
      `}</style>
    </Shell>
  );
}
