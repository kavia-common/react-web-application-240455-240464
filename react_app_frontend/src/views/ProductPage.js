import React, { useMemo, useState } from "react";
import { getProductById } from "../data/products";
import { navigate } from "../routes/router";
import { formatCurrency } from "../utils/format";
import { useCart } from "../features/cart/CartContext";
import { QuantityStepper } from "../components/cart/QuantityStepper";

// PUBLIC_INTERFACE
export function ProductPage({ productId }) {
  /** Product detail view. */
  const product = useMemo(() => getProductById(productId), [productId]);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="stack">
        <h1 className="title">Product not found</h1>
        <p className="muted">That item doesn’t exist in the demo catalog.</p>
        <div>
          <button className="btn" onClick={() => navigate("#/")}>
            Back to shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="breadcrumbs">
        <button className="link" onClick={() => navigate("#/")}>
          Shop
        </button>
        <span className="muted">/</span>
        <span>{product.name}</span>
      </div>

      <section className="card product-detail">
        <div className="product-detail-media" aria-hidden="true">
          <div className="product-detail-emoji">{product.image}</div>
          {product.badge ? <div className="badge">{product.badge}</div> : null}
        </div>

        <div className="product-detail-body">
          <h1 className="title small">{product.name}</h1>
          <p className="subtitle">{product.description}</p>

          <ul className="list">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <div className="product-detail-actions">
            <div className="price big">{formatCurrency(product.price)}</div>
            <QuantityStepper value={qty} onChange={setQty} />
            <button
              className="btn btn-large"
              onClick={() => {
                addItem(product, qty);
                navigate("#/cart");
              }}
            >
              Add to cart
            </button>
            <button className="btn btn-ghost" onClick={() => navigate("#/")}>
              Continue shopping
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
