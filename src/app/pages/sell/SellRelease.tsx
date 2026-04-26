import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router";
import { AlertTriangle, Shield, X } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, Stepper, SELL_STEPS, primaryBtnStyle, secondaryBtnStyle, CYAN, BLUE, TEXT, TEXT_DIM, TEXT_MUTE, STROKE } from "../../p2p/shared";

export default function SellRelease() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { amount?: string; currency?: string; method?: string } };
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [releasing, setReleasing] = useState(false);

  if (!state?.amount) return <Navigate to="/p2p/sell" replace />;

  const release = () => {
    setReleasing(true);
    setTimeout(() => navigate("/p2p/sell/complete", { state, replace: true }), 900);
  };

  return (
    <Shell back="/p2p/sell/locked">
      <Stepper steps={SELL_STEPS} current={4} />

      <Card accent="cyan" bright style={{ padding: 28, maxWidth: 640, margin: "0 auto", width: "100%" }}>
        <div className="chx-warn-tile" style={{ width: 64, height: 64, margin: "0 auto 14px", borderRadius: 18, background: "linear-gradient(180deg, rgba(245,158,11,0.22), rgba(245,158,11,0.06))", border: "1px solid rgba(245,158,11,0.4)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(245,158,11,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
          <AlertTriangle size={28} color="#FBC974" strokeWidth={2.2} />
        </div>

        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", color: "#FBC974" }}>BEFORE YOU RELEASE</div>
          <div style={{ marginTop: 6, fontSize: 22, fontWeight: 800, color: TEXT, lineHeight: 1.25 }}>Confirm payment has arrived in your account</div>
          <div style={{ marginTop: 8, fontSize: 13, color: TEXT_DIM, lineHeight: 1.5, maxWidth: 440, margin: "8px auto 0" }}>Releasing USDT is final. Once released, the funds leave escrow permanently. Only proceed if the {state.currency || "fiat"} payment is verified in your account.</div>
        </div>

        <Checklist items={["I have checked my bank/payment app", "The full amount has cleared", "The sender name matches the buyer"]} />

        <div style={{ padding: 14, borderRadius: 14, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}`, marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.16em", color: TEXT_MUTE }}>RELEASING</div>
            <div style={{ marginTop: 3, fontSize: 18, fontWeight: 800, color: TEXT }}>{state.amount} USDT</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.16em", color: TEXT_MUTE }}>METHOD</div>
            <div style={{ marginTop: 3, fontSize: 13, fontWeight: 700, color: TEXT }}>{state.method || "—"}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
          <button onClick={() => navigate(-1)} style={{ ...secondaryBtnStyle(54), flex: 1 }}>Cancel</button>
          <button onClick={() => setConfirmOpen(true)} className="chx-cta" style={{ ...primaryBtnStyle(54), flex: 2 }}>
            <Shield size={15} /> Release USDT
          </button>
        </div>
      </Card>

      {confirmOpen && (
        <div className="chx-modal-back" onClick={() => !releasing && setConfirmOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(3,5,12,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 18 }}>
          <div className="chx-modal" onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 440, padding: 26, borderRadius: 22, background: "linear-gradient(180deg, rgba(16,24,52,0.95), rgba(8,12,30,0.98))", border: "1px solid rgba(0,229,255,0.3)", boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,229,255,0.15)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(180deg, ${CYAN}, ${BLUE})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px rgba(0,229,255,0.5)` }}>
                <Shield size={16} color="#04121E" />
              </div>
              <button onClick={() => !releasing && setConfirmOpen(false)} style={{ width: 32, height: 32, borderRadius: 8, background: "transparent", border: `1px solid ${STROKE}`, color: TEXT_DIM, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={14} /></button>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginBottom: 6 }}>Confirm release</div>
            <div style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.5, marginBottom: 20 }}>Confirm you have received the {state.currency || "fiat"} payment before releasing {state.amount} USDT. This action is final.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmOpen(false)} disabled={releasing} style={{ ...secondaryBtnStyle(48), flex: 1 }}>Cancel</button>
              <button onClick={release} disabled={releasing} className="chx-cta" style={{ ...primaryBtnStyle(48), flex: 1.5, opacity: releasing ? 0.7 : 1 }}>
                {releasing ? "Releasing…" : <><Shield size={14} /> Release USDT</>}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .chx-warn-tile { animation: chxPulse 2.6s ease-in-out infinite; }
        .chx-cta { transition: transform .15s ease; }
        .chx-cta:not(:disabled):hover { transform: translateY(-1px); }
        .chx-cta:not(:disabled):active { transform: scale(0.99); }
        .chx-modal-back { animation: chxFade .2s ease-out; }
        .chx-modal { animation: chxModalIn .25s cubic-bezier(.2,.9,.3,1.2); }
        @keyframes chxFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes chxModalIn { from { opacity: 0; transform: translateY(10px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </Shell>
  );
}

function Checklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(items.map(() => false));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((t, i) => (
        <label key={t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: "rgba(8,12,26,0.6)", border: `1px solid ${checked[i] ? "rgba(0,229,255,0.35)" : STROKE}`, cursor: "pointer", transition: "border-color .2s ease, background .2s ease" }}>
          <input type="checkbox" checked={checked[i]} onChange={(e) => setChecked((c) => c.map((v, idx) => idx === i ? e.target.checked : v))} style={{ width: 18, height: 18, accentColor: CYAN, cursor: "pointer" }} />
          <span style={{ fontSize: 13, color: TEXT, fontWeight: 600 }}>{t}</span>
        </label>
      ))}
    </div>
  );
}
