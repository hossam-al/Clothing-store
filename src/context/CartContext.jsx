import { useMemo, useState } from "react";
import { CartContext } from "./cartContextValue";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const value = useMemo(() => ({ cartItems, setCartItems }), [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
