import Button from "../../../components/Button/Button";
import { reviews } from "./productDetailsData";
import { renderStars } from "./productDetailsHelpers";
import styles from "../ProductDetailsPage.module.css";

function ReviewsSection({ product }) {
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section className={styles.panel}>
      <div className={styles.sectionHeader}>
        <div>
          <span>Customer Reviews</span>
          <h2>What customers are saying</h2>
        </div>
        <Button variant="outline">Write a Review</Button>
      </div>

      <div className={styles.reviewSummary}>
        <strong>{averageRating.toFixed(1)}</strong>
        <div>
          <span className={styles.stars}>{renderStars(averageRating)}</span>
          <p>
            Based on {reviews.length} reviews for {product.name}.
          </p>
        </div>
      </div>

      <div className={styles.reviewsList}>
        {reviews.length ? (
          reviews.map((review) => (
            <article className={styles.reviewCard} key={review.id}>
              <div>
                <strong>{review.name}</strong>
                <span>{review.date}</span>
              </div>
              <span className={styles.stars}>{renderStars(review.rating)}</span>
              <p>{review.text}</p>
            </article>
          ))
        ) : (
          <div className={styles.emptyState}>
            <h3>No reviews yet</h3>
            <p>Be the first to share your thoughts about this product.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ReviewsSection;
