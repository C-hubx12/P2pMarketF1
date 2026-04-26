import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Phone } from "lucide-react";
import { AuthShell } from "./AuthShell";
import { CodeInput } from "./CodeInput";
import { Field, input, primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, STROKE } from "../../p2p/shared";
import { useAuth } from "../../auth/AuthContext";

const COUNTRIES = [
  { code: "+44", name: "UK" }, { code: "+1", name: "US" }, { code: "+33", name: "FR" },
  { code: "+49", name: "DE" }, { code: "+34", name: "ES" }, { code: "+39", name: "IT" },
  { code: "+61", name: "AU" }, { code: "+91", name: "IN" }, { code: "+971", name: "AE" },
];

export default function PhoneVerify() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { update } = useAuth();
  const [cc, setCc] = useState("+44");
  const [num, setNum] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");

  const send = () => { if (num.length >= 6) setSent(true); };
  const submit = () => {
    if (code.length < 6) return;
    update({ phone: `${cc} ${num}` });
    navigate(`/auth/profile${search}`);
  };

  return (
    <AuthShell step={3} total={6} title={sent ? "Enter the SMS code" : "Verify your phone"} sub={sent ? `Code sent to ${cc} ${num}` : "We'll text you a 6-digit code to confirm your number."}>
      <div style={{ maxWidth: 460 }}>
        {!sent ? (
          <>
            <Field label="PHONE NUMBER">
              <div style={{ display: "flex", gap: 10 }}>
                <select value={cc} onChange={(e) => setCc(e.target.value)} style={{ ...input, width: 120, appearance: "none", cursor: "pointer", paddingRight: 14 }}>
                  {COUNTRIES.map((c) => <option key={c.code} style={{ background: "#07101f" }}>{c.code} {c.name}</option>)}
                </select>
                <div style={{ position: "relative", flex: 1 }}>
                  <Phone size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM }} />
                  <input value={num} onChange={(e) => setNum(e.target.value.replace(/\D/g, ""))} inputMode="numeric" placeholder="7700 900123" style={{ ...input, paddingLeft: 40 }} />
                </div>
              </div>
            </Field>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <button onClick={() => navigate(-1)} style={{ ...secondaryBtnStyle(54), flex: 1 }}>Back</button>
              <button disabled={num.length < 6} onClick={send} style={{ ...primaryBtnStyle(54), flex: 2, opacity: num.length < 6 ? 0.5 : 1 }}>Send code</button>
            </div>
          </>
        ) : (
          <>
            <CodeInput value={code} onChange={setCode} />
            <button onClick={() => setSent(false)} style={{ marginTop: 14, background: "none", border: "none", color: TEXT_DIM, fontSize: 12, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>← Change number</button>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <button onClick={() => setSent(false)} style={{ ...secondaryBtnStyle(54), flex: 1 }}>Back</button>
              <button disabled={code.length < 6} onClick={submit} style={{ ...primaryBtnStyle(54), flex: 2, opacity: code.length < 6 ? 0.5 : 1 }}>Verify</button>
            </div>
          </>
        )}
      </div>
    </AuthShell>
  );
}
