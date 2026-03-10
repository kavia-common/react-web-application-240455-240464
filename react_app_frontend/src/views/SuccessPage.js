import React from "react";
import { navigate } from "../routes/router";

// PUBLIC_INTERFACE
export function SuccessPage() {
  /** Confirmation page shown after placing a demo order. */
  return (
    <div className="stack">
      <section className="card success">
        <div className="success-mark" aria-hidden="true">
          ✓
        </div>
        <h1 className="title">Order placed</h1>
        <p className="subtitle">
          Your demo order is confirmed. Thanks for trying the cart flow.
        </p>
        <div className="row">
          <button className="btn btn-large" onClick={() => navigate("#/")}>
            Back to shop
          </button>
          <button className="btn btn-ghost" onClick={() => navigate("#/cart")}>
            View cart
          </button>
        </div>
      </section>
    </div>
  );
}
