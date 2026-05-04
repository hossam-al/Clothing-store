import BrandCard from "../../components/BrandCard/BrandCard";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import ProductCard from "../../components/ProductCard/ProductCard";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { mockBrands } from "../../data/mockBrands";
import { latestOffers, mostRequested } from "../../data/mockProducts";
import "../../styles/global.css";
import styles from "./HomePage.module.css";
import { FaHeadset, FaShieldHalved, FaTruckFast, FaWallet } from "react-icons/fa6";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const serviceHighlights = [
  {
    icon: FaShieldHalved,
    title: "Product Guarantee",
    text: "Quality checked pieces with easy return options.",
  },
  {
    icon: FaTruckFast,
    title: "Fast Shipping",
    text: "Quick delivery so your fit lands without the wait.",
  },
  {
    icon: FaWallet,
    title: "Secure Payment",
    text: "Safe checkout with trusted payment methods.",
  },
  {
    icon: FaHeadset,
    title: "Support",
    text: "Help with orders, sizing, and returns whenever needed.",
  },
];

function ProductSlider({ products }) {
  return (
    <Swiper
      breakpoints={{
        0: { slidesPerView: 1.08, spaceBetween: 14 },
        576: { slidesPerView: 2, spaceBetween: 16 },
        992: { slidesPerView: 3, spaceBetween: 18 },
        1200: { slidesPerView: 4, spaceBetween: 18 },
      }}
      className={styles.productSlider}
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      slidesPerGroup={1}
    >
      {products.map((product) => (
        <SwiperSlide className={styles.productSlide} key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function HomePage() {
  return (
    <div className={styles.page}>
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
            <ProductSlider products={latestOffers} />
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
            <ProductSlider products={mostRequested} />
          </div>
        </section>

        <section className={styles.serviceSection}>
          <div className="container">
            <div className={styles.serviceGrid}>
              {serviceHighlights.map((item) => {
                const Icon = item.icon;

                return (
                  <article className={styles.serviceCard} key={item.title}>
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
