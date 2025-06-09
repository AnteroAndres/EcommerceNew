import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductItem from "../ProductItem";

const ProductsSlider = (props) => {
  return (
    <div className="productsSlider py-3">
        <Swiper
          slidesPerView={props.items}
          spaceBetween={8}
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
          className="mySwiper"
        >
          <SwiperSlide>
            <ProductItem/>
          </SwiperSlide>
          <SwiperSlide>
            <ProductItem/>
          </SwiperSlide>
          <SwiperSlide>
            <ProductItem/>
          </SwiperSlide>
          <SwiperSlide>
            <ProductItem/>
          </SwiperSlide>
          <SwiperSlide>
            <ProductItem/>
          </SwiperSlide>
          <SwiperSlide>
            <ProductItem/>
          </SwiperSlide>
          <SwiperSlide>
            <ProductItem/>
          </SwiperSlide>
          <SwiperSlide>
            <ProductItem/>
          </SwiperSlide>
        </Swiper>
    </div>
  );
};

export default ProductsSlider;
