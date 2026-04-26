import { useNavigate, useParams, Navigate } from "react-router";
import { Eye, ArrowLeft, Check } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, GREEN, CYAN, PURPLE } from "../../p2p/shared";
import { EscrowShield3D } from "../../p2p/PaymentSelect";
import { useOffers } from "../../offers/OfferStore";

export default function OfferPublished() {
  const { id } = useParams();
  const { offers } = useOffers();
  const navigate = useNavigate();
  const offer = offers.find((o) => o.id === id);
  if (!offer) return <Navigate to="/p2p" replace />;

  return (
    <Shell back="/p2p">
      <Card accent="purple" bright style={{ padding: 36, maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <div style={{ position: "relative", width: 132, height: 132, margin: "0 auto 18px" }}>
          <div className="chx-burst" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `radial-gradient(circle, rgba(74,222,128,0.4), transparent 65%)` }} />
          <div className="chx-ring" style={{ position: "absolute", inset: 18, borderRadius: "50%", border: `2px solid rgba(74,222,128,0.6)` }} />
          <div style={{ position: "absolute", inset: 36, borderRadius: "50%", background: `linear-gradient(180deg, rgba(74,222,128,0.4), rgba(74,222,128,0.05))`, border: `1.5px solid ${GREEN}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 28px rgba(74,222,128,0.5)` }}>
            <Check size={32} strokeWidth={3} color={GREEN} className="chx-check" />
          </div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: GREEN }}>OFFER PUBLISHED</div>
        <div style={{ marginTop: 6, fontSize: 24, fontWeight: 800, color: TEXT }}>Your offer is live</div>
        <div style={{ marginTop: 8, fontSize: 13.5, color: TEXT_DIM, maxWidth: 440, margin: "8px auto 0", lineHeight: 1.5 }}>Listed in the {offer.side === "sell" ? "sell" : "buy"} marketplace. We'll notify you the moment a {offer.side === "sell" ? "buyer" : "seller"} matches.</div>

        <div style={{ marginTop: 22, padding: 14, borderRadius: 14, background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.22)", display: "flex", alignItems: "center", gap: 12 }}>
          <EscrowShield3D size={36} />
          <div style={{ textAlign: "left", flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: TEXT }}>Escrow ready</div>
            <div style={{ fontSize: 11.5, color: TEXT_DIM }}>USDT will lock automatically on each trade.</div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, color: CYAN, letterSpacing: "0.12em" }}>{offer.id.slice(-6).toUpperCase()}</div>
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 12 }}>
          <button onClick={() => navigate("/p2p")} style={{ ...secondaryBtnStyle(54), flex: 1 }}><ArrowLeft size={15} /> Back to P2P</button>
          <button onClick={() => navigate(`/p2p/order/${offer.id}`)} style={{ ...primaryBtnStyle(54), flex: 2, background: `linear-gradient(180deg, #C7B5FF 0%, ${PURPLE} 18%, #5B2EE0 55%, #2E0E80 100%)` }}><Eye size={15} /> View offer</button>
        </div>
      </Card>

      <style>{`
        .chx-burst { animation: chxBurst 1.2s ease-out; }
        .chx-ring { animation: chxRing 1s ease-out; }
        .chx-check { animation: chxCheck .6s ease-out .3s both; }
        @keyframes chxBurst { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes chxRing { 0% { opacity: 0; transform: scale(0.6); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes chxCheck { 0% { opacity: 0; transform: scale(0); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </Shell>
  );
}
