import * as React from "react";
import { Link } from "react-router";
import { ShieldLogo, Card, TEXT, TEXT_DIM, TEXT_MUTE, CYAN, BG_1, BG_2, STROKE } from "../../p2p/shared";
import { EscrowShield3D } from "../../p2p/PaymentSelect";

export function AuthShell({ step, total, title, sub, children, side }: { step: number; total: number; title: string; sub?: string; children: React.ReactNode; side?: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: `radial-gradient(1100px 700px at 80% -10%, rgba(0,229,255,0.10), transparent), radial-gradient(900px 600px at -10% 110%, rgba(139,92,246,0.10), transparent), linear-gradient(180deg, ${BG_1}, ${BG_2})`, color: TEXT, fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif", padding: "32px 22px 60px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Link to="/p2p" style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none", marginBottom: 26 }}>
          <ShieldLogo size={36} />
          <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "0.02em", color: TEXT }}>COINHUBX</div>
          <div style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, color: TEXT_DIM, letterSpacing: "0.18em" }}>SECURE ONBOARDING</div>
        </Link>

        <div className="chx-auth-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 22 }}>
          <Card accent="cyan" bright style={{ padding: 30 }}>
            <ProgressDots step={step} total={total} />
            <div style={{ marginTop: 18, fontSize: 22, fontWeight: 800, color: TEXT, letterSpacing: "-0.01em" }}>{title}</div>
            {sub && <div style={{ marginTop: 6, fontSize: 13, color: TEXT_DIM, lineHeight: 1.5, maxWidth: 480 }}>{sub}</div>}
            <div style={{ marginTop: 22 }}>{children}</div>
          </Card>

          <div>
            <Card accent="purple" bright style={{ padding: 22, position: "sticky", top: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <EscrowShield3D size={42} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: TEXT }}>Escrow protected</div>
                  <div style={{ fontSize: 11.5, color: TEXT_DIM }}>Funds locked end-to-end</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: TEXT_DIM, lineHeight: 1.55 }}>Every trade on CoinHubX is protected. We verify identity to keep escrow tight, dispute-proof, and fully recoverable.</div>
              {side && <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${STROKE}` }}>{side}</div>}
              <div style={{ marginTop: 16, fontSize: 10.5, color: TEXT_MUTE, letterSpacing: "0.14em" }}>STEP {step} OF {total}</div>
            </Card>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .chx-auth-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function ProgressDots({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i < step ? `linear-gradient(90deg, ${CYAN}, #2E7BFF)` : "rgba(120,170,220,0.15)", boxShadow: i < step ? `0 0 8px rgba(0,229,255,0.5)` : "none", transition: "all .25s ease" }} />
      ))}
    </div>
  );
}
