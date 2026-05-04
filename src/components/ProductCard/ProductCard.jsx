import MuiButton from "@mui/material/Button";
import { FaHeart, FaShoppingBag, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <Link className={styles.media} to={`/products/${product.id}`}>
        <img alt={product.name} src={product.image} />
        {product.discount && <span className={styles.badge}>{product.discount}</span>}
        <MuiButton
          aria-label="Add to wishlist"
          className={styles.wishlist}
          type="button"
        >
          <FaHeart />
        </MuiButton>
      </Link>

      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>
        <h3>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <div className={styles.rating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} />
          ))}
          <span>{product.rating}</span>
        </div>
        <div className={styles.priceRow}>
          <strong>${product.price}</strong>
          {product.oldPrice && <span>${product.oldPrice}</span>}
        </div>
        <MuiButton className={styles.cartButton} type="button">
          <FaShoppingBag />
          Add to Cart
        </MuiButton>
      </div>
    </article>
  );
}

export default ProductCard;
