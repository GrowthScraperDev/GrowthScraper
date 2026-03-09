import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

function SwiperSlider({
  children,
  centeredSlides,
  autoplay,
  mobileSlides, loop, reverseDirection,
  desktopSlides, pagination = true,
  marquee, paginationBg, tabletSlides, spaceBetween,
  paginationPosition = "bottom-left", // ✅ NEW PROP
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const swiperRef = useRef(null);

  const bgColor = paginationBg ? paginationBg : "#ffffff";

  const isRight = paginationPosition === "right" && !isMobile;

  const arrowWrapperStyle = {
    position: isRight ? "absolute" : "relative",
    right: isRight ? "0" : "auto",
    top: isRight ? "-110px" : "auto", // adjust to match gallery UI
    marginTop: isRight ? "0" : "32px",
    display: "flex",
    alignItems: "center",
    gap: "2px",
    zIndex: 10,
    width: "max-content",
  };

  const arrowButtonStyle = {
    width: "56px",
    height: "56px",
    border: "none",
    backgroundColor: bgColor,
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        centeredSlides={centeredSlides}
        modules={[Autoplay]}
        autoplay={
          autoplay
            ? {
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: reverseDirection,
            }
            : false
        }
        speed={marquee ? 5000 : 700}
        loop={loop}
        freeMode={false}
        resistanceRatio={0}
        breakpoints={{
          0: { slidesPerView: mobileSlides || "auto" },
          800: { slidesPerView: tabletSlides || "auto" },
          1204: { slidesPerView: desktopSlides || "auto" },
        }}
        spaceBetween={spaceBetween}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Arrow Pagination */}
      {pagination && <div style={arrowWrapperStyle}>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          style={arrowButtonStyle}
        >
          ←
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          style={arrowButtonStyle}
        >
          →
        </button>
      </div>}
    </div>
  );
}

export default SwiperSlider;
