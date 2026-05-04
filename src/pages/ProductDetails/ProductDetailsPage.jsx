import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../../api/cartApi";
import { getProductById } from "../../api/productApi";
import { mockProducts } from "../../data/mockProducts";
import { mapApiProduct, unwrapItemResponse } from "../../utils/productMapper";
import {
  ProductGallery,
  ProductFaq,
  ProductInfo,
  ReviewsSection,
  SimilarProducts,
} from "./components";
import { fallbackColors, fallbackSizes } from "./components/productDetailsData";
import { getProductGalleryImages } from "./components/productDetailsHelpers";
import styles from "./ProductDetailsPage.module.css";

function ProductDetailsPage() {
  const { id } = useParams();
  const fallbackProduct = useMemo(
    () =>
      mockProducts.find((item) => item.id === Number(id)) || mockProducts[0],
    [id],
  );
  const [product, setProduct] = useState(fallbackProduct);
  const [activeImage, setActiveImage] = useState(fallbackProduct.image || "");
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [selectedColor, setSelectedColor] = useState(fallbackColors[0]);
  const [selectedSize, setSelectedSize] = useState(fallbackSizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      try {
        const response = await getProductById(id);
        const item = unwrapItemResponse(response);
        const mappedProduct = mapApiProduct(item);

        if (isMounted) {
          setProduct(mappedProduct);
          setActiveImage(
            mappedProduct.images?.[0] || mappedProduct.image || "",
          );
          setSelectedVariantId(mappedProduct.variants?.[0]?.id || "");
        }
      } catch {
        if (isMounted) {
          setProduct(fallbackProduct);
          setActiveImage(fallbackProduct.image || "");
          setSelectedVariantId("");
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [fallbackProduct, id]);

  const sizes = useMemo(() => {
    const variantSizes = [
      ...new Set(
        product.variants?.map((variant) => variant.size).filter(Boolean),
      ),
    ];

    return variantSizes.length ? variantSizes : fallbackSizes;
  }, [product.variants]);

  const colors = useMemo(() => {
    const variantColors = [
      ...new Set(
        product.variants?.map((variant) => variant.color).filter(Boolean),
      ),
    ];

    return variantColors.length ? variantColors : fallbackColors;
  }, [product.variants]);

  const galleryImages = useMemo(
    () => getProductGalleryImages(product),
    [product],
  );

  const currentSize = sizes.includes(selectedSize) ? selectedSize : sizes[0];
  const currentColor = colors.includes(selectedColor)
    ? selectedColor
    : colors[0];
  const matchingVariant = useMemo(
    () =>
      product.variants?.find(
        (variant) =>
          variant.size === currentSize && variant.color === currentColor,
      ),
    [currentColor, currentSize, product.variants],
  );
  const currentVariantId = matchingVariant?.id || selectedVariantId;

  const handleAddToCart = async () => {
    setCartMessage("");

    if (product.variants?.length && !currentVariantId) {
      setCartMessage("Choose an available color and size first.");
      return;
    }

    try {
      if (currentVariantId) {
        await addToCart({ quantity, variantId: currentVariantId });
      }
      setCartMessage("Product added to cart.");
    } catch (error) {
      setCartMessage(
        error?.response?.data?.message ||
          "Preview item added locally. Login is required for live cart sync.",
      );
    }
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.heroRow}>
          <ProductInfo
            cartMessage={cartMessage}
            colors={colors}
            handleAddToCart={handleAddToCart}
            product={product}
            quantity={quantity}
            selectedColor={currentColor}
            selectedSize={currentSize}
            setQuantity={setQuantity}
            setSelectedColor={setSelectedColor}
            setSelectedSize={setSelectedSize}
            sizes={sizes}
          />
          <ProductGallery
            activeImage={activeImage}
            images={galleryImages}
            productName={product.name}
            setActiveImage={setActiveImage}
          />
        </div>

        {/* <ShippingBenefits /> */}
        <ProductFaq />
        <ReviewsSection product={product} />
        <SimilarProducts product={product} />
      </div>
    </main>
  );
}

export default ProductDetailsPage;
