import { useState } from "react";
import { Shell } from "../../p2p/Shell";
import { Card, primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, TEXT_MUTE, CYAN, PURPLE, GREEN, STROKE, Field, input, IconTile, CYAN_SOFT, PURPLE_SOFT, BG_1, BG_2 } from "../../p2p/shared";
import { AlertTriangle, CheckCircle2, Search, Activity, ServerCrash, CreditCard, Clock, UserX, Ban, ShieldCheck, XCircle, Loader2 } from "lucide-react";

export default function DesignSystem() {
  const [loading, setLoading] = useState(false);
  
  return (
    <Shell back="/p2p">
      <div style={{ display: "flex", flexDirection: "column", gap: 56, maxWidth: 1000, margin: "0 auto", paddingBottom: 60 }}>
        <div>
          <div style={{ fontSize: 36, fontWeight: 800, color: TEXT, marginBottom: 12, letterSpacing: "-0.02em" }}>Design System</div>
          <div style={{ color: TEXT_DIM, fontSize: 16, lineHeight: 1.5, maxWidth: 600 }}>CoinHubX P2P premium component library. This page documents our colors, typography, component states, and edge-case illustrations to ensure a consistent, high-end user experience.</div>
        </div>

        {/* 1. COLORS & GLOWS */}
        <section>
          <div style={{ fontSize: 12, fontWeight: 800, color: TEXT_MUTE, letterSpacing: "0.15em", marginBottom: 20 }}>1. COLORS & GLOWS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
            <ColorSwatch name="Cyan Primary" hex={CYAN} glow={CYAN_SOFT} />
            <ColorSwatch name="Purple Accent" hex={PURPLE} glow={PURPLE_SOFT} />
            <ColorSwatch name="Green Success" hex={GREEN} glow="rgba(74,222,128,0.35)" />
            <ColorSwatch name="Red Error" hex="#EF4444" glow="rgba(239,68,68,0.35)" />
            <ColorSwatch name="Orange Warn" hex="#F59E0B" glow="rgba(245,158,11,0.35)" />
            <ColorSwatch name="Background 1" hex={BG_1} border />
            <ColorSwatch name="Background 2" hex={BG_2} border />
            <ColorSwatch name="Card Surface" hex="rgba(13,20,40,0.6)" border />
          </div>
        </section>

        {/* 2. TYPOGRAPHY */}
        <section>
          <div style={{ fontSize: 12, fontWeight: 800, color: TEXT_MUTE, letterSpacing: "0.15em", marginBottom: 20 }}>2. TYPOGRAPHY (SPACE GROTESK / INTER)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32, borderRadius: 24, background: "rgba(13,20,40,0.4)", border: `1px solid ${STROKE}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `1px solid ${STROKE}`, paddingBottom: 16 }}>
              <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", color: TEXT }}>Hero Heading</span>
              <span style={{ fontSize: 12, color: TEXT_MUTE }}>36px / 800 / -2%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `1px solid ${STROKE}`, paddingBottom: 16 }}>
              <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.01em", color: TEXT }}>Section Title</span>
              <span style={{ fontSize: 12, color: TEXT_MUTE }}>24px / 700 / -1%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `1px solid ${STROKE}`, paddingBottom: 16 }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: TEXT }}>Body Text (Default) - Used for primary content</span>
              <span style={{ fontSize: 12, color: TEXT_MUTE }}>16px / 500 / Normal</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `1px solid ${STROKE}`, paddingBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: TEXT_DIM }}>Body Text (Dim) - Used for secondary content</span>
              <span style={{ fontSize: 12, color: TEXT_MUTE }}>14px / 500 / Normal</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", color: TEXT_MUTE }}>MICRO CAPS LABEL</span>
              <span style={{ fontSize: 12, color: TEXT_MUTE }}>11px / 800 / 15%</span>
            </div>
          </div>
        </section>

        {/* 3. BUTTON STATES */}
        <section>
          <div style={{ fontSize: 12, fontWeight: 800, color: TEXT_MUTE, letterSpacing: "0.15em", marginBottom: 20 }}>3. BUTTON & INTERACTION STATES</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 11, color: TEXT_DIM, marginBottom: 4 }}>Default</div>
              <button style={primaryBtnStyle(48)}>Primary Action</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 11, color: TEXT_DIM, marginBottom: 4 }}>Hover (Filter: brightness(1.08))</div>
              <button style={{ ...primaryBtnStyle(48), filter: "brightness(1.08)" }}>Primary Hover</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 11, color: TEXT_DIM, marginBottom: 4 }}>Pressed (Scale: 0.97)</div>
              <button style={{ ...primaryBtnStyle(48), transform: "scale(0.97)" }}>Primary Pressed</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 11, color: TEXT_DIM, marginBottom: 4 }}>Loading (Spinner)</div>
              <button style={primaryBtnStyle(48)}><Loader2 size={16} className="chx-spin" /> Processing...</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 11, color: TEXT_DIM, marginBottom: 4 }}>Success</div>
              <button style={{ ...primaryBtnStyle(48), background: "linear-gradient(180deg, #B8FFD9 0%, #4ADE80 30%, #0A8B3D 75%, #054B20 100%)", boxShadow: `0 4px 12px rgba(74,222,128,0.25)` }}><CheckCircle2 size={16} /> Verified</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 11, color: TEXT_DIM, marginBottom: 4 }}>Disabled</div>
              <button disabled style={primaryBtnStyle(48, true)}>Disabled</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 11, color: TEXT_DIM, marginBottom: 4 }}>Secondary Default</div>
              <button style={secondaryBtnStyle(48)}>Secondary Action</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 11, color: TEXT_DIM, marginBottom: 4 }}>Secondary Disabled</div>
              <button disabled style={secondaryBtnStyle(48, true)}>Secondary Disabled</button>
            </div>
          </div>
        </section>

        {/* 4. INPUT STATES */}
        <section>
          <div style={{ fontSize: 12, fontWeight: 800, color: TEXT_MUTE, letterSpacing: "0.15em", marginBottom: 20 }}>4. INPUT STATES</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            <Field label="DEFAULT INPUT">
              <input placeholder="0.00" style={input} />
            </Field>
            <Field label="FOCUSED INPUT">
              <input placeholder="0.00" style={{ ...input, borderColor: CYAN, boxShadow: "0 0 0 3px rgba(0,229,255,0.15), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 12px rgba(0,229,255,0.08)" }} />
            </Field>
            <Field label="ERROR INPUT" hint="Amount exceeds available balance">
              <input placeholder="0.00" style={{ ...input, borderColor: "#EF4444", boxShadow: "0 0 0 3px rgba(239,68,68,0.15)" }} />
            </Field>
            <Field label="DISABLED INPUT">
              <input disabled value="Not editable" style={{ ...input, opacity: 0.5, cursor: "not-allowed" }} />
            </Field>
          </div>
        </section>

        {/* 5. EDGE CASES & ILLUSTRATIONS */}
        <section>
          <div style={{ fontSize: 12, fontWeight: 800, color: TEXT_MUTE, letterSpacing: "0.15em", marginBottom: 20 }}>5. EDGE CASES & CUSTOM ILLUSTRATIONS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            
            <Card style={{ padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(180deg, rgba(239,68,68,0.15), rgba(239,68,68,0.02))", border: `1px solid rgba(239,68,68,0.4)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px rgba(239,68,68,0.2)` }}>
                <ServerCrash size={28} color="#EF4444" />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Connection Lost</div>
                <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 6, lineHeight: 1.5 }}>Please check your internet connection and try again.</div>
              </div>
              <button style={{ ...secondaryBtnStyle(36), marginTop: 8 }}>Retry Connection</button>
            </Card>

            <Card style={{ padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(180deg, rgba(245,158,11,0.15), rgba(245,158,11,0.02))", border: `1px solid rgba(245,158,11,0.4)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px rgba(245,158,11,0.2)` }}>
                <AlertTriangle size={28} color="#F59E0B" />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Trade Disputed</div>
                <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 6, lineHeight: 1.5 }}>Our moderation team is reviewing this transaction.</div>
              </div>
              <button style={{ ...secondaryBtnStyle(36), marginTop: 8 }}>View Details</button>
            </Card>

            <Card style={{ padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(180deg, rgba(139,92,246,0.15), rgba(139,92,246,0.02))", border: `1px solid ${PURPLE_SOFT}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px rgba(139,92,246,0.2)` }}>
                <CreditCard size={28} color={PURPLE} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>No Payment Methods</div>
                <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 6, lineHeight: 1.5 }}>You must add a payment method to start trading.</div>
              </div>
              <button style={{ ...secondaryBtnStyle(36), marginTop: 8 }}>Add Payment Method</button>
            </Card>

            <Card style={{ padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(180deg, rgba(0,229,255,0.15), rgba(0,229,255,0.02))", border: `1px solid ${CYAN_SOFT}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px rgba(0,229,255,0.2)` }}>
                <Activity size={28} color={CYAN} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Escrow Delay</div>
                <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 6, lineHeight: 1.5 }}>Blockchain network is congested. Release may take longer.</div>
              </div>
              <button style={{ ...secondaryBtnStyle(36), marginTop: 8 }}>Check Status</button>
            </Card>

            <Card style={{ padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(180deg, rgba(16,24,52,0.9), rgba(8,12,30,0.9))", border: `1px solid ${STROKE}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px rgba(0,0,0,0.5)` }}>
                <Ban size={28} color={TEXT_MUTE} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Trade Cancelled</div>
                <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 6, lineHeight: 1.5 }}>The counterparty failed to complete the payment in time.</div>
              </div>
              <button style={{ ...secondaryBtnStyle(36), marginTop: 8 }}>Find Another Offer</button>
            </Card>

            <Card style={{ padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(180deg, rgba(13,20,40,0.8), rgba(8,12,28,0.9))", border: `1px solid ${STROKE}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px rgba(0,0,0,0.5)` }}>
                <UserX size={28} color={TEXT_MUTE} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Seller Offline</div>
                <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 6, lineHeight: 1.5 }}>This seller has not been active recently. Trades may be delayed.</div>
              </div>
              <button style={{ ...secondaryBtnStyle(36), marginTop: 8 }}>View Online Sellers</button>
            </Card>

            <Card style={{ padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(180deg, rgba(239,68,68,0.15), rgba(239,68,68,0.02))", border: `1px solid rgba(239,68,68,0.4)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px rgba(239,68,68,0.2)` }}>
                <XCircle size={28} color="#EF4444" />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Failed Confirmation</div>
                <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 6, lineHeight: 1.5 }}>We could not verify your payment via Open Banking.</div>
              </div>
              <button style={{ ...secondaryBtnStyle(36), marginTop: 8 }}>Upload Receipt</button>
            </Card>

            <Card style={{ padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(180deg, rgba(0,229,255,0.1), rgba(0,229,255,0.02))", border: `1px solid ${CYAN_SOFT}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px rgba(0,229,255,0.15)` }}>
                <span style={{ fontSize: 24 }}>📭</span>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>No Active Ads</div>
                <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 6, lineHeight: 1.5 }}>Create your first ad and start trading securely with verified users.</div>
              </div>
              <button style={{ ...secondaryBtnStyle(36), marginTop: 8 }}>Post New Ad</button>
            </Card>

            <Card style={{ padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(180deg, rgba(74,222,128,0.15), rgba(74,222,128,0.02))", border: `1px solid rgba(74,222,128,0.4)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px rgba(74,222,128,0.2)` }}>
                <ShieldCheck size={28} color={GREEN} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Verification Required</div>
                <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 6, lineHeight: 1.5 }}>To trade over £5,000, please complete advanced KYC.</div>
              </div>
              <button style={{ ...secondaryBtnStyle(36), marginTop: 8 }}>Verify Identity</button>
            </Card>

          </div>
        </section>

      </div>
    </Shell>
  );
}

function ColorSwatch({ name, hex, glow, border }: { name: string; hex: string; glow?: string; border?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ height: 80, borderRadius: 16, background: hex, boxShadow: glow ? `0 0 24px ${glow}` : "none", border: border ? `1px solid ${STROKE}` : "none" }} />
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>{name}</div>
        <div style={{ fontSize: 11, color: TEXT_MUTE }}>{hex}</div>
      </div>
    </div>
  );
}