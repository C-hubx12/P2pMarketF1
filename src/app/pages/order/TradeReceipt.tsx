import { useNavigate, useParams } from "react-router";
import { Download, Share, ArrowLeft } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, TEXT_MUTE, STROKE, CYAN, ShieldLogo } from "../../p2p/shared";
import { PaymentIcon } from "../../p2p/PaymentSelect";

export default function TradeReceipt() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handlePrint = () => {
    window.print();
  };

  return (
    <Shell back="/p2p/history">
      <div style={{ maxWidth: 600, margin: "0 auto", paddingBottom: 40 }}>
        <button onClick={() => navigate(-1)} style={{ ...secondaryBtnStyle(40), marginBottom: 24, border: "none", background: "transparent", padding: 0 }}><ArrowLeft size={16} /> Back</button>

        <Card style={{ position: "relative", padding: "48px 40px", background: "linear-gradient(180deg, #FFFFFF, #F8FAFC)", color: "#000", border: "1px solid #E5E7EB", borderRadius: 24, boxShadow: "0 24px 48px rgba(0,0,0,0.4), inset 0 2px 0 #FFF" }} className="chx-receipt-card">
          {/* Subtle noise texture */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.4, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, pointerEvents: "none", mixBlendMode: "multiply", borderRadius: 24 }} />
          
          <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
            <div>
              <ShieldLogo size={48} />
              <div style={{ fontSize: 24, fontWeight: 800, marginTop: 16, color: "#111827" }}>Trade Receipt</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>Date: 18 June 2026, 14:35</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#9CA3AF", letterSpacing: "0.1em" }}>TRADE ID</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginTop: 4, fontFamily: "monospace" }}>{id || "CHX-849F-22B1"}</div>
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
            <Row label="BUYER" value="You" />
            <Row label="SELLER" value="VerifiedTrader" />
            <div style={{ height: 1, background: "#E5E7EB", margin: "8px 0" }} />
            
            <Row label="ASSET TRADED" value="0.05 BTC" highlight />
            <Row label="FIAT AMOUNT" value="£3,427.20" highlight />
            <Row label="PRICE PER BTC" value="£68,544.00" />
            <div style={{ height: 1, background: "#E5E7EB", margin: "8px 0" }} />
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#6B7280" }}>PAYMENT METHOD</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "#111827" }}>
                <PaymentIcon method="Bank Transfer" size={20} /> Bank Transfer
              </div>
            </div>
            <Row label="COMPLETION TIME" value="4 mins 12 secs" />
          </div>

          <div style={{ position: "relative", zIndex: 1, marginTop: 48, paddingTop: 24, borderTop: "1px dashed #D1D5DB", fontSize: 11, color: "#9CA3AF", textAlign: "center", lineHeight: 1.5 }}>
            This receipt is for record keeping purposes only. CoinHubX is not responsible for tax obligations.
          </div>
        </Card>

        <div className="chx-no-print" style={{ display: "flex", gap: 16, marginTop: 24 }}>
          <button onClick={handlePrint} style={{ ...primaryBtnStyle(54), flex: 1 }}><Download size={18} /> Download as PDF</button>
          <button style={{ ...secondaryBtnStyle(54), flex: 1 }}><Share size={18} /> Share</button>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .chx-receipt-card, .chx-receipt-card * { visibility: visible; }
          .chx-receipt-card { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; }
          .chx-no-print { display: none !important; }
        }
      `}</style>
    </Shell>
  );
}

function Row({ label, value, highlight }: any) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: "#6B7280" }}>{label}</span>
      <span style={{ fontSize: highlight ? 18 : 14, fontWeight: 800, color: "#111827" }}>{value}</span>
    </div>
  );
}
