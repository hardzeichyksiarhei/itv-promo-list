import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

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

const POSTER_WIDTH = 290;
const POSTER_HEIGHT = 523.13;
const POSTER_SPACE_BETWEEN = 30;
const VIDEO_WIDTH = POSTER_WIDTH * 3 + POSTER_SPACE_BETWEEN * 2;
const AUTO_VIDEO_DELAY = 3000;
const IN_TRANSITION_DURATION = 500;

const PromoList = () => {
  const swiperRef = useRef(null);
  const promoListFocusWrapper = useRef(null);

  const autoVideoTimer = useRef(null);

  const inTransition = useRef(false);

  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [openedPosterIndex, setOpenedPosterIndex] = useState(0);
  const [posterType, setPosterType] = useState("poster");
  const [playerOpen, setPlayerOpen] = useState(false);
  const [posterOpened, setPosterOpened] = useState(false);

  const handleSlideChangeSlide = (swiper) => {
    const nextPosterIndex = swiper.realIndex;

    removeAutoVideoTimer();

    setPlayerOpen(false);
    setPosterType("poster");
    setCurrentPosterIndex(nextPosterIndex);

    addAutoVideoTimer(nextPosterIndex);
  };

  const autoVideoHandler = (nextPosterIndex) => {
    removeAutoVideoTimer();
    if (nextPosterIndex !== null) {
      setOpenedPosterIndex(nextPosterIndex);

      setPosterType("video");
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

  useEffect(() => {
    promoListFocusWrapper.current.addEventListener(
      "transitionstart",
      onFocusWrapperTransitionStart
    );

    return () => {
      promoListFocusWrapper.current.removeEventListener(
        "transitionstart",
        onFocusWrapperTransitionStart
      );
    };
  }, []);

  const onFocusWrapperTransitionStart = () => {
    inTransition.current = true;
  };

  const onFocusWrapperTransitionEnd = () => {
    inTransition.current = false;

    if (!posterOpened && !playerOpen) {
      setPosterOpened(true);
      setPlayerOpen(true);
    } else if (posterOpened) {
      setPosterOpened(false);
    }
  };

  const handleKeyDown = (e) => {
    const { swiper } = swiperRef.current;

    if (inTransition.current) return;

    // Left
    if (e.keyCode === 37) {
      swiper.slidePrev();
    }

    // Right
    if (e.keyCode === 39) {
      swiper.slideNext();
    }
  };

  useEffect(() => {
    if (posterType === "video") {
      const activeItem = document.querySelector(".swiper-slide-active");
      activeItem.style.width = `${VIDEO_WIDTH}px`;
    }
    if (posterType === "poster") {
      const prevItem = document.querySelector(".swiper-slide-prev");
      prevItem.style.width = `${POSTER_WIDTH}px`;
    }
  }, [posterType]);

  const getPromoListFocusWrapperStyles = () => {
    return {
      transitionDuration: `${IN_TRANSITION_DURATION / 1000}s`,
      width: posterType === "video" ? `${VIDEO_WIDTH}px` : `${POSTER_WIDTH}px`,
      height: `${POSTER_HEIGHT}px`,
      backgroundColor: posterType === "video" ? "#000" : "transparent",
    };
  };

  const getPromoVideoWrapperStyles = () => {
    return {
      width: posterType === "video" ? `${VIDEO_WIDTH}px` : `${POSTER_WIDTH}px`,
      height: `${POSTER_HEIGHT}px`,
    };
  };

  return (
    <div className="promo-list">
      <Swiper
        ref={swiperRef}
        initialSlide={currentPosterIndex}
        spaceBetween={POSTER_SPACE_BETWEEN}
        slidesPerView={6}
        onSlideChange={handleSlideChangeSlide}
        speed={IN_TRANSITION_DURATION}
        loop
        enabled={posterType === "poster"}
      >
        {ITEMS.map((item) => (
          <SwiperSlide
            style={{ transitionDuration: `${IN_TRANSITION_DURATION / 1000}s` }}
            key={item.id}
          >
            {({ isActive }) => (
              <PromoItem
                item={item}
                inTransitionDuration={IN_TRANSITION_DURATION}
                width={POSTER_WIDTH}
                height={POSTER_HEIGHT}
                isWide={isActive && posterType === "video"}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        ref={promoListFocusWrapper}
        className="promo-list-focus-wrapper"
        style={getPromoListFocusWrapperStyles()}
        onTransitionEnd={onFocusWrapperTransitionEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      />

      {playerOpen && (
        <div
          className="promo-list-video-wrapper"
          style={getPromoVideoWrapperStyles()}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <iframe
            width={VIDEO_WIDTH}
            height={POSTER_HEIGHT}
            src="https://www.youtube.com/embed/e_atyw0IDqg?controls=0"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default PromoList;
