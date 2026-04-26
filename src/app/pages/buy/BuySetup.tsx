import { useState } from "react";
import { useNavigate } from "react-router";
import { Star, BadgeCheck, Zap, Clock } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, Field, input, Stepper, BUY_STEPS, MOCK_SELLER, primaryBtnStyle, CYAN, BLUE, TEXT, TEXT_DIM, TEXT_MUTE, STROKE, CYAN_SOFT } from "../../p2p/shared";
import { PaymentSelect, PaymentMethod, EscrowShield3D } from "../../p2p/PaymentSelect";

export default function BuySetup() {
  const navigate = useNavigate();
  const seller = MOCK_SELLER;
  const [pay, setPay] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("Bank Transfer");
  const price = parseFloat(seller.price);
  const receive = pay && !isNaN(parseFloat(pay)) ? (parseFloat(pay) / price).toFixed(2) : "0.00";
  const valid = pay && parseFloat(pay) >= parseFloat(seller.min) && parseFloat(pay) <= parseFloat(seller.max);

  return (
    <Shell>
      <Stepper steps={BUY_STEPS} current={0} />

      <div className="chx-grid-2">
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Card accent="cyan" style={{ padding: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: `linear-gradient(180deg, ${CYAN}, ${BLUE})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#04121E", fontSize: 18, fontWeight: 800, boxShadow: `0 0 18px ${CYAN_SOFT}` }}>
                {seller.letter}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>{seller.name}</span>
                  <BadgeCheck size={16} color={CYAN} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4, color: TEXT_DIM, fontSize: 12 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Star size={11} fill="#FCD34D" color="#FCD34D" /> {seller.rating}</span>
                  <span>{seller.completion}% completion</span>
                  <span>{seller.trades} trades</span>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 22 }}>
              <Stat label="PRICE" value={`${seller.price}`} suffix="USD" highlight />
              <Stat label="AVAILABLE" value={seller.available} />
              <Stat label="LIMIT" value={`${seller.min}–${seller.max}`} suffix="USD" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field label="YOU PAY">
                <div style={{ position: "relative" }}>
                  <input value={pay} onChange={(e) => setPay(e.target.value)} placeholder="0.00" inputMode="decimal" style={{ ...input, paddingRight: 60, fontSize: 18, fontWeight: 700, height: 56 }} />
                  <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM, fontSize: 13, fontWeight: 700 }}>USD</span>
                </div>
              </Field>

              <Field label="YOU RECEIVE">
                <div style={{ position: "relative" }}>
                  <div style={{ ...input, height: 56, display: "flex", alignItems: "center", paddingRight: 60, fontSize: 18, fontWeight: 700, color: receive === "0.00" ? TEXT_MUTE : TEXT }}>
                    {receive}
                  </div>
                  <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM, fontSize: 13, fontWeight: 700 }}>USDT</span>
                </div>
              </Field>

              <Field label="PAYMENT METHOD">
                <PaymentSelect value={method} onChange={setMethod} />
              </Field>
            </div>
          </Card>

          <Card accent="none" style={{ padding: 14, display: "flex", alignItems: "center", gap: 14 }}>
            <EscrowShield3D size={44} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>Escrow protection</div>
              <div style={{ fontSize: 11.5, color: TEXT_DIM, marginTop: 2 }}>USDT is locked in escrow before you pay. Funds release only when both sides confirm.</div>
            </div>
          </Card>
        </div>

        <div>
          <Card accent="purple" bright style={{ padding: 20, position: "sticky", top: 96 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_DIM, marginBottom: 14 }}>ORDER SUMMARY</div>
            <SummaryRow label="You pay" value={pay ? `${pay} USD` : "—"} />
            <SummaryRow label="You receive" value={`${receive} USDT`} highlight />
            <SummaryRow label="Price" value={`${seller.price} USD`} />
            <SummaryRow label="Seller" value={seller.name} />
            <SummaryRow label="Payment" value={method} />
            <div style={{ height: 1, background: STROKE, margin: "14px 0" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: TEXT_DIM, fontSize: 11.5 }}>
              <Clock size={13} color={CYAN} /> Payment window: 15 minutes
            </div>
            <button disabled={!valid} onClick={() => navigate("/p2p/buy/confirm", { state: { pay, receive, method } })} style={{ ...primaryBtnStyle(54), marginTop: 18, opacity: valid ? 1 : 0.5, cursor: valid ? "pointer" : "not-allowed" }}>
              <Zap size={16} fill="#fff" /> Continue
            </button>
            {!valid && pay && (
              <div style={{ marginTop: 10, fontSize: 11, color: "#F59E0B", textAlign: "center" }}>Amount must be {seller.min}–{seller.max} USD</div>
            )}
          </Card>
        </div>
      </div>
    </Shell>
  );
}

function Stat({ label, value, suffix, highlight }: { label: string; value: string; suffix?: string; highlight?: boolean }) {
  return (
    <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}` }}>
      <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.16em", color: TEXT_MUTE }}>{label}</div>
      <div style={{ marginTop: 4, fontSize: highlight ? 20 : 14, fontWeight: 800, color: highlight ? CYAN : TEXT }}>
        {value} {suffix && <span style={{ fontSize: 11, color: TEXT_DIM, fontWeight: 600 }}>{suffix}</span>}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
      <span style={{ fontSize: 12, color: TEXT_DIM }}>{label}</span>
      <span style={{ fontSize: highlight ? 15 : 13, fontWeight: highlight ? 800 : 600, color: highlight ? CYAN : TEXT }}>{value}</span>
    </div>
  );
}
