import { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { Zap, ArrowDown } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, Field, input, Stepper, SELL_STEPS, primaryBtnStyle, PURPLE, TEXT, TEXT_DIM, TEXT_MUTE, STROKE, PURPLE_SOFT } from "../../p2p/shared";
import { PaymentSelect, PaymentMethod, EscrowShield3D } from "../../p2p/PaymentSelect";
import { useAuth } from "../../auth/AuthContext";

export default function SellSetup() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to={`/auth/signup?next=${encodeURIComponent("/p2p/sell")}`} replace />;
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [method, setMethod] = useState<PaymentMethod>("Bank Transfer");

  const valid = amount && parseFloat(amount) > 0;

  return (
    <Shell>
      <Stepper steps={SELL_STEPS} current={0} />

      <div className="chx-grid-2">
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card accent="purple" style={{ padding: 22 }}>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_DIM }}>SELL ORDER</div>
              <div style={{ marginTop: 4, fontSize: 18, fontWeight: 800, color: TEXT }}>Sell USDT for cash</div>
              <div style={{ marginTop: 4, fontSize: 12.5, color: TEXT_DIM }}>Your USDT locks in escrow until you confirm payment received.</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <Field label="YOU SELL">
                <div style={{ position: "relative" }}>
                  <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" inputMode="decimal" style={{ ...input, height: 64, fontSize: 22, fontWeight: 800, paddingRight: 76, borderColor: PURPLE_SOFT }} />
                  <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 99, background: "rgba(38,161,123,0.18)", border: "1px solid rgba(38,161,123,0.4)", color: "#A7F3D0", fontSize: 12, fontWeight: 800, letterSpacing: "0.04em" }}>
                    <span style={{ width: 16, height: 16, borderRadius: 99, background: "#26A17B", color: "#fff", fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>₮</span>
                    USDT
                  </span>
                </div>
              </Field>

              <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 4px" }}>
                <div className="chx-arrow-glow" style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(180deg, rgba(139,92,246,0.25), rgba(139,92,246,0.06))", border: `1px solid ${PURPLE_SOFT}`, display: "flex", alignItems: "center", justifyContent: "center", color: PURPLE, boxShadow: `0 0 18px rgba(139,92,246,0.4)` }}>
                  <ArrowDown size={16} />
                </div>
              </div>

              <Field label="YOU RECEIVE">
                <div style={{ position: "relative" }}>
                  <div style={{ ...input, height: 64, fontSize: 22, fontWeight: 800, paddingRight: 76, display: "flex", alignItems: "center", color: amount ? TEXT : TEXT_MUTE }}>
                    {amount ? "—" : "0.00"}
                  </div>
                  <SelectBoxInline value={currency} onChange={setCurrency} options={["USD", "EUR", "GBP", "AUD", "CAD"]} />
                </div>
                <div style={{ marginTop: 6, fontSize: 11, color: TEXT_MUTE }}>Buyer&apos;s offer price will be matched live.</div>
              </Field>
            </div>

            <div style={{ height: 1, background: STROKE, margin: "20px 0" }} />

            <Field label="PAYMENT METHOD">
              <PaymentSelect value={method} onChange={setMethod} />
            </Field>
          </Card>

          <Card accent="none" style={{ padding: 14, display: "flex", alignItems: "center", gap: 14 }}>
            <EscrowShield3D size={44} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>USDT held in escrow</div>
              <div style={{ fontSize: 11.5, color: TEXT_DIM, marginTop: 2 }}>Funds release only when you confirm payment received.</div>
            </div>
          </Card>
        </div>

        <div>
          <Card accent="purple" bright style={{ padding: 20, position: "sticky", top: 96 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_DIM, marginBottom: 14 }}>ORDER SUMMARY</div>
            <Row label="You sell" value={amount ? `${amount} USDT` : "—"} />
            <Row label="You receive" value="—" />
            <Row label="Currency" value={currency} />
            <Row label="Payment" value={method} />
            <div style={{ height: 1, background: STROKE, margin: "14px 0" }} />
            <button disabled={!valid} onClick={() => navigate("/p2p/sell/confirm", { state: { amount, currency, method } })} className="chx-cta" style={{ ...primaryBtnStyle(54), background: `linear-gradient(180deg, #C7B5FF 0%, ${PURPLE} 18%, #5B2EE0 55%, #2E0E80 100%)`, border: "1px solid rgba(199,181,255,0.7)", boxShadow: `0 22px 44px rgba(91,46,224,0.55), 0 0 60px rgba(139,92,246,0.45), 0 0 100px rgba(139,92,246,0.2), inset 0 2.5px 0 rgba(255,255,255,0.5), inset 0 -2.5px 0 rgba(20,5,60,0.5), inset 0 0 0 1.5px rgba(255,255,255,0.18)`, opacity: valid ? 1 : 0.45, cursor: valid ? "pointer" : "not-allowed" }}>
              <Zap size={16} fill="#fff" /> Continue
            </button>
            {!valid && <div style={{ marginTop: 10, fontSize: 11, color: TEXT_MUTE, textAlign: "center" }}>Enter amount to continue</div>}
          </Card>
        </div>
      </div>

      <style>{`
        .chx-cta { transition: transform .15s ease, box-shadow .25s ease; }
        .chx-cta:not(:disabled):hover { transform: translateY(-1px); }
        .chx-cta:not(:disabled):active { transform: translateY(0) scale(0.99); }
        .chx-arrow-glow { animation: chxPulse 2.4s ease-in-out infinite; }
      `}</style>
    </Shell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
      <span style={{ fontSize: 12, color: TEXT_DIM }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>{value}</span>
    </div>
  );
}

function SelectBoxInline({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", appearance: "none", padding: "6px 28px 6px 12px", borderRadius: 99, background: "rgba(13,20,40,0.8)", border: `1px solid ${STROKE}`, color: TEXT, fontSize: 12, fontWeight: 800, fontFamily: "inherit", cursor: "pointer", outline: "none" }}>
      {options.map((o) => <option key={o} style={{ background: "#07101f" }}>{o}</option>)}
    </select>
  );
}
