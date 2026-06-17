import React from "react";
import { useNavigate } from "react-router";
import { Star } from "lucide-react";
import { Card } from "../../p2p/shared";
import { IconTile } from "../../p2p/shared";
import { PaymentIcon } from "../../p2p/PaymentSelect";
import { TrustBadge, BadgeKind } from "./TrustBadges";

// Assume CYANS and colors exist in global theme, but we can import or inline them
const CYAN = "#00E5FF";
const PURPLE = "#8B5CF6";
const GREEN = "#4ADE80";
const RED = "#FF4B4B";
const STROKE = "rgba(255,255,255,0.12)";
const TEXT = "#FFFFFF";
const TEXT_DIM = "#94A3B8";
const TEXT_MUTE = "#64748B";

export interface AdRowProps {
  id: string;
  side: "buy" | "sell";
  accent: "cyan" | "purple" | "green" | "yellow" | "blue" | "none";
  letter: string;
  name: string;
  online: boolean;
  lastSeen?: string;
  rating: string | number;
  trades: number;
  completion: number;
  price: string;
  marketDiff?: number; // e.g. -1.2 means 1.2% below market
  available: string;
  limit: string;
  methods: string[];
  badges: BadgeKind[];
  topPick?: boolean;
}

export function AdRow({
  id, side, accent, letter, name, online, rating, trades, completion,
  price, marketDiff = 0, available, limit, methods, badges, topPick
}: AdRowProps) {
  const navigate = useNavigate();

  return (
    <Card accent={topPick ? "cyan" : "none"} style={{ padding: 14 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        
        {/* AVATAR */}
        <IconTile color={accent} size={40}>
          <span style={{ fontSize: 16, fontWeight: 800 }}>{letter}</span>
        </IconTile>

        {/* DETAILS */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
          
          {/* LINE 1 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: TEXT, fontSize: 14, fontWeight: 700, cursor: "pointer" }} onClick={() => navigate(`/p2p/profile/${name}`)}>{name}</span>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: online ? GREEN : TEXT_MUTE, boxShadow: online ? `0 0 6px ${GREEN}` : "none" }} title={online ? "Online" : "Offline"} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 4, color: TEXT_DIM, fontSize: 12 }}>
              <Star size={12} color="#FFB547" fill="#FFB547" />
              <span style={{ color: "#F1F5FF", fontWeight: 600 }}>{rating}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{trades} trades</span>
            </div>

            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {badges.map(b => (
                <TrustBadge key={b} kind={b} size="small" iconOnly />
              ))}
            </div>
          </div>

          {/* LINE 2 */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ fontSize: 12, color: TEXT_DIM }}>
              <span style={{ color: GREEN, fontWeight: 600 }}>{completion}%</span> completion
            </div>
            
            <div style={{ display: "flex", gap: 6 }}>
              {methods.slice(0, 3).map((m, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 99, background: "rgba(255,255,255,0.06)", border: `1px solid rgba(255,255,255,0.1)`, fontSize: 10, color: "#E2E8F0", fontWeight: 600, whiteSpace: "nowrap" }}>
                  <PaymentIcon method={m} size={10} />
                  {m}
                </span>
              ))}
              {methods.length > 3 && (
                <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 6px", borderRadius: 99, background: "rgba(255,255,255,0.06)", border: `1px solid rgba(255,255,255,0.1)`, fontSize: 10, color: TEXT_DIM, fontWeight: 600 }}>
                  +{methods.length - 3}
                </span>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT SIDE: PRICE & ACTION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0, minWidth: 120 }}>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", lineHeight: 1.2 }}>
            <span style={{ color: side === "sell" ? PURPLE : CYAN, fontSize: 18, fontWeight: 800 }}>{price}</span>
            {marketDiff !== 0 && (
              <span style={{ color: marketDiff < 0 ? GREEN : RED, fontSize: 11, fontWeight: 600, marginTop: 4 }}>
                {Math.abs(marketDiff)}% {marketDiff < 0 ? "below" : "above"} market
              </span>
            )}
          </div>

          <div style={{ fontSize: 11, color: TEXT_DIM, textAlign: "right" }}>
            <div>{available}</div>
            <div>{limit}</div>
          </div>

          <button onClick={() => navigate(`/p2p/order/${id}`)} style={{ marginTop: 12, height: 36, padding: "0 20px", borderRadius: 8, border: `1px solid rgba(74,222,128,0.4)`, background: side === "sell" ? `linear-gradient(180deg, #C7B5FF 0%, ${PURPLE} 30%, #5B2EE0 75%, #2E0E80 100%)` : `linear-gradient(180deg, #B8FFD9 0%, ${GREEN} 30%, #0A8B3D 75%, #054B20 100%)`, color: side === "sell" ? "#fff" : "#04121E", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase", boxShadow: side === "sell" ? `0 4px 12px rgba(139,92,246,0.25)` : `0 4px 12px rgba(74,222,128,0.25)` }}>
            {side === "buy" ? "Sell" : "Buy"}
          </button>
        </div>

      </div>
    </Card>
  );
}