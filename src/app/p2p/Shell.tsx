import * as React from "react";
import { Link, useNavigate } from "react-router";
import { Bell, Menu, ChevronLeft } from "lucide-react";
import { BG_1, BG_2, TEXT, TEXT_DIM, STROKE, ShieldLogo, Pill, RoundBtn } from "./shared";

export function Shell({ children, back = "/p2p" }: { children: React.ReactNode; back?: string }) {
  const navigate = useNavigate();
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: `radial-gradient(700px 400px at 0% -5%, rgba(0,229,255,0.16), transparent 60%), radial-gradient(700px 400px at 100% 5%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(800px 500px at 50% 110%, rgba(46,123,255,0.14), transparent 60%), linear-gradient(180deg, ${BG_1} 0%, ${BG_2} 50%, ${BG_1} 100%)`, color: TEXT, fontFamily: "'Space Grotesk', 'Inter', system-ui, -apple-system, sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", left: "-10%", width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, rgba(0,229,255,0.18), transparent 70%)`, filter: "blur(40px)", animation: "chxFloat 9s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "40%", right: "-12%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, rgba(139,92,246,0.16), transparent 70%)`, filter: "blur(40px)", animation: "chxFloat 11s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)`, backgroundSize: "50px 50px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000, transparent)", WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000, transparent)" }} />
      </div>
      <style>{`
        @keyframes chxFloat { 0%,100% { transform: translate(0,0) } 50% { transform: translate(20px,-30px) } }
        @keyframes chxPulse { 0%,100% { opacity: 0.55; transform: scale(1) } 50% { opacity: 1; transform: scale(1.06) } }
        @keyframes chxSpin { to { transform: rotate(360deg) } }
        @keyframes chxCheck { 0% { stroke-dashoffset: 60; opacity: 0 } 60% { opacity: 1 } 100% { stroke-dashoffset: 0; opacity: 1 } }
        @keyframes chxRing { 0% { transform: scale(0.6); opacity: 0.9 } 100% { transform: scale(1.6); opacity: 0 } }
        @keyframes chxShimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
        .chx-shell-main { width: 100%; max-width: 600px; margin: 0 auto; padding: 24px 18px 80px; position: relative; z-index: 1; display: flex; flex-direction: column; gap: 22px; }
        .chx-grid-2 { display: grid; grid-template-columns: 1fr; gap: 18px; }
        @media (min-width: 768px) {
          .chx-shell-main { max-width: 980px; padding: 32px 24px 80px; }
          .chx-grid-2 { grid-template-columns: 1.2fr 1fr; gap: 20px; align-items: start; }
        }
        @media (min-width: 1024px) { .chx-shell-main { max-width: 1240px; padding: 32px 32px 100px; } .chx-grid-2 { grid-template-columns: 1.4fr 1fr; gap: 22px; } }
      `}</style>

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", background: "rgba(5,7,15,0.7)", borderBottom: `1px solid ${STROKE}` }}>
        <div style={{ width: "100%", maxWidth: 1240, margin: "0 auto", padding: "12px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <Link to={back} style={{ display: "flex", alignItems: "center", gap: 4, color: TEXT_DIM, textDecoration: "none", fontSize: 13, fontWeight: 600, padding: "6px 10px 6px 6px", borderRadius: 99, border: `1px solid ${STROKE}`, background: "rgba(13,20,40,0.6)" }}>
            <ChevronLeft size={16} /> Back
          </Link>
          <Link to="/p2p" style={{ display: "flex", alignItems: "center", gap: 10, color: TEXT, textDecoration: "none" }}>
            <ShieldLogo size={36} />
            <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.06em" }}>COINHUBX</span>
          </Link>
          <div style={{ flex: 1 }} />
          <Pill><span style={{ width: 6, height: 6, borderRadius: 99, background: "#4ADE80", boxShadow: "0 0 8px #4ADE80" }} />Live</Pill>
          <RoundBtn glow><Bell size={16} color={TEXT_DIM} /></RoundBtn>
          <RoundBtn onClick={() => navigate("/p2p")}><Menu size={16} color={TEXT_DIM} /></RoundBtn>
        </div>
      </header>

      <main className="chx-shell-main">{children}</main>
    </div>
  );
}
