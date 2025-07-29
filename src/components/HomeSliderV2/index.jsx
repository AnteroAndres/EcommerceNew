import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@mui/material";

const HomeBannerV2 = () => {
  return (
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Navigation, Pagination]}
      className="homeSliderV2"
    >
      <SwiperSlide>
        <div className="item w-full rounded-md overflow-hidden relative">
          <img src="https://i.pinimg.com/1200x/02/cf/cf/02cfcffac595c832c514d58704cd82ce.jpg" />
          <div className="info absolute top-0 right-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center">
            
          <div className="w-full">
            <Button className="btn-org">SHOP NOW</Button>
          </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item w-full rounded-md overflow-hidden">
          <img src="https://i.pinimg.com/1200x/1d/26/4c/1d264c988391a6b743cfbd299b381170.jpg" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeBannerV2;
