import React from "react";
import { navigate } from "../../routes/router";
import { useCart } from "../../features/cart/CartContext";
import { useTheme } from "../../app/providers/ThemeProvider";

// PUBLIC_INTERFACE
export function Navbar() {
  /** Top navigation with brand, links, theme toggle, and cart indicator. */
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar" role="banner">
      <div className="container navbar-inner">
        <button
          className="brand"
          onClick={() => navigate("#/")}
          aria-label="Go to homepage"
        >
          <span className="brand-mark" aria-hidden="true">
            O
          </span>
          <span className="brand-text">
            Ocean<span className="brand-accent">Cart</span>
          </span>
        </button>

        <nav className="nav" aria-label="Primary navigation">
          <button className="nav-link" onClick={() => navigate("#/")}>
            Shop
          </button>
          <button className="nav-link" onClick={() => navigate("#/cart")}>
            Cart
            {itemCount > 0 ? (
              <span className="pill" aria-label={`${itemCount} items in cart`}>
                {itemCount}
              </span>
            ) : null}
          </button>
        </nav>

        <div className="nav-actions">
          <button
            className="btn btn-ghost"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "Dark" : "Light"} mode
          </button>
          <button className="btn" onClick={() => navigate("#/cart")}>
            View cart
          </button>
        </div>
      </div>
    </header>
  );
}
