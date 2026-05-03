export function unwrapOrders(response) {
  const payload = response?.data;
  const data = payload?.data || payload;

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.orders)) {
    return data.orders;
  }

  return Array.isArray(data) ? data : [];
}

export function mapOrder(order, index = 0) {
  return {
    id: order?.id || order?.order_number || `ORD-${1001 + index}`,
    status: order?.status || "Processing",
    total: Number(order?.total || order?.total_price || order?.grand_total || 0),
    notes: order?.notes || "Order ready for API data.",
    itemsCount:
      order?.items_count ||
      order?.items?.length ||
      order?.order_items?.length ||
      index + 1,
  };
}

export function mapOrders(orders = []) {
  return orders.map((order, index) => mapOrder(order, index));
}
