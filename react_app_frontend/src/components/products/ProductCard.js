import React from "react";
import { formatCurrency } from "../../utils/format";
import { navigate } from "../../routes/router";
import { useCart } from "../../features/cart/CartContext";

// PUBLIC_INTERFACE
export function ProductCard({ product }) {
  /** Product summary card with quick add-to-cart. */
  const { addItem } = useCart();

  return (
    <article className="card product-card">
      <div className="product-top">
        <div className="product-emoji" aria-hidden="true">
          {product.image}
        </div>
        {product.badge ? <div className="badge">{product.badge}</div> : null}
      </div>

      <div className="product-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="muted">{product.description}</p>
      </div>

      <div className="product-footer">
        <div className="price">{formatCurrency(product.price)}</div>
        <div className="row">
          <button
            className="btn btn-ghost"
            onClick={() => navigate(`#/product/${product.id}`)}
          >
            Details
          </button>
          <button className="btn" onClick={() => addItem(product, 1)}>
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
