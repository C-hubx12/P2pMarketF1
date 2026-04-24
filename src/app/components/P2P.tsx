import { useState } from "react";
import {
  Zap,
  ChevronDown,
  SlidersHorizontal,
  Star,
  BadgeCheck,
  Building2,
  CreditCard,
  Wallet,
  Shield,
  Users,
  Headphones,
  TrendingUp,
  Inbox,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import P2PHeroIcon from "./P2PHeroIcon";
import shieldIcon from "../../imports/IMG_0022-1.jpeg";

const CYAN = "#00f5ff";
const BLUE = "#1378ff";
const PURPLE = "#7c4dff";
const TEXT = "#f8fbff";
const TEXT2 = "#a9b8d8";
const BORDER = "rgba(100,220,255,0.28)";

const panel: React.CSSProperties = {
  position: "relative",
  borderRadius: 24,
  background:
    "linear-gradient(180deg, rgba(19,30,55,0.65) 0%, rgba(8,14,30,0.75) 100%)",
  border: "1px solid rgba(100,220,255,0.18)",
  boxShadow:
    "0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(124,77,255,0.06) inset, 0 20px 50px rgba(0,0,0,0.45), 0 0 40px rgba(19,120,255,0.08)",
  padding: 20,
};

const input: React.CSSProperties = {
  height: 46,
  padding: "0 16px",
  borderRadius: 12,
  background: "rgba(8,14,30,0.7)",
  border: "1px solid rgba(100,220,255,0.18)",
  color: TEXT,
  fontSize: 14,
  outline: "none",
  width: "100%",
  fontFamily: "inherit",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), inset 0 0 12px rgba(0,0,0,0.35)",
};

const primaryBtn: React.CSSProperties = {
  height: 46,
  padding: "0 22px",
  borderRadius: 12,
  border: "1px solid rgba(170,240,255,0.55)",
  background:
    "linear-gradient(180deg, #35e8ff 0%, #00b7ff 45%, #1378ff 100%)",
  color: "#fff",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  whiteSpace: "nowrap",
  fontFamily: "inherit",
  letterSpacing: "0.01em",
  boxShadow:
    "0 10px 26px rgba(19,120,255,0.45), 0 0 30px rgba(0,245,255,0.35), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.18)",
  textShadow: "0 1px 0 rgba(0,0,0,0.2)",
};

function Select({ value, options }: { value: string; options: string[] }) {
  const [v, setV] = useState(value);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        value={v}
        onChange={(e) => setV(e.target.value)}
        style={{
          ...input,
          appearance: "none",
          paddingRight: 36,
          cursor: "pointer",
        }}
      >
        {options.map((o) => (
          <option key={o} style={{ background: "#07101f" }}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        size={15}
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          color: TEXT2,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

type Offer = {
  id: string;
  letter: string;
  name: string;
  rating: number;
  completion: number;
  limit: string;
  price: string;
  available: string;
  topPick?: boolean;
};

type ListState =
  | { kind: "loading" }
  | { kind: "empty" }
  | { kind: "error" }
  | { kind: "live"; offers: Offer[] };

export default function P2P() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  // No fake data — real data would populate this from backend
  const [state, setState] = useState<ListState>({ kind: "empty" });

  return (
    <div
      style={{
        position: "relative",
        width: 1180,
        maxWidth: "100%",
        minWidth: 1020,
        margin: "0 auto",
        padding: "28px 20px 80px",
      }}
    >
      <style>{`
        @media (max-width: 340px) {
          .hero { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO */}
      <section
        className="hero"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 16,
          alignItems: "center",
          marginBottom: 18,
          padding: "10px 6px 6px",
        }}
      >
        <div>
          <h1
            className="h-title"
            style={{
              margin: 0,
              fontSize: 36,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              background: `linear-gradient(90deg, ${TEXT} 0%, #bfefff 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            P2P Marketplace
          </h1>
          <p style={{ margin: "12px 0 0", color: TEXT2, fontSize: 15.5 }}>
            Buy and sell crypto directly with trusted traders
          </p>
        </div>
        <div
          className="hero-img"
          style={{
            position: "relative",
            justifySelf: "end",
            width: "100%",
            maxWidth: 380,
            aspectRatio: "1 / 1",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-6%",
              background:
                "radial-gradient(circle at 50% 55%, rgba(0,245,255,0.38) 0%, rgba(124,77,255,0.25) 40%, transparent 70%)",
              filter: "blur(22px)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <P2PHeroIcon />
          </div>
        </div>
      </section>

      {/* INSTANT BUY */}
      <section style={{ ...panel, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${CYAN}, ${BLUE})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 0 20px rgba(0,245,255,0.55), inset 0 1px 0 rgba(255,255,255,0.35)",
            }}
          >
            <Zap size={20} color="#fff" fill="#fff" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: TEXT, fontSize: 17, fontWeight: 700 }}>Instant Buy</span>
              <span
                style={{
                  padding: "3px 9px",
                  borderRadius: 999,
                  background: "rgba(0,245,255,0.1)",
                  border: `1px solid ${BORDER}`,
                  color: CYAN,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  boxShadow: "0 0 10px rgba(0,245,255,0.35)",
                }}
              >
                AUTO
              </span>
            </div>
            <div style={{ color: TEXT2, fontSize: 13, marginTop: 3 }}>
              Auto-match with best seller
            </div>
          </div>
        </div>
        <div
          className="ib-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 0.7fr 1.2fr auto",
            gap: 10,
          }}
        >
          <input placeholder="Enter amount" style={input} />
          <Select value="USD" options={["USD", "EUR", "GBP"]} />
          <Select
            value="All Payment Methods"
            options={["All Payment Methods", "Bank Transfer", "PayPal", "Wise"]}
          />
          <button style={primaryBtn}>Buy USDT</button>
        </div>
      </section>

      {/* FILTER BAR */}
      <section style={{ ...panel, marginBottom: 16 }}>
        <div
          className="fb-top"
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto 1fr auto",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: 4,
              height: 48,
              borderRadius: 14,
              background: "rgba(8,14,30,0.7)",
              border: `1px solid ${BORDER}`,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            {(["buy", "sell"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSide(s)}
                style={{
                  padding: "0 26px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: 700,
                  textTransform: "capitalize",
                  color: side === s ? "#fff" : TEXT2,
                  background:
                    side === s
                      ? `linear-gradient(180deg, ${CYAN} 0%, ${BLUE} 100%)`
                      : "transparent",
                  boxShadow:
                    side === s
                      ? "0 0 20px rgba(0,245,255,0.5), inset 0 1px 0 rgba(255,255,255,0.4)"
                      : "none",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: 48,
              padding: "0 16px",
              borderRadius: 14,
              background: "rgba(8,14,30,0.7)",
              border: `1px solid ${BORDER}`,
              color: TEXT,
              fontSize: 14,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#26A17B",
                color: "#fff",
                fontSize: 12,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ₮
            </div>
            USDT
            <ChevronDown size={15} style={{ color: TEXT2 }} />
          </div>

          <div />

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: 48,
              padding: "0 18px",
              borderRadius: 999,
              background: "rgba(8,14,30,0.7)",
              border: `1px solid ${BORDER}`,
              color: TEXT,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 0 14px rgba(0,245,255,0.1)",
            }}
          >
            <SlidersHorizontal size={15} />
            Filters
            <ChevronDown size={14} style={{ opacity: 0.6 }} />
          </button>
        </div>

        <div
          className="fb-bot"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 0.7fr 1.2fr",
            gap: 10,
            marginTop: 12,
          }}
        >
          <input placeholder="Enter amount" style={input} />
          <Select value="USD" options={["USD", "EUR", "GBP"]} />
          <Select
            value="All Payment Methods"
            options={["All Payment Methods", "Bank Transfer", "PayPal", "Wise"]}
          />
        </div>
      </section>

      {/* ESCROW */}
      <section
        style={{
          position: "relative",
          borderRadius: 20,
          padding: 1.5,
          background: `linear-gradient(135deg, ${CYAN} 0%, ${PURPLE} 100%)`,
          marginBottom: 16,
          boxShadow: "0 0 30px rgba(0,245,255,0.2)",
        }}
      >
        <div
          style={{
            borderRadius: 18.5,
            background:
              "linear-gradient(135deg, rgba(0,245,255,0.08) 0%, rgba(124,77,255,0.08) 100%), linear-gradient(180deg, rgba(10,18,36,0.95), rgba(5,10,22,0.95))",
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              flexShrink: 0,
              overflow: "hidden",
              border: `1px solid ${BORDER}`,
              boxShadow: "0 0 24px rgba(124,77,255,0.45)",
            }}
          >
            <ImageWithFallback
              src={shieldIcon}
              alt="Escrow shield"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <div style={{ color: CYAN, fontSize: 16, fontWeight: 700, letterSpacing: "0.01em" }}>
              Escrow Protection
            </div>
            <div style={{ color: TEXT2, fontSize: 13, marginTop: 3 }}>
              Funds are locked until both sides complete the trade
            </div>
          </div>
        </div>
      </section>

      {/* OFFERS (states only — no fake data) */}
      <OffersView state={state} onRetry={() => setState({ kind: "empty" })} />

      {/* TRUST */}
      <section style={{ ...panel, padding: "20px 22px" }}>
        <div
          className="trust"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 22,
          }}
        >
          <Trust Icon={Shield} title="Secure Escrow" desc="Your funds are safe with escrow protection" />
          <Trust Icon={Users} title="Trusted Traders" desc="Trade with verified and rated users" />
          <Trust Icon={CreditCard} title="Multiple Payments" desc="Bank transfer, e-wallets and more" />
          <Trust Icon={Headphones} title="24/7 Support" desc="We're here to help you anytime" />
        </div>
      </section>
    </div>
  );
}

function OffersView({
  state,
  onRetry,
}: {
  state: ListState;
  onRetry: () => void;
}) {
  if (state.kind === "loading") {
    return (
      <section style={{ ...panel, marginBottom: 16, padding: 0, overflow: "hidden" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              padding: "22px 20px",
              borderBottom: i < 2 ? "1px solid rgba(100,220,255,0.08)" : "none",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Skeleton w={46} h={46} round />
            <div style={{ flex: 1 }}>
              <Skeleton w="40%" h={14} />
              <div style={{ height: 8 }} />
              <Skeleton w="70%" h={10} />
            </div>
            <Skeleton w={90} h={28} />
            <Skeleton w={110} h={40} />
          </div>
        ))}
      </section>
    );
  }

  if (state.kind === "error") {
    return (
      <section
        style={{
          ...panel,
          marginBottom: 16,
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            margin: "0 auto 14px",
            background: "rgba(255,181,71,0.1)",
            border: "1px solid rgba(255,181,71,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffb547",
            boxShadow: "0 0 18px rgba(255,181,71,0.25)",
          }}
        >
          <AlertTriangle size={24} />
        </div>
        <div style={{ color: "#f8fbff", fontSize: 16, fontWeight: 700 }}>
          Unable to load P2P offers
        </div>
        <div style={{ color: "#a9b8d8", fontSize: 13, marginTop: 6 }}>
          Something went wrong. Please try again.
        </div>
        <button
          onClick={onRetry}
          style={{
            ...primaryBtn,
            marginTop: 18,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <RefreshCw size={15} /> Retry
        </button>
      </section>
    );
  }

  if (state.kind === "empty") {
    return (
      <section
        style={{
          ...panel,
          marginBottom: 16,
          padding: "48px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 18,
            margin: "0 auto 16px",
            background: "rgba(0,245,255,0.08)",
            border: `1px solid ${BORDER}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#00f5ff",
            boxShadow: "0 0 22px rgba(0,245,255,0.3)",
          }}
        >
          <Inbox size={26} />
        </div>
        <div style={{ color: "#f8fbff", fontSize: 16, fontWeight: 700 }}>
          No live P2P offers available yet.
        </div>
        <div style={{ color: "#a9b8d8", fontSize: 13, marginTop: 6 }}>
          Check back soon — offers will appear here once traders post them.
        </div>
      </section>
    );
  }

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
      {state.offers.map((o) => (
        <OfferRow key={o.id} o={o} />
      ))}
    </section>
  );
}

function OfferRow({ o }: { o: Offer }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 18,
        padding: o.topPick ? 1.5 : 0,
        background: o.topPick
          ? `linear-gradient(135deg, ${CYAN} 0%, ${BLUE} 100%)`
          : "transparent",
        boxShadow: o.topPick ? "0 0 26px rgba(0,245,255,0.25)" : "none",
      }}
    >
      <div
        style={{
          borderRadius: o.topPick ? 16.5 : 18,
          background:
            "linear-gradient(180deg, rgba(19,30,55,0.7) 0%, rgba(8,14,30,0.8) 100%)",
          border: o.topPick ? "none" : "1px solid rgba(100,220,255,0.12)",
          padding: "16px 18px",
        }}
      >
        {o.topPick && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "3px 10px",
              borderRadius: 6,
              background: "rgba(0,245,255,0.12)",
              border: `1px solid ${BORDER}`,
              color: CYAN,
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: "0.1em",
              marginBottom: 12,
            }}
          >
            <TrendingUp size={11} /> TOP PICK
          </div>
        )}
        <div
          className="row"
          style={{
            display: "grid",
            gridTemplateColumns: "1.7fr 0.9fr 1fr 1.1fr auto",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(100,220,255,0.08)",
                border: `1px solid ${BORDER}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: TEXT,
                fontSize: 15,
                fontWeight: 700,
                flexShrink: 0,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {o.letter}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: TEXT,
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                {o.name}
                <BadgeCheck size={15} style={{ color: CYAN, filter: "drop-shadow(0 0 6px rgba(0,245,255,0.6))" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 3,
                  fontSize: 12,
                  color: TEXT2,
                }}
              >
                <Star size={11} style={{ color: "#ffb547", fill: "#ffb547" }} />
                <span style={{ color: TEXT }}>{o.rating}</span>
                <span style={{ opacity: 0.3 }}>|</span>
                <span>{o.completion}%</span>
              </div>
              <div style={{ fontSize: 11.5, color: TEXT2, marginTop: 3, opacity: 0.75 }}>
                {o.limit}
              </div>
            </div>
          </div>
          <div>
            <div style={{ color: CYAN, fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em" }}>
              {o.price}
            </div>
            <div style={{ fontSize: 11, color: TEXT2, opacity: 0.7 }}>USD</div>
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: TEXT2, opacity: 0.7 }}>Available</div>
            <div style={{ fontSize: 14, color: TEXT, marginTop: 2 }}>{o.available}</div>
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: TEXT2, opacity: 0.7, marginBottom: 6 }}>
              Payment Methods
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[Building2, CreditCard, Wallet].map((Icon, i) => (
                <div
                  key={i}
                  style={{
                    width: 30,
                    height: 24,
                    borderRadius: 6,
                    background: "rgba(8,14,30,0.6)",
                    border: "1px solid rgba(100,220,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#d7ecff",
                  }}
                >
                  <Icon size={12} />
                </div>
              ))}
            </div>
          </div>
          <button style={{ ...primaryBtn, height: 42, padding: "0 22px" }}>Buy USDT</button>
        </div>
      </div>
    </div>
  );
}

function Trust({
  Icon,
  title,
  desc,
}: {
  Icon: React.ComponentType<{ size?: number }>;
  title: string;
  desc: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,77,255,0.12))",
          border: `1px solid ${BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: CYAN,
          flexShrink: 0,
          boxShadow: "0 0 14px rgba(0,245,255,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <Icon size={18} />
      </div>
      <div>
        <div style={{ color: TEXT, fontSize: 14, fontWeight: 700 }}>{title}</div>
        <div style={{ color: TEXT2, fontSize: 12.5, marginTop: 3, lineHeight: 1.45 }}>{desc}</div>
      </div>
    </div>
  );
}

function Skeleton({
  w,
  h,
  round,
}: {
  w: number | string;
  h: number;
  round?: boolean;
}) {
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: round ? "50%" : 8,
        background:
          "linear-gradient(90deg, rgba(100,220,255,0.05), rgba(100,220,255,0.15), rgba(100,220,255,0.05))",
        backgroundSize: "200% 100%",
        animation: "chxShimmer 1.4s linear infinite",
      }}
    />
  );
}
