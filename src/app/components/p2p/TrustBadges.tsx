import React from "react";
import { Crown, ShieldCheck, Zap, User } from "lucide-react";

export type BadgeKind = "top" | "verified" | "fast" | "new";

interface TrustBadgeProps {
  kind: BadgeKind;
  size?: "small" | "large";
  iconOnly?: boolean;
}

export function TrustBadge({ kind, size = "small", iconOnly = false }: TrustBadgeProps) {
  const isLarge = size === "large";
  
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: isLarge ? 6 : 4,
    borderRadius: iconOnly ? "50%" : 999,
    padding: iconOnly ? (isLarge ? 6 : 4) : (isLarge ? "4px 10px" : "2px 6px"),
    fontSize: isLarge ? 11 : 9.5,
    fontWeight: 800,
    letterSpacing: "0.1em",
    whiteSpace: "nowrap",
    justifyContent: "center"
  };

  const iconSize = isLarge ? 14 : 11;

  switch (kind) {
    case "top":
      return (
        <span style={{ ...baseStyle, background: "rgba(255,181,71,0.15)", color: "#FFB547", border: "1px solid rgba(255,181,71,0.3)" }}>
          <Crown size={iconSize} /> {!iconOnly && (isLarge ? "TOP TRADER" : "TOP")}
        </span>
      );
    case "verified":
      return (
        <span style={{ ...baseStyle, background: "rgba(0,229,255,0.1)", color: "#00E5FF", border: "1px solid rgba(0,229,255,0.3)" }}>
          <ShieldCheck size={iconSize} /> {!iconOnly && "VERIFIED"}
        </span>
      );
    case "fast":
      return (
        <span style={{ ...baseStyle, background: "rgba(74,222,128,0.1)", color: "#4ADE80", border: "1px solid rgba(74,222,128,0.3)" }}>
          <Zap size={iconSize} /> {!iconOnly && (isLarge ? "FAST RELEASE" : "FAST")}
        </span>
      );
    case "new":
      return (
        <span style={{ ...baseStyle, background: "rgba(255,255,255,0.08)", color: "#B6C5E2", border: "1px solid rgba(255,255,255,0.15)" }}>
          <User size={iconSize} /> {!iconOnly && (isLarge ? "NEW TRADER" : "NEW")}
        </span>
      );
  }
}
