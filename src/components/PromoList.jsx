import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";

import PromoItem from "./PromoItem";

import "swiper/css";

import "./PromoList.scss";
import { useRef, useState } from "react";

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

const POSTER_WIDTH = 290;
const POSTER_HEIGHT = 490;
const POSTER_SPACE_BETWEEN = 30;
const VIDEO_WIDTH = POSTER_WIDTH * 3 + POSTER_SPACE_BETWEEN * 2;
const AUTO_VIDEO_DELAY = 3000;

const PromoList = () => {
  const swiperRef = useRef(null);
  const autoVideoTimer = useRef(null);

  let inTransition = false;
  let inTransitionSaveTimerMilliSeconds = 5000;
  const inTransitionSaveTimer = useRef(null);

  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [openedPosterIndex, setOpenedPosterIndex] = useState(0);
  const [posterType, setPosterType] = useState("poster");

  const handleSlideChangeSlide = (swiper) => {
    const nextPosterIndex = swiper.realIndex;
    console.log(swiper);
    console.log(nextPosterIndex);

    removeAutoVideoTimer();

    setCurrentPosterIndex(nextPosterIndex);

    addAutoVideoTimer(nextPosterIndex);
  };

  const setInTransition = (value) => {
    if (value === true) {
      inTransition = value;
      const inTransitionOff = () => {
        if (inTransitionSaveTimer.current) {
          clearTimeout(inTransitionSaveTimer.current);
        }
        inTransition = false;
      };
      if (inTransitionSaveTimer.current) {
        clearTimeout(inTransitionSaveTimer.current);
      }
      inTransitionSaveTimer.current = setTimeout(
        inTransitionOff,
        inTransitionSaveTimerMilliSeconds
      );
    } else if (value === false) {
      if (inTransitionSaveTimer) clearTimeout(inTransitionSaveTimer);
      inTransition = false;
    }
  };

  const autoVideoHandler = (nextPosterIndex) => {
    removeAutoVideoTimer();
    if (nextPosterIndex !== null) {
      setOpenedPosterIndex(nextPosterIndex);

      console.log("autoVideoHandler");
      setPosterType("video");
      setInTransition(true);
    }
  };

  const addAutoVideoTimer = (nextPosterIndex) => {
    if (autoVideoTimer.current) clearTimeout(autoVideoTimer.current);
    autoVideoTimer.current = setTimeout(() => {
      autoVideoHandler(nextPosterIndex);
    }, AUTO_VIDEO_DELAY);
  };

  const removeAutoVideoTimer = () => {
    if (autoVideoTimer.current) clearTimeout(autoVideoTimer.current);
  };

  const onFocusWrapperTransitionEnd = () => {
    setInTransition(false);
  };

  return (
    <div className="promo-list">
      <Swiper
        ref={swiperRef}
        initialSlide={currentPosterIndex}
        modules={[Keyboard]}
        spaceBetween={POSTER_SPACE_BETWEEN}
        slidesPerView={6}
        keyboard={{ enabled: true }}
        loop
        onSlideChange={handleSlideChangeSlide}
      >
        {ITEMS.map((item, index) => (
          <SwiperSlide
            style={{
              width:
                index === currentPosterIndex && posterType === "video"
                  ? `${VIDEO_WIDTH}px`
                  : `${POSTER_WIDTH}px`,
            }}
            key={item.id}
          >
            <PromoItem
              item={item}
              height={POSTER_HEIGHT}
              isWide={posterType === "video" && index === currentPosterIndex}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="promo-list-focus-wrapper"
        style={{
          width:
            posterType === "video" ? `${VIDEO_WIDTH}px` : `${POSTER_WIDTH}px`,
          height: `${POSTER_HEIGHT}px`,
        }}
        onTransitionEnd={onFocusWrapperTransitionEnd}
      ></div>
    </div>
  );
};

export default PromoList;
