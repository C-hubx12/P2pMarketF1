import { useState } from "react";
import {
  Zap,
  Shield,
  ChevronDown,
  SlidersHorizontal,
  BadgeCheck,
  Star,
  Building2,
  CreditCard,
  Wallet,
  Headphones,
  Users,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import P2PHeroIcon from "./P2PHeroIcon";
import shieldIcon from "../../imports/IMG_0022.jpeg";

const CYAN = "#00C2FF";
const BLUE = "#3A7BFF";
const GRADIENT = `linear-gradient(135deg, ${CYAN} 0%, ${BLUE} 100%)`;

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  padding: 20,
};

const inputStyle: React.CSSProperties = {
  height: 44,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  color: "#fff",
  padding: "0 14px",
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
};

const btnGradientStyle: React.CSSProperties = {
  height: 44,
  padding: "0 24px",
  borderRadius: 10,
  background:
    "linear-gradient(180deg, #38D6FF 0%, #00B2FF 45%, #2676FF 100%)",
  border: "1px solid rgba(150,230,255,0.5)",
  color: "#fff",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow:
    "0 8px 22px rgba(0,110,255,0.4), 0 0 26px rgba(0,194,255,0.35), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.15)",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  letterSpacing: "0.01em",
  textShadow: "0 1px 0 rgba(0,0,0,0.15)",
};

function Select({
  value,
  options,
  width,
}: {
  value: string;
  options: string[];
  width?: number | string;
}) {
  const [v, setV] = useState(value);
  return (
    <div style={{ position: "relative", width: width ?? "100%" }}>
      <select
        value={v}
        onChange={(e) => setV(e.target.value)}
        style={{
          ...inputStyle,
          width: "100%",
          appearance: "none",
          paddingRight: 36,
          cursor: "pointer",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o} style={{ background: "#0F172A" }}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          color: "rgba(255,255,255,0.5)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

const traders = [
  {
    letter: "C",
    name: "CryptoKing",
    rating: 4.98,
    completion: 98,
    limit: "$100 – $5,000 USD",
    price: "1.000",
    available: "1,243 USDT",
    topPick: true,
  },
  {
    letter: "F",
    name: "FastTrader",
    rating: 4.95,
    completion: 96,
    limit: "$50 – $3,000 USD",
    price: "1.001",
    available: "856 USDT",
    topPick: false,
  },
  {
    letter: "S",
    name: "SafeTrade",
    rating: 4.93,
    completion: 97,
    limit: "$100 – $2,500 USD",
    price: "1.002",
    available: "2,125 USDT",
    topPick: false,
  },
];

function TraderRow({ t }: { t: (typeof traders)[number] }) {
  return (
    <div style={{ position: "relative" }}>
      {t.topPick && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 10px",
            background: "rgba(0,194,255,0.12)",
            border: "1px solid rgba(0,194,255,0.3)",
            borderRadius: 6,
            color: CYAN,
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.1em",
            marginBottom: 10,
          }}
        >
          <TrendingUp size={11} /> TOP PICK
        </div>
      )}
      <div
        className="trader-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1.7fr 0.9fr 1fr 1.1fr auto",
          alignItems: "center",
          gap: 16,
          padding: "16px 18px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14,
        }}
      >
        {/* Trader info */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {t.letter}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                color: "#fff",
                fontSize: 14.5,
                fontWeight: 600,
              }}
            >
              {t.name}
              <BadgeCheck size={14} style={{ color: CYAN }} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 3,
                fontSize: 12,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <Star size={11} style={{ color: "#FFB547", fill: "#FFB547" }} />
              <span style={{ color: "rgba(255,255,255,0.8)" }}>{t.rating}</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>|</span>
              <span>{t.completion}%</span>
            </div>
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>
              {t.limit}
            </div>
          </div>
        </div>

        {/* Price */}
        <div>
          <div style={{ color: CYAN, fontSize: 20, fontWeight: 600 }}>{t.price}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>USD</div>
        </div>

        {/* Available */}
        <div>
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.45)" }}>Available</div>
          <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>
            {t.available}
          </div>
        </div>

        {/* Payment icons */}
        <div>
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.45)", marginBottom: 6 }}>
            Payment Methods
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[Building2, CreditCard, Wallet].map((Icon, i) => (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 22,
                  borderRadius: 5,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                <Icon size={12} />
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <button style={{ ...btnGradientStyle, height: 40, padding: "0 22px" }}>Buy USDT</button>
      </div>
    </div>
  );
}

function FeatureItem({
  Icon,
  title,
  desc,
}: {
  Icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "rgba(0,194,255,0.08)",
          border: "1px solid rgba(0,194,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: CYAN,
          flexShrink: 0,
        }}
      >
        <Icon size={17} />
      </div>
      <div>
        <div style={{ color: "#fff", fontSize: 13.5, fontWeight: 600 }}>{title}</div>
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 12,
            marginTop: 2,
            lineHeight: 1.45,
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
}

export default function P2PPage() {
  const [side, setSide] = useState<"buy" | "sell">("buy");

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 20px 80px" }}>
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-img-wrap { order: -1; margin: 0 auto; }
          .instant-grid { grid-template-columns: 1fr !important; }
          .filter-grid { grid-template-columns: 1fr !important; }
          .trader-row { grid-template-columns: 1fr !important; gap: 14px !important; }
          .trader-row > *:last-child { width: 100%; }
          .features-grid { grid-template-columns: 1fr 1fr !important; }
          .outer-panel { padding: 20px !important; }
        }
      `}</style>

      <div className="outer-panel">

      {/* HERO */}
      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 32,
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              color: "#fff",
              fontSize: 44,
              fontWeight: 700,
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            P2P Marketplace
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 15.5,
              marginTop: 12,
              marginBottom: 0,
            }}
          >
            Buy and sell crypto directly with trusted traders
          </p>
        </div>

        {/* Hero image with glow, no white box */}
        <div
          className="hero-img-wrap"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 360,
            aspectRatio: "1 / 1",
            justifySelf: "end",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-8%",
              background:
                "radial-gradient(circle at 50% 55%, rgba(0,194,255,0.35) 0%, rgba(138,92,255,0.22) 35%, transparent 65%)",
              filter: "blur(24px)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <P2PHeroIcon />
          </div>
        </div>
      </div>

      {/* INSTANT BUY */}
      <div style={{ ...cardStyle, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: GRADIENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 14px rgba(0,194,255,0.3)",
            }}
          >
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>Instant Buy</span>
              <span
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  padding: "2px 7px",
                  borderRadius: 5,
                  background: "rgba(0,194,255,0.15)",
                  color: CYAN,
                  border: "1px solid rgba(0,194,255,0.3)",
                }}
              >
                AUTO
              </span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12.5, marginTop: 2 }}>
              Auto-match with best seller
            </div>
          </div>
        </div>
        <div
          className="instant-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 0.7fr 1.1fr auto",
            gap: 10,
          }}
        >
          <input placeholder="Enter amount" style={inputStyle} />
          <Select value="USD" options={["USD", "EUR", "GBP"]} />
          <Select
            value="All Payment Methods"
            options={["All Payment Methods", "Bank Transfer", "PayPal", "Wise"]}
          />
          <button style={btnGradientStyle}>Buy USDT</button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div style={{ ...cardStyle, marginBottom: 16 }}>
        <div
          className="filter-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto 1fr auto",
            gap: 12,
            alignItems: "center",
          }}
        >
          {/* Buy/Sell tabs */}
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: 4,
              height: 44,
            }}
          >
            {(["buy", "sell"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSide(s)}
                style={{
                  padding: "0 22px",
                  borderRadius: 7,
                  border: "none",
                  background: side === s ? GRADIENT : "transparent",
                  color: side === s ? "#fff" : "rgba(255,255,255,0.6)",
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textTransform: "capitalize",
                  boxShadow: side === s ? "0 0 12px rgba(0,194,255,0.25)" : "none",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Coin dropdown */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 44,
              padding: "0 14px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              cursor: "pointer",
              color: "#fff",
              fontSize: 14,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "#26A17B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              ₮
            </div>
            USDT
            <ChevronDown size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
          </div>

          <div />

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 44,
              padding: "0 16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              color: "rgba(255,255,255,0.85)",
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <SlidersHorizontal size={15} />
            Filters
            <ChevronDown size={14} style={{ opacity: 0.6 }} />
          </button>
        </div>

        <div
          className="instant-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 0.7fr 1.1fr",
            gap: 10,
            marginTop: 12,
          }}
        >
          <input placeholder="Enter amount" style={inputStyle} />
          <Select value="USD" options={["USD", "EUR", "GBP"]} />
          <Select
            value="All Payment Methods"
            options={["All Payment Methods", "Bank Transfer", "PayPal", "Wise"]}
          />
        </div>
      </div>

      {/* ESCROW */}
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          padding: 1.5,
          background: "linear-gradient(135deg, rgba(0,194,255,0.5), rgba(138,92,255,0.35))",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(0,194,255,0.08), rgba(138,92,255,0.04))",
            borderRadius: 14.5,
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 13,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(145deg, rgba(0,194,255,0.25), rgba(138,92,255,0.18))",
              border: "1px solid rgba(0,194,255,0.4)",
              boxShadow:
                "0 0 26px rgba(0,194,255,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            <ImageWithFallback
              src={shieldIcon}
              alt="Escrow shield"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: 13,
              }}
            />
          </div>
          <div>
            <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700 }}>
              Escrow Protection
            </div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12.5, marginTop: 3 }}>
              Funds are locked until both sides complete the trade
            </div>
          </div>
        </div>
      </div>

      {/* TRADER LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {traders.map((t) => (
          <TraderRow key={t.name} t={t} />
        ))}
      </div>

      {/* FEATURES FOOTER */}
      <div style={{ ...cardStyle, padding: "18px 22px" }}>
        <div
          className="features-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          <FeatureItem
            Icon={Shield}
            title="Secure Escrow"
            desc="Your funds are safe with escrow protection"
          />
          <FeatureItem
            Icon={Users}
            title="Trusted Traders"
            desc="Trade with verified and rated users"
          />
          <FeatureItem
            Icon={CreditCard}
            title="Multiple Payments"
            desc="Bank transfer, e-wallets and more"
          />
          <FeatureItem
            Icon={Headphones}
            title="24/7 Support"
            desc="We're here to help you anytime"
          />
        </div>
      </div>
      </div>
    </div>
  );
}
