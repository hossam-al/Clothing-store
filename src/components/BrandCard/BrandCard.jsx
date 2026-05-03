import styles from "./BrandCard.module.css";

function BrandCard({ brand }) {
  return (
    <article className={styles.card}>
      <div className={styles.mark}>{brand.name.slice(0, 2)}</div>
      <div>
        <h3>{brand.name}</h3>
        <p>{brand.type}</p>
      </div>
    </article>
  );
}

export default BrandCard;
