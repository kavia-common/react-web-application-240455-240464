import { useEffect, useMemo, useState } from "react";

/**
 * Route format:
 * - "#/" home
 * - "#/product/<id>"
 * - "#/cart"
 * - "#/checkout"
 * - "#/success"
 */

function normalizeHash(hash) {
  const raw = (hash || "").trim();
  if (!raw || raw === "#") return "#/";
  if (raw.startsWith("#/")) return raw;
  if (raw.startsWith("/")) return `#${raw}`;
  if (raw.startsWith("#")) return `#/${raw.slice(1)}`;
  return `#/${raw}`;
}

// PUBLIC_INTERFACE
export function navigate(to) {
  /** Programmatic navigation helper. */
  const next = normalizeHash(to);
  if (window.location.hash !== next) window.location.hash = next;
}

function parseRoute(hash) {
  const h = normalizeHash(hash);
  const path = h.slice(1); // remove "#"
  const segments = path.split("/").filter(Boolean);

  if (segments.length === 0) return { name: "home", params: {} };

  if (segments[0] === "product" && segments[1]) {
    return { name: "product", params: { id: segments[1] } };
  }
  if (segments[0] === "cart") return { name: "cart", params: {} };
  if (segments[0] === "checkout") return { name: "checkout", params: {} };
  if (segments[0] === "success") return { name: "success", params: {} };

  return { name: "notFound", params: {} };
}

// PUBLIC_INTERFACE
export function useRoute() {
  /** Hook that returns current route derived from window.location.hash. */
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return useMemo(() => parseRoute(hash), [hash]);
}
