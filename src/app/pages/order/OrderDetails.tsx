import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ShieldCheck, AlertTriangle, MessageSquare, Clock, Send, Paperclip, X, LifeBuoy, Upload, ChevronDown } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, TEXT_MUTE, CYAN, PURPLE, GREEN, STROKE, MOCK_SELLER, input } from "../../p2p/shared";
import { EscrowShield3D, PaymentIcon } from "../../p2p/PaymentSelect";
import { useOffers } from "../../offers/OfferStore";

type Stage = "pending" | "locked" | "paid" | "awaiting" | "released" | "completed" | "disputed" | "cancelled" | "expired";

const STAGE_LABEL: Record<Stage, string> = {
  pending: "Escrow pending", locked: "Escrow locked", paid: "Payment sent",
  awaiting: "Awaiting release", released: "USDT released", completed: "Trade completed",
  disputed: "Dispute opened", cancelled: "Order cancelled", expired: "Order expired",
};

const STAGE_TONE: Record<Stage, string> = {
  pending: "#F59E0B", locked: CYAN, paid: CYAN, awaiting: PURPLE, released: GREEN, completed: GREEN,
  disputed: "#EF4444", cancelled: TEXT_MUTE, expired: "#F59E0B",
};

const CANCEL_REASONS = [
  "Changed my mind",
  "Payment issue",
  "Counterparty not responding",
  "Wrong payment method",
  "Other",
];

const DISPUTE_REASONS = [
  "Payment sent but not credited",
  "Counterparty unresponsive",
  "Wrong amount received",
  "Suspected fraud",
  "Other",
];

type ChatMsg = { id: string; from: "me" | "them" | "system"; text: string; time: string };

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { offers } = useOffers();
  const offer = offers.find((o) => o.id === id);

  const [stage, setStage] = useState<Stage>("locked");
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [showCancel, setShowCancel] = useState(false);
  const [showDispute, setShowDispute] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: "s1", from: "system", text: "Order created · escrow locked", time: "now" },
  ]);
  const [draft, setDraft] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (stage === "completed" || stage === "released" || stage === "disputed" || stage === "cancelled" || stage === "expired") return;
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [stage]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");
  const tone = STAGE_TONE[stage];
  const isOwn = !!offer;

  const counterpartyName = offer?.ownerName || MOCK_SELLER.name;
  const price = offer?.price || MOCK_SELLER.price;
  const amount = "200";
  const method = offer?.methods?.[0] || MOCK_SELLER.method;

  function pushSystem(text: string) {
    setMessages((m) => [...m, { id: `s-${Date.now()}`, from: "system", text, time: "now" }]);
  }
  function send() {
    const t = draft.trim();
    if (!t) return;
    setMessages((m) => [...m, { id: `m-${Date.now()}`, from: "me", text: t, time: "now" }]);
    setDraft("");
    setTimeout(() => setMessages((m) => [...m, { id: `t-${Date.now()}`, from: "them", text: "Got it, thanks.", time: "now" }]), 900);
  }
  function advance(next: Stage, sysMsg?: string) {
    setStage(next);
    if (sysMsg) pushSystem(sysMsg);
  }

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

          <div style={{ marginTop: 18, borderRadius: 16, border: `1px solid ${STROKE}`, background: "rgba(8,12,26,0.55)", overflow: "hidden" }}>
            <div style={{ padding: "12px 14px", borderBottom: `1px solid ${STROKE}`, display: "flex", alignItems: "center", gap: 10 }}>
              <MessageSquare size={14} color={CYAN} />
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", color: TEXT_DIM }}>CHAT · {counterpartyName}</div>
              <div style={{ flex: 1 }} />
              <button onClick={() => alert("Support escalation")} style={{ ...secondaryBtnStyle(30), fontSize: 11 }}><LifeBuoy size={12} /> Support</button>
            </div>
            <div style={{ maxHeight: 240, minHeight: 160, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              {messages.map((m) => m.from === "system" ? (
                <div key={m.id} style={{ alignSelf: "center", padding: "5px 10px", borderRadius: 99, background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.22)", color: CYAN, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>{m.text}</div>
              ) : (
                <div key={m.id} style={{ alignSelf: m.from === "me" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                  <div style={{
                    padding: "8px 12px", borderRadius: 12, fontSize: 13, lineHeight: 1.4,
                    background: m.from === "me" ? `linear-gradient(180deg, rgba(0,229,255,0.22), rgba(0,229,255,0.08))` : "rgba(13,20,40,0.85)",
                    border: m.from === "me" ? `1px solid rgba(0,229,255,0.4)` : `1px solid ${STROKE}`,
                    color: TEXT,
                  }}>{m.text}</div>
                  <div style={{ fontSize: 10, color: TEXT_MUTE, marginTop: 3, textAlign: m.from === "me" ? "right" : "left" }}>{m.time}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div style={{ padding: 10, borderTop: `1px solid ${STROKE}`, display: "flex", gap: 8, alignItems: "center" }}>
              <button title="Attach" style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${STROKE}`, background: "rgba(13,20,40,0.6)", color: TEXT_DIM, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Paperclip size={14} /></button>
              <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type a message…" style={{ ...input, height: 36, fontSize: 13 }} />
              <button onClick={send} style={{ width: 40, height: 36, borderRadius: 10, border: "1px solid rgba(180,230,255,0.6)", background: `linear-gradient(180deg, ${CYAN}, #0096D6)`, color: "#04121E", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Send size={14} /></button>
            </div>
          </div>
        </Card>

        <div>
          <Card accent="purple" bright style={{ padding: 22, position: "sticky", top: 96 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_DIM, marginBottom: 14 }}>ACTIONS</div>

            {stage === "locked" && (
              <>
                <button onClick={() => advance("paid", "Payment marked as sent")} style={primaryBtnStyle(52)}>Mark as paid</button>
                <button onClick={() => setShowCancel(true)} style={{ ...secondaryBtnStyle(46), width: "100%", marginTop: 10 }}>Cancel order</button>
                <button onClick={() => setShowDispute(true)} style={{ ...secondaryBtnStyle(46), width: "100%", marginTop: 10 }}><AlertTriangle size={14} /> Open dispute</button>
              </>
            )}
            {stage === "paid" && (
              <>
                <button onClick={() => advance("awaiting", "Awaiting seller release")} style={{ ...primaryBtnStyle(52), background: `linear-gradient(180deg, #C7B5FF 0%, ${PURPLE} 18%, #5B2EE0 55%, #2E0E80 100%)`, border: "1px solid rgba(199,181,255,0.7)" }}>Awaiting release</button>
                <button onClick={() => setShowDispute(true)} style={{ ...secondaryBtnStyle(46), width: "100%", marginTop: 10 }}><AlertTriangle size={14} /> Open dispute</button>
              </>
            )}
            {stage === "awaiting" && (
              <>
                {isOwn ? (
                  <button onClick={() => advance("released", "USDT released to buyer")} style={{ ...primaryBtnStyle(52), background: `linear-gradient(180deg, #B7FFC9 0%, #4ADE80 18%, #16A34A 55%, #064E29 100%)`, border: "1px solid rgba(183,255,201,0.7)" }}><ShieldCheck size={15} /> Release USDT</button>
                ) : (
                  <button disabled style={{ ...primaryBtnStyle(52), opacity: 0.6, cursor: "not-allowed" }}>Waiting for seller</button>
                )}
                <button onClick={() => setShowDispute(true)} style={{ ...secondaryBtnStyle(46), width: "100%", marginTop: 10 }}><AlertTriangle size={14} /> Open dispute</button>
              </>
            )}
            {(stage === "released" || stage === "completed") && (
              <button onClick={() => navigate("/p2p")} style={primaryBtnStyle(52)}>Back to P2P</button>
            )}
            {stage === "cancelled" && (
              <>
                <div style={{ padding: 12, borderRadius: 12, background: "rgba(120,170,220,0.06)", border: `1px solid ${STROKE}`, color: TEXT_DIM, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>This order has been cancelled. No funds moved.</div>
                <button onClick={() => navigate("/p2p")} style={primaryBtnStyle(52)}>Back to P2P</button>
              </>
            )}
            {stage === "disputed" && (
              <>
                <div style={{ padding: 12, borderRadius: 12, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)", color: "#FCD9A0", fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>
                  A moderator has been notified. Please keep all evidence — payment receipts, transaction IDs.
                </div>
                <button onClick={() => alert("Chat with mod opens")} style={primaryBtnStyle(52)}><MessageSquare size={15} /> Chat with mod</button>
                <button onClick={() => advance("locked", "Dispute resolved")} style={{ ...secondaryBtnStyle(46), width: "100%", marginTop: 10 }}>Resolved · close dispute</button>
              </>
            )}
          </Card>
        </div>
      </div>

      {showCancel && <CancelModal onClose={() => setShowCancel(false)} onConfirm={(reason) => { setShowCancel(false); advance("cancelled", `Cancelled · ${reason}`); }} />}
      {showDispute && <DisputeModal onClose={() => setShowDispute(false)} onSubmit={(reason) => { setShowDispute(false); advance("disputed", `Dispute opened · ${reason}`); }} />}
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
  const inactive = stage === "disputed" || stage === "cancelled" || stage === "expired";

  return (
    <div style={{ marginTop: 4 }}>
      {steps.map((s, i) => {
        const done = i <= idx && !inactive;
        const active = i === idx && !inactive;
        return (
          <div key={s.key} style={{ display: "flex", gap: 14, paddingBottom: 14, position: "relative" }}>
            {i < steps.length - 1 && <div style={{ position: "absolute", left: 11, top: 22, bottom: 0, width: 2, background: i < idx && !inactive ? `linear-gradient(180deg, ${CYAN}, ${PURPLE})` : "rgba(120,170,220,0.12)" }} />}
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

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(2,4,12,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 460, width: "100%" }}>
        <Card accent="purple" bright style={{ padding: 22 }}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function CancelModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: (reason: string) => void }) {
  const [reason, setReason] = useState(CANCEL_REASONS[0]);
  return (
    <Modal onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_MUTE }}>CANCEL · ORDER</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginTop: 2 }}>Cancel this order?</div>
        </div>
        <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${STROKE}`, background: "rgba(13,20,40,0.6)", color: TEXT_DIM, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={14} /></button>
      </div>
      <div style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.5, marginBottom: 14 }}>Cancelling releases escrow back to the seller. You can't undo this.</div>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", color: TEXT_MUTE, marginBottom: 6 }}>REASON</div>
      <div style={{ position: "relative", marginBottom: 18 }}>
        <select value={reason} onChange={(e) => setReason(e.target.value)} style={{ ...input, appearance: "none", paddingRight: 34, cursor: "pointer" }}>
          {CANCEL_REASONS.map((r) => <option key={r} style={{ background: "#07101f" }}>{r}</option>)}
        </select>
        <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM, pointerEvents: "none" }} />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onClose} style={{ ...secondaryBtnStyle(48), flex: 1 }}>Keep order</button>
        <button onClick={() => onConfirm(reason)} style={{ ...primaryBtnStyle(48), flex: 1, background: `linear-gradient(180deg, #FCA5A5 0%, #EF4444 18%, #B91C1C 55%, #5C0E0E 100%)`, border: "1px solid rgba(252,165,165,0.7)" }}>Confirm cancel</button>
      </div>
    </Modal>
  );
}

function DisputeModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (reason: string) => void }) {
  const [reason, setReason] = useState(DISPUTE_REASONS[0]);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<string | null>(null);
  return (
    <Modal onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <EscrowShield3D size={36} pulse={false} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: TEXT_MUTE }}>DISPUTE · OPEN</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginTop: 2 }}>Open a dispute</div>
        </div>
        <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${STROKE}`, background: "rgba(13,20,40,0.6)", color: TEXT_DIM, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={14} /></button>
      </div>
      <div style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.5, marginBottom: 14 }}>A moderator will review your case. Funds remain in escrow until resolved.</div>

      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", color: TEXT_MUTE, marginBottom: 6 }}>REASON</div>
      <div style={{ position: "relative", marginBottom: 14 }}>
        <select value={reason} onChange={(e) => setReason(e.target.value)} style={{ ...input, appearance: "none", paddingRight: 34, cursor: "pointer" }}>
          {DISPUTE_REASONS.map((r) => <option key={r} style={{ background: "#07101f" }}>{r}</option>)}
        </select>
        <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM, pointerEvents: "none" }} />
      </div>

      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", color: TEXT_MUTE, marginBottom: 6 }}>DESCRIPTION</div>
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} placeholder="Explain what happened…" style={{ ...input, height: "auto", padding: 12, marginBottom: 14, resize: "vertical", fontFamily: "inherit" }} />

      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", color: TEXT_MUTE, marginBottom: 6 }}>EVIDENCE</div>
      <label style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, borderRadius: 12, border: `1px dashed ${STROKE}`, background: "rgba(8,12,26,0.5)", cursor: "pointer", marginBottom: 18 }}>
        <Upload size={16} color={CYAN} />
        <div style={{ flex: 1, fontSize: 12.5, color: file ? TEXT : TEXT_DIM }}>{file || "Upload receipt or screenshot"}</div>
        <input type="file" accept="image/*,application/pdf" onChange={(e) => setFile(e.target.files?.[0]?.name || null)} style={{ display: "none" }} />
      </label>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onClose} style={{ ...secondaryBtnStyle(48), flex: 1 }}>Cancel</button>
        <button onClick={() => onSubmit(reason)} style={{ ...primaryBtnStyle(48), flex: 1, background: `linear-gradient(180deg, #C7B5FF 0%, ${PURPLE} 18%, #5B2EE0 55%, #2E0E80 100%)`, border: "1px solid rgba(199,181,255,0.7)" }}>Submit dispute</button>
      </div>
    </Modal>
  );
}
