import { useMemo, useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { ArrowRight, Tag, Check } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, Stepper, Field, input, primaryBtnStyle, secondaryBtnStyle, AssetSelector, TEXT, TEXT_DIM, TEXT_MUTE, CYAN, PURPLE, STROKE, ShieldLogo } from "../../p2p/shared";
import { PaymentSelect, PaymentMethod, PaymentIcon, EscrowShield3D } from "../../p2p/PaymentSelect";
import { useAuth } from "../../auth/AuthContext";
import { useOffers } from "../../offers/OfferStore";

const CREATE_STEPS = [
  { label: "Side" }, { label: "Price" }, { label: "Limits" }, { label: "Methods" }, { label: "Terms" }, { label: "Preview" },
];

export default function CreateOffer() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addOffer } = useOffers();

  if (!user) return <Navigate to={`/auth/signup?next=${encodeURIComponent("/p2p/create")}`} replace />;

  const [step, setStep] = useState(0);
  const [side, setSide] = useState<"buy" | "sell">("sell");
  const [asset, setAsset] = useState("USDT");
  const [price, setPrice] = useState("1.001");
  const [available, setAvailable] = useState("5000");
  const [min, setMin] = useState("50");
  const [max, setMax] = useState("2000");
  const [methods, setMethods] = useState<PaymentMethod[]>([user.payment?.method as PaymentMethod || "Bank Transfer"]);
  const [terms, setTerms] = useState(user.terms || "Pay only to the exact account shown. Use the reference exactly as displayed.");

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => (step === 0 ? navigate("/p2p") : setStep((s) => s - 1));

  const publish = () => {
    const o = addOffer({
      side, asset, price, available: `${available} ${asset}`, min, max, methods, terms,
      ownerName: user.name || "You", rating: 5.0, trades: 0,
    });
    navigate(`/p2p/offer-published/${o.id}`);
  };

  return (
    <Shell back="/p2p">
      <Stepper steps={CREATE_STEPS} current={step} />

      <div className="chx-grid-2">
        <Card accent={side === "sell" ? "purple" : "cyan"} bright style={{ padding: 26 }}>
          {step === 0 && <SideStep side={side} setSide={setSide} asset={asset} setAsset={setAsset} />}
          {step === 1 && <PriceStep price={price} setPrice={setPrice} />}
          {step === 2 && <LimitsStep available={available} setAvailable={setAvailable} min={min} setMin={setMin} max={max} setMax={setMax} asset={asset} />}
          {step === 3 && <MethodsStep methods={methods} setMethods={setMethods} />}
          {step === 4 && <TermsStep terms={terms} setTerms={setTerms} />}
          {step === 5 && <PreviewStep side={side} asset={asset} price={price} available={available} min={min} max={max} methods={methods} terms={terms} ownerName={user.name || "You"} />}

          <div style={{ marginTop: 22, display: "flex", gap: 12 }}>
            <button onClick={back} style={{ ...secondaryBtnStyle(54), flex: 1 }}>{step === 0 ? "Cancel" : "Back"}</button>
            {step < 5 ? (
              <button onClick={next} style={{ ...primaryBtnStyle(54), flex: 2 }}>Continue <ArrowRight size={15} /></button>
            ) : (
              <button onClick={publish} style={{ ...primaryBtnStyle(54), flex: 2, background: `linear-gradient(180deg, #C7B5FF 0%, ${PURPLE} 18%, #5B2EE0 55%, #2E0E80 100%)`, border: "1px solid rgba(199,181,255,0.7)", boxShadow: `0 22px 44px rgba(91,46,224,0.55), 0 0 60px rgba(139,92,246,0.45), inset 0 2.5px 0 rgba(255,255,255,0.5), inset 0 -2.5px 0 rgba(20,5,60,0.5)` }}>
                <Check size={15} /> Publish offer
              </button>
            )}
          </div>
        </Card>

        <div>
          <Card accent="cyan" style={{ padding: 22, position: "sticky", top: 96 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <EscrowShield3D size={42} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: TEXT }}>Escrow-backed offer</div>
                <div style={{ fontSize: 11.5, color: TEXT_DIM }}>USDT locks on each match</div>
              </div>
            </div>
            <SummaryRow label="SIDE" value={side === "sell" ? "Sell USDT" : "Buy USDT"} />
            <SummaryRow label="PRICE" value={`${price} per ${asset}`} />
            <SummaryRow label="AVAILABLE" value={`${available} ${asset}`} />
            <SummaryRow label="LIMITS" value={`${min} – ${max}`} />
            <SummaryRow label="METHODS" value={methods.length ? methods.join(", ") : "—"} />
          </Card>
        </div>
      </div>
    </Shell>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: "10px 0", borderBottom: `1px solid ${STROKE}`, display: "flex", justifyContent: "space-between", gap: 12 }}>
      <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", color: TEXT_MUTE }}>{label}</span>
      <span style={{ fontSize: 12.5, fontWeight: 700, color: TEXT, textAlign: "right", maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</span>
    </div>
  );
}

function SideStep({ side, setSide, asset, setAsset }: any) {
  return (
    <>
      <Heading title="Choose your side" sub="Are you selling USDT for fiat, or buying USDT with fiat?" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <SideCard active={side === "sell"} onClick={() => setSide("sell")} label="Sell USDT" accent="purple" desc="You hold USDT, you receive fiat" />
        <SideCard active={side === "buy"} onClick={() => setSide("buy")} label="Buy USDT" accent="cyan" desc="You send fiat, you receive USDT" />
      </div>
      <Field label="ASSET"><AssetSelector value={asset} onChange={setAsset} /></Field>
    </>
  );
}

function SideCard({ active, onClick, label, accent, desc }: any) {
  const c = accent === "purple" ? PURPLE : CYAN;
  return (
    <button onClick={onClick} style={{ textAlign: "left", padding: 18, borderRadius: 16, background: active ? `linear-gradient(180deg, ${accent === "purple" ? "rgba(139,92,246,0.14)" : "rgba(0,229,255,0.12)"}, transparent)` : "rgba(8,12,26,0.5)", border: `1px solid ${active ? c : STROKE}`, color: TEXT, fontFamily: "inherit", cursor: "pointer", boxShadow: active ? `0 0 22px ${accent === "purple" ? "rgba(139,92,246,0.25)" : "rgba(0,229,255,0.22)"}` : "none", transition: "all .2s ease" }}>
      <div style={{ fontSize: 16, fontWeight: 800 }}>{label}</div>
      <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 5 }}>{desc}</div>
    </button>
  );
}

function PriceStep({ price, setPrice }: any) {
  return (
    <>
      <Heading title="Set your price" sub="Per 1 USDT, in your local currency. Market reference: 1.000." />
      <Field label="PRICE PER USDT" hint="Tip: aim within ±0.5% of market for best fill rate.">
        <div style={{ position: "relative" }}>
          <Tag size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM }} />
          <input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" style={{ ...input, paddingLeft: 40, fontSize: 18, fontWeight: 700 }} />
        </div>
      </Field>
    </>
  );
}

function LimitsStep({ available, setAvailable, min, setMin, max, setMax, asset }: any) {
  return (
    <>
      <Heading title="Available & limits" sub="How much you'll trade in total, and per-order limits." />
      <Field label={`TOTAL AVAILABLE (${asset})`}>
        <input value={available} onChange={(e) => setAvailable(e.target.value)} inputMode="decimal" style={{ ...input, fontSize: 16, fontWeight: 700 }} />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
        <Field label="MIN ORDER"><input value={min} onChange={(e) => setMin(e.target.value)} inputMode="decimal" style={{ ...input, fontWeight: 700 }} /></Field>
        <Field label="MAX ORDER"><input value={max} onChange={(e) => setMax(e.target.value)} inputMode="decimal" style={{ ...input, fontWeight: 700 }} /></Field>
      </div>
    </>
  );
}

function MethodsStep({ methods, setMethods }: any) {
  const ALL: PaymentMethod[] = ["Bank Transfer", "Faster Payments", "Card", "Wise", "Revolut", "PayPal", "Apple Pay", "Google Pay", "Cash", "Other"];
  const toggle = (m: PaymentMethod) => setMethods((cur: PaymentMethod[]) => cur.includes(m) ? cur.filter(x => x !== m) : [...cur, m]);
  return (
    <>
      <Heading title="Payment methods" sub="Pick all the methods you'll accept. Buyers will choose one when they trade." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
        {ALL.map((m) => {
          const active = methods.includes(m);
          return (
            <button key={m} onClick={() => toggle(m)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: active ? "linear-gradient(180deg, rgba(0,229,255,0.10), rgba(0,229,255,0.02))" : "rgba(8,12,26,0.5)", border: `1px solid ${active ? "rgba(0,229,255,0.5)" : STROKE}`, color: TEXT, fontFamily: "inherit", cursor: "pointer", boxShadow: active ? "0 0 14px rgba(0,229,255,0.18)" : "none", transition: "all .15s" }}>
              <PaymentIcon method={m} size={28} />
              <span style={{ fontSize: 12.5, fontWeight: 700 }}>{m}</span>
              {active && <Check size={14} color={CYAN} style={{ marginLeft: "auto" }} />}
            </button>
          );
        })}
      </div>
    </>
  );
}

function TermsStep({ terms, setTerms }: any) {
  return (
    <>
      <Heading title="Trade terms" sub="Shown to buyers before they confirm. Be specific to avoid disputes." />
      <textarea value={terms} onChange={(e) => setTerms(e.target.value)} style={{ ...input, height: 160, padding: "14px 16px", resize: "vertical", lineHeight: 1.5 }} />
    </>
  );
}

function PreviewStep({ side, asset, price, available, min, max, methods, terms, ownerName }: any) {
  return (
    <>
      <Heading title="Preview your offer" sub="This is exactly how it appears in the marketplace." />
      <div style={{ padding: 18, borderRadius: 18, background: "linear-gradient(180deg, rgba(13,20,40,0.7), rgba(8,12,28,0.85))", border: `1px solid ${side === "sell" ? "rgba(139,92,246,0.4)" : "rgba(0,229,255,0.4)"}`, boxShadow: side === "sell" ? "0 0 28px rgba(139,92,246,0.18)" : "0 0 28px rgba(0,229,255,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShieldLogo size={32} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: TEXT }}>{ownerName}</div>
              <div style={{ fontSize: 11, color: TEXT_DIM }}>0 trades · new seller</div>
            </div>
          </div>
          <div style={{ padding: "5px 10px", borderRadius: 99, background: side === "sell" ? "rgba(139,92,246,0.12)" : "rgba(0,229,255,0.12)", border: `1px solid ${side === "sell" ? "rgba(139,92,246,0.35)" : "rgba(0,229,255,0.35)"}`, color: side === "sell" ? PURPLE : CYAN, fontSize: 10.5, fontWeight: 800, letterSpacing: "0.12em" }}>{side === "sell" ? "SELLING" : "BUYING"}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 8 }}>
          <Stat label="PRICE" value={price} unit={`/ ${asset}`} highlight />
          <Stat label="AVAILABLE" value={available} unit={asset} />
          <Stat label="LIMITS" value={`${min}–${max}`} />
        </div>
        <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {methods.map((m: PaymentMethod) => (
            <div key={m} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 9px", borderRadius: 99, background: "rgba(8,12,26,0.7)", border: `1px solid ${STROKE}`, fontSize: 11, fontWeight: 700, color: TEXT_DIM }}>
              <PaymentIcon method={m} size={16} /> {m}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: "rgba(8,12,26,0.5)", border: `1px solid ${STROKE}`, fontSize: 12, color: TEXT_DIM, lineHeight: 1.5 }}>{terms}</div>
      </div>
    </>
  );
}

function Stat({ label, value, unit, highlight }: { label: string; value: string; unit?: string; highlight?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.14em", color: TEXT_MUTE }}>{label}</div>
      <div style={{ marginTop: 4, fontSize: highlight ? 18 : 14, fontWeight: 800, color: highlight ? CYAN : TEXT }}>{value} {unit && <span style={{ fontSize: 11, color: TEXT_DIM, fontWeight: 600 }}>{unit}</span>}</div>
    </div>
  );
}

function Heading({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: TEXT_MUTE }}>CREATE OFFER</div>
      <div style={{ marginTop: 4, fontSize: 22, fontWeight: 800, color: TEXT }}>{title}</div>
      <div style={{ marginTop: 5, fontSize: 13, color: TEXT_DIM, lineHeight: 1.5 }}>{sub}</div>
    </div>
  );
}
