import { useState } from "react";
import { Bell, User, ChevronDown, Globe } from "lucide-react";

const CHXLogo = () => (
  <div
    style={{
      width: 34,
      height: 34,
      background: "linear-gradient(135deg, #00C2FF 0%, #3A7BFF 100%)",
      borderRadius: 9,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      fontSize: 10,
      fontWeight: 800,
      color: "white",
      letterSpacing: "0px",
      flexShrink: 0,
      boxShadow: "0 0 12px rgba(0, 194, 255, 0.3)",
    }}
  >
    CHX
  </div>
);

const navLinks = [
  { label: "Dashboard", href: "#" },
  { label: "Markets", href: "#" },
  { label: "Trade", href: "#", hasDropdown: true },
  { label: "P2P", href: "#", active: true },
  { label: "Wallets", href: "#" },
  { label: "History", href: "#" },
];

export default function CoinHubXHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        background: "rgba(11, 15, 26, 0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 20px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <CHXLogo />
          <span
            style={{
              color: "#ffffff",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.08em",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            COINHUBX
          </span>
        </div>

        {/* Nav links - desktop */}
        <nav
          className="hidden md:flex"
          style={{ display: "flex", alignItems: "center", gap: 4 }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: "6px 12px",
                borderRadius: 8,
                fontSize: 13.5,
                fontWeight: link.active ? 600 : 400,
                color: link.active ? "#00C2FF" : "rgba(255,255,255,0.6)",
                textDecoration: "none",
                transition: "color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!link.active)
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                if (!link.active)
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
              }}
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown size={13} style={{ opacity: 0.7 }} />
              )}
            </a>
          ))}
        </nav>

        {/* Right icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <button
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <Globe size={16} />
          </button>
          <button
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.65)",
              position: "relative",
            }}
          >
            <Bell size={16} />
            <span
              style={{
                position: "absolute",
                top: 7,
                right: 7,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#00C2FF",
                border: "1.5px solid #0B0F1A",
              }}
            />
          </button>
          <button
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00C2FF, #3A7BFF)",
              border: "1px solid rgba(0,194,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
            }}
          >
            <User size={16} />
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.7)",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <span style={{ width: 16, height: 1.5, background: "currentColor", borderRadius: 2 }} />
            <span style={{ width: 16, height: 1.5, background: "currentColor", borderRadius: 2 }} />
            <span style={{ width: 16, height: 1.5, background: "currentColor", borderRadius: 2 }} />
          </button>
        </div>
      </div>

      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "12px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 12px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: link.active ? 600 : 400,
                color: link.active ? "#00C2FF" : "rgba(255,255,255,0.7)",
                textDecoration: "none",
                background: link.active ? "rgba(0,194,255,0.08)" : "transparent",
              }}
            >
              {link.label}
              {link.hasDropdown && <ChevronDown size={13} />}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
