import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";

import PromoItem from "./PromoItem";

import "swiper/css";

import "./PromoList.scss";

const ITEMS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

const PromoList = () => {
  return (
    <div className="promo-list">
      <Swiper
        modules={[Keyboard]}
        spaceBetween={30}
        slidesPerView={6}
        keyboard={{ enabled: true }}
        loop
      >
        {ITEMS.map((item) => (
          <SwiperSlide key={item.id}>
            <PromoItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="promo-list-focus"></div>
    </div>
  );
};

export default PromoList;
