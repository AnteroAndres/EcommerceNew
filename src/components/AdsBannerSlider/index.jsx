import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BannerBox from "../BannerBox";

const AdsBannerSlider = (props) => {
  return (
    <div className="py-5 w-full">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4.5,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className="smlBtn"
      >
        <SwiperSlide>
          <BannerBox img={"/banner1.jpg"} link={"/"}/>
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/banner2.jpg"} link={"/"}/>
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/banner1.jpg"} link={"/"}/>
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/banner2.jpg"} link={"/"}/>
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/banner1.jpg"} link={"/"}/>
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/banner2.jpg"} link={"/"}/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
