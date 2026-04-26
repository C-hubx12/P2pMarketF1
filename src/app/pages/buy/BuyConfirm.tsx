import { useNavigate, useLocation } from "react-router";
import { Shield, ArrowRight } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, Stepper, BUY_STEPS, MOCK_SELLER, primaryBtnStyle, secondaryBtnStyle, CYAN, TEXT, TEXT_DIM, TEXT_MUTE, STROKE } from "../../p2p/shared";
import { EscrowShield3D } from "../../p2p/PaymentSelect";

export default function BuyConfirm() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { pay?: string; receive?: string; method?: string } };
  const seller = MOCK_SELLER;
  const pay = state?.pay || "100";
  const receive = state?.receive || "99.90";
  const method = state?.method || seller.method;

  return (
    <Shell back="/p2p/buy">
      <Stepper steps={BUY_STEPS} current={1} />

      <Card accent="cyan" bright style={{ padding: 28, maxWidth: 720, margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: TEXT_DIM }}>REVIEW YOUR ORDER</div>
          <div style={{ marginTop: 6, fontSize: 22, fontWeight: 800, color: TEXT }}>Confirm to lock USDT in escrow</div>
        </div>

        <div style={{ padding: 20, borderRadius: 16, background: "linear-gradient(180deg, rgba(0,229,255,0.06), rgba(0,229,255,0.01))", border: `1px solid rgba(0,229,255,0.22)`, display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 14, alignItems: "center", marginBottom: 18 }}>
          <Side label="YOU PAY" amount={pay} unit="USD" />
          <ArrowRight size={20} color={CYAN} />
          <Side label="YOU RECEIVE" amount={receive} unit="USDT" highlight />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 1, borderRadius: 14, overflow: "hidden", border: `1px solid ${STROKE}`, marginBottom: 18 }}>
          <Row label="Seller" value={seller.name} />
          <Row label="Price" value={`${seller.price} USD / USDT`} />
          <Row label="Payment method" value={method} />
          <Row label="Payment window" value="15 minutes" />
        </div>

        <div style={{ padding: 14, borderRadius: 14, background: "linear-gradient(180deg, rgba(0,229,255,0.10), rgba(0,229,255,0.02))", border: `1px solid rgba(0,229,255,0.28)`, display: "flex", gap: 14, alignItems: "center", marginBottom: 22 }}>
          <EscrowShield3D size={48} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>Escrow protection</div>
            <div style={{ fontSize: 11.5, color: TEXT_DIM, marginTop: 3, lineHeight: 1.45 }}>The seller&apos;s USDT will be locked in escrow the moment you confirm. They can only release once you&apos;ve marked payment as sent.</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ ...secondaryBtnStyle(54), flex: 1 }}>Back</button>
          <button onClick={() => navigate("/p2p/buy/payment", { state: { pay, receive, method } })} style={{ ...primaryBtnStyle(54), flex: 2 }}>
            <Shield size={15} /> Confirm Buy
          </button>
        </div>
      </Card>
    </Shell>
  );
}

function Side({ label, amount, unit, highlight }: { label: string; amount: string; unit: string; highlight?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.16em", color: TEXT_MUTE }}>{label}</div>
      <div style={{ marginTop: 6, fontSize: 24, fontWeight: 800, color: highlight ? CYAN : TEXT, lineHeight: 1 }}>{amount}</div>
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
