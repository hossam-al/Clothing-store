import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import {
  getWishlistItems,
  removeWishlistItem,
} from "../../utils/wishlistStorage";
import styles from "./WishlistPage.module.css";

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(() => getWishlistItems());

  useEffect(() => {
    const syncWishlist = () => setWishlistItems(getWishlistItems());

    window.addEventListener("wishlist-updated", syncWishlist);

    return () => {
      window.removeEventListener("wishlist-updated", syncWishlist);
    };
  }, []);

  const handleRemove = (productId) => {
    setWishlistItems(removeWishlistItem(productId));
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className="page-title">
          <h1>Wishlist</h1>
          <p className="text-muted-store">Saved products ready for later.</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className={styles.empty}>
            <h2>No saved products yet</h2>
            <p>Add products from the shop to keep them here.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {wishlistItems.map((product) => (
              <div className={styles.item} key={product.id}>
                <ProductCard product={product} />
                <button onClick={() => handleRemove(product.id)} type="button">
                  Remove from Wishlist
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default WishlistPage;
