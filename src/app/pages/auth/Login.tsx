import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { Mail, Lock } from "lucide-react";
import { AuthShell } from "./AuthShell";
import { Field, input, primaryBtnStyle, TEXT_DIM, CYAN } from "../../p2p/shared";
import { useAuth } from "../../auth/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const next = new URLSearchParams(search).get("next") || "/p2p";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || pw.length < 6) return setErr("Check your email and password");
    setUser({ email, name: "You", country: "United Kingdom", currency: "GBP", twoFA: true });
    navigate(next);
  };

  return (
    <AuthShell step={1} total={1} title="Welcome back" sub="Log in to continue your trade. We'll take you back exactly where you left off." side={<div style={{ fontSize: 12, color: TEXT_DIM, lineHeight: 1.55 }}>New to CoinHubX?<br /><Link to={`/auth/signup${search}`} style={{ color: CYAN, textDecoration: "none", fontWeight: 700 }}>Create account →</Link></div>}>
      <form onSubmit={submit} style={{ display: "grid", gap: 14, maxWidth: 460 }}>
        <Field label="EMAIL">
          <div style={{ position: "relative" }}>
            <Mail size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM }} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@coinhubx.io" style={{ ...input, paddingLeft: 40 }} />
          </div>
        </Field>
        <Field label="PASSWORD">
          <div style={{ position: "relative" }}>
            <Lock size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM }} />
            <input value={pw} onChange={(e) => setPw(e.target.value)} type="password" placeholder="••••••••" style={{ ...input, paddingLeft: 40 }} />
          </div>
        </Field>
        {err && <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#F87171", fontSize: 12.5 }}>{err}</div>}
        <button type="submit" style={primaryBtnStyle(54)}>Log in</button>
      </form>
    </AuthShell>
  );
}
