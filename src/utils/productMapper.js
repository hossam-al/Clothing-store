export function unwrapListResponse(response) {
  const payload = response?.data;

  if (Array.isArray(payload?.data?.data)) {
    return {
      items: payload.data.data,
      meta: payload.data.meta || null,
    };
  }

  if (Array.isArray(payload?.data)) {
    return {
      items: payload.data,
      meta: payload.meta || null,
    };
  }

  return {
    items: Array.isArray(payload) ? payload : [],
    meta: null,
  };
}

export function unwrapItemResponse(response) {
  const payload = response?.data;

  if (payload?.data?.id) {
    return payload.data;
  }

  if (payload?.data?.data?.id) {
    return payload.data.data;
  }

  return payload;
}

export function mapApiProduct(product, index = 0) {
  const firstVariant = product?.variants?.[0];
  const price = Number(product?.final_price || firstVariant?.final_price || product?.price || 0);
  const oldPrice = product?.has_discount
    ? Number(product?.price || firstVariant?.price || price)
    : null;

  return {
    id: product?.id,
    name: product?.name_en || product?.name_ar || "Product",
    description:
      product?.description_en ||
      product?.description_ar ||
      "Streetwear product ready for cart and checkout.",
    category:
      product?.category?.name_en || product?.category?.name_ar || "Streetwear",
    categoryId: product?.category_id,
    brand: product?.brand?.name_en || product?.brand?.name_ar || "",
    price,
    oldPrice,
    badge: product?.has_discount ? "Sale" : product?.is_featured ? "Best" : "New",
    color: firstVariant?.color || "Default",
    size: firstVariant?.size || "One Size",
    image:
      product?.primary_image ||
      product?.cover_image ||
      firstVariant?.primary_image ||
      "",
    images: collectProductImages(product),
    variants: product?.variants || [],
    hasDiscount: Boolean(product?.has_discount),
    isFeatured: Boolean(product?.is_featured),
    rating: Number(product?.average_rating || 0),
    reviewsCount: Number(product?.reviews_count || 0),
    tone: ["purple", "orange", "mono"][index % 3],
  };
}

export function collectProductImages(product) {
  const productImages = [
    product?.primary_image,
    product?.cover_image,
    ...(product?.images || []).map((image) => image.url || image),
    ...(product?.legacy_gallery_images || []).map((image) => image.url || image),
  ];

  const variantImages = (product?.variants || []).flatMap((variant) => [
    variant.primary_image,
    ...(variant.images || []).map((image) => image.url || image),
    ...(variant.gallery_images || []).map((image) => image.url || image),
  ]);

  return [...new Set([...productImages, ...variantImages].filter(Boolean))];
}

export function mapApiProducts(products = []) {
  return products.map((product, index) => mapApiProduct(product, index));
}
