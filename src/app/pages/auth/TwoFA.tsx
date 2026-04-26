import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ShieldCheck, Smartphone } from "lucide-react";
import { AuthShell } from "./AuthShell";
import { primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, CYAN, STROKE } from "../../p2p/shared";
import { useAuth } from "../../auth/AuthContext";

export default function TwoFA() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { update } = useAuth();
  const [enabled, setEnabled] = useState(true);

  const submit = () => {
    update({ twoFA: enabled });
    navigate(`/auth/payment-setup${search}`);
  };

  return (
    <AuthShell step={5} total={6} title="Lock your account with 2FA" sub="Strongly recommended. We'll prompt for a one-time code on every login and release.">
      <div style={{ maxWidth: 460, display: "grid", gap: 14 }}>
        <button onClick={() => setEnabled(true)} style={{ textAlign: "left", padding: 18, borderRadius: 16, background: enabled ? "linear-gradient(180deg, rgba(0,229,255,0.10), rgba(0,229,255,0.02))" : "rgba(8,12,26,0.5)", border: `1px solid ${enabled ? "rgba(0,229,255,0.45)" : STROKE}`, cursor: "pointer", color: TEXT, fontFamily: "inherit", display: "flex", gap: 14, alignItems: "center", boxShadow: enabled ? "0 0 22px rgba(0,229,255,0.18)" : "none" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,229,255,0.12)", border: "1px solid rgba(0,229,255,0.4)", color: CYAN }}><ShieldCheck size={22} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>Authenticator app (Recommended)</div>
            <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 3 }}>Use Google Authenticator, 1Password or Authy.</div>
          </div>
          <div style={{ width: 22, height: 22, borderRadius: 99, border: `1.5px solid ${enabled ? CYAN : STROKE}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {enabled && <div style={{ width: 10, height: 10, borderRadius: 99, background: CYAN, boxShadow: `0 0 8px ${CYAN}` }} />}
          </div>
        </button>

        <button onClick={() => setEnabled(false)} style={{ textAlign: "left", padding: 18, borderRadius: 16, background: !enabled ? "linear-gradient(180deg, rgba(0,229,255,0.06), rgba(0,229,255,0.01))" : "rgba(8,12,26,0.5)", border: `1px solid ${!enabled ? "rgba(0,229,255,0.3)" : STROKE}`, cursor: "pointer", color: TEXT, fontFamily: "inherit", display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(120,170,220,0.06)", border: `1px solid ${STROKE}`, color: TEXT_DIM }}><Smartphone size={22} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>SMS only (skip authenticator)</div>
            <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 3 }}>Less secure — you can enable 2FA later in Settings.</div>
          </div>
          <div style={{ width: 22, height: 22, borderRadius: 99, border: `1.5px solid ${!enabled ? CYAN : STROKE}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {!enabled && <div style={{ width: 10, height: 10, borderRadius: 99, background: CYAN }} />}
          </div>
        </button>

        <div style={{ marginTop: 8, display: "flex", gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ ...secondaryBtnStyle(54), flex: 1 }}>Back</button>
          <button onClick={submit} style={{ ...primaryBtnStyle(54), flex: 2 }}>Continue</button>
        </div>
      </div>
    </AuthShell>
  );
}
