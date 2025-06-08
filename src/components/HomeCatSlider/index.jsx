import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const HomeCatSlider = () => {
  return (
    <div className="homeCatSlider py-4 sm:py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Swiper
          spaceBetween={8}
          slidesPerView={2.5}
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
            <Link to="/" className="block">
              <div className="item py-4 sm:py-5 md:py-7 px-2 sm:px-3 bg-white rounded hover:shadow-lg transition-all duration-300">
                <img
                  src="https://serviceapi.spicezgold.com/download/1744509970781_fash.png"
                  className="w-[40px] sm:w-[50px] md:w-[60px] mx-auto transition-all"
                  alt="Fashion"
                />
                <h3 className="text-sm sm:text-[15px] font-medium sm:font-[500] mt-2 sm:mt-3">Fashion</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/" className="block">
              <div className="item py-4 sm:py-5 md:py-7 px-2 sm:px-3 bg-white rounded hover:shadow-lg transition-all duration-300">
                <img
                  src="https://serviceapi.spicezgold.com/download/1741660988059_ele.png"
                  className="w-[40px] sm:w-[50px] md:w-[60px] mx-auto transition-all"
                  alt="Smart Tablet"
                />
                <h3 className="text-sm sm:text-[15px] font-medium sm:font-[500] mt-2 sm:mt-3">Smart Tablet</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/" className="block">
              <div className="item py-4 sm:py-5 md:py-7 px-2 sm:px-3 bg-white rounded hover:shadow-lg transition-all duration-300">
                <img
                  src="https://serviceapi.spicezgold.com/download/1741661092792_beauty.png"
                  className="w-[40px] sm:w-[50px] md:w-[60px] mx-auto transition-all"
                  alt="Beauty"
                />
                <h3 className="text-sm sm:text-[15px] font-medium sm:font-[500] mt-2 sm:mt-3">Beauty</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/" className="block">
              <div className="item py-4 sm:py-5 md:py-7 px-2 sm:px-3 bg-white rounded hover:shadow-lg transition-all duration-300">
                <img
                  src="https://serviceapi.spicezgold.com/download/1741661120743_jw.png"
                  className="w-[40px] sm:w-[50px] md:w-[60px] mx-auto transition-all"
                  alt="Jewellery"
                />
                <h3 className="text-sm sm:text-[15px] font-medium sm:font-[500] mt-2 sm:mt-3">Jewellery</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/" className="block">
              <div className="item py-4 sm:py-5 md:py-7 px-2 sm:px-3 bg-white rounded hover:shadow-lg transition-all duration-300">
                <img
                  src="https://serviceapi.spicezgold.com/download/1741661045887_bag.png"
                  className="w-[40px] sm:w-[50px] md:w-[60px] mx-auto transition-all"
                  alt="Bags"
                />
                <h3 className="text-sm sm:text-[15px] font-medium sm:font-[500] mt-2 sm:mt-3">Bags</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/" className="block">
              <div className="item py-4 sm:py-5 md:py-7 px-2 sm:px-3 bg-white rounded hover:shadow-lg transition-all duration-300">
                <img
                  src="https://serviceapi.spicezgold.com/download/1741660988059_ele.png"
                  className="w-[40px] sm:w-[50px] md:w-[60px] mx-auto transition-all"
                  alt="Smart Tablet"
                />
                <h3 className="text-sm sm:text-[15px] font-medium sm:font-[500] mt-2 sm:mt-3">Smart Tablet</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/" className="block">
              <div className="item py-4 sm:py-5 md:py-7 px-2 sm:px-3 bg-white rounded hover:shadow-lg transition-all duration-300">
                <img
                  src="https://serviceapi.spicezgold.com/download/1741660988059_ele.png"
                  className="w-[40px] sm:w-[50px] md:w-[60px] mx-auto transition-all"
                  alt="Smart Tablet"
                />
                <h3 className="text-sm sm:text-[15px] font-medium sm:font-[500] mt-2 sm:mt-3">Smart Tablet</h3>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
