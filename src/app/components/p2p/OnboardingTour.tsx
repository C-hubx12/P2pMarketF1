import { useState } from "react";
import { X, ArrowRight, Check } from "lucide-react";
import { primaryBtnStyle, secondaryBtnStyle, TEXT, CYAN, STROKE, TEXT_DIM, TEXT_MUTE, PURPLE } from "../../p2p/shared";

export default function OnboardingTour() {
  const [step, setStep] = useState(1);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const next = () => setStep(s => Math.min(5, s + 1));
  const skip = () => setVisible(false);

  // Position mock based on steps
  const positions: Record<number, any> = {
    1: { top: "25%", left: "50%", transform: "translate(-50%, 0)", width: 600, height: 100 }, // Filter bar
    2: { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 800, height: 120 }, // Ad listing
    3: { top: "50%", right: "10%", transform: "translate(0, -50%)", width: 120, height: 44 }, // Buy button
    4: { top: "30%", right: "5%", transform: "translate(0, 0)", width: 300, height: 200 } // Escrow protection panel
  };

  const texts: Record<number, string> = {
    1: "Start here — select your coin and how much you want to spend.",
    2: "Choose a seller based on price, rating, and payment method.",
    3: "Tap Buy to start a secure escrow-protected trade.",
    4: "Your funds are always protected — crypto is only released when you confirm payment."
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, pointerEvents: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(5, 7, 15, 0.8)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", animation: "chxFadeInOverlay 0.5s ease-out" }} />

      {/* Skip button */}
      <button onClick={skip} style={{ position: "absolute", top: 24, right: 24, padding: "8px 16px", borderRadius: 99, background: "rgba(255,255,255,0.1)", border: `1px solid ${STROKE}`, color: TEXT, fontSize: 13, fontWeight: 700, cursor: "pointer", zIndex: 102 }}>Skip Tour</button>

      {step < 5 ? (
        <>
          {/* Spotlight mock */}
          <div style={{ position: "absolute", ...positions[step], borderRadius: 16, border: `2px solid ${CYAN}`, boxShadow: `0 0 0 9999px rgba(0,0,0,0.4), 0 0 30px rgba(0,229,255,0.4), inset 0 0 20px rgba(0,229,255,0.2)`, zIndex: 101, pointerEvents: "none", transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)" }} />

          {/* Tooltip Bubble */}
          <div style={{ position: "absolute", ...positions[step], zIndex: 102, pointerEvents: "auto", display: "flex", flexDirection: "column", transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
            <div style={{ position: "absolute", top: "calc(100% + 20px)", left: "50%", transform: "translateX(-50%)", width: 320, padding: 20, borderRadius: 16, background: "linear-gradient(180deg, rgba(16,24,52,0.96), rgba(8,12,30,0.98))", border: `1px solid ${CYAN}`, boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,229,255,0.15)" }}>
              <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%) rotate(45deg)", width: 16, height: 16, background: "rgba(16,24,52,0.96)", borderTop: `1px solid ${CYAN}`, borderLeft: `1px solid ${CYAN}` }} />
              
              <div style={{ fontSize: 11, fontWeight: 800, color: CYAN, letterSpacing: "0.1em", marginBottom: 8 }}>STEP {step} OF 4</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: TEXT, lineHeight: 1.4 }}>{texts[step]}</div>
              
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: 99, background: i === step ? CYAN : "rgba(255,255,255,0.2)" }} />
                  ))}
                </div>
                <button onClick={next} style={{ ...primaryBtnStyle(40), width: "auto", padding: "0 20px", fontSize: 14 }}>Next <ArrowRight size={14} /></button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div style={{ position: "relative", zIndex: 102, width: 400, padding: 40, borderRadius: 24, background: "linear-gradient(180deg, rgba(16,24,52,0.96), rgba(8,12,30,0.98))", border: `1px solid ${CYAN}`, boxShadow: "0 30px 60px rgba(0,0,0,0.6), 0 0 50px rgba(0,229,255,0.2)", textAlign: "center", animation: "chxPopIn 0.4s ease-out" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(180deg, rgba(0,229,255,0.2), rgba(0,229,255,0.05))", border: `2px solid ${CYAN}`, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 40px rgba(0,229,255,0.3)` }}>
            <Check size={40} strokeWidth={3} color={CYAN} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: TEXT, marginBottom: 12 }}>You're ready to trade.</div>
          <div style={{ fontSize: 15, color: TEXT_DIM, marginBottom: 32 }}>Good luck in the marketplace. Remember, never release crypto until you have confirmed payment in your bank app.</div>
          <button onClick={skip} style={{ ...primaryBtnStyle(54), background: `linear-gradient(180deg, #9FF5FF 0%, ${CYAN} 18%, #0096D6 55%, #2E7BFF 100%)` }}>Start Trading</button>
        </div>
      )}

      <style>{`
        @keyframes chxPopIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes chxFadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}