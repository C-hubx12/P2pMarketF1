import React from "react";
import { useParams, useNavigate } from "react-router";
import { Star, ShieldCheck, Zap, Crown, User, ChevronLeft, Calendar } from "lucide-react";
import { Card } from "../p2p/shared";
import { TrustBadge } from "../components/p2p/TrustBadges";
import { AdRow } from "../components/p2p/AdRow";

const CYAN = "#00E5FF";
const PURPLE = "#8B5CF6";
const GREEN = "#4ADE80";
const STROKE = "rgba(255,255,255,0.12)";
const TEXT = "#FFFFFF";
const TEXT_DIM = "#94A3B8";
const TEXT_MUTE = "#64748B";

function StatCard({ label, value }: { label: string, value: string }) {
  return (
    <div style={{ flex: "1 1 0", minWidth: 100, padding: 14, borderRadius: 16, background: "rgba(255,255,255,0.02)", border: `1px solid ${STROKE}` }}>
      <div style={{ color: TEXT_DIM, fontSize: 11, fontWeight: 600, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>{label}</div>
      <div style={{ color: TEXT, fontSize: 18, fontWeight: 800, marginTop: 4 }}>{value}</div>
    </div>
  );
}

function TradeBreakdownItem({ label, value }: { label: string, value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "rgba(255,255,255,0.015)", borderRadius: 12 }}>
      <span style={{ color: TEXT_DIM, fontSize: 13, fontWeight: 500 }}>{label}</span>
      <span style={{ color: TEXT, fontSize: 14, fontWeight: 700 }}>{value}</span>
    </div>
  );
}

export default function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const isBuyer = searchParams.get("type") === "buyer";
  
  // MOCK DATA based on username or standard fallbacks
  const isNew = username?.toLowerCase() === "newbie";
  const trades = isNew ? 0 : 342;
  const rating = isNew ? "0.0" : "4.9";
  const online = true;
  const memberSince = isNew ? "Oct 2026" : "Jan 2025";
  const completionRate = isNew ? "0.0%" : "98.5%";
  const positiveFeedback = isNew ? "0%" : "99%";
  const avgReleaseTime = isNew ? "N/A" : "3 mins";
  const totalVolume = isNew ? "$0" : "$142,000";
  
  const tradesSeller = isNew ? 0 : 280;
  const tradesBuyer = isNew ? 0 : 62;
  const canceled = isNew ? 0 : 4;
  const disputes = isNew ? 0 : 0;

  const letter = username ? username[0].toUpperCase() : "U";

  // Mock Active Ads
  const activeAds = isNew ? [] : [
    {
      id: "ad-1",
      side: "sell" as const,
      accent: "cyan" as const,
      letter,
      name: username || "Trader",
      online,
      rating: "4.9",
      trades: 342,
      completion: 98.5,
      price: "1.00",
      marketDiff: -1.2,
      available: "1,500 USDT",
      limit: "$50 – $1,500",
      methods: ["Bank Transfer", "PayPal"],
      badges: ["top" as const, "verified" as const, "fast" as const]
    }
  ];

  // Mock Feedback
  const feedbacks = isNew ? [] : [
    { id: 1, user: "Joh***", type: "buy", rating: 5, comment: "Fast and reliable, highly recommend!", date: "2 days ago" },
    { id: 2, user: "Ali***", type: "sell", rating: 5, comment: "Smooth transaction.", date: "5 days ago" },
    { id: 3, user: "Sam***", type: "buy", rating: 4, comment: "Good trader, but payment took 10 minutes.", date: "1 week ago" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#05070F", color: TEXT, fontFamily: "'Inter', sans-serif" }}>
      {/* HEADER BAR */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(5,7,15,0.8)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${STROKE}`, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={() => navigate(-1)} style={{ width: 36, height: 36, borderRadius: 99, background: "rgba(255,255,255,0.05)", border: 0, color: TEXT, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ChevronLeft size={20} />
        </button>
        <span style={{ fontSize: 16, fontWeight: 700 }}>Trader Profile</span>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px" }}>
        
        {/* SECTION 1: HEADER */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 48 }}>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <div style={{ width: 88, height: 88, borderRadius: "50%", background: `linear-gradient(135deg, ${CYAN}, ${PURPLE})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 800, color: "#fff", border: "2px solid rgba(255,255,255,0.1)", boxShadow: `0 0 40px rgba(0,229,255,0.2)` }}>
              {letter}
            </div>
            <span style={{ position: "absolute", bottom: 4, right: 4, width: 16, height: 16, borderRadius: "50%", background: online ? GREEN : TEXT_MUTE, border: "3px solid #05070F", boxShadow: online ? `0 0 10px ${GREEN}` : "none" }} />
          </div>
          
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }}>{username}</div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: TEXT_DIM, fontSize: 13, marginBottom: 20 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Calendar size={14} /> Member since {memberSince}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Star size={14} color="#FFB547" fill="#FFB547" /> {rating} / 5.0</span>
            <span style={{ fontWeight: 600 }}>{trades} Completed Trades</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
            {isNew ? (
              <TrustBadge kind="new" size="large" />
            ) : (
              <>
                <TrustBadge kind="top" size="large" />
                <TrustBadge kind="verified" size="large" />
                <TrustBadge kind="fast" size="large" />
              </>
            )}
          </div>

          {isNew && (
            <div style={{ marginTop: 24, padding: "12px 20px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: `1px solid rgba(255,255,255,0.1)`, color: TEXT_DIM, fontSize: 13, maxWidth: 400 }}>
              This trader is new to CoinHubX. Proceed with appropriate caution.
            </div>
          )}
        </div>

        {/* SECTION 2: KEY STATS ROW */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
          <StatCard label="Completion Rate" value={completionRate} />
          <StatCard label="Positive Feedback" value={positiveFeedback} />
          <StatCard label={isBuyer ? "Avg Payment Time" : "Avg Release Time"} value={isBuyer ? (isNew ? "N/A" : "8 mins") : avgReleaseTime} />
          <StatCard label={isBuyer ? "Total Spent" : "Total Volume"} value={isBuyer ? (isNew ? "$0" : "$28,000") : totalVolume} />
        </div>

        {/* SECTION 3: TRADE BREAKDOWN */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Trade Breakdown</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            <TradeBreakdownItem label="Trades as Seller" value={tradesSeller.toString()} />
            <TradeBreakdownItem label="Trades as Buyer" value={tradesBuyer.toString()} />
            <TradeBreakdownItem label="Cancelled Trades" value={canceled.toString()} />
            <TradeBreakdownItem label="Disputes" value={disputes.toString()} />
          </div>
        </div>

        {/* SECTION 4: RECENT FEEDBACK */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Recent Feedback</h2>
          {feedbacks.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", color: TEXT_DIM, fontSize: 14, background: "rgba(255,255,255,0.02)", borderRadius: 16, border: `1px dashed ${STROKE}` }}>
              No feedback available yet.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {feedbacks.map(f => (
                <div key={f.id} style={{ padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.02)", border: `1px solid ${STROKE}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{f.user}</span>
                      <span style={{ padding: "2px 6px", borderRadius: 4, background: "rgba(255,255,255,0.06)", fontSize: 10, fontWeight: 600, color: TEXT_DIM, textTransform: "uppercase" }}>{f.type}</span>
                    </div>
                    <div style={{ color: TEXT_MUTE, fontSize: 11 }}>{f.date}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} color={i < f.rating ? "#FFB547" : "rgba(255,255,255,0.1)"} fill={i < f.rating ? "#FFB547" : "none"} />
                    ))}
                  </div>
                  <div style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.5 }}>"{f.comment}"</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 5: ACTIVE ADS */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Active Ads</h2>
          {activeAds.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", color: TEXT_DIM, fontSize: 14, background: "rgba(255,255,255,0.02)", borderRadius: 16, border: `1px dashed ${STROKE}` }}>
              No active ads at the moment.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {activeAds.map(ad => (
                <AdRow key={ad.id} {...ad} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}