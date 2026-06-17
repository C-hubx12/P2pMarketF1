import { useState } from "react";
import { Link } from "react-router";
import { Users, Activity, CheckCircle2, XCircle, AlertTriangle, ShieldAlert, ArrowUpRight, BarChart3, Clock, DollarSign } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, TEXT, TEXT_DIM, TEXT_MUTE, CYAN, PURPLE, GREEN, STROKE, secondaryBtnStyle, Pill } from "../../p2p/shared";

type StatCard = { label: string; value: string; icon: any; tone: string; sub?: string };

export default function AdminDashboard() {
  const stats: StatCard[] = [
    { label: "Active Ads", value: "1,248", icon: Activity, tone: CYAN, sub: "+12% today" },
    { label: "Active Trades", value: "342", icon: Users, tone: PURPLE, sub: "$84,200 in escrow" },
    { label: "Completed (24h)", value: "8,405", icon: CheckCircle2, tone: GREEN, sub: "99.2% success rate" },
    { label: "Open Disputes", value: "14", icon: AlertTriangle, tone: "#F59E0B", sub: "3 SLA breached" },
  ];

  const recentDisputes = [
    { id: "D-9A21", buyer: "CryptoKing", seller: "CoinSwap", amount: "$1,200", reason: "Payment sent but not credited", time: "14 mins ago", sla: "safe" },
    { id: "D-4F11", buyer: "FiatBridge", seller: "MoonHODL", amount: "$450", reason: "Counterparty unresponsive", time: "22 hours ago", sla: "breached" },
    { id: "D-7B88", buyer: "NewTrader99", seller: "VerifiedPro", amount: "$5,000", reason: "Suspected fake payment proof", time: "2 hours ago", sla: "warning" },
  ];

  return (
    <Shell back="/preview">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: "#F87171" }}>ADMIN · COMMAND CENTER</div>
          <div style={{ marginTop: 4, fontSize: 24, fontWeight: 800, color: TEXT }}>P2P Dashboard</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Pill><span style={{ color: GREEN, fontWeight: 700 }}>● All systems operational</span></Pill>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i} style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.tone}1A`, border: `1px solid ${s.tone}40`, display: "flex", alignItems: "center", justifyContent: "center", color: s.tone }}>
                  <Icon size={18} />
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: TEXT }}>{s.value}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: TEXT_MUTE, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
              </div>
              {s.sub && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${STROKE}`, fontSize: 11.5, color: TEXT_DIM }}>
                  {s.sub}
                </div>
              )}
            </Card>
          )
        })}
      </div>

      <div className="chx-grid-2" style={{ alignItems: "start" }}>
        {/* Dispute Queue Snapshot */}
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", borderBottom: `1px solid ${STROKE}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ShieldAlert size={18} color="#F59E0B" />
              <span style={{ fontSize: 15, fontWeight: 800, color: TEXT }}>Action Required: Disputes</span>
            </div>
            <Link to="/admin/disputes" style={{ ...secondaryBtnStyle(32), fontSize: 11, padding: "0 12px", textDecoration: "none" }}>View All</Link>
          </div>
          <div>
            {recentDisputes.map((d, i) => (
              <Link key={d.id} to={`/admin/dispute/${d.id}`} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 14, padding: "16px 20px", borderBottom: i < recentDisputes.length - 1 ? `1px solid ${STROKE}` : "none", textDecoration: "none", color: "inherit", alignItems: "center", background: d.sla === "breached" ? "rgba(239,68,68,0.05)" : "transparent" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: CYAN }}>{d.id}</div>
                  <div style={{ fontSize: 11, color: TEXT_MUTE, marginTop: 4 }}>{d.amount}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12.5, color: TEXT, fontWeight: 600 }}>{d.reason}</div>
                  <div style={{ fontSize: 11, color: TEXT_DIM, marginTop: 4 }}>{d.buyer} vs {d.seller}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700, 
                    background: d.sla === "breached" ? "rgba(239,68,68,0.15)" : d.sla === "warning" ? "rgba(245,158,11,0.15)" : "rgba(120,170,220,0.1)",
                    color: d.sla === "breached" ? "#FCA5A5" : d.sla === "warning" ? "#FCD34D" : TEXT_DIM,
                    border: `1px solid ${d.sla === "breached" ? "rgba(239,68,68,0.3)" : d.sla === "warning" ? "rgba(245,158,11,0.3)" : STROKE}`
                  }}>
                    <Clock size={10} /> {d.time}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* System Health / Volumes */}
        <Card style={{ padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: TEXT, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
            <BarChart3 size={16} color={PURPLE} /> Platform Metrics
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { l: "24h Trade Volume", v: "$12.4M", i: DollarSign },
              { l: "Average Release Time", v: "4m 12s", i: Clock },
              { l: "Platform Revenue (24h)", v: "$14,250", i: Activity },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: i < 2 ? `1px solid ${STROKE}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: TEXT_DIM, fontSize: 13 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <m.i size={14} color={PURPLE} />
                  </div>
                  {m.l}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{m.v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
