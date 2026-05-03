import { useMemo, useState } from "react";
import { WishlistContext } from "./wishlistContextValue";

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  const value = useMemo(
    () => ({ wishlistItems, setWishlistItems }),
    [wishlistItems],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}
