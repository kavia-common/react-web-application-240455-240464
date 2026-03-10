import React from "react";
import { useCart } from "../features/cart/CartContext";
import { navigate } from "../routes/router";
import { formatCurrency } from "../utils/format";
import { QuantityStepper } from "../components/cart/QuantityStepper";
import { OrderSummary } from "../components/cart/OrderSummary";

// PUBLIC_INTERFACE
export function CartPage() {
  /** Cart page with editable quantities and order summary. */
  const {
    lines,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    removeItem,
    setQuantity,
    clearCart,
  } = useCart();

  return (
    <div className="stack">
      <div className="page-head">
        <div>
          <h1 className="title">Your cart</h1>
          <p className="muted">
            {itemCount > 0
              ? `${itemCount} item${itemCount === 1 ? "" : "s"} ready to go.`
              : "Your cart is empty. Add something retro-cool."}
          </p>
        </div>
        <div className="row">
          <button className="btn btn-ghost" onClick={() => navigate("#/")}>
            Continue shopping
          </button>
          {itemCount > 0 ? (
            <button className="btn btn-danger" onClick={clearCart}>
              Clear cart
            </button>
          ) : null}
        </div>
      </div>

      {lines.length === 0 ? (
        <section className="card empty">
          <h2 className="card-title">Nothing here yet</h2>
          <p className="muted">
            Browse the catalog and add items to build your order.
          </p>
          <button className="btn" onClick={() => navigate("#/")}>
            Go to shop
          </button>
        </section>
      ) : (
        <div className="two-col">
          <section className="stack" aria-label="Cart items">
            {lines.map((l) => (
              <article key={l.id} className="card line">
                <div className="line-media" aria-hidden="true">
                  {l.image}
                </div>
                <div className="line-body">
                  <div className="line-top">
                    <h3 className="card-title">{l.name}</h3>
                    <div className="price">{formatCurrency(l.price)}</div>
                  </div>
                  <div className="line-actions">
                    <QuantityStepper
                      value={l.quantity}
                      onChange={(q) => setQuantity(l.id, q)}
                      label={`Quantity for ${l.name}`}
                    />
                    <button
                      className="btn btn-ghost"
                      onClick={() => removeItem(l.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="line-total">
                  <div className="muted small">Line total</div>
                  <div className="price">
                    {formatCurrency(l.price * l.quantity)}
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="stack" aria-label="Cart summary">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />
            <button className="btn btn-large" onClick={() => navigate("#/checkout")}>
              Checkout
            </button>
            <p className="muted small">
              Demo checkout only (no payment processing).
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
