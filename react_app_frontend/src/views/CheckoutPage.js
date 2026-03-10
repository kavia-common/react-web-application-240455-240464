import React, { useMemo, useState } from "react";
import { useCart } from "../features/cart/CartContext";
import { navigate } from "../routes/router";
import { OrderSummary } from "../components/cart/OrderSummary";

function validateEmail(value) {
  const v = String(value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// PUBLIC_INTERFACE
export function CheckoutPage() {
  /** Checkout page with basic customer/shipping form and order placement. */
  const { lines, itemCount, subtotal, shipping, tax, total, clearCart } =
    useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postal: "",
  });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!validateEmail(form.email)) e.email = "Enter a valid email address.";
    if (!form.address.trim()) e.address = "Address is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.postal.trim()) e.postal = "Postal code is required.";
    if (itemCount === 0) e.cart = "Your cart is empty.";
    return e;
  }, [form, itemCount]);

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

  if (itemCount === 0) {
    return (
      <div className="stack">
        <h1 className="title">Checkout</h1>
        <p className="muted">Your cart is empty. Add items before checking out.</p>
        <button className="btn" onClick={() => navigate("#/")}>
          Go to shop
        </button>
      </div>
    );
  }

  const onChange = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onBlur = (key) => () => setTouched((t) => ({ ...t, [key]: true }));

  return (
    <div className="stack">
      <div className="page-head">
        <div>
          <h1 className="title">Checkout</h1>
          <p className="muted">
            Complete your details and place the demo order.
          </p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate("#/cart")}>
          Back to cart
        </button>
      </div>

      <div className="two-col">
        <section className="card" aria-label="Checkout form">
          <h2 className="card-title">Contact & shipping</h2>

          <div className="form-grid">
            <div className="field">
              <label className="label" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                className="input"
                value={form.name}
                onChange={onChange("name")}
                onBlur={onBlur("name")}
                autoComplete="name"
              />
              {touched.name && errors.name ? (
                <div className="error">{errors.name}</div>
              ) : null}
            </div>

            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="input"
                value={form.email}
                onChange={onChange("email")}
                onBlur={onBlur("email")}
                autoComplete="email"
              />
              {touched.email && errors.email ? (
                <div className="error">{errors.email}</div>
              ) : null}
            </div>

            <div className="field full">
              <label className="label" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                className="input"
                value={form.address}
                onChange={onChange("address")}
                onBlur={onBlur("address")}
                autoComplete="street-address"
              />
              {touched.address && errors.address ? (
                <div className="error">{errors.address}</div>
              ) : null}
            </div>

            <div className="field">
              <label className="label" htmlFor="city">
                City
              </label>
              <input
                id="city"
                className="input"
                value={form.city}
                onChange={onChange("city")}
                onBlur={onBlur("city")}
                autoComplete="address-level2"
              />
              {touched.city && errors.city ? (
                <div className="error">{errors.city}</div>
              ) : null}
            </div>

            <div className="field">
              <label className="label" htmlFor="postal">
                Postal code
              </label>
              <input
                id="postal"
                className="input"
                value={form.postal}
                onChange={onChange("postal")}
                onBlur={onBlur("postal")}
                autoComplete="postal-code"
              />
              {touched.postal && errors.postal ? (
                <div className="error">{errors.postal}</div>
              ) : null}
            </div>
          </div>

          <div className="divider" role="separator" />

          <h3 className="card-title">Items</h3>
          <ul className="mini-list" aria-label="Items in order">
            {lines.map((l) => (
              <li key={l.id} className="mini-row">
                <span className="mini-emoji" aria-hidden="true">
                  {l.image}
                </span>
                <span className="mini-name">{l.name}</span>
                <span className="muted">× {l.quantity}</span>
              </li>
            ))}
          </ul>

          <button
            className="btn btn-large"
            disabled={!canSubmit}
            onClick={async () => {
              setTouched({
                name: true,
                email: true,
                address: true,
                city: true,
                postal: true,
              });
              if (!canSubmit) return;

              setSubmitting(true);
              try {
                // Simulate a short network delay for a realistic flow.
                await new Promise((r) => setTimeout(r, 600));
                clearCart();
                navigate("#/success");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? "Placing order…" : "Place order"}
          </button>

          {!canSubmit && Object.keys(errors).length > 0 ? (
            <p className="muted small">
              Please fix the highlighted fields to continue.
            </p>
          ) : null}
        </section>

        <aside className="stack" aria-label="Checkout summary">
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
          <div className="card note">
            <h3 className="card-title">Demo note</h3>
            <p className="muted small">
              This is a frontend-only demo. No payments are processed and no data
              is stored.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
