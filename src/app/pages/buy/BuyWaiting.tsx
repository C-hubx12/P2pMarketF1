import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { MessageCircle, AlertTriangle, Check } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, Stepper, BUY_STEPS, MOCK_SELLER, primaryBtnStyle, secondaryBtnStyle, CYAN, GREEN, TEXT, TEXT_DIM, TEXT_MUTE, STROKE, BLUE } from "../../p2p/shared";
import { EscrowBadge } from "../../p2p/EscrowBadge";

const TIMELINE = [
  { label: "Order placed", desc: "Escrow locked" },
  { label: "Payment sent", desc: "Awaiting seller confirmation" },
  { label: "Seller releasing", desc: "USDT being transferred" },
  { label: "Completed", desc: "Funds in your wallet" },
];

export default function BuyWaiting() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const seller = MOCK_SELLER;
  const [stage, setStage] = useState(2);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(3), 4500);
    const t2 = setTimeout(() => navigate("/p2p/buy/complete", { state, replace: true }), 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [navigate, state]);

  return (
    <Shell back="/p2p/buy/payment">
      <Stepper steps={BUY_STEPS} current={3} />

      <Card accent="cyan" style={{ padding: 28, maxWidth: 720, margin: "0 auto", width: "100%" }}>
        <EscrowBadge tone="cyan" title="Funds locked in escrow" sub="USDT can only be released to you. We're watching the transfer in real time." status="LOCKED" style={{ marginBottom: 18 }} />
        <div style={{ position: "relative", width: 92, height: 92, margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid rgba(0,229,255,0.3)`, animation: "chxRing 1.8s ease-out infinite" }} />
          <div style={{ position: "absolute", inset: 8, borderRadius: "50%", border: `2px solid rgba(0,229,255,0.5)`, animation: "chxRing 1.8s ease-out 0.4s infinite" }} />
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: `conic-gradient(${CYAN}, ${BLUE}, ${CYAN})`, padding: 3, animation: "chxSpin 2s linear infinite" }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#0A0F1F", display: "flex", alignItems: "center", justifyContent: "center", color: CYAN, fontSize: 20, fontWeight: 800 }}>⟳</div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: TEXT }}>Waiting for seller release</div>
          <div style={{ marginTop: 6, fontSize: 13, color: TEXT_DIM }}>Your payment has been marked as sent. {seller.name} is verifying.</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0, padding: "8px 4px", marginBottom: 22 }}>
          {TIMELINE.map((step, i) => {
            const done = i < stage;
            const active = i === stage;
            return (
              <div key={step.label} style={{ display: "flex", gap: 14, padding: "10px 0", position: "relative" }}>
                <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: done ? `linear-gradient(180deg, ${GREEN}, #16A34A)` : active ? `linear-gradient(180deg, #9FF5FF, ${CYAN})` : "rgba(13,20,40,0.95)", border: `1px solid ${done || active ? "rgba(180,230,255,0.6)" : STROKE}`, color: "#04121E", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: active ? `0 0 14px rgba(0,229,255,0.6)` : "none", animation: active ? "chxPulse 1.6s ease-in-out infinite" : "none" }}>
                    {done && <Check size={13} strokeWidth={3} />}
                  </div>
                  {i < TIMELINE.length - 1 && <div style={{ width: 2, flex: 1, background: done ? GREEN : STROKE, marginTop: 2 }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: 8 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: done || active ? TEXT : TEXT_MUTE }}>{step.label}</div>
                  <div style={{ fontSize: 11.5, color: TEXT_DIM, marginTop: 2 }}>{step.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ ...secondaryBtnStyle(46), flex: 1 }}><MessageCircle size={14} /> Contact seller</button>
          <button style={{ ...secondaryBtnStyle(46), flex: 1, color: "#FBC974", borderColor: "rgba(245,158,11,0.3)" }}><AlertTriangle size={14} /> Open dispute</button>
        </div>
      </Card>
    </Shell>
  );
}
