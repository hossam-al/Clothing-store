import { useState } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { mockHeroSlides } from "../../data/mockHeroSlides";
import styles from "./HeroSlider.module.css";

function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.hero}>
      <div className="container">
        <Swiper
          autoplay={{ delay: 4200, disableOnInteraction: false }}
          className={styles.swiper}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          navigation
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          pagination={{ clickable: true }}
        >
          {mockHeroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={`${styles.slide} ${styles[slide.tone]}`}>
                <div
                  className={styles.content}
                  key={`${slide.id}-${activeIndex}`}
                >
                  <span className={styles.eyebrow}>{slide.badge}</span>
                  <h1 className={styles.title}>{slide.title}</h1>
                  <p className={styles.description}>{slide.subtitle}</p>
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
