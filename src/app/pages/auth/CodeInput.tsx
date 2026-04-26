import * as React from "react";
import { TEXT, CYAN, STROKE } from "../../p2p/shared";

export function CodeInput({ length = 6, value, onChange }: { length?: number; value: string; onChange: (v: string) => void }) {
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);
  const chars = value.padEnd(length, " ").split("").slice(0, length);
  const setIdx = (i: number, ch: string) => {
    const arr = value.padEnd(length, " ").split("");
    arr[i] = ch;
    onChange(arr.join("").trim());
    if (ch && i < length - 1) refs.current[i + 1]?.focus();
  };
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {chars.map((c, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          value={c.trim()}
          onChange={(e) => setIdx(i, e.target.value.replace(/\D/g, "").slice(-1))}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !c.trim() && i > 0) refs.current[i - 1]?.focus();
          }}
          inputMode="numeric"
          maxLength={1}
          style={{ width: 48, height: 56, borderRadius: 12, background: "linear-gradient(180deg, rgba(5,8,20,0.85), rgba(8,12,28,0.65))", border: `1px solid ${c.trim() ? "rgba(0,229,255,0.5)" : STROKE}`, color: TEXT, fontSize: 22, fontWeight: 700, textAlign: "center", outline: "none", fontFamily: "inherit", boxShadow: c.trim() ? `0 0 14px rgba(0,229,255,0.25), inset 0 1px 0 rgba(255,255,255,0.05)` : "inset 0 1px 0 rgba(255,255,255,0.04)", transition: "all .2s ease", caretColor: CYAN }}
        />
      ))}
    </div>
  );
}
