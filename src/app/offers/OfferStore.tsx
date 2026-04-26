import * as React from "react";
import { PaymentMethod } from "../p2p/PaymentSelect";

export type Offer = {
  id: string;
  side: "buy" | "sell";
  asset: string;
  price: string;
  available: string;
  min: string;
  max: string;
  methods: PaymentMethod[];
  terms: string;
  ownerName: string;
  rating: number;
  trades: number;
  createdAt: number;
};

const KEY = "chx_offers_v1";

function load(): Offer[] {
  try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
function save(list: Offer[]) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
}

type Ctx = { offers: Offer[]; addOffer: (o: Omit<Offer, "id" | "createdAt">) => Offer };
const C = React.createContext<Ctx | null>(null);

export function OfferProvider({ children }: { children: React.ReactNode }) {
  const [offers, setOffers] = React.useState<Offer[]>(() => load());
  const addOffer = React.useCallback((o: Omit<Offer, "id" | "createdAt">) => {
    const newOffer: Offer = { ...o, id: `chx-${Date.now().toString(36)}`, createdAt: Date.now() };
    setOffers((prev) => {
      const next = [newOffer, ...prev];
      save(next);
      return next;
    });
    return newOffer;
  }, []);
  return <C.Provider value={{ offers, addOffer }}>{children}</C.Provider>;
}

export function useOffers() {
  const c = React.useContext(C);
  if (!c) throw new Error("useOffers outside OfferProvider");
  return c;
}
