import { FaRegStar, FaStar } from "react-icons/fa";
import { mockProducts } from "../../../data/mockProducts";

export function renderStars(rating) {
  return [1, 2, 3, 4, 5].map((star) =>
    star <= Math.round(rating || 0) ? <FaStar key={star} /> : <FaRegStar key={star} />,
  );
}

export function getProductGalleryImages(product) {
  const directImages = product.images?.length ? product.images : [product.image];
  const relatedImages = mockProducts
    .filter((item) => item.id !== product.id)
    .map((item) => item.image);

  return Array.from(new Set([...directImages, ...relatedImages].filter(Boolean))).slice(
    0,
    6,
  );
}
