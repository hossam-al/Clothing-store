import MuiButton from "@mui/material/Button";
import { useState } from "react";
import { tabs } from "./productDetailsData";
import styles from "../ProductDetailsPage.module.css";

function ProductDetailsTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <section className={styles.panel}>
      <div className={styles.tabs}>
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <MuiButton
              className={activeTab === tab.id ? styles.activeTab : ""}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              <Icon />
              {tab.label}
            </MuiButton>
          );
        })}
      </div>

      <div className={styles.tabBody}>
        {activeTab === "description" && (
          <div>
            <h2>Made for everyday city movement</h2>
            <p>
              {product.description ||
                "Designed for easy layering and all-day wear, this piece balances a relaxed streetwear shape with polished finishing details."}
            </p>
            <ul>
              <li>Relaxed clothing-store fit with clean finishing.</li>
              <li>Easy to pair with sneakers, denim, cargos, and accessories.</li>
              <li>Built for repeated everyday styling.</li>
            </ul>
          </div>
        )}

        {activeTab === "specs" && (
          <div className={styles.specGrid}>
            <div>
              <span>Fit</span>
              <strong>Relaxed / Streetwear</strong>
            </div>
            <div>
              <span>Category</span>
              <strong>{product.category || "Clothing"}</strong>
            </div>
            <div>
              <span>Brand</span>
              <strong>Urban Wear</strong>
            </div>
            <div>
              <span>Availability</span>
              <strong>Ready to ship</strong>
            </div>
          </div>
        )}

        {activeTab === "care" && (
          <div>
            <h2>Materials & Care</h2>
            <p>
              Wash cold with similar colors. Avoid bleach. Air dry when possible to
              protect color, shape, and fabric texture.
            </p>
            <ul>
              <li>Soft cotton-blend feel.</li>
              <li>Machine washable on gentle cycle.</li>
              <li>Iron inside out on low heat if needed.</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductDetailsTabs;
