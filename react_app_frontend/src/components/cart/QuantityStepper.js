import React from "react";

// PUBLIC_INTERFACE
export function QuantityStepper({ value, onChange, label = "Quantity" }) {
  /** Accessible quantity input with increment/decrement controls. */
  const v = Number(value || 1);

  return (
    <div className="qty" aria-label={label}>
      <button
        className="btn btn-ghost btn-icon"
        onClick={() => onChange(Math.max(1, v - 1))}
        aria-label="Decrease quantity"
        type="button"
      >
        −
      </button>
      <input
        className="qty-input"
        value={String(v)}
        inputMode="numeric"
        onChange={(e) => {
          const next = Number(e.target.value);
          if (Number.isFinite(next)) onChange(next);
        }}
        aria-label={label}
      />
      <button
        className="btn btn-ghost btn-icon"
        onClick={() => onChange(Math.min(99, v + 1))}
        aria-label="Increase quantity"
        type="button"
      >
        +
      </button>
    </div>
  );
}
