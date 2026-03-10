import React from "react";
import { formatCurrency } from "../../utils/format";

// PUBLIC_INTERFACE
export function OrderSummary({ subtotal, shipping, tax, total }) {
  /** Displays pricing breakdown. */
  return (
    <section className="card summary" aria-label="Order summary">
      <h3 className="card-title">Order summary</h3>
      <dl className="summary-grid">
        <div className="summary-row">
          <dt className="muted">Subtotal</dt>
          <dd className="summary-val">{formatCurrency(subtotal)}</dd>
        </div>
        <div className="summary-row">
          <dt className="muted">Shipping</dt>
          <dd className="summary-val">{formatCurrency(shipping)}</dd>
        </div>
        <div className="summary-row">
          <dt className="muted">Estimated tax</dt>
          <dd className="summary-val">{formatCurrency(tax)}</dd>
        </div>
        <div className="summary-divider" role="separator" />
        <div className="summary-row total">
          <dt>Total</dt>
          <dd className="summary-val">{formatCurrency(total)}</dd>
        </div>
      </dl>
      <p className="muted small">
        Taxes and shipping are estimated for demo purposes.
      </p>
    </section>
  );
}
