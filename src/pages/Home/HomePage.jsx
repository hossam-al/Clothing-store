import BrandCard from "../../components/BrandCard/BrandCard";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import ProductCard from "../../components/ProductCard/ProductCard";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { mockBrands } from "../../data/mockBrands";
import { latestOffers, mostRequested } from "../../data/mockProducts";
import "../../styles/global.css";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.page}>
      <Header />

      <main>
        <HeroSlider />

        <section className={styles.section}>
          <div className="container">
            <SectionHeader
              eyebrow="Shop by category"
              text="Start with your lane, then build the whole streetwear fit."
              title="Shop By Category"
            />
            <CategorySlider />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader
              eyebrow="Labels that move"
              text="Explore brands known for sneakers, essentials, and everyday style."
              title="Popular Brands"
            />
            <div className={styles.brandGrid}>
              {mockBrands.map((brand) => (
                <BrandCard brand={brand} key={brand.id} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader
              actionLabel="View All Offers"
              actionTo="/products?sale=true"
              eyebrow="Limited prices"
              text="Streetwear offers with real wardrobe value."
              title="Latest Offers"
            />
            <div className={styles.productGrid}>
              {latestOffers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.bannerSection}>
          <div className="container">
            <PromoBanner />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <SectionHeader
              actionLabel="View All Products"
              actionTo="/products"
              eyebrow="Most wanted"
              text="The fits customers keep coming back for."
              title="Most Requested"
            />
            <div className={styles.productGrid}>
              {mostRequested.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
