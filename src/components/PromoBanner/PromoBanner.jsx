import { Link } from "react-router-dom";
import styles from "./PromoBanner.module.css";

function PromoBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.badges}>
          <span>New Drop</span>
          <span>Limited</span>
          <span>Hot</span>
        </div>
        <h2>Level Up Your Streetwear Game</h2>
        <p>
          Fresh drops, oversized fits, sneakers, and accessories made for your
          daily look.
        </p>
        <Link to="/products">Explore Now</Link>
      </div>
    </section>
  );
}

export default PromoBanner;
