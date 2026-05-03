import { Swiper, SwiperSlide } from "swiper/react";
import { mockCategories } from "../../data/mockCategories";
import styles from "./CategorySlider.module.css";

function CategorySlider() {
  return (
    <Swiper
      breakpoints={{
        0: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1200: { slidesPerView: 6 },
      }}
      className={styles.slider}
      spaceBetween={16}
    >
      {mockCategories.map((category) => {
        const Icon = category.icon;

        return (
          <SwiperSlide key={category.id}>
            <a className={styles.card} href="#">
              <Icon />
              <h3>{category.name}</h3>
              <p>{category.text}</p>
            </a>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default CategorySlider;
