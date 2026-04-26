import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Copy, AlertTriangle, Check } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, Stepper, BUY_STEPS, MOCK_SELLER, primaryBtnStyle, secondaryBtnStyle, CYAN, TEXT, TEXT_DIM, TEXT_MUTE, STROKE } from "../../p2p/shared";
import { EscrowShield3D } from "../../p2p/PaymentSelect";

export default function BuyPayment() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { pay?: string; receive?: string; method?: string } };
  const seller = MOCK_SELLER;
  const pay = state?.pay || "100";
  const method = state?.method || seller.method;

  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");
  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1400);
  };

  return (
    <Shell back="/p2p/buy/confirm">
      <Stepper steps={BUY_STEPS} current={2} />

      <div className="chx-grid-2">
        <Card accent="cyan" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <EscrowShield3D size={42} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Pay the seller</div>
              <div style={{ fontSize: 12, color: TEXT_DIM }}>Order created · USDT is locked in escrow</div>
            </div>
          </div>

          <div style={{ position: "relative", padding: 18, borderRadius: 16, background: "linear-gradient(180deg, rgba(0,229,255,0.08), rgba(0,229,255,0.02))", border: `1px solid rgba(0,229,255,0.3)`, marginBottom: 20, textAlign: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 50%, rgba(0,229,255,0.18), transparent 70%)`, animation: "chxPulse 2.4s ease-in-out infinite" }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_DIM }}>TIME LEFT</div>
              <div style={{ marginTop: 4, fontSize: 32, fontWeight: 800, color: CYAN, fontVariantNumeric: "tabular-nums", letterSpacing: "0.04em" }}>{mins}:{secs}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <PayRow label="Amount" value={`${pay} USD`} copyable onCopy={() => copy(pay, "amt")} copied={copied === "amt"} />
            <PayRow label="Method" value={method} />
            <PayRow label="Account name" value={seller.name} />
            <PayRow label="Reference" value={seller.reference} copyable onCopy={() => copy(seller.reference, "ref")} copied={copied === "ref"} highlight />
          </div>

          <div style={{ marginTop: 18, padding: 12, borderRadius: 12, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", display: "flex", gap: 10 }}>
            <AlertTriangle size={15} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: 11.5, color: "#FBC974", lineHeight: 1.45 }}>Use the exact reference. Never include words like &quot;crypto&quot; or &quot;USDT&quot; in your transfer.</div>
          </div>
        </Card>

        <div>
          <Card accent="purple" bright style={{ padding: 20, position: "sticky", top: 96 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_DIM, marginBottom: 14 }}>NEXT STEP</div>
            <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.5, marginBottom: 18 }}>Send the payment from your bank, then tap the button below. The seller will release USDT once they confirm receipt.</div>
            <button onClick={() => navigate("/p2p/buy/waiting", { state })} style={primaryBtnStyle(54)}>I have paid</button>
            <button onClick={() => navigate("/p2p")} style={{ ...secondaryBtnStyle(48), width: "100%", marginTop: 10 }}>Cancel order</button>
          </Card>
        </div>
      </div>
    </Shell>
  );
}

function PayRow({ label, value, copyable, onCopy, copied, highlight }: { label: string; value: string; copyable?: boolean; onCopy?: () => void; copied?: boolean; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 12, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}` }}>
      <div>
        <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.16em", color: TEXT_MUTE }}>{label}</div>
        <div style={{ marginTop: 3, fontSize: highlight ? 16 : 13, fontWeight: 700, color: highlight ? CYAN : TEXT, fontFamily: highlight ? "monospace" : "inherit" }}>{value}</div>
      </div>
      {copyable && (
        <button onClick={onCopy} style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(0,229,255,0.08)", border: `1px solid ${STROKE}`, color: CYAN, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          {copied ? <Check size={14} /> : <Copy size={13} />}
        </button>
      )}
    </div>
  );
}
