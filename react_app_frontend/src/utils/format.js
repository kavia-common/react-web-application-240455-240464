// PUBLIC_INTERFACE
export function formatCurrency(amount) {
  /** Formats a number as USD currency. */
  const value = Number(amount || 0);
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(value);
}
