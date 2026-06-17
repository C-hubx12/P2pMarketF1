import { createBrowserRouter, Navigate } from "react-router";
import MarketplacePage from "./pages/MarketplacePage";
import BuySetup from "./pages/buy/BuySetup";
import BuyConfirm from "./pages/buy/BuyConfirm";
import BuyPayment from "./pages/buy/BuyPayment";
import BuyWaiting from "./pages/buy/BuyWaiting";
import BuyComplete from "./pages/buy/BuyComplete";
import SellSetup from "./pages/sell/SellSetup";
import SellConfirm from "./pages/sell/SellConfirm";
import SellLocked from "./pages/sell/SellLocked";
import SellRelease from "./pages/sell/SellRelease";
import SellComplete from "./pages/sell/SellComplete";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import EmailVerify from "./pages/auth/EmailVerify";
import PhoneVerify from "./pages/auth/PhoneVerify";
import Profile from "./pages/auth/Profile";
import TwoFA from "./pages/auth/TwoFA";
import PaymentSetup from "./pages/auth/PaymentSetup";
import SellerTerms from "./pages/auth/SellerTerms";
import CreateOffer from "./pages/offer/CreateOffer";
import OfferPublished from "./pages/offer/OfferPublished";
import OrderDetails from "./pages/order/OrderDetails";
import MyAds from "./pages/dashboard/MyAds";
import TradeHistory from "./pages/dashboard/TradeHistory";
import ProfilePage from "./pages/ProfilePage";
import { seedPreviewIfNeeded } from "./p2p/PreviewBoot";
import PreviewIndex from "./pages/PreviewIndex";

seedPreviewIfNeeded();

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/p2p" replace /> },
  { path: "/preview", Component: PreviewIndex },
  { path: "/p2p", Component: MarketplacePage },
  { path: "/p2p/buy", Component: BuySetup },
  { path: "/p2p/buy/confirm", Component: BuyConfirm },
  { path: "/p2p/buy/payment", Component: BuyPayment },
  { path: "/p2p/buy/waiting", Component: BuyWaiting },
  { path: "/p2p/buy/complete", Component: BuyComplete },
  { path: "/p2p/sell", Component: SellSetup },
  { path: "/p2p/sell/confirm", Component: SellConfirm },
  { path: "/p2p/sell/locked", Component: SellLocked },
  { path: "/p2p/sell/release", Component: SellRelease },
  { path: "/p2p/sell/complete", Component: SellComplete },
  { path: "/p2p/create", Component: CreateOffer },
  { path: "/p2p/offer-published/:id", Component: OfferPublished },
  { path: "/p2p/order/:id", Component: OrderDetails },
  { path: "/p2p/profile/:username", Component: ProfilePage },
  { path: "/p2p/my-ads", Component: MyAds },
  { path: "/p2p/history", Component: TradeHistory },

  // Preview routes — no auth required, seeded mock data
  { path: "/p2p/buy-preview", Component: BuySetup },
  { path: "/p2p/buy/confirm-preview", Component: BuyConfirm },
  { path: "/p2p/buy/payment-preview", Component: BuyPayment },
  { path: "/p2p/order-preview", Component: BuyWaiting },
  { path: "/p2p/sell-preview", Component: SellSetup },
  { path: "/p2p/create-ad-preview", Component: CreateOffer },
  { path: "/p2p/profile-setup-preview", Component: Profile },
  { path: "/p2p/order-details-preview", Component: OrderDetails },
  { path: "/p2p/dispute-preview", Component: OrderDetails },

  { path: "/auth/signup", Component: Signup },
  { path: "/auth/login", Component: Login },
  { path: "/auth/email", Component: EmailVerify },
  { path: "/auth/phone", Component: PhoneVerify },
  { path: "/auth/profile", Component: Profile },
  { path: "/auth/2fa", Component: TwoFA },
  { path: "/auth/payment-setup", Component: PaymentSetup },
  { path: "/auth/terms", Component: SellerTerms },
  { path: "*", element: <Navigate to="/p2p" replace /> },
]);