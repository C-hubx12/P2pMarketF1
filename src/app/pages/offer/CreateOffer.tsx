import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router";
import { ArrowRight, ArrowLeft, Tag, Check, RefreshCw, Plus, Trash, AlertTriangle, Eye, RefreshCcw } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, Stepper, Field, input, primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, TEXT_MUTE, CYAN, PURPLE, STROKE, ShieldLogo, GREEN, CYAN_SOFT } from "../../p2p/shared";
import { PaymentSelect, PaymentMethod, PaymentIcon, EscrowShield3D, PAYMENT_METHODS } from "../../p2p/PaymentSelect";
import { useAuth } from "../../auth/AuthContext";
import { useOffers } from "../../offers/OfferStore";

const CREATE_STEPS = [
  { label: "Ad Type" }, { label: "Pricing" }, { label: "Amount" }, { label: "Payments" }, { label: "Terms" }, { label: "Review" }
];

export default function CreateOffer() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addOffer } = useOffers();

  const [step, setStep] = useState(0);
  
  // Step 1: Ad type
  const [side, setSide] = useState<"sell" | "buy">("sell");
  const [asset, setAsset] = useState("BTC");
  const [fiat, setFiat] = useState("GBP");

  // Step 2: Pricing
  const [priceType, setPriceType] = useState<"fixed" | "floating">("floating");
  const [fixedPrice, setFixedPrice] = useState("");
  const [floatingPercent, setFloatingPercent] = useState("+2.00");
  
  // Step 3: Amount and limits
  const [amount, setAmount] = useState("");
  const [min, setMin] = useState("10");
  const [max, setMax] = useState("2000");

  // Step 4: Payments
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [customMethod, setCustomMethod] = useState("");
  const [payWindow, setPayWindow] = useState("30 mins");

  // Step 5: Terms
  const [terms, setTerms] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [publishedId, setPublishedId] = useState("");

  if (!user) return <Navigate to={`/auth/signup?next=${encodeURIComponent("/p2p/create")}`} replace />;

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => (step === 0 ? navigate("/p2p") : setStep((s) => s - 1));

  const publish = () => {
    const o = addOffer({
      side, asset, price: priceType === "fixed" ? fixedPrice : `Market ${floatingPercent}%`, 
      available: `${amount} ${asset}`, min, max, methods, terms,
      ownerName: user.name || "You", rating: 5.0, trades: 0,
    });
    setPublishedId(o.id);
    setIsSuccess(true);
  };

  const getMarketRate = () => 67200; // Mock rate for BTC in GBP

  if (isSuccess) {
    return (
      <Shell back="/p2p">
        <Card accent="green" bright style={{ padding: 40, maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ margin: "0 auto 24px", display: "flex", justifyContent: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(180deg, rgba(74,222,128,0.2), rgba(74,222,128,0.05))", border: `2px solid ${GREEN}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 40px rgba(74,222,128,0.3)` }}>
              <Check size={40} strokeWidth={3} color={GREEN} />
            </div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: TEXT }}>Your Ad is Now Live</div>
          <div style={{ marginTop: 12, fontSize: 15, color: TEXT_DIM, lineHeight: 1.5, maxWidth: 400, margin: "12px auto 0" }}>
            {amount} {asset} has been locked in escrow and your ad is visible to buyers.
          </div>
          
          <div style={{ marginTop: 30, padding: 20, borderRadius: 16, background: "rgba(13,20,40,0.6)", border: `1px solid ${STROKE}`, textAlign: "left" }}>
            <SummaryRow label="TYPE" value={`${side === "sell" ? "Selling" : "Buying"} ${asset}`} />
            <SummaryRow label="PRICE" value={priceType === "fixed" ? `£${fixedPrice}` : `Market ${floatingPercent}%`} />
            <SummaryRow label="AMOUNT" value={`${amount} ${asset}`} />
          </div>

          <div style={{ marginTop: 30, display: "flex", gap: 16 }}>
            <button onClick={() => { setIsSuccess(false); setStep(0); }} style={{ ...secondaryBtnStyle(54), flex: 1 }}>Post Another Ad</button>
            <button onClick={() => navigate(`/p2p/order/${publishedId}`)} style={{ ...primaryBtnStyle(54), flex: 1 }}><Eye size={18} /> View My Ad</button>
          </div>
          <div style={{ marginTop: 20, fontSize: 12, color: TEXT_MUTE }}>Your {asset} is safe in escrow. It will only move when a trade completes or you cancel your ad.</div>
        </Card>
      </Shell>
    );
  }

  const isStep1Valid = asset && fiat;
  const isStep2Valid = priceType === "fixed" ? fixedPrice.length > 0 : floatingPercent.length > 0;
  const isStep3Valid = amount && parseFloat(amount) > 0 && parseFloat(amount) <= 0.8; // Mock balance of 0.8
  const isStep4Valid = methods.length > 0 && payWindow;

  return (
    <Shell back="/p2p">
      <div style={{ maxWidth: 840, margin: "0 auto" }}>
        <Stepper steps={CREATE_STEPS} current={step} />

        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
          <Card accent="cyan" bright style={{ padding: 32 }}>
            {step === 0 && <Step1 side={side} setSide={setSide} asset={asset} setAsset={setAsset} fiat={fiat} setFiat={setFiat} />}
            {step === 1 && <Step2 priceType={priceType} setPriceType={setPriceType} fixedPrice={fixedPrice} setFixedPrice={setFixedPrice} floatingPercent={floatingPercent} setFloatingPercent={setFloatingPercent} asset={asset} fiat={fiat} marketRate={getMarketRate()} />}
            {step === 2 && <Step3 amount={amount} setAmount={setAmount} min={min} setMin={setMin} max={max} setMax={setMax} asset={asset} fiat={fiat} marketRate={getMarketRate()} balance={0.8} />}
            {step === 3 && <Step4 methods={methods} setMethods={setMethods} customMethod={customMethod} setCustomMethod={setCustomMethod} payWindow={payWindow} setPayWindow={setPayWindow} />}
            {step === 4 && <Step5 terms={terms} setTerms={setTerms} />}
            {step === 5 && <Step6 side={side} asset={asset} fiat={fiat} priceType={priceType} fixedPrice={fixedPrice} floatingPercent={floatingPercent} amount={amount} min={min} max={max} methods={methods} payWindow={payWindow} terms={terms} marketRate={getMarketRate()} />}

            <div style={{ marginTop: 32, display: "flex", gap: 16 }}>
              <button onClick={back} style={{ ...secondaryBtnStyle(56), flex: 1, fontSize: 16 }}>{step === 0 ? "Cancel" : "Back"}</button>
              {step < 5 ? (
                <button onClick={next} disabled={(step===0 && !isStep1Valid) || (step===1 && !isStep2Valid) || (step===2 && !isStep3Valid) || (step===3 && !isStep4Valid)} style={{ ...primaryBtnStyle(56), flex: 2, opacity: ((step===0 && !isStep1Valid) || (step===1 && !isStep2Valid) || (step===2 && !isStep3Valid) || (step===3 && !isStep4Valid)) ? 0.5 : 1 }}>Continue <ArrowRight size={18} /></button>
              ) : (
                <button onClick={publish} style={{ ...primaryBtnStyle(56), flex: 2, background: `linear-gradient(180deg, #C7B5FF 0%, ${PURPLE} 18%, #5B2EE0 55%, #2E0E80 100%)`, border: "1px solid rgba(199,181,255,0.7)", boxShadow: `0 22px 44px rgba(91,46,224,0.55), 0 0 60px rgba(139,92,246,0.45)` }}>
                  Publish Ad
                </button>
              )}
            </div>
          </Card>

          <div>
            <Card accent="cyan" style={{ padding: 24, position: "sticky", top: 100 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <EscrowShield3D size={48} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: TEXT }}>Escrow Protection</div>
                  <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 2 }}>Assets locked on publish</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <SummaryRow label="TYPE" value={side === "sell" ? `Sell ${asset}` : `Buy ${asset}`} />
                <SummaryRow label="FIAT" value={fiat} />
                {step > 0 && <SummaryRow label="PRICE" value={priceType === "fixed" ? `£${fixedPrice || "0.00"}` : `Market ${floatingPercent}%`} />}
                {step > 1 && <SummaryRow label="AMOUNT" value={`${amount || "0.00"} ${asset}`} />}
                {step > 2 && <SummaryRow label="LIMITS" value={`£${min} – £${max}`} />}
                {step > 3 && <SummaryRow label="METHODS" value={methods.length ? methods.length + " selected" : "—"} />}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${STROKE}`, paddingBottom: 12 }}>
      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: TEXT_MUTE }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: TEXT, textAlign: "right" }}>{value}</span>
    </div>
  );
}

function Heading({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 26, fontWeight: 800, color: TEXT }}>{title}</div>
      <div style={{ marginTop: 8, fontSize: 14, color: TEXT_DIM, lineHeight: 1.5 }}>{sub}</div>
    </div>
  );
}

// Step 1: Ad Type
function Step1({ side, setSide, asset, setAsset, fiat, setFiat }: any) {
  const coins = [
    { id: "BTC", name: "Bitcoin", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=024" },
    { id: "ETH", name: "Ethereum", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024" },
    { id: "USDT", name: "Tether", icon: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=024" },
    { id: "BNB", name: "BNB", icon: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=024" },
    { id: "SOL", name: "Solana", icon: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=024" },
    { id: "XRP", name: "XRP", icon: "https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=024" }
  ];

  return (
    <>
      <Heading title="Ad Type" sub="Select if you want to buy or sell crypto, and choose your preferred currency." />
      
      <div style={{ display: "flex", background: "rgba(8,12,26,0.6)", borderRadius: 16, padding: 6, marginBottom: 28, border: `1px solid ${STROKE}` }}>
        <button onClick={() => setSide("sell")} style={{ flex: 1, padding: "14px 0", borderRadius: 12, background: side === "sell" ? `linear-gradient(180deg, rgba(0,229,255,0.15), rgba(0,229,255,0.05))` : "transparent", border: side === "sell" ? `1px solid ${CYAN_SOFT}` : "1px solid transparent", color: side === "sell" ? CYAN : TEXT_DIM, fontSize: 16, fontWeight: 800, cursor: "pointer", transition: "all 0.2s" }}>Sell Crypto</button>
        <button onClick={() => setSide("buy")} style={{ flex: 1, padding: "14px 0", borderRadius: 12, background: side === "buy" ? `linear-gradient(180deg, rgba(0,229,255,0.15), rgba(0,229,255,0.05))` : "transparent", border: side === "buy" ? `1px solid ${CYAN_SOFT}` : "1px solid transparent", color: side === "buy" ? CYAN : TEXT_DIM, fontSize: 16, fontWeight: 800, cursor: "pointer", transition: "all 0.2s" }}>Buy Crypto</button>
      </div>

      <Field label="SELECT CRYPTO">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8, marginBottom: 28 }}>
          {coins.map(c => (
            <button key={c.id} onClick={() => setAsset(c.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, borderRadius: 14, background: asset === c.id ? "rgba(0,229,255,0.08)" : "rgba(8,12,26,0.5)", border: `1px solid ${asset === c.id ? CYAN : STROKE}`, cursor: "pointer", transition: "all 0.2s", textAlign: "left" }}>
              <img src={c.icon} alt={c.id} style={{ width: 28, height: 28 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: TEXT }}>{c.id}</div>
                <div style={{ fontSize: 12, color: TEXT_DIM }}>{c.name}</div>
              </div>
            </button>
          ))}
        </div>
      </Field>

      <Field label="FIAT CURRENCY">
        <select value={fiat} onChange={(e) => setFiat(e.target.value)} style={{ ...input, appearance: "none", height: 54, fontSize: 16, cursor: "pointer", marginTop: 8 }}>
          <option value="GBP">GBP - British Pound</option>
          <option value="EUR">EUR - Euro</option>
          <option value="USD">USD - US Dollar</option>
        </select>
      </Field>
    </>
  );
}

// Step 2: Pricing
function Step2({ priceType, setPriceType, fixedPrice, setFixedPrice, floatingPercent, setFloatingPercent, asset, fiat, marketRate }: any) {
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTicker(x => x + 1), 10000);
    return () => clearInterval(t);
  }, []);

  const rate = marketRate + (ticker % 5) * 12; // fake jitter

  return (
    <>
      <Heading title="Pricing Strategy" sub={`Set how your ${asset} price is calculated against the market rate.`} />
      
      <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
        <button onClick={() => setPriceType("fixed")} style={{ flex: 1, padding: 20, borderRadius: 16, background: priceType === "fixed" ? "rgba(0,229,255,0.08)" : "rgba(8,12,26,0.5)", border: `1px solid ${priceType === "fixed" ? CYAN : STROKE}`, cursor: "pointer", textAlign: "left" }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Fixed Price</div>
          <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 4 }}>Price stays locked</div>
        </button>
        <button onClick={() => setPriceType("floating")} style={{ flex: 1, padding: 20, borderRadius: 16, background: priceType === "floating" ? "rgba(0,229,255,0.08)" : "rgba(8,12,26,0.5)", border: `1px solid ${priceType === "floating" ? CYAN : STROKE}`, cursor: "pointer", textAlign: "left" }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Floating Price</div>
          <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 4 }}>Updates dynamically</div>
        </button>
      </div>

      <div style={{ padding: 20, borderRadius: 16, background: "rgba(8,12,26,0.4)", border: `1px solid ${STROKE}`, marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: TEXT_DIM, letterSpacing: "0.05em" }}>CURRENT MARKET RATE</div>
          <div key={ticker} style={{ fontSize: 22, fontWeight: 800, color: TEXT, marginTop: 4, animation: "chxFadeIn 0.3s ease" }}>£{rate.toLocaleString()} <span style={{ fontSize: 14, color: TEXT_DIM, fontWeight: 600 }}>/ {asset}</span></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: CYAN, fontSize: 12, fontWeight: 700 }}>
          <RefreshCcw size={14} className="chx-spin" /> Updates 10s
        </div>
      </div>

      {priceType === "fixed" ? (
        <Field label={`PRICE PER ${asset} IN ${fiat}`}>
          <div style={{ position: "relative", marginTop: 8 }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: TEXT_MUTE, fontWeight: 700 }}>£</span>
            <input value={fixedPrice} onChange={e => setFixedPrice(e.target.value)} type="number" placeholder={rate.toString()} style={{ ...input, height: 60, fontSize: 20, fontWeight: 800, paddingLeft: 36 }} />
          </div>
        </Field>
      ) : (
        <Field label="% ABOVE OR BELOW MARKET">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
            <button onClick={() => setFloatingPercent((p:any) => p.startsWith("-") ? p.replace("-","+") : p.startsWith("+") ? p.replace("+","-") : "-"+p)} style={{ width: 60, height: 60, borderRadius: 14, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}`, color: TEXT, fontSize: 24, cursor: "pointer" }}>{floatingPercent.startsWith("-") ? "-" : "+"}</button>
            <input value={floatingPercent.replace(/[+-]/,"")} onChange={e => setFloatingPercent((floatingPercent.startsWith("-")?"-":"+") + e.target.value)} type="number" style={{ ...input, height: 60, fontSize: 20, fontWeight: 800, flex: 1 }} />
            <span style={{ fontSize: 20, color: TEXT_MUTE, fontWeight: 800, position: "absolute", right: 20 }}>%</span>
          </div>
          <div style={{ marginTop: 16, padding: 16, borderRadius: 12, background: "rgba(0,229,255,0.06)", border: `1px solid ${CYAN_SOFT}`, fontSize: 14, color: CYAN }}>
            Your ad will show at <strong>£{(rate * (1 + parseFloat(floatingPercent||"0")/100)).toLocaleString(undefined, {maximumFractionDigits:2})} per {asset}</strong> ({floatingPercent}%)
          </div>
        </Field>
      )}

      <style>{`
        .chx-spin { animation: chxSpin 2s linear infinite; }
        @keyframes chxSpin { 100% { transform: rotate(360deg); } }
        @keyframes chxFadeIn { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}

// Step 3: Amount and limits
function Step3({ amount, setAmount, min, setMin, max, setMax, asset, fiat, marketRate, balance }: any) {
  const isError = amount && parseFloat(amount) > balance;
  const fiatEquivalent = amount ? (parseFloat(amount) * marketRate).toLocaleString() : "0.00";

  return (
    <>
      <Heading title="Amount & Limits" sub="Set the total amount you want to trade and order limits for buyers." />
      
      <Field label={`TOTAL AMOUNT (${asset})`}>
        <div style={{ position: "relative", marginTop: 8 }}>
          <input value={amount} onChange={e => setAmount(e.target.value)} type="number" placeholder={`e.g. 0.5`} style={{ ...input, height: 60, fontSize: 20, fontWeight: 800, border: isError ? "1px solid #EF4444" : input.border }} />
          <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: TEXT_DIM, fontWeight: 600 }}>≈ £{fiatEquivalent}</div>
        </div>
        {isError ? (
          <div style={{ color: "#EF4444", fontSize: 13, marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}><AlertTriangle size={14} /> Insufficient balance. You have {balance} {asset} available.</div>
        ) : (
          <div style={{ color: TEXT_DIM, fontSize: 13, marginTop: 8 }}>Available balance: {balance} {asset}</div>
        )}
        {isError && <div style={{ color: CYAN, fontSize: 13, marginTop: 4, cursor: "pointer", fontWeight: 700 }}>Deposit more {asset}</div>}
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 32 }}>
        <Field label={`MIN ORDER (${fiat})`}>
          <div style={{ position: "relative", marginTop: 8 }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: TEXT_MUTE, fontWeight: 700 }}>£</span>
            <input value={min} onChange={e => setMin(e.target.value)} type="number" style={{ ...input, height: 54, fontSize: 16, fontWeight: 700, paddingLeft: 32 }} />
          </div>
        </Field>
        <Field label={`MAX ORDER (${fiat})`}>
          <div style={{ position: "relative", marginTop: 8 }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: TEXT_MUTE, fontWeight: 700 }}>£</span>
            <input value={max} onChange={e => setMax(e.target.value)} type="number" style={{ ...input, height: 54, fontSize: 16, fontWeight: 700, paddingLeft: 32 }} />
          </div>
        </Field>
      </div>
    </>
  );
}

// Step 4: Payments
function Step4({ methods, setMethods, customMethod, setCustomMethod, payWindow, setPayWindow }: any) {
  const toggle = (m: PaymentMethod) => setMethods((cur: PaymentMethod[]) => cur.includes(m) ? cur.filter(x => x !== m) : [...cur, m]);
  
  return (
    <>
      <Heading title="Payment Methods" sub="Select all payment methods you accept." />
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 24 }}>
        {PAYMENT_METHODS.filter(m => m !== "Other").map((m) => {
          const active = methods.includes(m);
          return (
            <button key={m} onClick={() => toggle(m)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 14, background: active ? "rgba(0,229,255,0.08)" : "rgba(8,12,26,0.5)", border: `1px solid ${active ? CYAN : STROKE}`, cursor: "pointer", transition: "all 0.2s" }}>
              <PaymentIcon method={m} size={32} />
              <span style={{ fontSize: 14, fontWeight: 700, color: TEXT, flex: 1, textAlign: "left" }}>{m}</span>
              {active && <Check size={16} color={CYAN} />}
            </button>
          );
        })}
      </div>

      <Field label="PAYMENT WINDOW">
        <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
          {["15 mins", "30 mins", "45 mins", "60 mins", "90 mins"].map(w => (
            <button key={w} onClick={() => setPayWindow(w)} style={{ padding: "10px 16px", borderRadius: 99, background: payWindow === w ? CYAN : "rgba(8,12,26,0.6)", border: `1px solid ${payWindow === w ? CYAN : STROKE}`, color: payWindow === w ? "#000" : TEXT, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{w}</button>
          ))}
        </div>
        <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 10 }}>How long does the buyer have to pay before the order cancels?</div>
      </Field>
    </>
  );
}

// Step 5: Terms
function Step5({ terms, setTerms }: any) {
  const templates = [
    "Faster Payments only",
    "Include username as reference",
    "I release within 5 minutes",
    "No third party payments"
  ];

  return (
    <>
      <Heading title="Trade Instructions" sub="Write clear instructions for your buyers." />
      
      <div style={{ position: "relative" }}>
        <textarea value={terms} onChange={e => setTerms(e.target.value)} maxLength={500} placeholder="e.g. Send payment via Faster Payments only. Include your CoinHubX username as reference." style={{ ...input, height: 180, padding: 20, resize: "none", fontSize: 15, lineHeight: 1.5, alignItems: "flex-start" }} />
        <div style={{ position: "absolute", bottom: 16, right: 16, fontSize: 12, color: TEXT_MUTE }}>{terms.length}/500</div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: TEXT_DIM, marginBottom: 10 }}>SUGGESTED TEMPLATES</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {templates.map(t => (
            <button key={t} onClick={() => setTerms(prev => prev ? `${prev} ${t}.` : `${t}.`)} style={{ padding: "8px 14px", borderRadius: 8, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}`, color: TEXT_DIM, fontSize: 13, cursor: "pointer" }}>+ {t}</button>
          ))}
        </div>
      </div>
    </>
  );
}

// Step 6: Review
function Step6({ side, asset, fiat, priceType, fixedPrice, floatingPercent, amount, min, max, methods, payWindow, terms, marketRate }: any) {
  const rate = priceType === "fixed" ? parseFloat(fixedPrice) : marketRate * (1 + parseFloat(floatingPercent||"0")/100);

  return (
    <>
      <Heading title="Review & Publish" sub="Please confirm your ad details before publishing." />
      
      <div style={{ padding: 24, borderRadius: 16, background: "linear-gradient(180deg, rgba(13,20,40,0.8), rgba(8,12,28,0.9))", border: `1px solid ${CYAN_SOFT}`, boxShadow: `0 0 30px rgba(0,229,255,0.1)` }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${STROKE}` }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: TEXT_MUTE }}>AD TYPE</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: side === "sell" ? PURPLE : CYAN, marginTop: 4 }}>{side === "sell" ? "Selling" : "Buying"} {asset}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: TEXT_MUTE }}>PRICE</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: TEXT, marginTop: 4 }}>£{rate.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
            <div style={{ fontSize: 12, color: TEXT_DIM }}>{priceType === "fixed" ? "Fixed" : `Floating (${floatingPercent}%)`}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: TEXT_MUTE, marginBottom: 4 }}>TOTAL AMOUNT</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>{amount} {asset}</div>
            <div style={{ fontSize: 12, color: TEXT_DIM }}>≈ £{(parseFloat(amount)*rate).toLocaleString(undefined, {maximumFractionDigits:2})}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: TEXT_MUTE, marginBottom: 4 }}>ORDER LIMITS</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>£{min} – £{max}</div>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: TEXT_MUTE, marginBottom: 8 }}>PAYMENT METHODS</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {methods.map((m:any) => (
              <div key={m} style={{ padding: "6px 12px", borderRadius: 8, background: "rgba(0,0,0,0.3)", border: `1px solid ${STROKE}`, fontSize: 13, color: TEXT, display: "flex", alignItems: "center", gap: 6 }}><PaymentIcon method={m} size={16} /> {m}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24, padding: 16, borderRadius: 12, background: "rgba(0,0,0,0.2)", border: `1px solid ${STROKE}` }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: TEXT_MUTE, marginBottom: 6 }}>TRADE INSTRUCTIONS</div>
          <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{terms || "No instructions provided."}</div>
        </div>
      </div>

      <div style={{ marginTop: 24, padding: 16, borderRadius: 12, background: "rgba(234, 179, 8, 0.1)", border: "1px solid rgba(234, 179, 8, 0.3)", display: "flex", gap: 12 }}>
        <AlertTriangle color="#EAB308" size={24} style={{ flexShrink: 0 }} />
        <div style={{ fontSize: 13, color: "#FEF08A", lineHeight: 1.5 }}>
          Publishing this ad will immediately lock <strong>{amount} {asset}</strong> in escrow. You will not be able to withdraw or spend this {asset} until the ad is cancelled or fully completed.
        </div>
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, cursor: "pointer" }}>
        <input type="checkbox" style={{ width: 20, height: 20, accentColor: CYAN, cursor: "pointer" }} />
        <span style={{ fontSize: 14, color: TEXT }}>I confirm this ad complies with CoinHubX P2P Terms of Service</span>
      </label>
    </>
  );
}
