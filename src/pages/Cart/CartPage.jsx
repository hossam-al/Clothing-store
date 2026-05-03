import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCartItem } from "../../api/cartApi";
import Button from "../../components/Button/Button";
import { mockProducts } from "../../data/mockProducts";
import { mapCartItems, unwrapCartItems } from "../../utils/cartMapper";
import styles from "./CartPage.module.css";

const previewCartItems = mockProducts.slice(0, 3).map((item) => ({
  ...item,
  quantity: 1,
}));

function CartPage() {
  const [cartItems, setCartItems] = useState(previewCartItems);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadCart() {
      setIsLoading(true);
      setMessage("");

      try {
        const response = await getCart();
        const items = mapCartItems(unwrapCartItems(response));

        if (isMounted) {
          setCartItems(items.length ? items : []);
        }
      } catch {
        if (isMounted) {
          setCartItems(previewCartItems);
          setMessage("Login to view your live cart. Showing preview items.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCart();

    return () => {
      isMounted = false;
    };
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

  const handleQuantityChange = async (itemId, nextQuantity) => {
    const quantity = Math.max(nextQuantity, 1);
    setCartItems((current) =>
      current.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
    );

    try {
      await updateCartItem(itemId, quantity);
    } catch {
      setMessage("Quantity updated locally. Login is required for live cart sync.");
    }
  };

  const handleRemove = async (itemId) => {
    setCartItems((current) => current.filter((item) => item.id !== itemId));

    try {
      await removeFromCart(itemId);
    } catch {
      setMessage("Item removed locally. Login is required for live cart sync.");
    }
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className="page-title">
          <h1>Cart</h1>
          <p className="text-muted-store">Selected products and order summary.</p>
        </div>

        {isLoading && <p className={styles.status}>Loading cart...</p>}
        {message && <p className={styles.status}>{message}</p>}

        <div className={styles.layout}>
          <section className={styles.items}>
            {cartItems.map((item) => (
              <article className={styles.cartItem} key={item.id}>
                <div className={`${styles.image} ${styles[item.tone]}`}>
                  {item.image && <img alt={item.name} src={item.image} />}
                </div>
                <div>
                  <h2>{item.name}</h2>
                  <p>{item.category}</p>
                  <div className={styles.quantity}>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      type="button"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      type="button"
                    >
                      +
                    </button>
                    <button onClick={() => handleRemove(item.id)} type="button">
                      Remove
                    </button>
                  </div>
                </div>
                <strong>${Number(item.price || 0) * Number(item.quantity || 1)}</strong>
              </article>
            ))}
          </section>

          <aside className={styles.summary}>
            <h2>Order Total</h2>
            <div>
              <span>Subtotal</span>
              <strong>${total}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <strong>$12</strong>
            </div>
            <div className={styles.grandTotal}>
              <span>Total</span>
              <strong>${total + 12}</strong>
            </div>
            <Button to="/checkout" variant="orange">
              Checkout
            </Button>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
