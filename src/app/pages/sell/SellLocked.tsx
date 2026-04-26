import { useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router";
import { Lock, AlertTriangle, MessageCircle } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, Stepper, SELL_STEPS, primaryBtnStyle, secondaryBtnStyle, PURPLE, TEXT, TEXT_DIM, TEXT_MUTE, STROKE } from "../../p2p/shared";

export default function SellLocked() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { amount?: string; currency?: string; method?: string } };
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  if (!state?.amount) return <Navigate to="/p2p/sell" replace />;

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  return (
    <Shell back="/p2p/sell">
      <Stepper steps={SELL_STEPS} current={3} />

      <div className="chx-grid-2">
        <Card accent="purple" style={{ padding: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(420px 220px at 50% 0%, rgba(139,92,246,0.18), transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <div className="chx-lock-wrap" style={{ position: "relative", width: 96, height: 96, margin: "0 auto 18px" }}>
              <div className="chx-lock-ring" />
              <div className="chx-lock-ring chx-lock-ring-2" />
              <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 24, background: `linear-gradient(180deg, ${PURPLE}, #5B2EE0)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px rgba(139,92,246,0.6), inset 0 2px 0 rgba(255,255,255,0.3)` }}>
                <Lock size={36} color="#fff" strokeWidth={2.4} />
              </div>
            </div>

            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: PURPLE }}>ESCROW LOCKED</div>
              <div style={{ marginTop: 6, fontSize: 22, fontWeight: 800, color: TEXT }}>{state.amount} USDT secured</div>
              <div style={{ marginTop: 6, fontSize: 13, color: TEXT_DIM }}>Waiting for buyer to send payment.</div>
            </div>

            <div style={{ padding: 16, borderRadius: 14, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}`, textAlign: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_MUTE }}>BUYER PAYMENT WINDOW</div>
              <div className="chx-timer-pulse" style={{ marginTop: 4, fontSize: 28, fontWeight: 800, color: PURPLE, fontVariantNumeric: "tabular-nums", letterSpacing: "0.04em" }}>{mins}:{secs}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 1, borderRadius: 14, overflow: "hidden", border: `1px solid ${STROKE}` }}>
              <Row label="Payment method" value={state.method || "—"} />
              <Row label="Currency" value={state.currency || "—"} />
              <Row label="Status" value="Awaiting buyer transfer" highlight />
            </div>
          </div>
        </Card>

        <div>
          <Card accent="purple" bright style={{ padding: 20, position: "sticky", top: 96 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_DIM, marginBottom: 10 }}>NEXT STEP</div>
            <div style={{ fontSize: 13.5, color: TEXT, lineHeight: 1.5, marginBottom: 18 }}>Once the buyer&apos;s payment lands in your account, head to the release screen to confirm and release USDT.</div>
            <button onClick={() => navigate("/p2p/sell/release", { state })} className="chx-cta-purple" style={{ ...primaryBtnStyle(54), background: `linear-gradient(180deg, #C7B5FF 0%, ${PURPLE} 18%, #5B2EE0 55%, #2E0E80 100%)`, border: "1px solid rgba(199,181,255,0.7)", boxShadow: `0 22px 44px rgba(91,46,224,0.55), 0 0 60px rgba(139,92,246,0.45), inset 0 2.5px 0 rgba(255,255,255,0.5), inset 0 -2.5px 0 rgba(20,5,60,0.5), inset 0 0 0 1.5px rgba(255,255,255,0.18)` }}>Payment received</button>
            <button style={{ ...secondaryBtnStyle(46), width: "100%", marginTop: 10 }}><MessageCircle size={14} /> Contact buyer</button>
            <button style={{ ...secondaryBtnStyle(46), width: "100%", marginTop: 8, color: "#FBC974", borderColor: "rgba(245,158,11,0.3)" }}><AlertTriangle size={14} /> Open dispute</button>
          </Card>
        </div>
      </div>

      <style>{`
        .chx-lock-ring { position: absolute; inset: -8px; border-radius: 28px; border: 2px solid rgba(139,92,246,0.45); animation: chxRing 2s ease-out infinite; }
        .chx-lock-ring-2 { animation-delay: 1s; }
        .chx-timer-pulse { animation: chxPulse 2.4s ease-in-out infinite; }
        .chx-cta-purple { transition: transform .15s ease; }
        .chx-cta-purple:hover { transform: translateY(-1px); }
        .chx-cta-purple:active { transform: scale(0.99); }
      `}</style>
    </Shell>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", background: "rgba(8,12,26,0.5)", fontSize: 13 }}>
      <span style={{ color: TEXT_DIM }}>{label}</span>
      <span style={{ color: highlight ? PURPLE : TEXT, fontWeight: 700 }}>{value}</span>
    </div>
  );
}
