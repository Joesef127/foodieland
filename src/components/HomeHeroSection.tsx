import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { heroSlides } from "../utils/HeroSlidesData";
import HeroSlide from "./HeroSlide";
import "../styles/swiper.css";




export default function HeroSection() {
  return (
    <section className="flex justify-center items-center">
            <div className="w-[95%] sm:w-[90%]">
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                centeredSlides={true}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                modules={[Pagination, Autoplay]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                }}
                className="mySwiper"
              >
                {heroSlides &&
                  heroSlides.map((slide, index: number) => (
                    <SwiperSlide key={index}>
                      <HeroSlide
                        title={slide.title}
                        description={slide.description}
                        badges={slide.badges}
                        user={slide.user}
                        backgroundImage={slide.backgroundImage}
                        button={slide.button}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </section>
  )
}