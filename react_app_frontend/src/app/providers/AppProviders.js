import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { CartProvider } from "../../features/cart/CartContext";

// PUBLIC_INTERFACE
export function AppProviders({ children }) {
  /** Composes all app-level context providers. */
  return (
    <ThemeProvider>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}
