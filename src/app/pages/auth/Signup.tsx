import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { Mail, Lock, Gift } from "lucide-react";
import { AuthShell } from "./AuthShell";
import { Field, input, primaryBtnStyle, TEXT, TEXT_DIM, CYAN, STROKE } from "../../p2p/shared";
import { useAuth } from "../../auth/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [ref, setRef] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return setErr("Enter a valid email");
    if (pw.length < 8) return setErr("Password must be 8+ characters");
    if (pw !== pw2) return setErr("Passwords don't match");
    signup(email, pw);
    navigate(`/auth/email${search}`);
  };

  return (
    <AuthShell step={1} total={6} title="Create your CoinHubX account" sub="Verified accounts unlock selling, escrow protection, and instant order matching." side={<div style={{ fontSize: 12, color: TEXT_DIM, lineHeight: 1.55 }}>Already have an account?<br /><Link to={`/auth/login${search}`} style={{ color: CYAN, textDecoration: "none", fontWeight: 700 }}>Log in →</Link></div>}>
      <form onSubmit={submit} style={{ display: "grid", gap: 14, maxWidth: 460 }}>
        <Field label="EMAIL">
          <div style={{ position: "relative" }}>
            <Mail size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM }} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@coinhubx.io" style={{ ...input, paddingLeft: 40 }} />
          </div>
        </Field>
        <Field label="PASSWORD" hint="At least 8 characters with a number">
          <div style={{ position: "relative" }}>
            <Lock size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM }} />
            <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" placeholder="••••••••" style={{ ...input, paddingLeft: 40 }} />
          </div>
        </Field>
        <Field label="CONFIRM PASSWORD">
          <div style={{ position: "relative" }}>
            <Lock size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM }} />
            <input value={pw2} onChange={(e) => setPw2(e.target.value)} type="password" placeholder="••••••••" style={{ ...input, paddingLeft: 40 }} />
          </div>
        </Field>
        <Field label="REFERRAL CODE (OPTIONAL)">
          <div style={{ position: "relative" }}>
            <Gift size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM }} />
            <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="CHX-XXXX" style={{ ...input, paddingLeft: 40 }} />
          </div>
        </Field>
        {err && <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#F87171", fontSize: 12.5 }}>{err}</div>}
        <button type="submit" style={primaryBtnStyle(54)}>Create account</button>
        <div style={{ fontSize: 11.5, color: TEXT_DIM, textAlign: "center", marginTop: 4 }}>By continuing you accept our Terms and Privacy Policy.</div>
      </form>
    </AuthShell>
  );
}
