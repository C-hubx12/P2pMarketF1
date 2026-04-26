import { useNavigate, useLocation, Navigate } from "react-router";
import { ArrowRight, Shield } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, Stepper, SELL_STEPS, primaryBtnStyle, secondaryBtnStyle, PURPLE, TEXT, TEXT_DIM, TEXT_MUTE, STROKE } from "../../p2p/shared";
import { EscrowShield3D } from "../../p2p/PaymentSelect";

export default function SellConfirm() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { amount?: string; currency?: string; method?: string } };
  if (!state?.amount) return <Navigate to="/p2p/sell" replace />;

  const { amount, currency, method } = state;

  return (
    <Shell back="/p2p/sell">
      <Stepper steps={SELL_STEPS} current={1} />

      <Card accent="purple" bright style={{ padding: 28, maxWidth: 720, margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: TEXT_DIM }}>REVIEW YOUR SELL ORDER</div>
          <div style={{ marginTop: 6, fontSize: 22, fontWeight: 800, color: TEXT }}>Confirm to lock USDT in escrow</div>
        </div>

        <div className="chx-fade-in" style={{ padding: 22, borderRadius: 16, background: "linear-gradient(180deg, rgba(139,92,246,0.08), rgba(139,92,246,0.02))", border: `1px solid rgba(139,92,246,0.28)`, display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 14, alignItems: "center", marginBottom: 18 }}>
          <Side label="YOU SELL" amount={amount!} unit="USDT" />
          <ArrowRight size={20} color={PURPLE} />
          <Side label="YOU RECEIVE" unit={currency || "USD"} highlight />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 1, borderRadius: 14, overflow: "hidden", border: `1px solid ${STROKE}`, marginBottom: 18 }}>
          <Row label="Payment method" value={method || "—"} />
          <Row label="Buyer" value="Matched on confirm" />
          <Row label="Payment window" value="15 minutes" />
        </div>

        <div style={{ padding: 14, borderRadius: 14, background: "linear-gradient(180deg, rgba(0,229,255,0.08), rgba(0,229,255,0.02))", border: `1px solid rgba(0,229,255,0.25)`, display: "flex", gap: 14, alignItems: "center", marginBottom: 22 }}>
          <EscrowShield3D size={48} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>Funds locked on confirm</div>
            <div style={{ fontSize: 11.5, color: TEXT_DIM, marginTop: 3, lineHeight: 1.45 }}>Your {amount} USDT will be held in escrow. We&apos;ll match a buyer and you release manually after payment lands.</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ ...secondaryBtnStyle(54), flex: 1 }}>Back</button>
          <button onClick={() => navigate("/p2p/sell/locked", { state })} className="chx-cta-purple" style={{ ...primaryBtnStyle(54), flex: 2, background: `linear-gradient(180deg, #C7B5FF 0%, ${PURPLE} 18%, #5B2EE0 55%, #2E0E80 100%)`, border: "1px solid rgba(199,181,255,0.7)", boxShadow: `0 22px 44px rgba(91,46,224,0.55), 0 0 60px rgba(139,92,246,0.45), inset 0 2.5px 0 rgba(255,255,255,0.5), inset 0 -2.5px 0 rgba(20,5,60,0.5), inset 0 0 0 1.5px rgba(255,255,255,0.18)` }}>
            <Shield size={15} /> Confirm Sell
          </button>
        </div>
      </Card>

      <style>{`
        .chx-fade-in { animation: chxFadeUp .35s ease-out; }
        @keyframes chxFadeUp { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
        .chx-cta-purple { transition: transform .15s ease; }
        .chx-cta-purple:hover { transform: translateY(-1px); }
        .chx-cta-purple:active { transform: scale(0.99); }
      `}</style>
    </Shell>
  );
}

function Side({ label, amount, unit, highlight }: { label: string; amount?: string; unit: string; highlight?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.16em", color: TEXT_MUTE }}>{label}</div>
      <div style={{ marginTop: 6, fontSize: 24, fontWeight: 800, color: highlight ? PURPLE : TEXT, lineHeight: 1 }}>{amount ?? "—"}</div>
      <div style={{ marginTop: 4, fontSize: 11, fontWeight: 700, color: TEXT_DIM, letterSpacing: "0.12em" }}>{unit}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", background: "rgba(8,12,26,0.5)", fontSize: 13 }}>
      <span style={{ color: TEXT_DIM }}>{label}</span>
      <span style={{ color: TEXT, fontWeight: 600 }}>{value}</span>
    </div>
  );
}
