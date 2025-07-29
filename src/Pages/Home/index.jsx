import React from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from "../../components/AdsBannerSlider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductsSlider from "../../components/ProductsSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import HomeBannerV2 from "../../components/HomeSliderV2";

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {/* <HomeSlider /> */}
      <section className="py-6">
        <div className="container flex items-center">
          <div className="part1 w-[75%]">
            <HomeBannerV2 />
          </div>
        </div>
      </section>
      <HomeCatSlider />

      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec">
              <h2 className="text-2xl font-bold">Popular Products</h2>
              <p className="text-sm text-gray-500">
                Do not miss the current offers until the end of December
              </p>
            </div>

            <div className="rightSec w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Fashion" />
                <Tab label="Electronics" />
                <Tab label="Bags" />
                <Tab label="Footwear" />
                <Tab label="Groceries" />
                <Tab label="Beauty" />
                <Tab label="Wellness" />
                <Tab label="Jewellery" />
              </Tabs>
            </div>
          </div>

          <ProductsSlider items={6} />
        </div>
      </section>

      <section className="py-4 pt-0 bg-white">
        <div className="container">
          <div className="freeShipping w-[80%] mx-auto py-4 p-4 border sm:border-2 md:border-2 lg:border-2 border-[#ff5252] flex items-center justify-between rounded-sm mb-7">
            <div className="col1 flex items-center gap-4 ">
              <LiaShippingFastSolid className="text-[50px]" />
              <span className="text-2xl font-bold uppercase">
                Free Shipping
              </span>
            </div>
            <div className="col2 flex items-center gap-2">
              <p className="mb-0 font-bold">
                Free Delivery Now On Yours First Order and over $200
              </p>
            </div>

            <p className="font-bold text-[25px]">- Only $200</p>
          </div>
          <AdsBannerSlider items={4} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-2xl font-bold">Latest Products</h2>
          <ProductsSlider items={6} />
          <AdsBannerSlider items={3} />
        </div>
      </section>

      <section className="py-5 pt-0 bg-white blogSection">
        <div className="py-5">
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
            <SwiperSlide></SwiperSlide>
          </Swiper>
        </div>
      </section>
      <br />
      <br />
    </>
  );
};

export default Home;
