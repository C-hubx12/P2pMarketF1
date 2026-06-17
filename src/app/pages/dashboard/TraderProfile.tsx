import { useState } from "react";
import { useParams, Link } from "react-router";
import { ShieldCheck, Star, Clock, AlertTriangle, User, ThumbsUp, ThumbsDown, CheckCircle2, History } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, TEXT, TEXT_DIM, TEXT_MUTE, CYAN, PURPLE, GREEN, STROKE, Pill } from "../../p2p/shared";
import { PaymentIcon, PaymentMethod } from "../../p2p/PaymentSelect";

export default function TraderProfile() {
  const { id } = useParams();

  // Mock profile data
  const profile = {
    username: id || "CoinSwap",
    avatarLetter: (id || "C").charAt(0).toUpperCase(),
    isOnline: true,
    memberSince: "Jan 2024",
    totalTrades: 4280,
    completionRate: "99.4%",
    positiveRating: 98,
    negativeRating: 2,
    totalRatings: 1850,
    cancelledTrades: 12,
    avgRelease: "1.2 mins",
    avgPayment: "2.5 mins",
    methods: ["Bank Transfer", "Wise", "Revolut"] as PaymentMethod[],
  };

  return (
    <Shell back="/p2p">
      <div className="chx-grid-2">
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          
          {/* Main Info */}
          <Card accent="cyan" bright style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{ position: "relative", marginBottom: 16 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(180deg, ${CYAN}, #007A99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800, color: "#04121E", boxShadow: `0 0 24px rgba(0,229,255,0.4)` }}>
                {profile.avatarLetter}
              </div>
              {profile.isOnline && (
                <div style={{ position: "absolute", bottom: 2, right: 2, width: 18, height: 18, borderRadius: "50%", background: GREEN, border: `3px solid #05070F`, boxShadow: `0 0 10px ${GREEN}` }} />
              )}
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 24, fontWeight: 800, color: TEXT }}>
              {profile.username}
              <ShieldCheck size={20} color={CYAN} />
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, color: TEXT_DIM, fontSize: 13 }}>
              <span>Member since {profile.memberSince}</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: TEXT_MUTE }} />
              <span style={{ color: GREEN }}>Verified user</span>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 24, width: "100%" }}>
              <StatCard value={profile.totalTrades} label="Trades" />
              <StatCard value={profile.completionRate} label="Completion" highlight />
            </div>
          </Card>

          {/* Detailed Stats */}
          <Card style={{ padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: TEXT, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <History size={18} color={CYAN} /> Trade Performance
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <StatRow icon={<CheckCircle2 size={16} color={GREEN} />} label="Completed Trades" value={profile.totalTrades} />
              <StatRow icon={<AlertTriangle size={16} color="#EF4444" />} label="Cancelled Trades" value={profile.cancelledTrades} />
              <StatRow icon={<Clock size={16} color={CYAN} />} label="Avg. Release Time" value={profile.avgRelease} />
              <StatRow icon={<Clock size={16} color={PURPLE} />} label="Avg. Payment Time" value={profile.avgPayment} />
            </div>
          </Card>

        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          
          {/* Rating */}
          <Card accent="purple" style={{ padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: TEXT, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <Star size={18} fill="#FCD34D" color="#FCD34D" /> User Feedback
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: TEXT, lineHeight: 1 }}>{profile.positiveRating}%</div>
              <div style={{ fontSize: 13, color: TEXT_DIM }}>Positive based on {profile.totalRatings} reviews</div>
            </div>

            <div style={{ height: 6, borderRadius: 99, background: "rgba(239,68,68,0.2)", display: "flex", overflow: "hidden", marginBottom: 20 }}>
              <div style={{ width: `${profile.positiveRating}%`, background: GREEN, borderRadius: 99 }} />
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1, padding: 12, borderRadius: 12, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", display: "flex", alignItems: "center", gap: 8 }}>
                <ThumbsUp size={16} color={GREEN} />
                <span style={{ fontSize: 14, fontWeight: 700, color: GREEN }}>{profile.positiveRating}%</span>
              </div>
              <div style={{ flex: 1, padding: 12, borderRadius: 12, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", gap: 8 }}>
                <ThumbsDown size={16} color="#EF4444" />
                <span style={{ fontSize: 14, fontWeight: 700, color: "#EF4444" }}>{profile.negativeRating}%</span>
              </div>
            </div>
          </Card>

          {/* Preferred Methods */}
          <Card style={{ padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: TEXT, marginBottom: 18 }}>Preferred Payment Methods</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {profile.methods.map(m => (
                <div key={m} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 12, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}` }}>
                  <PaymentIcon method={m} size={28} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{m}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </Shell>
  );
}

function StatCard({ value, label, highlight }: { value: string | number; label: string; highlight?: boolean }) {
  return (
    <div style={{ flex: 1, padding: 16, borderRadius: 14, background: highlight ? "linear-gradient(180deg, rgba(0,229,255,0.12), rgba(0,229,255,0.02))" : "rgba(8,12,26,0.5)", border: `1px solid ${highlight ? "rgba(0,229,255,0.3)" : STROKE}` }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: highlight ? CYAN : TEXT }}>{value}</div>
      <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function StatRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: 14, borderRadius: 12, background: "rgba(8,12,26,0.4)", border: `1px solid ${STROKE}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: TEXT_DIM }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: 15, fontWeight: 800, color: TEXT }}>{value}</div>
    </div>
  );
}