import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { mockHeroSlides } from "../../data/mockHeroSlides";
import styles from "./HeroSlider.module.css";

function HeroSlider() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <Swiper
          autoplay={{ delay: 4200, disableOnInteraction: false }}
          className={styles.swiper}
          loop
          modules={[Autoplay, Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
        >
          {mockHeroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={`${styles.slide} ${styles[slide.tone]}`}>
                <div className={styles.content}>
                  <span>{slide.badge}</span>
                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>
                  <div className={styles.actions}>
                    <Link to="/products">Shop Now</Link>
                    <Link to="/products">View Collection</Link>
                  </div>
                </div>
                <div className={styles.visual}>
                  <img alt={slide.title} src={slide.image} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default HeroSlider;
