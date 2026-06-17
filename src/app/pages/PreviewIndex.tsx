import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const BG_1 = "#05070F";
const BG_2 = "#0A0F1F";
const CYAN = "#00E5FF";
const PURPLE = "#8B5CF6";
const TEXT = "#E8EEFF";
const TEXT_DIM = "#A8B5D1";
const TEXT_MUTE = "#5B6A8A";
const STROKE = "rgba(120,170,220,0.12)";

type Group = { title: string; tone: string; items: { label: string; path: string; sub?: string }[] };

const GROUPS: Group[] = [
  {
    title: "Marketplace",
    tone: CYAN,
    items: [
      { label: "Marketplace home", path: "/p2p", sub: "Instant Buy + offers feed" },
    ],
  },
  {
    title: "Buyer flow",
    tone: CYAN,
    items: [
      { label: "1 · Buy setup",       path: "/p2p/buy",          sub: "Choose asset, amount, method" },
      { label: "2 · Buy confirm",     path: "/p2p/buy/confirm",  sub: "Review escrow lock" },
      { label: "3 · Buy payment",     path: "/p2p/buy/payment",  sub: "Send fiat to seller" },
      { label: "4 · Buy waiting",     path: "/p2p/buy/waiting",  sub: "Waiting for seller release" },
      { label: "5 · Buy complete",    path: "/p2p/buy/complete", sub: "Crypto received" },
    ],
  },
  {
    title: "Seller signup (full chain)",
    tone: PURPLE,
    items: [
      { label: "1 · Signup",         path: "/auth/signup?next=/p2p/sell",        sub: "Email + password" },
      { label: "2 · Email verify",   path: "/auth/email?next=/p2p/sell",         sub: "6-digit code" },
      { label: "3 · Phone verify",   path: "/auth/phone?next=/p2p/sell",         sub: "SMS code with dial code" },
      { label: "4 · Profile",        path: "/auth/profile?next=/p2p/sell",       sub: "Name, country, currency" },
      { label: "5 · 2FA",            path: "/auth/2fa?next=/p2p/sell",           sub: "Authenticator app" },
      { label: "6 · Payment setup",  path: "/auth/payment-setup?next=/p2p/sell", sub: "Bank / Wise / Revolut" },
      { label: "7 · Seller terms",   path: "/auth/terms?next=/p2p/sell",         sub: "T&Cs accept" },
      { label: "Login (returning)",  path: "/auth/login",                        sub: "Existing seller" },
    ],
  },
  {
    title: "Seller flow",
    tone: PURPLE,
    items: [
      { label: "1 · Sell setup",     path: "/p2p/sell-preview",        sub: "Choose offer to sell into" },
      { label: "2 · Sell confirm",   path: "/p2p/sell/confirm",        sub: "Lock crypto into escrow" },
      { label: "3 · Sell locked",    path: "/p2p/sell/locked",         sub: "Awaiting buyer payment" },
      { label: "4 · Sell release",   path: "/p2p/sell/release",        sub: "Confirm fiat received" },
      { label: "5 · Sell complete",  path: "/p2p/sell/complete",       sub: "Trade settled" },
      { label: "Create new ad",      path: "/p2p/create-ad-preview",   sub: "Publish offer" },
      { label: "Offer published",    path: "/p2p/offer-published/preview-1", sub: "Live confirmation" },
    ],
  },
  {
    title: "Order & dispute",
    tone: CYAN,
    items: [
      { label: "Order details",      path: "/p2p/order-details-preview", sub: "Chat, timer, escrow" },
      { label: "Dispute view",       path: "/p2p/dispute-preview",       sub: "Mediation flow" },
    ],
  },
  {
    title: "Dashboard",
    tone: PURPLE,
    items: [
      { label: "My ads",             path: "/p2p/my-ads",   sub: "Active / paused / completed" },
      { label: "Trade history",      path: "/p2p/history",  sub: "Completed / cancelled / disputed" },
    ],
  },
];

export default function PreviewIndex() {
  return (
    <div style={{ minHeight: "100vh", background: `radial-gradient(800px 500px at 0% -5%, rgba(0,229,255,0.16), transparent 60%), radial-gradient(800px 500px at 100% 5%, rgba(139,92,246,0.18), transparent 60%), linear-gradient(180deg, ${BG_1} 0%, ${BG_2} 50%, ${BG_1} 100%)`, color: TEXT, fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif", padding: "48px 20px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", color: TEXT_MUTE }}>COINHUBX · PREVIEW</div>
        <h1 style={{ marginTop: 6, fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", color: TEXT }}>All pages · one click each</h1>
        <p style={{ marginTop: 8, color: TEXT_DIM, fontSize: 14, maxWidth: 640 }}>
          Every screen in the P2P journey is reachable below. Auth pages are public — no real signup needed. Click any link to walk the flow.
        </p>
        <Link to="/p2p" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 18, padding: "10px 16px", borderRadius: 99, background: `linear-gradient(180deg, rgba(0,229,255,0.22), rgba(0,229,255,0.08))`, border: `1px solid ${CYAN}`, color: CYAN, fontWeight: 800, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", boxShadow: `0 0 18px rgba(0,229,255,0.3)` }}>
          Open marketplace <ArrowRight size={14} />
        </Link>

        <div style={{ marginTop: 36, display: "grid", gap: 24 }}>
          {GROUPS.map((g) => (
            <section key={g.title}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: g.tone, boxShadow: `0 0 10px ${g.tone}` }} />
                <h2 style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: g.tone, margin: 0 }}>{g.title}</h2>
              </div>
              <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {g.items.map((it) => (
                  <Link key={it.path} to={it.path} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 14, background: "rgba(13,20,40,0.6)", border: `1px solid ${STROKE}`, color: TEXT, textDecoration: "none", transition: "all 0.15s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = g.tone; e.currentTarget.style.boxShadow = `0 0 18px ${g.tone}33`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = STROKE; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: TEXT }}>{it.label}</div>
                      {it.sub && <div style={{ marginTop: 3, fontSize: 11.5, color: TEXT_DIM, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.sub}</div>}
                      <div style={{ marginTop: 4, fontSize: 10.5, color: TEXT_MUTE, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}>{it.path}</div>
                    </div>
                    <ArrowRight size={14} color={g.tone} />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
