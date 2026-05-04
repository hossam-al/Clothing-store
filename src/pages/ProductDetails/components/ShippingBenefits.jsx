import { benefitItems } from "./productDetailsData";
import styles from "../ProductDetailsPage.module.css";

function ShippingBenefits() {
  return (
    <section className={styles.benefitsGrid}>
      {benefitItems.map((item) => {
        const Icon = item.icon;

        return (
          <article className={styles.benefitCard} key={item.title}>
            <span>
              <Icon />
            </span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default ShippingBenefits;
