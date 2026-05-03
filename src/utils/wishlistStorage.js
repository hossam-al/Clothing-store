const WISHLIST_KEY = "wishlist_items";

export function getWishlistItems() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveWishlistItems(items) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

export function addWishlistItem(product) {
  const items = getWishlistItems();
  const exists = items.some((item) => item.id === product.id);

  if (!exists) {
    saveWishlistItems([...items, product]);
  }

  window.dispatchEvent(new Event("wishlist-updated"));

  return !exists;
}

export function removeWishlistItem(productId) {
  const items = getWishlistItems().filter((item) => item.id !== productId);
  saveWishlistItems(items);
  window.dispatchEvent(new Event("wishlist-updated"));
  return items;
}
