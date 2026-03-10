import React, { useMemo, useState } from "react";
import { getProducts } from "../data/products";
import { ProductCard } from "../components/products/ProductCard";

// PUBLIC_INTERFACE
export function HomePage() {
  /** Product listing page with simple category filtering and search. */
  const products = useMemo(() => getProducts(), []);
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = category === "All" ? true : p.category === category;
      const matchesQuery = q
        ? `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q)
        : true;
      return matchesCategory && matchesQuery;
    });
  }, [products, query, category]);

  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-inner">
          <div>
            <p className="kicker">Retro theme • Modern checkout</p>
            <h1 className="title">Shop essentials with an ocean-blue glow.</h1>
            <p className="subtitle">
              Browse a small curated catalog. Add to cart, adjust quantities, and
              complete a clean checkout flow.
            </p>
          </div>
          <div className="hero-panel" aria-label="Highlights">
            <div className="hero-stat">
              <div className="hero-stat-val">Blue</div>
              <div className="muted">Primary actions</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">Amber</div>
              <div className="muted">Accents & badges</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">Fast</div>
              <div className="muted">No heavy UI frameworks</div>
            </div>
          </div>
        </div>
      </section>

      <section className="toolbar" aria-label="Product filters">
        <div className="toolbar-row">
          <div className="field">
            <label className="label" htmlFor="search">
              Search
            </label>
            <input
              id="search"
              className="input"
              placeholder="Try “desk”, “amber”, “notebook”…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="muted small">
          Showing <strong>{filtered.length}</strong> of{" "}
          <strong>{products.length}</strong> products
        </div>
      </section>

      <section className="grid" aria-label="Product list">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </div>
  );
}
