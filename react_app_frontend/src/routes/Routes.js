import React from "react";
import { useRoute } from "./router";
import { HomePage } from "../views/HomePage";
import { ProductPage } from "../views/ProductPage";
import { CartPage } from "../views/CartPage";
import { CheckoutPage } from "../views/CheckoutPage";
import { SuccessPage } from "../views/SuccessPage";
import { NotFoundPage } from "../views/NotFoundPage";

// PUBLIC_INTERFACE
export function Routes() {
  /** Maps route state to page components. */
  const route = useRoute();

  switch (route.name) {
    case "home":
      return <HomePage />;
    case "product":
      return <ProductPage productId={route.params.id} />;
    case "cart":
      return <CartPage />;
    case "checkout":
      return <CheckoutPage />;
    case "success":
      return <SuccessPage />;
    default:
      return <NotFoundPage />;
  }
}
