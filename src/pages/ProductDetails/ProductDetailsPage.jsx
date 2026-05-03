import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../../api/cartApi";
import { getProductById } from "../../api/productApi";
import Button from "../../components/Button/Button";
import { mockProducts } from "../../data/mockProducts";
import { mapApiProduct, unwrapItemResponse } from "../../utils/productMapper";
import styles from "./ProductDetailsPage.module.css";

function ProductDetailsPage() {
  const { id } = useParams();
  const fallbackProduct =
    mockProducts.find((item) => item.id === Number(id)) || mockProducts[0];
  const [product, setProduct] = useState(fallbackProduct);
  const [activeImage, setActiveImage] = useState(fallbackProduct.image || "");
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await getProductById(id);
        const item = unwrapItemResponse(response);
        const mappedProduct = mapApiProduct(item);

        if (isMounted) {
          setProduct(mappedProduct);
          setActiveImage(mappedProduct.images[0] || mappedProduct.image || "");
          setSelectedVariantId(mappedProduct.variants[0]?.id || "");
        }
      } catch {
        if (isMounted) {
          setProduct(fallbackProduct);
          setActiveImage(fallbackProduct.image || "");
          setErrorMessage("Could not load this live product. Showing preview details.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [fallbackProduct, id]);

  const sizes = [
    ...new Set(product.variants?.map((variant) => variant.size).filter(Boolean)),
  ];
  const colors = [
    ...new Set(product.variants?.map((variant) => variant.color).filter(Boolean)),
  ];
  const images = product.images?.length ? product.images : [product.image].filter(Boolean);

  const handleAddToCart = async () => {
    setCartMessage("");

    if (!selectedVariantId) {
      setCartMessage("Choose a product variant first.");
      return;
    }

    try {
      await addToCart({ quantity, variantId: selectedVariantId });
      setCartMessage("Product added to cart.");
    } catch (error) {
      setCartMessage(
        error?.response?.data?.message || "Login is required before adding to cart.",
      );
    }
  };

  return (
    <main className={styles.page}>
      <div className="container">
        {isLoading && <p className={styles.status}>Loading product details...</p>}
        {errorMessage && <p className={styles.status}>{errorMessage}</p>}

        <div className={styles.layout}>
          <div className={styles.gallery}>
            <div className={`${styles.mainImage} ${styles[product.tone]}`}>
              {activeImage && <img alt={product.name} src={activeImage} />}
            </div>
            <div className={styles.thumbs}>
              {images.slice(0, 6).map((image) => (
                <button
                  className={activeImage === image ? styles.activeThumb : ""}
                  key={image}
                  onClick={() => setActiveImage(image)}
                  type="button"
                >
                  <img alt={product.name} src={image} />
                </button>
              ))}
            </div>
          </div>

          <section className={styles.info}>
            <span className={styles.category}>{product.category}</span>
            <h1>{product.name}</h1>
            <div className={styles.price}>
              <strong>${product.price}</strong>
              {product.oldPrice && <span>${product.oldPrice}</span>}
            </div>
            <p>{product.description}</p>

            {product.variants?.length > 0 && (
              <div className={styles.optionGroup}>
                <h2>Variant</h2>
                <select
                  onChange={(event) => setSelectedVariantId(event.target.value)}
                  value={selectedVariantId}
                >
                  {product.variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.color} / {variant.size} / Stock {variant.stock}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className={styles.optionGroup}>
              <h2>Sizes</h2>
              <div className={styles.chips}>
                {(sizes.length ? sizes : ["S", "M", "L", "XL"]).map((size) => (
                  <button key={size} type="button">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.optionGroup}>
              <h2>Colors</h2>
              <div className={styles.chips}>
                {(colors.length ? colors : ["Black", "White", "Purple", "Orange"]).map(
                  (color) => (
                    <button key={color} type="button">
                      {color}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className={styles.quantity}>
              <button
                onClick={() => setQuantity((current) => Math.max(current - 1, 1))}
                type="button"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((current) => current + 1)}
                type="button"
              >
                +
              </button>
            </div>

            <div className={styles.actions}>
              <Button onClick={handleAddToCart} variant="orange">
                Add to Cart
              </Button>
              <Button variant="outline">Add to Wishlist</Button>
            </div>
            {cartMessage && <p className={styles.cartMessage}>{cartMessage}</p>}
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailsPage;
