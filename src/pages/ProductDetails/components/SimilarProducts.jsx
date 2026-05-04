import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { mockProducts } from "../../../data/mockProducts";
import styles from "../ProductDetailsPage.module.css";

function SimilarProducts({ product }) {
  const similarProducts = mockProducts
    .filter((item) => item.id !== product.id)
    .sort(
      (a, b) =>
        Number(b.category === product.category) - Number(a.category === product.category),
    )
    .slice(0, 8);

  return (
    <section className={styles.similarSection}>
      <div className={styles.sectionHeader}>
        <div>
          <span>You May Also Like</span>
          <h2>Similar Products</h2>
        </div>
      </div>

      <Swiper
        breakpoints={{
          0: { slidesPerView: 1.08, spaceBetween: 14 },
          576: { slidesPerView: 2, spaceBetween: 16 },
          992: { slidesPerView: 3, spaceBetween: 18 },
          1200: { slidesPerView: 4, spaceBetween: 18 },
        }}
        className={styles.similarSlider}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
      >
        {similarProducts.map((item) => (
          <SwiperSlide className={styles.similarSlide} key={item.id}>
            <ProductCard product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default SimilarProducts;
