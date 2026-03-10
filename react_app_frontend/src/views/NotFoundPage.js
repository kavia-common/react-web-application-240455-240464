import React from "react";
import { navigate } from "../routes/router";

// PUBLIC_INTERFACE
export function NotFoundPage() {
  /** Fallback page for unknown routes. */
  return (
    <div className="stack">
      <h1 className="title">Page not found</h1>
      <p className="muted">
        That route doesn’t exist. Use the navigation to return to the shop.
      </p>
      <button className="btn" onClick={() => navigate("#/")}>
        Go to shop
      </button>
    </div>
  );
}
