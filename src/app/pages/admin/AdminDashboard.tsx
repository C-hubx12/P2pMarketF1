import { useState } from "react";
import { Link } from "react-router";
import { Users, Activity, CheckCircle2, AlertTriangle, ShieldAlert, BarChart3, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, IconTile, TEXT, TEXT_DIM, TEXT_MUTE, CYAN, PURPLE, GREEN, STROKE, pillStyle } from "../../p2p/shared";

type StatCard = { label: string; value: string; icon: any; tone: "cyan" | "purple" | "blue" | "red"; sub?: string };

export default function AdminDashboard() {
  const stats: StatCard[] = [
    { label: "Active Ads", value: "1,248", icon: Activity, tone: "cyan", sub: "+12% today" },
    { label: "Active Trades", value: "342", icon: Users, tone: "purple", sub: "$84,200 in escrow" },
    { label: "Completed (24h)", value: "8,405", icon: CheckCircle2, tone: "blue", sub: "99.2% success rate" },
    { label: "Open Disputes", value: "14", icon: AlertTriangle, tone: "red", sub: "3 SLA breached" },
  ];

  const recentDisputes = [
    { id: "D-9A21", buyer: "CryptoKing", seller: "CoinSwap", amount: "$1,200", reason: "Payment sent but not credited", time: "14 mins ago", sla: "safe" },
    { id: "D-4F11", buyer: "FiatBridge", seller: "MoonHODL", amount: "$450", reason: "Counterparty unresponsive", time: "22 hours ago", sla: "breached" },
    { id: "D-7B88", buyer: "NewTrader99", seller: "VerifiedPro", amount: "$5,000", reason: "Suspected fake payment proof", time: "2 hours ago", sla: "warning" },
  ];

  return (
    <Shell back="/preview">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, marginBottom: 8 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 99, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: "#F87171", fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: "#F87171", boxShadow: "0 0 8px #F87171" }} />
            Admin Command Center
          </div>
          <div style={{ marginTop: 12, fontSize: 32, fontWeight: 800, color: TEXT, letterSpacing: "-0.02em" }}>P2P Dashboard</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ ...pillStyle, border: `1px solid rgba(74,222,128,0.4)`, background: "rgba(74,222,128,0.1)" }}>
            <span style={{ color: GREEN, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: GREEN, boxShadow: `0 0 10px ${GREEN}` }} />
              All systems operational
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {stats.map((s, i) => {
          const isRed = s.tone === "red";
          const iconColor = isRed ? "#F87171" : undefined;
          
          return (
            <Card key={i} accent={s.tone === "cyan" ? "cyan" : s.tone === "purple" ? "purple" : "none"} bright={s.tone === "cyan" || s.tone === "purple"} style={{ padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                {isRed ? (
                   <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(180deg, rgba(248,113,113,0.2), rgba(248,113,113,0.05))", border: "1px solid rgba(248,113,113,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: iconColor, boxShadow: "0 0 14px rgba(248,113,113,0.25)" }}>
                     <s.icon size={20} />
                   </div>
                ) : (
                  <IconTile color={s.tone as any} size={44}>
                    <s.icon size={20} />
                  </IconTile>
                )}
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: TEXT, letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: TEXT_MUTE, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
              </div>
              {s.sub && (
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${STROKE}`, fontSize: 12, color: TEXT_DIM, fontWeight: 600 }}>
                  <span style={{ color: isRed ? "#F87171" : CYAN }}>{s.sub.split(" ")[0]}</span> {s.sub.split(" ").slice(1).join(" ")}
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <div className="chx-grid-2" style={{ alignItems: "start" }}>
        {/* Dispute Queue Snapshot */}
        <Card accent="none" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", background: "linear-gradient(180deg, rgba(245,158,11,0.08), transparent)", borderBottom: `1px solid ${STROKE}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ padding: 8, background: "rgba(245,158,11,0.15)", borderRadius: 10, border: "1px solid rgba(245,158,11,0.3)" }}>
                <ShieldAlert size={20} color="#F59E0B" />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Action Required: Disputes</div>
                <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 2 }}>{recentDisputes.length} high priority cases</div>
              </div>
            </div>
            <Link to="/admin/disputes" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: TEXT, textDecoration: "none", padding: "8px 16px", borderRadius: 99, background: "rgba(255,255,255,0.05)", border: `1px solid ${STROKE}` }}>
              View Queue <ArrowRight size={14} />
            </Link>
          </div>
          <div>
            {recentDisputes.map((d, i) => {
              const isBreached = d.sla === "breached";
              const isWarn = d.sla === "warning";
              return (
                <Link key={d.id} to={`/admin/dispute/${d.id}`} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 14, padding: "20px 24px", borderBottom: i < recentDisputes.length - 1 ? `1px solid ${STROKE}` : "none", textDecoration: "none", color: "inherit", alignItems: "center", background: isBreached ? "linear-gradient(90deg, rgba(239,68,68,0.08), transparent)" : "transparent", transition: "background 0.2s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = isBreached ? "linear-gradient(90deg, rgba(239,68,68,0.12), rgba(239,68,68,0.02))" : "rgba(255,255,255,0.03)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = isBreached ? "linear-gradient(90deg, rgba(239,68,68,0.08), transparent)" : "transparent"; }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: CYAN, letterSpacing: "0.04em" }}>{d.id}</div>
                    <div style={{ fontSize: 12, color: TEXT_MUTE, marginTop: 4, fontWeight: 700 }}>{d.amount}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: TEXT, fontWeight: 600 }}>{d.reason}</div>
                    <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 4 }}>{d.buyer} <span style={{ color: TEXT_MUTE }}>vs</span> {d.seller}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, 
                      background: isBreached ? "rgba(239,68,68,0.15)" : isWarn ? "rgba(245,158,11,0.15)" : "rgba(120,170,220,0.1)",
                      color: isBreached ? "#FCA5A5" : isWarn ? "#FCD34D" : TEXT_DIM,
                      border: `1px solid ${isBreached ? "rgba(239,68,68,0.3)" : isWarn ? "rgba(245,158,11,0.3)" : STROKE}`,
                      boxShadow: isBreached ? "0 0 12px rgba(239,68,68,0.2)" : "none"
                    }}>
                      <Clock size={12} /> {d.time}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* System Health / Volumes */}
        <Card accent="purple" style={{ padding: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: TEXT, marginBottom: 22, display: "flex", alignItems: "center", gap: 10 }}>
            <IconTile color="purple" size={36}><BarChart3 size={16} /></IconTile>
            Platform Metrics
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { l: "24h Trade Volume", v: "$12.4M", i: DollarSign },
              { l: "Average Release Time", v: "4m 12s", i: Clock },
              { l: "Platform Revenue (24h)", v: "$14,250", i: Activity },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 18, borderBottom: i < 2 ? `1px solid ${STROKE}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, color: TEXT_DIM, fontSize: 14, fontWeight: 600 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(139,92,246,0.1)", border: `1px solid rgba(139,92,246,0.3)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <m.i size={16} color={PURPLE} />
                  </div>
                  {m.l}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>{m.v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}