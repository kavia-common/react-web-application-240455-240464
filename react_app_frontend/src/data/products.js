/**
 * Simple mock catalog data.
 * No backend required for this task; can be swapped with an API later.
 */

const products = [
  {
    id: "wave-101",
    name: "Ocean Wave Keyboard",
    price: 129.0,
    badge: "Best Seller",
    description:
      "A tactile retro-inspired mechanical keyboard with a modern ocean-blue finish and amber accent keys.",
    details: [
      "Hot-swappable switches",
      "USB-C braided cable",
      "Warm amber backlight modes",
    ],
    image: "⌨️",
    category: "Desk",
  },
  {
    id: "signal-202",
    name: "Amber Signal Headphones",
    price: 89.0,
    badge: "New",
    description:
      "Comfort-fit headphones tuned for focus—clean mids, crisp highs, and just enough bass.",
    details: ["40mm drivers", "Fold-flat design", "3.5mm + USB-C adapter"],
    image: "🎧",
    category: "Audio",
  },
  {
    id: "tide-303",
    name: "Tide Glass Water Bottle",
    price: 24.0,
    badge: "Eco",
    description:
      "Minimal glass bottle with a protective sleeve. Hydration that looks good on camera.",
    details: ["BPA-free", "550ml", "Silicone sleeve"],
    image: "🫙",
    category: "Lifestyle",
  },
  {
    id: "dock-404",
    name: "Blue Dock Charging Stand",
    price: 39.0,
    badge: "Workstation",
    description:
      "A compact charging dock that keeps your essentials aligned and your desk looking sharp.",
    details: ["USB-C input", "Non-slip base", "Cable management channel"],
    image: "🔌",
    category: "Desk",
  },
  {
    id: "atlas-505",
    name: "Retro Atlas Notebook",
    price: 16.0,
    badge: "Analog",
    description:
      "Dot-grid notebook with smooth pages and a subtle ocean gradient cover.",
    details: ["A5 size", "180 pages", "Lay-flat binding"],
    image: "📓",
    category: "Stationery",
  },
  {
    id: "flare-606",
    name: "Amber Flare Desk Lamp",
    price: 54.0,
    badge: "Warm Light",
    description:
      "Soft warm lighting with a minimalist silhouette. Switch between focus and cozy modes.",
    details: ["Touch dimmer", "2700K–4000K", "Timer mode"],
    image: "💡",
    category: "Desk",
  },
];

// PUBLIC_INTERFACE
export function getProducts() {
  /** Returns all products. */
  return products.slice();
}

// PUBLIC_INTERFACE
export function getProductById(id) {
  /** Returns a product by ID or null if not found. */
  return products.find((p) => p.id === id) || null;
}
