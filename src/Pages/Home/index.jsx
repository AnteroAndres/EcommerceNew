import React from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from "../../components/AdsBannerSlider";

const Home = () => {
  return (
    <>
      <HomeSlider />
      <HomeCatSlider />

      <section className="py-16 bg-white">
        <div className="container">
          <div className="freeShipping w-full py-4 p-4 border sm:border-2 md:border-4 lg:border-8 border-[#ff5252] flex items-center justify-between rounded-sm mb-7">
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
          <AdsBannerSlider items={4}/>
        </div>
      </section>

      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Home;
