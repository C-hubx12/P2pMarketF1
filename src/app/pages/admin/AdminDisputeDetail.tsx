import { useState } from "react";
import { useParams, Link } from "react-router";
import { ChevronLeft, ShieldAlert, Clock, AlertTriangle, ArrowRightLeft, FileText, CheckCircle2, Lock, Unlock, Gavel, FileLock, XCircle, Send, Plus, Search } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, TEXT, TEXT_DIM, TEXT_MUTE, CYAN, PURPLE, STROKE, GREEN, secondaryBtnStyle, primaryBtnStyle, input } from "../../p2p/shared";

// Mock data
const mockTrade = {
  id: "CHX-9F2A",
  status: "DISPUTED",
  buyer: "CryptoKing",
  seller: "CoinSwap",
  amount: "1,200",
  asset: "USDT",
  fiat: "1,200.00 USD",
  method: "Bank Transfer",
  reason: "Payment sent but not credited",
  raisedBy: "Buyer",
  timeElapsed: "14m ago",
  sla: "Safe (23h remaining)",
  risk: "High - 3rd dispute this month for seller",
};

const mockChat = [
  { id: 1, sender: "system", text: "Trade started. Escrow locked 1,200 USDT.", time: "10:00" },
  { id: 2, sender: "buyer", text: "Hi, sending payment now.", time: "10:02" },
  { id: 3, sender: "buyer", text: "Sent. Please check.", time: "10:05" },
  { id: 4, sender: "system", text: "Buyer marked payment as sent.", time: "10:05" },
  { id: 5, sender: "seller", text: "I haven't received anything yet. Can you send the receipt?", time: "10:15" },
  { id: 6, sender: "buyer", text: "Uploading receipt...", time: "10:16" },
  { id: 7, sender: "buyer", isProof: true, text: "receipt_1001191663.jpg", time: "10:17" },
  { id: 8, sender: "seller", text: "The name on the receipt doesn't match your profile name.", time: "10:20" },
  { id: 9, sender: "system", text: "Buyer raised a dispute. Escrow locked for admin review.", time: "10:45" },
];

export default function AdminDisputeDetail() {
  const { id } = useParams();
  const [adminNote, setAdminNote] = useState("");
  const [rulingModal, setRulingModal] = useState<"buyer" | "seller" | null>(null);

  const t = mockTrade;

  return (
    <Shell back="/admin/disputes">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, marginBottom: 8 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 99, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: "#F87171", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: "#F87171", boxShadow: "0 0 8px #F87171" }} />
            ADMIN · DISPUTE REVIEW
          </div>
          <div style={{ marginTop: 12, fontSize: 24, fontWeight: 800, color: TEXT, display: "flex", alignItems: "center", gap: 12, letterSpacing: "-0.02em" }}>
            Case: {id || t.id}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ ...secondaryBtnStyle(40), fontSize: 13, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.4)", color: "#F87171" }}>
            <Lock size={14} /> Freeze User
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
        {/* Desktop 3-panel layout */}
        <style>{`
          @media (min-width: 1024px) {
            .dispute-grid { display: grid; grid-template-columns: 280px 1fr 320px; gap: 24px; align-items: start; }
          }
        `}</style>
        
        <div className="dispute-grid" style={{ display: "grid", gap: 20 }}>
          
          {/* Panel 1: Trade Summary */}
          <Card accent="none" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: TEXT, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <FileText size={16} color={CYAN} /> Trade Summary
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: TEXT_MUTE, fontWeight: 700, marginBottom: 4 }}>DISPUTE REASON</div>
                <div style={{ fontSize: 13, color: "#FCA5A5", fontWeight: 600, padding: 8, background: "rgba(239,68,68,0.1)", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)" }}>
                  {t.reason}
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, color: TEXT_MUTE, fontWeight: 700, marginBottom: 4 }}>BUYER</div>
                  <div style={{ fontSize: 14, color: TEXT, fontWeight: 700 }}>{t.buyer}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: TEXT_MUTE, fontWeight: 700, marginBottom: 4 }}>SELLER</div>
                  <div style={{ fontSize: 14, color: TEXT, fontWeight: 700 }}>{t.seller}</div>
                </div>
              </div>

              <div style={{ height: 1, background: STROKE, margin: "4px 0" }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, color: TEXT_MUTE, fontWeight: 700, marginBottom: 4 }}>CRYPTO</div>
                  <div style={{ fontSize: 16, color: CYAN, fontWeight: 800 }}>{t.amount} {t.asset}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: TEXT_MUTE, fontWeight: 700, marginBottom: 4 }}>FIAT</div>
                  <div style={{ fontSize: 14, color: TEXT, fontWeight: 700 }}>{t.fiat}</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: TEXT_MUTE, fontWeight: 700, marginBottom: 4 }}>PAYMENT METHOD</div>
                <div style={{ fontSize: 13, color: TEXT }}>{t.method}</div>
              </div>

              <div style={{ height: 1, background: STROKE, margin: "4px 0" }} />

              <div>
                <div style={{ fontSize: 11, color: TEXT_MUTE, fontWeight: 700, marginBottom: 4 }}>SLA TIMER</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: GREEN, fontWeight: 700, padding: "4px 8px", background: "rgba(74,222,128,0.1)", borderRadius: 6, border: "1px solid rgba(74,222,128,0.3)" }}>
                  <Clock size={12} /> {t.sla}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: TEXT_MUTE, fontWeight: 700, marginBottom: 4 }}>RISK FLAGS</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#FCD34D", fontWeight: 600, padding: "6px 10px", background: "rgba(245,158,11,0.1)", borderRadius: 8, border: "1px solid rgba(245,158,11,0.3)", lineHeight: 1.4 }}>
                  <AlertTriangle size={14} style={{ flexShrink: 0 }} /> {t.risk}
                </div>
              </div>
            </div>
          </Card>

          {/* Panel 2: Evidence & Chat */}
          <Card accent="purple" style={{ padding: 0, display: "flex", flexDirection: "column", height: "calc(100vh - 180px)", minHeight: 600 }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${STROKE}`, background: "rgba(0,0,0,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: TEXT, display: "flex", alignItems: "center", gap: 8 }}>
                <Search size={16} color={PURPLE} /> Evidence & Transcript
              </h3>
              <div style={{ fontSize: 12, color: TEXT_DIM, fontWeight: 600 }}>9 Messages</div>
            </div>
            
            <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              {mockChat.map((msg) => (
                <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.sender === "system" ? "center" : msg.sender === "buyer" ? "flex-start" : "flex-end", width: "100%" }}>
                  {msg.sender === "system" ? (
                    <div style={{ padding: "6px 12px", background: "rgba(255,255,255,0.05)", borderRadius: 99, fontSize: 11, color: TEXT_DIM, fontWeight: 600, border: `1px solid ${STROKE}` }}>
                      {msg.text}
                    </div>
                  ) : (
                    <div style={{ maxWidth: "80%" }}>
                      <div style={{ fontSize: 11, color: TEXT_MUTE, marginBottom: 4, textAlign: msg.sender === "buyer" ? "left" : "right" }}>
                        {msg.sender === "buyer" ? "Buyer" : "Seller"} • {msg.time}
                      </div>
                      <div style={{ padding: "12px 16px", borderRadius: 16, background: msg.sender === "buyer" ? "rgba(13,20,40,0.8)" : "rgba(139,92,246,0.15)", border: `1px solid ${msg.sender === "buyer" ? STROKE : "rgba(139,92,246,0.3)"}`, color: TEXT, fontSize: 13, borderBottomLeftRadius: msg.sender === "buyer" ? 4 : 16, borderBottomRightRadius: msg.sender === "seller" ? 4 : 16 }}>
                        {msg.isProof ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <FileText size={20} color={CYAN} />
                            <a href="#" style={{ color: CYAN, textDecoration: "underline", fontWeight: 600 }}>{msg.text}</a>
                          </div>
                        ) : (
                          msg.text
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ padding: 16, borderTop: `1px solid ${STROKE}`, background: "rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", gap: 10 }}>
                <input value={adminNote} onChange={(e) => setAdminNote(e.target.value)} placeholder="Type admin note or request info..." style={{ ...input, flex: 1, height: 44, borderRadius: 12 }} />
                <button style={{ ...primaryBtnStyle(44), width: "auto", padding: "0 20px", borderRadius: 12 }}>
                  <Send size={16} /> Send
                </button>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button style={{ ...secondaryBtnStyle(32), fontSize: 11, flex: 1 }}><Plus size={14} /> Message Buyer</button>
                <button style={{ ...secondaryBtnStyle(32), fontSize: 11, flex: 1 }}><Plus size={14} /> Message Seller</button>
              </div>
            </div>
          </Card>

          {/* Panel 3: Escrow & Ruling */}
          <Card accent="none" style={{ padding: 0, display: "flex", flexDirection: "column", height: "calc(100vh - 180px)", minHeight: 600 }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${STROKE}`, background: "rgba(0,0,0,0.2)" }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: TEXT, display: "flex", alignItems: "center", gap: 8 }}>
                <FileLock size={16} color="#F59E0B" /> Escrow & Ruling
              </h3>
            </div>
            
            <div style={{ padding: 20, flex: 1 }}>
              <div style={{ fontSize: 11, color: TEXT_MUTE, fontWeight: 700, marginBottom: 12 }}>ESCROW LEDGER</div>
              <div style={{ padding: 12, background: "rgba(13,20,40,0.6)", borderRadius: 12, border: `1px solid ${STROKE}`, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12 }}>
                  <span style={{ color: TEXT_DIM }}>Status</span>
                  <span style={{ color: "#F59E0B", fontWeight: 700 }}>LOCKED (DISPUTED)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12 }}>
                  <span style={{ color: TEXT_DIM }}>Amount</span>
                  <span style={{ color: TEXT, fontWeight: 700 }}>1,200 USDT</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                  <span style={{ color: TEXT_DIM }}>TxID</span>
                  <span style={{ color: CYAN, fontFamily: "monospace" }}>0x8f...2a1b</span>
                </div>
              </div>

              <div style={{ fontSize: 11, color: TEXT_MUTE, fontWeight: 700, marginBottom: 12 }}>ADMIN RULING CONTROLS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button onClick={() => setRulingModal("buyer")} style={{ position: "relative", width: "100%", padding: "16px", borderRadius: 12, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.4)", color: "#6EE7B7", fontSize: 14, fontWeight: 800, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.1)"; }}>
                  <Unlock size={18} /> Release to Buyer
                </button>
                
                <button onClick={() => setRulingModal("seller")} style={{ position: "relative", width: "100%", padding: "16px", borderRadius: 12, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.4)", color: "#FCD34D", fontSize: 14, fontWeight: 800, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,158,11,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(245,158,11,0.1)"; }}>
                  <ArrowRightLeft size={18} /> Return to Seller
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Ruling Modal */}
      {rulingModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }} onClick={() => setRulingModal(null)} />
          <Card bright style={{ position: "relative", width: "100%", maxWidth: 480, padding: 32, border: `1px solid ${rulingModal === "buyer" ? "rgba(16,185,129,0.5)" : "rgba(245,158,11,0.5)"}`, boxShadow: `0 0 40px ${rulingModal === "buyer" ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)"}` }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: TEXT, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <Gavel size={24} color={rulingModal === "buyer" ? GREEN : "#F59E0B"} /> 
              Confirm Ruling: {rulingModal === "buyer" ? "Release to Buyer" : "Return to Seller"}
            </h2>
            <div style={{ padding: 16, background: "rgba(0,0,0,0.3)", borderRadius: 12, border: `1px solid ${STROKE}`, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: TEXT_DIM, fontSize: 13 }}>Action</span>
                <span style={{ color: TEXT, fontSize: 13, fontWeight: 700 }}>Move {t.amount} {t.asset}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: TEXT_DIM, fontSize: 13 }}>Destination</span>
                <span style={{ color: rulingModal === "buyer" ? GREEN : "#F59E0B", fontSize: 13, fontWeight: 700 }}>{rulingModal === "buyer" ? t.buyer : t.seller}</span>
              </div>
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: TEXT_DIM, marginBottom: 8, display: "block" }}>Admin Ruling Reason (Required)</label>
              <textarea placeholder="Explain the evidence that supports this ruling..." style={{ ...input, height: 80, padding: 12, resize: "none" }} />
            </div>

            <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", marginBottom: 24, padding: 12, background: "rgba(239,68,68,0.1)", borderRadius: 8, border: "1px solid rgba(239,68,68,0.3)" }}>
              <input type="checkbox" style={{ marginTop: 2 }} />
              <span style={{ fontSize: 12, color: TEXT, lineHeight: 1.5, fontWeight: 600 }}>I confirm the evidence supports {rulingModal === "buyer" ? "releasing crypto to the buyer" : "returning crypto to the seller"}. This action is irreversible.</span>
            </label>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setRulingModal(null)} style={{ ...secondaryBtnStyle(48), flex: 1 }}>Cancel</button>
              <button style={{ ...primaryBtnStyle(48), flex: 1, background: rulingModal === "buyer" ? GREEN : "#F59E0B", border: "none", boxShadow: "none" }}>
                Confirm Ruling
              </button>
            </div>
          </Card>
        </div>
      )}
    </Shell>
  );
}