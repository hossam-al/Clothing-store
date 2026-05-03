import { Link } from "react-router-dom";
import styles from "./SectionHeader.module.css";

function SectionHeader({ eyebrow, title, text, actionLabel, actionTo = "/products" }) {
  return (
    <div className={styles.header}>
      <div>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {actionLabel && (
        <Link className={styles.action} to={actionTo}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default SectionHeader;
