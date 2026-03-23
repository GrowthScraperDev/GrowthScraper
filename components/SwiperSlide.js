"use client";

import React, { useRef, useState,useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper/modules";

function SwiperSlider({
  children,
  centeredSlides,
  autoplay,
  mobileSlides,
  loop,
  desktopSlides,speed,
  tabletSlides,
  spaceBetween,
  showPagination = false,
  goToSlide
}) {

  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const totalSlides = React.Children.count(children);

  const formatNumber = (num) => String(num).padStart(2, "0");
  useEffect(() => {
    // ✅ Do nothing if prop is not passed
    if (goToSlide === undefined || goToSlide === null) return;
  
    // ✅ Ensure swiper is ready
    if (!swiperRef.current) return;
  
    // ✅ Ensure it's a valid number
    if (typeof goToSlide !== "number") return;
  
    // ✅ Prevent unnecessary re-slide
    if (swiperRef.current.realIndex === goToSlide) return;
  
    // ✅ Slide
    if (loop) {
      swiperRef.current.slideToLoop(goToSlide - 1);
    } else {
      swiperRef.current.slideTo(goToSlide - 1);
    }
  }, [goToSlide, loop]);
  return (
    <div style={{ width: "100%", position: "relative" }}>

      <Swiper goToSlide={goToSlide}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex + 1);
        }}
        centeredSlides={centeredSlides}
        modules={[Autoplay, EffectFade]}
        autoplay={
          autoplay
            ? {
              delay: 4000,
              disableOnInteraction: false,
            }
            : false
        }
        speed={speed}
        loop={loop}
        resistanceRatio={0}
        breakpoints={{
          0: { slidesPerView: mobileSlides || "auto" },
          800: { slidesPerView: tabletSlides || "auto" },
          1204: { slidesPerView: desktopSlides || "auto" },
        }}
        spaceBetween={spaceBetween}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} style={{position:"relative"}}>{child}</SwiperSlide>
        ))}
      </Swiper>

      {/* CUSTOM PAGINATION */}
      {showPagination && (
        <div
          className="pagination-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            justifyContent: "center",
            marginTop: "20px",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          <span>{formatNumber(activeIndex)}</span>

          <div
            style={{
              width: "120px",
              height: "1px",
              background: "#ccc"
            }}
          />

          <span>{formatNumber(totalSlides)}</span>
        </div>
      )}
    </div>
  );
}

export default SwiperSlider;