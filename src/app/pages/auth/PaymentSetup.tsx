import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthShell } from "./AuthShell";
import { Field, input, primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM } from "../../p2p/shared";
import { PaymentSelect, PaymentMethod } from "../../p2p/PaymentSelect";
import { useAuth } from "../../auth/AuthContext";

export default function PaymentSetup() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { update } = useAuth();
  const [method, setMethod] = useState<PaymentMethod>("Bank Transfer");
  const [details, setDetails] = useState("");

  const submit = () => {
    if (details.trim().length < 4) return;
    update({ payment: { method, details: details.trim() } });
    navigate(`/auth/terms${search}`);
  };

  const placeholder = method === "Bank Transfer" || method === "Faster Payments"
    ? "Account name · Sort code · Account number"
    : method === "PayPal" || method === "Wise" || method === "Revolut"
    ? "Email or @username on the platform"
    : "How buyers should pay you";

  return (
    <AuthShell step={6} total={6} title="Add a payment method" sub="Buyers will pay you here. You can add more methods later from Settings.">
      <div style={{ display: "grid", gap: 14, maxWidth: 460 }}>
        <Field label="METHOD"><PaymentSelect value={method} onChange={setMethod} /></Field>
        <Field label="ACCOUNT DETAILS" hint="Visible only to matched buyers in escrow.">
          <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder={placeholder} style={{ ...input, height: 96, padding: "12px 16px", resize: "vertical" }} />
        </Field>
        <div style={{ marginTop: 8, display: "flex", gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ ...secondaryBtnStyle(54), flex: 1 }}>Back</button>
          <button disabled={details.trim().length < 4} onClick={submit} style={{ ...primaryBtnStyle(54), flex: 2, opacity: details.trim().length < 4 ? 0.5 : 1 }}>Continue</button>
        </div>
      </div>
    </AuthShell>
  );
}
