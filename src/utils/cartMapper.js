export function unwrapCartItems(response) {
  const payload = response?.data;
  const data = payload?.data || payload;

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data?.cart_items)) {
    return data.cart_items;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return Array.isArray(data) ? data : [];
}

export function mapCartItem(item, index = 0) {
  const variant = item?.variant || item?.product_variant || {};
  const product = item?.product || variant?.product || {};
  const price = Number(
    item?.price ||
      item?.unit_price ||
      variant?.final_price ||
      variant?.price ||
      product?.final_price ||
      product?.price ||
      0,
  );

  return {
    id: item?.id || `${product?.id || "item"}-${index}`,
    name: product?.name_en || product?.name_ar || item?.name || "Cart item",
    category:
      product?.category?.name_en || product?.category?.name_ar || "Streetwear",
    price,
    quantity: Number(item?.quantity || 1),
    image: variant?.primary_image || product?.primary_image || product?.cover_image || "",
    tone: ["purple", "orange", "mono"][index % 3],
  };
}

export function mapCartItems(items = []) {
  return items.map((item, index) => mapCartItem(item, index));
}
