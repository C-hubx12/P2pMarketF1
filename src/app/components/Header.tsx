import { useState } from "react";
import { Bell, User, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Dashboard" },
  { label: "Markets" },
  { label: "Trade", hasDropdown: true },
  { label: "P2P", active: true },
  { label: "Wallets" },
  { label: "History" },
];

const CYAN = "#00f5ff";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(7,16,31,0.65)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(100,220,255,0.12)",
        boxShadow: "0 1px 0 rgba(100,220,255,0.18), 0 8px 30px rgba(0,0,0,0.45)",
      }}
    >
      <div
        style={{
          width: 1180,
          maxWidth: "100%",
          minWidth: 1020,
          margin: "0 auto",
          padding: "0 20px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #00f5ff 0%, #1378ff 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: "0.02em",
              boxShadow: "0 0 16px rgba(0,245,255,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
            }}
          >
            CHX
          </div>
          <span
            style={{
              color: "#f8fbff",
              fontWeight: 700,
              letterSpacing: "0.14em",
              fontSize: 15,
            }}
          >
            COINHUBX
          </span>
        </div>

        <nav className="chx-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {navLinks.map((l) => (
            <a
              key={l.label}
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "8px 14px",
                borderRadius: 10,
                fontSize: 13.5,
                fontWeight: l.active ? 600 : 400,
                color: l.active ? CYAN : "#a9b8d8",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {l.label}
              {l.hasDropdown && <ChevronDown size={13} style={{ opacity: 0.7 }} />}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <IconButton>
            <div style={{ position: "relative" }}>
              <Bell size={16} />
              <span
                style={{
                  position: "absolute",
                  top: -5,
                  right: -6,
                  minWidth: 15,
                  height: 15,
                  padding: "0 4px",
                  borderRadius: 999,
                  background: CYAN,
                  color: "#04131c",
                  fontSize: 9.5,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 8px rgba(0,245,255,0.8)",
                }}
              >
                3
              </span>
            </div>
          </IconButton>
          <IconButton>
            <User size={16} />
          </IconButton>
          <button
            className="chx-burger"
            onClick={() => setOpen(!open)}
            style={{
              display: "none",
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(100,220,255,0.2)",
              color: "#a9b8d8",
              flexDirection: "column",
              gap: 4,
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ width: 16, height: 1.5, background: "currentColor" }} />
            <span style={{ width: 16, height: 1.5, background: "currentColor" }} />
            <span style={{ width: 16, height: 1.5, background: "currentColor" }} />
          </button>
        </div>
      </div>

      {open && (
        <div
          style={{
            padding: "10px 20px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            borderTop: "1px solid rgba(100,220,255,0.12)",
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href="#"
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                fontSize: 14,
                color: l.active ? CYAN : "#a9b8d8",
                textDecoration: "none",
                background: l.active ? "rgba(0,245,255,0.08)" : "transparent",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 340px) {
          .chx-nav { display: none !important; }
          .chx-burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        width: 40,
        height: 40,
        borderRadius: 999,
        background: "rgba(100,220,255,0.06)",
        border: "1px solid rgba(100,220,255,0.28)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#d7ecff",
        cursor: "pointer",
        boxShadow:
          "0 0 14px rgba(0,245,255,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </button>
  );
}
