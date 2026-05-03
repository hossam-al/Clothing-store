import { useEffect, useState } from "react";
import { getOrders } from "../../api/orderApi";
import { mapOrders, unwrapOrders } from "../../utils/orderMapper";
import styles from "./OrdersPage.module.css";

const previewOrders = ["ORD-1001", "ORD-1002", "ORD-1003"].map((id, index) => ({
  id,
  itemsCount: index + 1,
  notes: "Order preview ready for API data.",
  status: index === 0 ? "Processing" : "Delivered",
  total: 0,
}));

function OrdersPage() {
  const [orders, setOrders] = useState(previewOrders);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadOrders() {
      setIsLoading(true);
      setMessage("");

      try {
        const response = await getOrders();
        const mappedOrders = mapOrders(unwrapOrders(response));

        if (isMounted) {
          setOrders(mappedOrders.length ? mappedOrders : []);
        }
      } catch {
        if (isMounted) {
          setOrders(previewOrders);
          setMessage("Login to view your live orders. Showing preview orders.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className="container">
        <div className="page-title">
          <h1>Orders</h1>
          <p className="text-muted-store">Customer order history.</p>
        </div>

        {isLoading && <p className={styles.status}>Loading orders...</p>}
        {message && <p className={styles.status}>{message}</p>}

        <div className={styles.orders}>
          {orders.map((order) => (
            <article key={order.id}>
              <div>
                <h2>{order.id}</h2>
                <p>
                  {order.itemsCount} item package.{" "}
                  {order.total ? `Total $${order.total}.` : order.notes}
                </p>
              </div>
              <span>{order.status}</span>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default OrdersPage;
