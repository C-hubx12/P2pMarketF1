import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthShell } from "./AuthShell";
import { Field, input, primaryBtnStyle, secondaryBtnStyle, TEXT_DIM } from "../../p2p/shared";
import { useAuth } from "../../auth/AuthContext";

export default function SellerTerms() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { update } = useAuth();
  const [terms, setTerms] = useState("Pay only to the exact account shown. Use the reference exactly as displayed. No third-party transfers. Release within 5 minutes of payment.");

  const submit = () => {
    update({ terms });
    const next = new URLSearchParams(search).get("next") || "/p2p/sell";
    navigate(next);
  };

  return (
    <AuthShell step={6} total={6} title="Set your seller terms" sub="Shown to buyers before they confirm. Keep it clear — fewer disputes, faster trades.">
      <div style={{ display: "grid", gap: 14, maxWidth: 540 }}>
        <Field label="TRADE TERMS & PAYMENT INSTRUCTIONS" hint="Plain language works best.">
          <textarea value={terms} onChange={(e) => setTerms(e.target.value)} style={{ ...input, height: 160, padding: "14px 16px", resize: "vertical", lineHeight: 1.5 }} />
        </Field>
        <div style={{ marginTop: 8, display: "flex", gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ ...secondaryBtnStyle(54), flex: 1 }}>Back</button>
          <button disabled={terms.trim().length < 10} onClick={submit} style={{ ...primaryBtnStyle(54), flex: 2, opacity: terms.trim().length < 10 ? 0.5 : 1 }}>Finish onboarding</button>
        </div>
      </div>
    </AuthShell>
  );
}
