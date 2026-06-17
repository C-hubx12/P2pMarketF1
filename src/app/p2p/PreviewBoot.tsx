import * as React from "react";
import { Offer } from "../offers/OfferStore";

const PREVIEW_KEY = "chx_preview_v1";
const USER_KEY = "chx_user_v1";
const OFFERS_KEY = "chx_offers_v1";

export function isPreviewMode() {
  try { return localStorage.getItem(PREVIEW_KEY) === "1"; } catch { return false; }
}
export function setPreviewMode(on: boolean) {
  try { on ? localStorage.setItem(PREVIEW_KEY, "1") : localStorage.removeItem(PREVIEW_KEY); } catch {}
}

const MOCK_USER = {
  email: "demo@coinhubx.io",
  phone: "+44 7700 900 123",
  name: "Alex Morgan",
  country: "GB",
  currency: "GBP",
  twoFA: true,
  payment: { method: "Bank Transfer", details: "HSBC · GB29 NWBK 6016 1331 9268 19" },
  terms: "Verified Seller · KYC Tier 2",
};

const MOCK_OFFERS: Offer[] = [
  { id: "preview-1",  side: "sell", asset: "USDT", price: "1.001",  available: "12,450", min: "50",  max: "5,000",  methods: ["Bank Transfer", "Revolut"] as any, terms: "Fast release · ID required for >£1,000", ownerName: "QuickSwap Pro", rating: 4.97, trades: 8421,  createdAt: Date.now() },
  { id: "preview-2",  side: "sell", asset: "USDT", price: "1.002",  available: "5,200",  min: "100", max: "2,500",  methods: ["Wise", "SEPA"] as any,             terms: "Online 24/7 · No screenshots",            ownerName: "FiatBridge",    rating: 4.92, trades: 3120,  createdAt: Date.now() },
  { id: "preview-3",  side: "buy",  asset: "USDT", price: "0.998",  available: "20,000", min: "200", max: "10,000", methods: ["Bank Transfer"] as any,            terms: "Verified buyer · Prompt payer",           ownerName: "BlueWhale",     rating: 4.99, trades: 12044, createdAt: Date.now() },
  { id: "preview-4",  side: "sell", asset: "BTC",  price: "62,140", available: "0.84",   min: "100", max: "5,000",  methods: ["Wise"] as any,                     terms: "Same-day release",                        ownerName: "CryptoHaven",   rating: 4.88, trades: 982,   createdAt: Date.now() },
];

/** Seeds preview state synchronously before any Provider reads localStorage. */
export function seedPreviewIfNeeded() {
  try {
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    
    // Always seed in the Figma preview environment to prevent auth walls
    localStorage.setItem(PREVIEW_KEY, "1");

    if (!localStorage.getItem(USER_KEY)) {
      localStorage.setItem(USER_KEY, JSON.stringify(MOCK_USER));
    }
    const raw = localStorage.getItem(OFFERS_KEY);
    const list: Offer[] = raw ? JSON.parse(raw) : [];
    let changed = false;
    MOCK_OFFERS.forEach((m) => {
      if (!list.find((o) => o.id === m.id)) { list.unshift(m); changed = true; }
    });
    if (changed) localStorage.setItem(OFFERS_KEY, JSON.stringify(list));
  } catch {}
}

export function exitPreview() {
  try {
    localStorage.removeItem(PREVIEW_KEY);
    localStorage.removeItem(USER_KEY);
    const raw = localStorage.getItem(OFFERS_KEY);
    if (raw) {
      const list: Offer[] = JSON.parse(raw);
      const filtered = list.filter((o) => !o.id.startsWith("preview-"));
      localStorage.setItem(OFFERS_KEY, JSON.stringify(filtered));
    }
  } catch {}
}
