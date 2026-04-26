import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthShell } from "./AuthShell";
import { CodeInput } from "./CodeInput";
import { primaryBtnStyle, secondaryBtnStyle, TEXT, TEXT_DIM, CYAN } from "../../p2p/shared";
import { useAuth } from "../../auth/AuthContext";

export default function EmailVerify() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [code, setCode] = useState("");

  return (
    <AuthShell step={2} total={6} title="Verify your email" sub={`Enter the 6-digit code we sent to ${user?.email || "your inbox"}.`}>
      <div style={{ maxWidth: 460 }}>
        <CodeInput value={code} onChange={setCode} />
        <div style={{ marginTop: 14, display: "flex", gap: 14, alignItems: "center" }}>
          <button style={{ ...secondaryBtnStyle(40), padding: "0 14px" }} onClick={() => alert("Code resent")}>Resend code</button>
          <span style={{ fontSize: 12, color: TEXT_DIM }}>Wrong email? <button onClick={() => navigate(`/auth/signup${search}`)} style={{ background: "none", border: "none", color: CYAN, cursor: "pointer", fontWeight: 700, padding: 0, fontFamily: "inherit" }}>change</button></span>
        </div>
        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ ...secondaryBtnStyle(54), flex: 1 }}>Back</button>
          <button disabled={code.length < 6} onClick={() => navigate(`/auth/phone${search}`)} style={{ ...primaryBtnStyle(54), flex: 2, opacity: code.length < 6 ? 0.5 : 1, cursor: code.length < 6 ? "not-allowed" : "pointer" }}>Continue</button>
        </div>
      </div>
    </AuthShell>
  );
}
