import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ShieldCheck, AlertTriangle, MessageSquare, Clock } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, TEXT_MUTE, CYAN, PURPLE, GREEN, STROKE, MOCK_SELLER } from "../../p2p/shared";
import { EscrowShield3D, PaymentIcon } from "../../p2p/PaymentSelect";
import { useOffers } from "../../offers/OfferStore";

type Stage = "pending" | "locked" | "paid" | "awaiting" | "released" | "completed" | "disputed";

const STAGE_LABEL: Record<Stage, string> = {
  pending: "Escrow pending", locked: "Escrow locked", paid: "Payment sent",
  awaiting: "Awaiting release", released: "USDT released", completed: "Trade completed", disputed: "Dispute opened",
};

const STAGE_TONE: Record<Stage, string> = {
  pending: "#F59E0B", locked: CYAN, paid: CYAN, awaiting: PURPLE, released: GREEN, completed: GREEN, disputed: "#EF4444",
};

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { offers } = useOffers();
  const offer = offers.find((o) => o.id === id);

  const [stage, setStage] = useState<Stage>("locked");
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  useEffect(() => {
    if (stage === "completed" || stage === "released" || stage === "disputed") return;
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [stage]);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");
  const tone = STAGE_TONE[stage];
  const isOwn = !!offer;

  const counterpartyName = offer?.ownerName || MOCK_SELLER.name;
  const price = offer?.price || MOCK_SELLER.price;
  const amount = "200";
  const method = offer?.methods?.[0] || MOCK_SELLER.method;

  return (
    <Shell back="/p2p">
      <div className="chx-grid-2">
        <Card accent="cyan" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <EscrowShield3D size={48} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_MUTE }}>ORDER · {(id || "demo").slice(-8).toUpperCase()}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginTop: 2 }}>{STAGE_LABEL[stage]}</div>
            </div>
            <div style={{ padding: "6px 12px", borderRadius: 99, background: `${tone}1F`, border: `1px solid ${tone}66`, color: tone, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", display: "inline-flex", gap: 6, alignItems: "center" }}>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: tone, boxShadow: `0 0 8px ${tone}` }} />{stage.toUpperCase()}
            </div>
          </div>

          {(stage === "locked" || stage === "paid" || stage === "awaiting") && (
            <div style={{ position: "relative", padding: 16, borderRadius: 14, background: "linear-gradient(180deg, rgba(0,229,255,0.08), rgba(0,229,255,0.02))", border: `1px solid rgba(0,229,255,0.28)`, marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_DIM, display: "inline-flex", gap: 6, alignItems: "center" }}><Clock size={12} /> TIME LEFT</div>
              <div style={{ marginTop: 4, fontSize: 28, fontWeight: 800, color: tone, fontVariantNumeric: "tabular-nums", letterSpacing: "0.04em" }}>{mins}:{secs}</div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, borderRadius: 14, overflow: "hidden", border: `1px solid ${STROKE}`, marginBottom: 16 }}>
            <Cell label="Counterparty" value={counterpartyName} />
            <Cell label="Price" value={`${price} / USDT`} />
            <Cell label="Amount" value={`${amount} USDT`} />
            <Cell label="Method" value={method} icon={<PaymentIcon method={method as any} size={18} />} />
          </div>

          <Timeline stage={stage} />
        </Card>

        <div>
          <Card accent={stage === "disputed" ? "purple" : "purple"} bright style={{ padding: 22, position: "sticky", top: 96 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_DIM, marginBottom: 14 }}>ACTIONS</div>

            {stage === "locked" && (
              <>
                <button onClick={() => setStage("paid")} style={primaryBtnStyle(52)}>Mark as paid</button>
                <button onClick={() => setStage("disputed")} style={{ ...secondaryBtnStyle(46), width: "100%", marginTop: 10 }}><AlertTriangle size={14} /> Open dispute</button>
              </>
            )}
            {stage === "paid" && (
              <>
                <button onClick={() => setStage("awaiting")} style={{ ...primaryBtnStyle(52), background: `linear-gradient(180deg, #C7B5FF 0%, ${PURPLE} 18%, #5B2EE0 55%, #2E0E80 100%)`, border: "1px solid rgba(199,181,255,0.7)" }}>Awaiting release</button>
                <button onClick={() => setStage("disputed")} style={{ ...secondaryBtnStyle(46), width: "100%", marginTop: 10 }}><AlertTriangle size={14} /> Open dispute</button>
              </>
            )}
            {stage === "awaiting" && (
              <>
                {isOwn ? (
                  <button onClick={() => setStage("released")} style={{ ...primaryBtnStyle(52), background: `linear-gradient(180deg, #B7FFC9 0%, #4ADE80 18%, #16A34A 55%, #064E29 100%)`, border: "1px solid rgba(183,255,201,0.7)" }}><ShieldCheck size={15} /> Release USDT</button>
                ) : (
                  <button disabled style={{ ...primaryBtnStyle(52), opacity: 0.6, cursor: "not-allowed" }}>Waiting for seller</button>
                )}
                <button onClick={() => setStage("disputed")} style={{ ...secondaryBtnStyle(46), width: "100%", marginTop: 10 }}><AlertTriangle size={14} /> Open dispute</button>
              </>
            )}
            {(stage === "released" || stage === "completed") && (
              <>
                <button onClick={() => navigate("/p2p")} style={primaryBtnStyle(52)}>Back to P2P</button>
              </>
            )}
            {stage === "disputed" && (
              <>
                <div style={{ padding: 12, borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", color: "#FCA5A5", fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>
                  A moderator has been notified. Please keep all evidence — payment receipts, transaction IDs.
                </div>
                <button onClick={() => alert("Chat with mod opens")} style={primaryBtnStyle(52)}><MessageSquare size={15} /> Chat with mod</button>
                <button onClick={() => setStage("locked")} style={{ ...secondaryBtnStyle(46), width: "100%", marginTop: 10 }}>Resolved · close dispute</button>
              </>
            )}
          </Card>
        </div>
      </div>
    </Shell>
  );
}

function Cell({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div style={{ padding: "12px 14px", background: "rgba(8,12,26,0.5)" }}>
      <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.16em", color: TEXT_MUTE }}>{label}</div>
      <div style={{ marginTop: 4, fontSize: 13, fontWeight: 700, color: TEXT, display: "flex", alignItems: "center", gap: 8 }}>{icon}{value}</div>
    </div>
  );
}

function Timeline({ stage }: { stage: Stage }) {
  const steps: { key: Stage; label: string }[] = [
    { key: "locked", label: "Order created · escrow locked" },
    { key: "paid", label: "Payment sent" },
    { key: "awaiting", label: "Awaiting seller release" },
    { key: "released", label: "USDT released" },
  ];
  const order = ["locked", "paid", "awaiting", "released"] as Stage[];
  const idx = order.indexOf(stage);

  return (
    <div style={{ marginTop: 4 }}>
      {steps.map((s, i) => {
        const done = i <= idx && stage !== "disputed";
        const active = i === idx && stage !== "disputed";
        return (
          <div key={s.key} style={{ display: "flex", gap: 14, paddingBottom: 14, position: "relative" }}>
            {i < steps.length - 1 && <div style={{ position: "absolute", left: 11, top: 22, bottom: 0, width: 2, background: i < idx ? `linear-gradient(180deg, ${CYAN}, ${PURPLE})` : "rgba(120,170,220,0.12)" }} />}
            <div style={{ width: 24, height: 24, borderRadius: 99, flexShrink: 0, background: done ? `linear-gradient(180deg, ${CYAN}, #0096D6)` : "rgba(13,20,40,0.95)", border: `1px solid ${done || active ? "rgba(180,230,255,0.6)" : STROKE}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: active ? `0 0 12px ${CYAN}` : "none" }}>
              {done && <div style={{ width: 8, height: 8, borderRadius: 99, background: "#04121E" }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: active ? 800 : 600, color: done ? TEXT : TEXT_MUTE }}>{s.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
