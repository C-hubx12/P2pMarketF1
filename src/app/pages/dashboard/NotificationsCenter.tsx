import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Bell, ShieldAlert, Clock, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { Shell } from "../../p2p/Shell";
import { Card, TEXT, TEXT_DIM, TEXT_MUTE, CYAN, PURPLE, GREEN, STROKE } from "../../p2p/shared";

type NotifType = "dispute" | "urgent" | "success" | "info";

type Notification = {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  tradeId?: string;
  read: boolean;
};

const MOCK_NOTIFS: Notification[] = [
  { id: "n1", type: "dispute", title: "Dispute Raised", message: "Buyer has raised a dispute for trade CHX-9F2A. Escrow is locked.", time: "2 mins ago", tradeId: "CHX-9F2A", read: false },
  { id: "n2", type: "urgent", title: "Timer Warning", message: "You have 5 minutes left to confirm payment for trade CHX-7C81.", time: "12 mins ago", tradeId: "CHX-7C81", read: false },
  { id: "n3", type: "info", title: "New Order", message: "CoinSwap has started a new order to buy 500 USDT.", time: "1 hour ago", tradeId: "CHX-4F11", read: true },
  { id: "n4", type: "success", title: "Crypto Released", message: "Trade CHX-2D40 is complete. 120 USDT has been credited to your wallet.", time: "3 hours ago", tradeId: "CHX-2D40", read: true },
  { id: "n5", type: "urgent", title: "Ad Paused", message: "Your sell ad for USDT was paused due to low balance.", time: "1 day ago", read: true },
  { id: "n6", type: "info", title: "New Message", message: "FiatBridge: 'I have sent the payment.'", time: "1 day ago", tradeId: "CHX-2D40", read: true },
];

const ICONS = {
  dispute: { icon: ShieldAlert, color: "#EF4444", bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)" },
  urgent: { icon: Clock, color: "#F59E0B", bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)" },
  success: { icon: CheckCircle2, color: GREEN, bg: "rgba(74,222,128,0.15)", border: "rgba(74,222,128,0.3)" },
  info: { icon: MessageCircle, color: CYAN, bg: "rgba(0,229,255,0.15)", border: "rgba(0,229,255,0.3)" },
};

export default function NotificationsCenter() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const visible = filter === "all" ? notifs : notifs.filter(n => !n.read);
  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <Shell back="/p2p">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, marginBottom: 24 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 99, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", color: PURPLE, fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: PURPLE, boxShadow: `0 0 8px ${PURPLE}` }} />
            ALERTS
          </div>
          <div style={{ marginTop: 12, fontSize: 32, fontWeight: 800, color: TEXT, display: "flex", alignItems: "center", gap: 12, letterSpacing: "-0.02em" }}>
            Notifications
            {unreadCount > 0 && (
              <span style={{ padding: "4px 10px", borderRadius: 99, background: "rgba(0,229,255,0.15)", border: "1px solid rgba(0,229,255,0.3)", color: CYAN, fontSize: 13, fontWeight: 800 }}>
                {unreadCount} New
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 6, padding: 6, borderRadius: 14, background: "rgba(8,12,26,0.5)", border: `1px solid ${STROKE}` }}>
          {(["all", "unread"] as const).map((k) => (
            <button key={k} onClick={() => setFilter(k)} style={{
              padding: "8px 16px", borderRadius: 10, border: 0, cursor: "pointer", fontFamily: "inherit",
              background: filter === k ? `linear-gradient(180deg, rgba(0,229,255,0.18), rgba(0,229,255,0.04))` : "transparent",
              color: filter === k ? TEXT : TEXT_DIM, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
            }}>{k}</button>
          ))}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{ background: "transparent", border: "none", color: TEXT_DIM, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Mark all as read
          </button>
        )}
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        {visible.length === 0 ? (
          <div style={{ padding: 60, textAlign: "center" }}>
            <Bell size={32} color={TEXT_MUTE} style={{ marginBottom: 12, opacity: 0.5 }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>All caught up</div>
            <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 6 }}>You have no {filter === "unread" ? "unread " : ""}notifications.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {visible.map((n, i) => {
              const { icon: Icon, color, bg, border } = ICONS[n.type];
              return (
                <div key={n.id} onClick={() => { markRead(n.id); if (n.tradeId) navigate(`/p2p/order/${n.tradeId}`); }} style={{ display: "flex", gap: 16, padding: "20px 24px", borderBottom: i < visible.length - 1 ? `1px solid ${STROKE}` : "none", background: n.read ? "transparent" : "rgba(255,255,255,0.03)", cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = n.read ? "transparent" : "rgba(255,255,255,0.03)"; }}>
                  <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: bg, border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
                    <Icon size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: n.read ? TEXT_DIM : TEXT, display: "flex", alignItems: "center", gap: 8 }}>
                        {n.title}
                        {!n.read && <span style={{ width: 6, height: 6, borderRadius: "50%", background: CYAN, boxShadow: `0 0 8px ${CYAN}` }} />}
                      </div>
                      <div style={{ fontSize: 12, color: TEXT_MUTE, fontWeight: 600 }}>{n.time}</div>
                    </div>
                    <div style={{ fontSize: 13, color: n.read ? TEXT_MUTE : TEXT_DIM, lineHeight: 1.5 }}>{n.message}</div>
                    {n.tradeId && (
                      <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 8, background: "rgba(8,12,26,0.6)", border: `1px solid ${STROKE}`, color: TEXT_DIM, fontSize: 12, fontWeight: 600 }}>
                        Trade {n.tradeId} <ArrowRight size={12} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </Shell>
  );
}