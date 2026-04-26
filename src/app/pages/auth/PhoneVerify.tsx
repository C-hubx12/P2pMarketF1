import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Phone } from "lucide-react";
import { AuthShell } from "./AuthShell";
import { CodeInput } from "./CodeInput";
import { Field, input, primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, STROKE } from "../../p2p/shared";
import { useAuth } from "../../auth/AuthContext";

const DIAL_CODES = [
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "+420", flag: "🇨🇿", name: "Czechia" },
  { code: "+36", flag: "🇭🇺", name: "Hungary" },
  { code: "+40", flag: "🇷🇴", name: "Romania" },
  { code: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "+886", flag: "🇹🇼", name: "Taiwan" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "+51", flag: "🇵🇪", name: "Peru" },
];

export default function PhoneVerify() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { update } = useAuth();
  const [ccIdx, setCcIdx] = useState(0);
  const cc = DIAL_CODES[ccIdx].code;
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
                <select value={ccIdx} onChange={(e) => setCcIdx(Number(e.target.value))} style={{ ...input, width: 160, appearance: "none", cursor: "pointer", paddingRight: 14 }}>
                  {DIAL_CODES.map((c, i) => <option key={`${c.code}-${c.name}`} value={i} style={{ background: "#07101f" }}>{c.flag} {c.code} {c.name}</option>)}
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
