import { useState } from "react";
import { Shell } from "../../p2p/Shell";
import { Card, primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, TEXT_MUTE, STROKE, CYAN, input, Field } from "../../p2p/shared";
import { PaymentMethod, PAYMENT_METHODS, PaymentIcon } from "../../p2p/PaymentSelect";
import { Check, Trash2, ShieldBan, Heart, ArrowRight } from "lucide-react";

export default function P2PSettings() {
  const [fiat, setFiat] = useState("GBP");
  const [methods, setMethods] = useState<PaymentMethod[]>(["Bank Transfer"]);
  const [autoReply, setAutoReply] = useState("Thanks for your order! Please use your CoinHubX username as the reference.");
  const [notifs, setNotifs] = useState({ newOrder: true, chatMsg: true, orderCancel: false, adPause: true });

  const toggleMethod = (m: PaymentMethod) => setMethods(cur => cur.includes(m) ? cur.filter(x => x !== m) : [...cur, m]);

  return (
    <Shell back="/p2p/profile/me">
      <div style={{ maxWidth: 760, margin: "0 auto", paddingBottom: 60 }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: TEXT }}>P2P Settings</div>
          <div style={{ marginTop: 6, fontSize: 14, color: TEXT_DIM }}>Manage your defaults, auto-replies, and preferences.</div>
        </div>

        <div style={{ display: "grid", gap: 24 }}>
          {/* Defaults */}
          <Card className="chx-card-hover" style={{ padding: 32 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginBottom: 20 }}>Trading Defaults</div>
            <Field label="DEFAULT FIAT CURRENCY">
              <select value={fiat} onChange={e => setFiat(e.target.value)} style={{ ...input, appearance: "none", marginTop: 8, height: 50 }}>
                <option value="GBP">GBP - British Pound</option>
                <option value="EUR">EUR - Euro</option>
                <option value="USD">USD - US Dollar</option>
              </select>
            </Field>

            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: TEXT_MUTE, letterSpacing: "0.12em", marginBottom: 8 }}>DEFAULT PAYMENT METHODS</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
                {PAYMENT_METHODS.filter(m => m !== "Other").map((m) => {
                  const active = methods.includes(m);
                  return (
                    <button key={m} onClick={() => toggleMethod(m)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px", borderRadius: 12, background: active ? "rgba(0,229,255,0.08)" : "rgba(8,12,26,0.5)", border: `1px solid ${active ? CYAN : STROKE}`, cursor: "pointer" }}>
                      <PaymentIcon method={m} size={24} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: TEXT, flex: 1, textAlign: "left" }}>{m}</span>
                      {active && <Check size={14} color={CYAN} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Auto Reply */}
          <Card className="chx-card-hover" style={{ padding: 32 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginBottom: 20 }}>Auto-reply Message</div>
            <div style={{ position: "relative" }}>
              <textarea value={autoReply} onChange={e => setAutoReply(e.target.value)} maxLength={500} placeholder="Set an automatic first message sent to every buyer when a new trade starts." style={{ ...input, height: 140, padding: 16, resize: "none", fontSize: 14, lineHeight: 1.5 }} />
              <div style={{ position: "absolute", bottom: 16, right: 16, fontSize: 12, color: TEXT_MUTE }}>{autoReply.length}/500</div>
            </div>
            <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 10 }}>This message will be sent instantly when a buyer opens a trade on your ad.</div>
          </Card>

          {/* Notifications */}
          <Card className="chx-card-hover" style={{ padding: 32 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginBottom: 20 }}>Notification Preferences</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <ToggleRow label="New Orders" sub="When someone starts a trade with you" active={notifs.newOrder} onToggle={() => setNotifs(n => ({...n, newOrder: !n.newOrder}))} />
              <ToggleRow label="Chat Messages" sub="When you receive a new message in a trade" active={notifs.chatMsg} onToggle={() => setNotifs(n => ({...n, chatMsg: !n.chatMsg}))} />
              <ToggleRow label="Order Cancellations" sub="When a trade is cancelled or expires" active={notifs.orderCancel} onToggle={() => setNotifs(n => ({...n, orderCancel: !n.orderCancel}))} />
              <ToggleRow label="Ad Paused Automatically" sub="When an ad is paused due to low balance" active={notifs.adPause} onToggle={() => setNotifs(n => ({...n, adPause: !n.adPause}))} />
            </div>
          </Card>

          {/* Lists */}
          <Card className="chx-card-hover" style={{ padding: 32 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><ShieldBan size={20} color="#EF4444" /> <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Blocked Users</span></div>
              <span style={{ fontSize: 13, color: TEXT_DIM }}>1 user</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, borderRadius: 12, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1E1B4B", color: "#818CF8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800 }}>T</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>TraderX99</div>
                  <div style={{ fontSize: 12, color: TEXT_DIM }}>Blocked on 12 June</div>
                </div>
              </div>
              <button style={{ ...secondaryBtnStyle(32), fontSize: 12 }}>Unblock</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 40, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Heart size={20} color="#F43F5E" /> <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Favourite Sellers</span></div>
              <span style={{ fontSize: 13, color: TEXT_DIM }}>1 user</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, borderRadius: 12, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#064E3B", color: "#34D399", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800 }}>V</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>VerifiedTrader</div>
                  <div style={{ fontSize: 12, color: TEXT_DIM }}>1,240 trades</div>
                </div>
              </div>
              <button style={{ ...secondaryBtnStyle(32), fontSize: 12 }}><Trash2 size={14} color="#EF4444" /></button>
            </div>
          </Card>

          {/* Payment Method Profiles */}
          <Card className="chx-card-hover" style={{ padding: 32 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Payment Details</div>
              <button style={{ ...secondaryBtnStyle(36), fontSize: 13, background: "rgba(8,12,26,0.6)" }}>+ Add New</button>
            </div>
            <div style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 20 }}>Save your bank and app details here to auto-fill trade instructions.</div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ padding: 16, borderRadius: 12, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <PaymentIcon method="Bank Transfer" size={20} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>Monzo Bank</span>
                  </div>
                  <button style={{ color: CYAN, background: "none", border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Edit</button>
                </div>
                <div style={{ fontSize: 13, color: TEXT_MUTE }}>Sort code: <span style={{ color: TEXT }}>04-00-04</span></div>
                <div style={{ fontSize: 13, color: TEXT_MUTE, marginTop: 4 }}>Account: <span style={{ color: TEXT }}>12345678</span></div>
                <div style={{ fontSize: 13, color: TEXT_MUTE, marginTop: 4 }}>Name: <span style={{ color: TEXT }}>John Doe</span></div>
              </div>
            </div>
          </Card>

          <button style={{ ...primaryBtnStyle(56) }}>Save Settings</button>
        </div>
      </div>
    </Shell>
  );
}

function ToggleRow({ label, sub, active, onToggle }: any) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{label}</div>
        <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 2 }}>{sub}</div>
      </div>
      <button onClick={onToggle} style={{ width: 48, height: 26, borderRadius: 99, background: active ? CYAN : "rgba(8,12,26,0.8)", border: `1px solid ${active ? CYAN : STROKE}`, position: "relative", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)", boxShadow: active ? `0 0 16px rgba(0,229,255,0.4)` : "none" }}>
        <div style={{ position: "absolute", top: 2, left: active ? 24 : 2, width: 20, height: 20, borderRadius: "50%", background: active ? "#000" : TEXT_MUTE, transition: "left 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }} />
      </button>
    </div>
  );
}
