import { useNavigate, useLocation } from "react-router";
import { Star, Wallet, ArrowRight, Check } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, Stepper, BUY_STEPS, MOCK_SELLER, primaryBtnStyle, secondaryBtnStyle, CYAN, GREEN, TEXT, TEXT_DIM, TEXT_MUTE, STROKE } from "../../p2p/shared";

export default function BuyComplete() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { pay?: string; receive?: string } };
  const seller = MOCK_SELLER;
  const receive = state?.receive || "99.90";
  const pay = state?.pay || "100";

  return (
    <Shell back="/p2p">
      <Stepper steps={BUY_STEPS} current={4} />

      <Card accent="cyan" bright style={{ padding: 32, maxWidth: 560, margin: "0 auto", width: "100%", textAlign: "center" }}>
        <div style={{ position: "relative", width: 96, height: 96, margin: "0 auto 18px" }}>
          <div style={{ position: "absolute", inset: -10, borderRadius: "50%", background: `radial-gradient(circle, rgba(74,222,128,0.4), transparent 70%)`, filter: "blur(14px)" }} />
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "50%", background: `linear-gradient(180deg, ${GREEN}, #16A34A)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px rgba(74,222,128,0.55), inset 0 2px 0 rgba(255,255,255,0.4)` }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l4 4L19 8" style={{ strokeDasharray: 60, strokeDashoffset: 0, animation: "chxCheck 0.6s ease-out" }} />
            </svg>
          </div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", color: GREEN }}>TRADE COMPLETED</div>
        <div style={{ marginTop: 6, fontSize: 24, fontWeight: 800, color: TEXT }}>You received {receive} USDT</div>
        <div style={{ marginTop: 6, fontSize: 13, color: TEXT_DIM }}>Paid {pay} USD via {seller.name}. Funds are in your wallet.</div>

        <div style={{ marginTop: 22, padding: 16, borderRadius: 14, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}` }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.16em", color: TEXT_MUTE, marginBottom: 10 }}>RATE THE SELLER</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} style={{ width: 36, height: 36, borderRadius: 10, background: "transparent", border: `1px solid ${STROKE}`, color: "#FCD34D", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Star size={16} fill="#FCD34D" />
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <button onClick={() => navigate("/p2p")} style={{ ...secondaryBtnStyle(52), flex: 1 }}>Back to P2P</button>
          <button onClick={() => navigate("/p2p")} style={{ ...primaryBtnStyle(52), flex: 1 }}>
            <Wallet size={15} /> View wallet <ArrowRight size={14} />
          </button>
        </div>
      </Card>
    </Shell>
  );
}
