import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./auth/AuthContext";
import { OfferProvider } from "./offers/OfferStore";

export default function App() {
  return (
    <AuthProvider>
      <OfferProvider>
        <RouterProvider router={router} />
      </OfferProvider>
    </AuthProvider>
  );
}
