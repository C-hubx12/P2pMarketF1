import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { User as UserIcon, Globe } from "lucide-react";
import { AuthShell } from "./AuthShell";
import { Field, SelectBox, input, primaryBtnStyle, secondaryBtnStyle, TEXT_DIM } from "../../p2p/shared";
import { useAuth } from "../../auth/AuthContext";

const COUNTRIES = ["United Kingdom", "United States", "France", "Germany", "Spain", "Italy", "Australia", "India", "UAE"];
const CURRENCIES = ["GBP", "USD", "EUR", "AED", "AUD", "INR"];

export default function Profile() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { update } = useAuth();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [currency, setCurrency] = useState("GBP");

  const submit = () => {
    if (name.trim().length < 2) return;
    update({ name: name.trim(), country, currency });
    navigate(`/auth/2fa${search}`);
  };

  return (
    <AuthShell step={4} total={6} title="Set up your profile" sub="Your display name shows on offers and chats. Choose your home currency for default pricing.">
      <div style={{ display: "grid", gap: 14, maxWidth: 460 }}>
        <Field label="DISPLAY NAME">
          <div style={{ position: "relative" }}>
            <UserIcon size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM }} />
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. NeonTrader" style={{ ...input, paddingLeft: 40 }} />
          </div>
        </Field>
        <Field label="COUNTRY">
          <div style={{ position: "relative" }}>
            <Globe size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: TEXT_DIM, zIndex: 1 }} />
            <div style={{ paddingLeft: 26 }}><SelectBox value={country} options={COUNTRIES} onChange={setCountry} /></div>
          </div>
        </Field>
        <Field label="DEFAULT CURRENCY">
          <SelectBox value={currency} options={CURRENCIES} onChange={setCurrency} />
        </Field>
        <div style={{ marginTop: 8, display: "flex", gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ ...secondaryBtnStyle(54), flex: 1 }}>Back</button>
          <button disabled={name.trim().length < 2} onClick={submit} style={{ ...primaryBtnStyle(54), flex: 2, opacity: name.trim().length < 2 ? 0.5 : 1 }}>Continue</button>
        </div>
      </div>
    </AuthShell>
  );
}
