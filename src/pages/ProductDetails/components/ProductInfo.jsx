import MuiButton from "@mui/material/Button";
import { FaHeart, FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import { renderStars } from "./productDetailsHelpers";
import styles from "../ProductDetailsPage.module.css";

function ProductInfo({
  cartMessage,
  colors,
  handleAddToCart,
  product,
  quantity,
  selectedColor,
  selectedSize,
  setQuantity,
  setSelectedColor,
  setSelectedSize,
  sizes,
}) {
  const isInStock =
    product.stock === undefined ||
    Number(product.stock) > 0 ||
    product.variants?.some((variant) => Number(variant.stock || 0) > 0);

  return (
    <section className={styles.infoCard}>
      <div className={styles.metaRow}>
        <span className={styles.category}>
          {product.category || "Streetwear"}
        </span>
        <span className={isInStock ? styles.stockIn : styles.stockOut}>
          {isInStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <h1>{product.name}</h1>

      <div className={styles.ratingLine}>
        <span className={styles.stars}>{renderStars(product.rating)}</span>
        <strong>{Number(product.rating || 4.8).toFixed(1)}</strong>
        <span>128 reviews</span>
      </div>

      <div className={styles.priceRow}>
        <strong>${product.price}</strong>
        {product.oldPrice && <span>${product.oldPrice}</span>}
        {product.discount && <em>{product.discount}</em>}
      </div>

      <p className={styles.shortDescription}>
        {product.description ||
          "A refined streetwear essential with a clean silhouette, comfortable daily fit, and premium casual finish."}
      </p>

      {/* <div className={styles.productFacts}>
        <div>
          <span>SKU</span>
          <strong>UW-{String(product.id).padStart(4, "0")}</strong>
        </div>
        <div>
          <span>Category</span>
          <strong>{product.category || "Clothing"}</strong>
        </div>
        <div>
          <span>Brand</span>
          <strong>Urban Wear</strong>
        </div>
      </div> */}

      <div className={styles.optionGroup}>
        <div className={styles.optionHeader}>
          <h2>Color</h2>
          <span>{selectedColor}</span>
        </div>
        <div className={styles.colorOptions}>
          {colors.map((color) => (
            <MuiButton
              className={selectedColor === color ? styles.selectedOption : ""}
              key={color}
              onClick={() => setSelectedColor(color)}
              type="button"
            >
              <span
                className={styles.colorSwatch}
                style={{ "--swatch": color.toLowerCase() }}
              />
              {color}
            </MuiButton>
          ))}
        </div>
      </div>

      <div className={styles.optionGroup}>
        <div className={styles.optionHeader}>
          <h2>Size</h2>
          <span>{selectedSize}</span>
        </div>
        <div className={styles.sizeOptions}>
          {sizes.map((size) => (
            <MuiButton
              className={selectedSize === size ? styles.selectedOption : ""}
              key={size}
              onClick={() => setSelectedSize(size)}
              type="button"
            >
              {size}
            </MuiButton>
          ))}
        </div>
      </div>

      <div className={styles.purchaseRow}>
        <div className={styles.quantity}>
          <MuiButton
            onClick={() => setQuantity((current) => Math.max(current - 1, 1))}
            type="button"
          >
            <FaMinus />
          </MuiButton>
          <span>{quantity}</span>
          <MuiButton
            onClick={() => setQuantity((current) => current + 1)}
            type="button"
          >
            <FaPlus />
          </MuiButton>
        </div>

        <div className={styles.actions}>
          <Button
            disabled={!isInStock}
            onClick={handleAddToCart}
            variant="orange"
          >
            <FaShoppingBag />
            Add to Cart
          </Button>
          <Button variant="outline">
            <FaHeart />
            Add to Wishlist
          </Button>
        </div>
      </div>

      {cartMessage && <p className={styles.cartMessage}>{cartMessage}</p>}
    </section>
  );
}

export default ProductInfo;
