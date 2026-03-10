import React, { createContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function clampQty(qty) {
  const n = Number(qty);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(99, Math.round(n)));
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item } = action;
      const existing = state.items[item.id];
      const nextQty = clampQty((existing?.quantity || 0) + (item.quantity || 1));
      return {
        ...state,
        items: {
          ...state.items,
          [item.id]: {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: nextQty,
          },
        },
      };
    }
    case "REMOVE_ITEM": {
      const next = { ...state.items };
      delete next[action.id];
      return { ...state, items: next };
    }
    case "SET_QTY": {
      const existing = state.items[action.id];
      if (!existing) return state;
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: { ...existing, quantity: clampQty(action.quantity) },
        },
      };
    }
    case "CLEAR": {
      return { ...state, items: {} };
    }
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  /** Provides shopping cart state for the app. */
  const [state, dispatch] = useReducer(cartReducer, { items: {} });

  const derived = useMemo(() => {
    const lines = Object.values(state.items);
    const itemCount = lines.reduce((acc, l) => acc + l.quantity, 0);
    const subtotal = lines.reduce((acc, l) => acc + l.price * l.quantity, 0);
    const shipping = subtotal > 0 ? 6.0 : 0.0;
    const tax = subtotal > 0 ? subtotal * 0.0825 : 0.0;
    const total = subtotal + shipping + tax;

    return { lines, itemCount, subtotal, shipping, tax, total };
  }, [state.items]);

  const value = useMemo(() => {
    return {
      ...derived,
      // PUBLIC_INTERFACE
      addItem: (product, quantity = 1) =>
        dispatch({
          type: "ADD_ITEM",
          item: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
          },
        }),
      // PUBLIC_INTERFACE
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
      // PUBLIC_INTERFACE
      setQuantity: (id, quantity) =>
        dispatch({ type: "SET_QTY", id, quantity }),
      // PUBLIC_INTERFACE
      clearCart: () => dispatch({ type: "CLEAR" }),
    };
  }, [derived]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// PUBLIC_INTERFACE
export function useCart() {
  /** Hook to access cart state and actions. */
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
