import MuiButton from "@mui/material/Button";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { faqItems } from "./productDetailsData";
import styles from "../ProductDetailsPage.module.css";

function ProductFaq() {
  const [openItem, setOpenItem] = useState(faqItems[0]?.id || "");

  return (
    <section className={`${styles.panel} ${styles.faqSection}`} dir="rtl">
      <h2>الاستفسارات الشائعة</h2>

      <div className={styles.faqList}>
        {faqItems.map((item) => {
          const isOpen = openItem === item.id;

          return (
            <article className={styles.faqItem} key={item.id}>
              <MuiButton
                aria-expanded={isOpen}
                className={styles.faqQuestion}
                onClick={() => setOpenItem(isOpen ? "" : item.id)}
                type="button"
              >
                <span>{item.question}</span>
                <FaChevronDown className={isOpen ? styles.faqIconOpen : ""} />
              </MuiButton>

              {isOpen && <p className={styles.faqAnswer}>{item.answer}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ProductFaq;
